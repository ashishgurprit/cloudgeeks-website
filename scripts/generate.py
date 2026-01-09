#!/usr/bin/env python3
"""
Blog Generator CLI

Usage:
    python scripts/generate.py --topic "Your topic here" --site ashganda
    python scripts/generate.py --topic "Your topic here" --site cloudgeeks
    python scripts/generate.py --queue  # Process next item from topics queue
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

# Add scripts directory to path
sys.path.insert(0, str(Path(__file__).parent))

from blog_generator.agent import BlogGenerator
from blog_generator.config import get_site_config, APIConfig


def load_topics_queue(site: str) -> list:
    """Load topics queue from JSON file"""
    queue_file = Path(__file__).parent.parent / "content" / f"topics-{site}.json"

    if not queue_file.exists():
        print(f"Topics queue not found: {queue_file}")
        return []

    with open(queue_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data.get("schedule", [])


def save_topics_queue(site: str, schedule: list):
    """Save updated topics queue"""
    queue_file = Path(__file__).parent.parent / "content" / f"topics-{site}.json"

    with open(queue_file, "w", encoding="utf-8") as f:
        json.dump({"schedule": schedule, "updated_at": datetime.now().isoformat()}, f, indent=2)


def get_next_pending_topic(schedule: list) -> tuple:
    """Get the next pending topic from schedule"""
    for i, item in enumerate(schedule):
        if item.get("status") == "pending":
            # Check if scheduled date has passed
            scheduled_date = item.get("scheduled_date", item.get("id", ""))
            if scheduled_date:
                try:
                    date = datetime.fromisoformat(scheduled_date.replace("Z", "+00:00"))
                    if date.date() > datetime.now().date():
                        continue  # Not yet scheduled
                except (ValueError, TypeError):
                    pass  # Invalid date, process anyway

            return i, item

    return -1, None


def main():
    parser = argparse.ArgumentParser(
        description="Generate AI-powered blog posts",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate a single post
  python scripts/generate.py --topic "How AI is Transforming Healthcare" --site ashganda

  # Generate from queue
  python scripts/generate.py --queue --site ashganda

  # Generate with options
  python scripts/generate.py --topic "Cloud Migration Guide" --site cloudgeeks --words 2500 --images 4
        """,
    )

    parser.add_argument(
        "--topic",
        type=str,
        help="Blog topic to generate",
    )

    parser.add_argument(
        "--site",
        type=str,
        choices=["ashganda", "cloudgeeks"],
        default="ashganda",
        help="Target site (default: ashganda)",
    )

    parser.add_argument(
        "--queue",
        action="store_true",
        help="Process next pending topic from queue",
    )

    parser.add_argument(
        "--keyword",
        type=str,
        help="Primary SEO keyword",
    )

    parser.add_argument(
        "--words",
        type=int,
        help="Target word count",
    )

    parser.add_argument(
        "--images",
        type=int,
        help="Number of images to generate",
    )

    parser.add_argument(
        "--tags",
        type=str,
        help="Comma-separated tags",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be generated without actually generating",
    )

    args = parser.parse_args()

    # Validate arguments
    if not args.topic and not args.queue:
        parser.error("Either --topic or --queue is required")

    # Check API keys
    api_config = APIConfig.from_env()
    if not api_config.anthropic_api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set")
        sys.exit(1)

    if not api_config.tavily_api_key:
        print("Warning: TAVILY_API_KEY not set. Research will be limited.")

    # Get topic
    topic = args.topic
    keyword = args.keyword
    tags = args.tags.split(",") if args.tags else None
    queue_index = -1
    schedule = None

    if args.queue:
        schedule = load_topics_queue(args.site)
        queue_index, queue_item = get_next_pending_topic(schedule)

        if queue_item is None:
            print("No pending topics in queue")
            sys.exit(0)

        topic = queue_item.get("topic")
        keyword = queue_item.get("keyword") or keyword
        tags = queue_item.get("tags") or tags

        print(f"Processing queue item: {queue_item.get('id', 'unknown')}")

    # Show configuration
    site_config = get_site_config(args.site)
    print(f"\n{'='*60}")
    print(f"BLOG GENERATOR")
    print(f"{'='*60}")
    print(f"Site:       {site_config.name} ({site_config.domain})")
    print(f"Topic:      {topic}")
    print(f"Keyword:    {keyword or '(auto)'}")
    print(f"Words:      {args.words or site_config.default_word_count}")
    print(f"Images:     {args.images if args.images is not None else site_config.default_image_count}")
    print(f"Output:     {site_config.output_format.value}")
    print(f"{'='*60}\n")

    if args.dry_run:
        print("DRY RUN - No content will be generated")
        sys.exit(0)

    # Generate blog
    generator = BlogGenerator(site=args.site, api_config=api_config)

    result = generator.generate(
        topic=topic,
        primary_keyword=keyword,
        word_count=args.words,
        image_count=args.images,
        tags=tags,
    )

    # Print result
    print(f"\n{'='*60}")
    if result["success"]:
        print("SUCCESS!")
        print(f"Title:      {result['title']}")
        print(f"Slug:       {result['slug']}")
        print(f"Words:      {result['word_count']}")
        print(f"Images:     {result['images_generated']}")
        print(f"Duration:   {result['duration_seconds']:.1f}s")

        output = result.get("output", {})
        if output.get("output_type") == "mdx":
            print(f"File:       {output.get('filepath')}")
        elif output.get("output_type") == "ghost":
            print(f"Ghost URL:  {output.get('url')}")
            print(f"Post ID:    {output.get('post_id')}")

        # Update queue if processing from queue
        if args.queue and schedule is not None and queue_index >= 0:
            schedule[queue_index]["status"] = "completed"
            schedule[queue_index]["completed_at"] = datetime.now().isoformat()
            schedule[queue_index]["result"] = {
                "title": result["title"],
                "slug": result["slug"],
            }
            save_topics_queue(args.site, schedule)
            print("\nQueue updated: marked as completed")

    else:
        print("FAILED!")
        print(f"Error: {result.get('error')}")
        sys.exit(1)

    print(f"{'='*60}")


if __name__ == "__main__":
    main()
