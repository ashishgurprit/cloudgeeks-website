"""
Output Node - Format and save blog posts
"""

import os
import json
import requests
import jwt
import time
from datetime import datetime
from typing import Dict, Any, Optional

from ..state import BlogState
from ..config import SiteConfig, OutputFormat


def generate_mdx_output(state: BlogState, site_config: SiteConfig) -> str:
    """Generate MDX file content for Next.js blogs"""

    # Format tags as JSON array
    tags = state.get("tags", site_config.default_tags)
    if not tags:
        tags = site_config.default_tags

    # Get featured image
    featured_image = state.get("featured_image", "/images/blog-default.jpg")
    if state.get("generated_images"):
        featured_image = state["generated_images"][0].get("url", featured_image)

    # Build frontmatter
    frontmatter = f'''---
title: "{state['title'].replace('"', '\\"')}"
description: "{state.get('meta_description', '').replace('"', '\\"')}"
date: "{datetime.now().strftime('%Y-%m-%d')}"
author: "{site_config.author}"
tags: {json.dumps(tags)}
image: "{featured_image}"
readingTime: "{state.get('reading_time', '5 min read')}"
---

'''

    # Add content (already formatted as markdown)
    content = state.get("full_content", "")

    # Remove the title from content if it starts with it (we have it in frontmatter)
    if content.startswith(f"# {state['title']}"):
        content = content[len(f"# {state['title']}"):].strip()

    return frontmatter + content


def save_mdx_file(content: str, slug: str, output_dir: str) -> str:
    """Save MDX content to file"""
    os.makedirs(output_dir, exist_ok=True)

    filepath = os.path.join(output_dir, f"{slug}.mdx")

    # Check if file exists
    if os.path.exists(filepath):
        # Add timestamp to avoid overwriting
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        filepath = os.path.join(output_dir, f"{slug}-{timestamp}.mdx")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    return filepath


def generate_ghost_admin_token(admin_key: str) -> str:
    """Generate Ghost Admin API JWT token"""
    # Ghost admin key format: {id}:{secret}
    parts = admin_key.split(":")
    if len(parts) != 2:
        raise ValueError("Invalid Ghost admin key format. Expected: id:secret")

    key_id, secret = parts

    # Create JWT
    iat = int(time.time())
    header = {"alg": "HS256", "typ": "JWT", "kid": key_id}
    payload = {
        "iat": iat,
        "exp": iat + 5 * 60,  # 5 minutes
        "aud": "/admin/",
    }

    token = jwt.encode(payload, bytes.fromhex(secret), algorithm="HS256", headers=header)
    return token


def publish_to_ghost(state: BlogState, site_config: SiteConfig) -> Dict[str, Any]:
    """Publish blog post to Ghost CMS via Admin API"""

    if not site_config.ghost_api_url or not site_config.ghost_admin_key:
        return {"error": "Ghost API URL or admin key not configured"}

    try:
        token = generate_ghost_admin_token(site_config.ghost_admin_key)
    except Exception as e:
        return {"error": f"Failed to generate Ghost token: {e}"}

    # Prepare post data
    tags = state.get("tags", site_config.default_tags)

    # Convert markdown to mobiledoc (Ghost's format)
    # For simplicity, we'll use HTML - Ghost can convert it
    content = state.get("full_content", "")

    # Remove title (Ghost adds it separately)
    if content.startswith(f"# {state['title']}"):
        content = content[len(f"# {state['title']}"):].strip()

    post_data = {
        "posts": [{
            "title": state["title"],
            "slug": state["slug"],
            "html": f"<div>{content}</div>",  # Simplified - should use proper markdown-to-html
            "custom_excerpt": state.get("excerpt", ""),
            "meta_description": state.get("meta_description", ""),
            "tags": [{"name": tag} for tag in tags],
            "status": "draft",  # Start as draft for review
        }]
    }

    # Add featured image if available
    if state.get("featured_image"):
        post_data["posts"][0]["feature_image"] = state["featured_image"]

    # Make API request
    headers = {
        "Authorization": f"Ghost {token}",
        "Content-Type": "application/json",
    }

    api_url = f"{site_config.ghost_api_url.rstrip('/')}/ghost/api/admin/posts/"

    try:
        response = requests.post(api_url, json=post_data, headers=headers)
        response.raise_for_status()
        result = response.json()
        return {
            "success": True,
            "post_id": result["posts"][0]["id"],
            "slug": result["posts"][0]["slug"],
            "url": f"{site_config.ghost_api_url}/{result['posts'][0]['slug']}/",
        }
    except requests.RequestException as e:
        return {"error": f"Ghost API error: {e}"}


def output_node(state: BlogState, site_config: SiteConfig) -> Dict[str, Any]:
    """
    Format and save the blog post based on output format.

    Args:
        state: Current blog state
        site_config: Site-specific configuration

    Returns:
        Result with file path or API response
    """

    if site_config.output_format == OutputFormat.MDX:
        # Generate and save MDX file
        mdx_content = generate_mdx_output(state, site_config)
        filepath = save_mdx_file(mdx_content, state["slug"], site_config.output_dir)

        return {
            "output_type": "mdx",
            "filepath": filepath,
            "slug": state["slug"],
            "success": True,
        }

    elif site_config.output_format == OutputFormat.GHOST:
        # Publish to Ghost CMS
        result = publish_to_ghost(state, site_config)
        result["output_type"] = "ghost"
        return result

    else:
        # Generic markdown
        content = state.get("full_content", "")
        os.makedirs(site_config.output_dir, exist_ok=True)
        filepath = os.path.join(site_config.output_dir, f"{state['slug']}.md")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

        return {
            "output_type": "markdown",
            "filepath": filepath,
            "slug": state["slug"],
            "success": True,
        }
