#!/usr/bin/env python3
"""
Topic Queue Manager

Utility for managing the blog topics queue.

Usage:
    python scripts/manage_topics.py list --site ashganda
    python scripts/manage_topics.py add --site ashganda --topic "New Topic" --date 2025-02-01
    python scripts/manage_topics.py status --site ashganda
"""

import argparse
import json
from datetime import datetime
from pathlib import Path


def get_queue_path(site: str) -> Path:
    """Get path to topics queue file"""
    return Path(__file__).parent.parent / "content" / f"topics-{site}.json"


def load_queue(site: str) -> dict:
    """Load topics queue from JSON file"""
    queue_file = get_queue_path(site)
    if not queue_file.exists():
        return {"site": site, "schedule": [], "updated_at": datetime.now().isoformat()}

    with open(queue_file, "r", encoding="utf-8") as f:
        return json.load(f)


def save_queue(site: str, data: dict):
    """Save topics queue to JSON file"""
    data["updated_at"] = datetime.now().isoformat()
    queue_file = get_queue_path(site)
    queue_file.parent.mkdir(parents=True, exist_ok=True)

    with open(queue_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"Queue saved: {queue_file}")


def cmd_list(args):
    """List all topics in queue"""
    data = load_queue(args.site)
    schedule = data.get("schedule", [])

    if not schedule:
        print(f"No topics in queue for {args.site}")
        return

    print(f"\n{'='*70}")
    print(f"TOPICS QUEUE: {args.site}")
    print(f"{'='*70}\n")

    for item in schedule:
        status_emoji = {
            "pending": "⏳",
            "completed": "✅",
            "failed": "❌",
        }.get(item.get("status", "pending"), "❓")

        print(f"{status_emoji} [{item.get('id', 'N/A')}] {item.get('status', 'pending').upper()}")
        print(f"   Topic: {item.get('topic', 'No topic')}")
        print(f"   Keyword: {item.get('keyword', 'N/A')}")
        print(f"   Tags: {', '.join(item.get('tags', []))}")
        print()

    # Summary
    pending = sum(1 for i in schedule if i.get("status") == "pending")
    completed = sum(1 for i in schedule if i.get("status") == "completed")
    failed = sum(1 for i in schedule if i.get("status") == "failed")

    print(f"{'='*70}")
    print(f"Total: {len(schedule)} | Pending: {pending} | Completed: {completed} | Failed: {failed}")
    print(f"{'='*70}\n")


def cmd_add(args):
    """Add a new topic to the queue"""
    data = load_queue(args.site)

    # Generate ID from date
    topic_id = args.date or datetime.now().strftime("%Y-%m-%d")

    # Check for duplicate ID
    existing_ids = {item.get("id") for item in data.get("schedule", [])}
    if topic_id in existing_ids:
        # Add counter
        counter = 1
        while f"{topic_id}-{counter}" in existing_ids:
            counter += 1
        topic_id = f"{topic_id}-{counter}"

    new_topic = {
        "id": topic_id,
        "scheduled_date": args.date or datetime.now().strftime("%Y-%m-%d"),
        "topic": args.topic,
        "keyword": args.keyword or "",
        "tags": args.tags.split(",") if args.tags else [],
        "status": "pending",
    }

    data.setdefault("schedule", []).append(new_topic)
    save_queue(args.site, data)

    print(f"\n✅ Added topic: {args.topic}")
    print(f"   ID: {topic_id}")
    print(f"   Scheduled: {new_topic['scheduled_date']}")


def cmd_status(args):
    """Show queue status summary"""
    data = load_queue(args.site)
    schedule = data.get("schedule", [])

    pending = [i for i in schedule if i.get("status") == "pending"]
    completed = [i for i in schedule if i.get("status") == "completed"]

    print(f"\n{'='*50}")
    print(f"QUEUE STATUS: {args.site}")
    print(f"{'='*50}")
    print(f"Total topics:    {len(schedule)}")
    print(f"Pending:         {len(pending)}")
    print(f"Completed:       {len(completed)}")
    print(f"{'='*50}")

    if pending:
        next_topic = pending[0]
        print(f"\nNext up:")
        print(f"  📝 {next_topic.get('topic', 'N/A')}")
        print(f"  📅 {next_topic.get('scheduled_date', 'N/A')}")


def cmd_clear_completed(args):
    """Remove completed items from queue"""
    data = load_queue(args.site)
    original_count = len(data.get("schedule", []))

    data["schedule"] = [
        item for item in data.get("schedule", [])
        if item.get("status") != "completed"
    ]

    removed = original_count - len(data["schedule"])
    save_queue(args.site, data)

    print(f"Removed {removed} completed items")


def main():
    parser = argparse.ArgumentParser(description="Manage blog topics queue")
    parser.add_argument("--site", choices=["ashganda", "cloudgeeks"], default="ashganda")

    subparsers = parser.add_subparsers(dest="command", required=True)

    # List command
    subparsers.add_parser("list", help="List all topics")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new topic")
    add_parser.add_argument("--topic", required=True, help="Blog topic")
    add_parser.add_argument("--date", help="Scheduled date (YYYY-MM-DD)")
    add_parser.add_argument("--keyword", help="Primary SEO keyword")
    add_parser.add_argument("--tags", help="Comma-separated tags")

    # Status command
    subparsers.add_parser("status", help="Show queue status")

    # Clear completed command
    subparsers.add_parser("clear", help="Clear completed items")

    args = parser.parse_args()

    if args.command == "list":
        cmd_list(args)
    elif args.command == "add":
        cmd_add(args)
    elif args.command == "status":
        cmd_status(args)
    elif args.command == "clear":
        cmd_clear_completed(args)


if __name__ == "__main__":
    main()
