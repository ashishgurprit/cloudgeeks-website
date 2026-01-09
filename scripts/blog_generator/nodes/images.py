"""
Images Node - AI image generation using Google Gemini/Imagen
"""

import os
import anthropic
from typing import Dict, Any, List, Optional
from datetime import datetime

from ..state import BlogState, ImagePrompt, GeneratedImage
from ..config import SiteConfig, APIConfig


IMAGE_PROMPTS_TEMPLATE = """Create {count} image prompts for this blog post.

TITLE: {title}
TOPIC: {topic}

CONTENT SUMMARY:
{content_summary}

For each image, provide:
1. A detailed prompt for AI image generation
2. Alt text for accessibility/SEO
3. Suggested filename
4. Aspect ratio (1:1 for social, 16:9 for headers, 9:16 for Pinterest)

Requirements:
- Style: Modern, clean, minimalistic illustrations
- Colors: Tech-focused palette (violet/cyan accents, dark backgrounds)
- No text in images
- Professional, not cartoonish
- Suitable for a {site_name} blog

Format each as:
IMAGE 1:
Prompt: [detailed generation prompt]
Alt: [accessibility alt text]
Filename: [slug-based-filename]
Aspect: [1:1 or 16:9 or 9:16]

IMAGE 2:
...
"""


def generate_image_prompts(
    state: BlogState,
    site_config: SiteConfig,
    api_config: APIConfig,
    count: int = 3
) -> List[ImagePrompt]:
    """Generate image prompts using Claude"""
    client = anthropic.Anthropic(api_key=api_config.anthropic_api_key)

    # Summarize content for image context
    content = state.get("full_content", state.get("plan", state["topic"]))
    content_summary = content[:2000]  # First 2000 chars

    prompt = IMAGE_PROMPTS_TEMPLATE.format(
        count=count,
        title=state.get("title", state["topic"]),
        topic=state["topic"],
        content_summary=content_summary,
        site_name=site_config.name,
    )

    response = client.messages.create(
        model=api_config.claude_model,
        max_tokens=2000,
        temperature=0.5,
        messages=[{"role": "user", "content": prompt}],
    )

    # Parse response into ImagePrompts
    prompts = []
    current_prompt = {}

    for line in response.content[0].text.split("\n"):
        line = line.strip()
        if line.startswith("IMAGE"):
            if current_prompt.get("prompt"):
                prompts.append(ImagePrompt(
                    prompt=current_prompt.get("prompt", ""),
                    alt_text=current_prompt.get("alt", ""),
                    filename=current_prompt.get("filename", f"image-{len(prompts)+1}"),
                    aspect_ratio=current_prompt.get("aspect", "16:9"),
                ))
            current_prompt = {}
        elif line.startswith("Prompt:"):
            current_prompt["prompt"] = line.replace("Prompt:", "").strip()
        elif line.startswith("Alt:"):
            current_prompt["alt"] = line.replace("Alt:", "").strip()
        elif line.startswith("Filename:"):
            current_prompt["filename"] = line.replace("Filename:", "").strip()
        elif line.startswith("Aspect:"):
            current_prompt["aspect"] = line.replace("Aspect:", "").strip()

    # Don't forget the last one
    if current_prompt.get("prompt"):
        prompts.append(ImagePrompt(
            prompt=current_prompt.get("prompt", ""),
            alt_text=current_prompt.get("alt", ""),
            filename=current_prompt.get("filename", f"image-{len(prompts)+1}"),
            aspect_ratio=current_prompt.get("aspect", "16:9"),
        ))

    return prompts[:count]


def generate_images_with_gemini(
    prompts: List[ImagePrompt],
    output_dir: str,
    api_config: APIConfig,
    slug: str,
) -> List[GeneratedImage]:
    """Generate images using Google Gemini API"""
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("Warning: google-genai not installed. Skipping image generation.")
        return []

    generated = []

    try:
        client = genai.Client(
            vertexai=True,
            project=api_config.google_project_id,
            location="global",  # Required for Gemini image generation
        )
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")
        return []

    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    for i, prompt_data in enumerate(prompts):
        try:
            # Generate image
            response = client.models.generate_images(
                model="imagen-3.0-generate-002",
                prompt=prompt_data["prompt"],
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio=prompt_data["aspect_ratio"].replace(":", ":"),
                    safety_filter_level="BLOCK_MEDIUM_AND_ABOVE",
                ),
            )

            if response.generated_images:
                # Save image
                filename = f"{slug}-{i+1}-{timestamp}.jpg"
                filepath = os.path.join(output_dir, filename)

                image_bytes = response.generated_images[0].image.image_bytes
                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                generated.append(GeneratedImage(
                    path=filepath,
                    alt_text=prompt_data["alt_text"],
                    aspect_ratio=prompt_data["aspect_ratio"],
                    url=f"/images/{filename}",
                ))
                print(f"Generated image: {filename}")

        except Exception as e:
            print(f"Error generating image {i+1}: {e}")
            continue

    return generated


def images_node(state: BlogState, site_config: SiteConfig, api_config: APIConfig) -> Dict[str, Any]:
    """
    Generate AI images for the blog post.

    Args:
        state: Current blog state
        site_config: Site-specific configuration
        api_config: API keys configuration

    Returns:
        Updated state with image_prompts, generated_images, featured_image
    """
    # Skip if no images requested
    if state["target_image_count"] <= 0:
        return {
            "image_prompts": [],
            "generated_images": [],
            "featured_image": None,
        }

    # Generate prompts
    image_prompts = generate_image_prompts(
        state, site_config, api_config,
        count=state["target_image_count"]
    )

    # Create slug for filenames
    slug = state.get("slug", "")
    if not slug:
        slug = state.get("title", state["topic"]).lower()
        slug = "".join(c if c.isalnum() or c == "-" else "-" for c in slug)
        slug = "-".join(filter(None, slug.split("-")))[:50]

    # Generate images
    generated_images = generate_images_with_gemini(
        prompts=image_prompts,
        output_dir=site_config.images_dir,
        api_config=api_config,
        slug=slug,
    )

    # Set featured image
    featured_image = None
    if generated_images:
        featured_image = generated_images[0].get("url") or generated_images[0].get("path")

    return {
        "image_prompts": image_prompts,
        "generated_images": generated_images,
        "featured_image": featured_image,
        "slug": slug,
    }
