"""
SEO Node - Generate metadata and optimize for search
"""

import anthropic
from typing import Dict, Any

from ..state import BlogState
from ..config import SiteConfig, APIConfig


SEO_PROMPT = """Generate SEO metadata for this blog post.

TITLE: {title}
TOPIC: {topic}
PRIMARY KEYWORD: {primary_keyword}

CONTENT PREVIEW:
{content_preview}

Generate:
1. Meta Description (150-160 characters, include primary keyword naturally)
2. Excerpt (140 characters for social sharing)
3. Focus Keyword Short (1-2 words)
4. Focus Keyword Long (3-5 word phrase)
5. URL Slug (lowercase, hyphenated, max 60 chars)

Format your response exactly as:
META_DESCRIPTION: [your meta description]
EXCERPT: [your excerpt]
FOCUS_KEYWORD_SHORT: [short keyword]
FOCUS_KEYWORD_LONG: [long keyword phrase]
SLUG: [url-slug]
"""


def seo_node(state: BlogState, site_config: SiteConfig, api_config: APIConfig) -> Dict[str, Any]:
    """
    Generate SEO metadata for the blog post.

    Args:
        state: Current blog state
        site_config: Site-specific configuration
        api_config: API keys configuration

    Returns:
        Updated state with meta_description, excerpt, focus keywords, slug
    """
    client = anthropic.Anthropic(api_key=api_config.anthropic_api_key)

    content_preview = state.get("full_content", state.get("intro_content", ""))[:1500]

    prompt = SEO_PROMPT.format(
        title=state.get("title", state["topic"]),
        topic=state["topic"],
        primary_keyword=state.get("primary_keyword") or state["topic"],
        content_preview=content_preview,
    )

    response = client.messages.create(
        model=api_config.claude_model,
        max_tokens=500,
        temperature=0.3,
        messages=[{"role": "user", "content": prompt}],
    )

    # Parse response
    result = {
        "meta_description": "",
        "excerpt": "",
        "focus_keyword_short": "",
        "focus_keyword_long": "",
        "slug": "",
    }

    for line in response.content[0].text.split("\n"):
        line = line.strip()
        if line.startswith("META_DESCRIPTION:"):
            result["meta_description"] = line.replace("META_DESCRIPTION:", "").strip()[:160]
        elif line.startswith("EXCERPT:"):
            result["excerpt"] = line.replace("EXCERPT:", "").strip()[:140]
        elif line.startswith("FOCUS_KEYWORD_SHORT:"):
            result["focus_keyword_short"] = line.replace("FOCUS_KEYWORD_SHORT:", "").strip()
        elif line.startswith("FOCUS_KEYWORD_LONG:"):
            result["focus_keyword_long"] = line.replace("FOCUS_KEYWORD_LONG:", "").strip()
        elif line.startswith("SLUG:"):
            result["slug"] = line.replace("SLUG:", "").strip().lower()[:60]

    # Fallback slug generation if not provided
    if not result["slug"]:
        title = state.get("title", state["topic"])
        slug = title.lower()
        slug = "".join(c if c.isalnum() or c == "-" else "-" for c in slug)
        slug = "-".join(filter(None, slug.split("-")))
        result["slug"] = slug[:60]

    return result
