"""
Planner Node - Creates detailed blog outline and structure
"""

import anthropic
from typing import Dict, Any

from ..state import BlogState
from ..config import SiteConfig, APIConfig


PLANNER_PROMPT = """You are an expert content strategist creating a blog post outline.

SITE CONTEXT:
- Site: {site_name} ({domain})
- Author: {author}
- Content Focus: {content_focus}
- Tone: {tone}
- Target Audience: {target_audience}

TOPIC: {topic}
PRIMARY KEYWORD: {primary_keyword}
TARGET WORD COUNT: {word_count} words

Create a detailed outline with:
1. A compelling, SEO-optimized title (include the primary keyword naturally)
2. An engaging hook for the introduction
3. 4-6 main sections with:
   - Clear section headings (H2)
   - 2-3 key points per section
   - Suggested subsections (H3) if needed
4. A conclusion with action items/takeaways

Format your response as:

TITLE: [Your title here]

SECTIONS:
1. Introduction
   - Hook: [Engaging opening]
   - Context: [Why this matters]
   - Preview: [What the reader will learn]

2. [Section Title]
   - Key Point 1
   - Key Point 2
   - Key Point 3

... (continue for all sections)

N. Conclusion
   - Summary
   - Key Takeaways
   - Call to Action

Make the outline comprehensive but focused. Each section should contribute uniquely to the topic.
"""


def get_content_focus(site_name: str) -> str:
    """Get content focus description based on site"""
    if "ashganda" in site_name.lower():
        return "Broad tech/AI thought leadership, exploring cutting-edge technology developments and industry trends from a personal perspective"
    else:
        return "CloudGeeks business solutions: AI-powered automation, digital transformation strategies, and cloud infrastructure for SMBs"


def get_target_audience(site_name: str) -> str:
    """Get target audience based on site"""
    if "ashganda" in site_name.lower():
        return "Tech enthusiasts, professionals interested in AI/ML, and business leaders exploring technology trends"
    else:
        return "Business owners, IT decision-makers, and professionals seeking technology solutions for their organizations"


def plan_node(state: BlogState, site_config: SiteConfig, api_config: APIConfig) -> Dict[str, Any]:
    """
    Generate a detailed blog post outline based on the topic.

    Args:
        state: Current blog state
        site_config: Site-specific configuration
        api_config: API keys configuration

    Returns:
        Updated state with plan and sections_outline
    """
    client = anthropic.Anthropic(api_key=api_config.anthropic_api_key)

    prompt = PLANNER_PROMPT.format(
        site_name=site_config.name,
        domain=site_config.domain,
        author=site_config.author,
        content_focus=get_content_focus(site_config.name),
        tone=site_config.tone.value,
        target_audience=get_target_audience(site_config.name),
        topic=state["topic"],
        primary_keyword=state.get("primary_keyword") or state["topic"],
        word_count=state["target_word_count"],
    )

    response = client.messages.create(
        model=api_config.claude_model,
        max_tokens=4000,
        temperature=0.3,
        messages=[{"role": "user", "content": prompt}],
    )

    plan_text = response.content[0].text

    # Extract title from plan
    title = ""
    for line in plan_text.split("\n"):
        if line.strip().startswith("TITLE:"):
            title = line.replace("TITLE:", "").strip()
            break

    # Parse sections (simplified parsing)
    sections = []
    current_section = None
    for line in plan_text.split("\n"):
        line = line.strip()
        if line and line[0].isdigit() and "." in line:
            if current_section:
                sections.append(current_section)
            section_title = line.split(".", 1)[1].strip() if "." in line else line
            current_section = {
                "title": section_title,
                "key_points": [],
            }
        elif current_section and line.startswith("-"):
            current_section["key_points"].append(line[1:].strip())

    if current_section:
        sections.append(current_section)

    return {
        "plan": plan_text,
        "title": title,
        "sections_outline": sections,
    }
