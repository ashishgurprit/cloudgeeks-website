"""
Writer Node - Generate blog content using Claude
"""

import anthropic
from typing import Dict, Any

from ..state import BlogState
from ..config import SiteConfig, APIConfig


INTRO_PROMPT = """Write an engaging introduction for a blog post.

TITLE: {title}
TOPIC: {topic}
SITE: {site_name}
AUTHOR: {author}
TARGET: {word_count} total words (intro should be ~300 words)

OUTLINE:
{plan}

RESEARCH:
{research}

Write a compelling introduction that:
1. Opens with a hook (surprising fact, question, or bold statement)
2. Establishes why this topic matters NOW
3. Briefly previews what the reader will learn
4. Sets the tone for the article

Write in a {tone} tone. Be engaging but substantive.
Do NOT include the title - just the introduction content.
"""


SECTION_PROMPT = """Write the content for this blog section.

BLOG TITLE: {title}
SECTION: {section_title}
KEY POINTS TO COVER:
{key_points}

RESEARCH CONTEXT:
{research}

PREVIOUS SECTIONS (for context, don't repeat):
{previous_sections}

Write ~{section_word_count} words for this section.
- Use H3 subheadings where appropriate
- Include specific examples, data, or case studies
- Write in a {tone} tone
- Make it actionable and valuable
- Do NOT repeat content from previous sections

Start directly with the section content (no need to include the section title, I'll add it).
"""


CONCLUSION_PROMPT = """Write a compelling conclusion for this blog post.

TITLE: {title}
TOPIC: {topic}
FULL CONTENT SO FAR:
{content}

Write a conclusion (~300 words) that:
1. Summarizes the key insights
2. Provides 3-5 actionable takeaways
3. Ends with a forward-looking statement or call-to-action
4. Leaves the reader feeling informed and motivated

Tone: {tone}
"""


def writer_node(state: BlogState, site_config: SiteConfig, api_config: APIConfig) -> Dict[str, Any]:
    """
    Generate full blog content using Claude.

    Args:
        state: Current blog state
        site_config: Site-specific configuration
        api_config: API keys configuration

    Returns:
        Updated state with intro_content, main_sections, conclusion_content, full_content
    """
    client = anthropic.Anthropic(api_key=api_config.anthropic_api_key)

    research_text = "\n\n".join(state.get("research_content", [])[:5])
    sections_outline = state.get("sections_outline", [])

    # Calculate word distribution
    total_words = state["target_word_count"]
    intro_words = 300
    conclusion_words = 300
    num_sections = max(len(sections_outline) - 2, 3)  # Exclude intro/conclusion
    section_words = (total_words - intro_words - conclusion_words) // num_sections

    # Generate introduction
    intro_prompt = INTRO_PROMPT.format(
        title=state["title"],
        topic=state["topic"],
        site_name=site_config.name,
        author=site_config.author,
        word_count=total_words,
        plan=state["plan"],
        research=research_text,
        tone=site_config.tone.value,
    )

    intro_response = client.messages.create(
        model=api_config.claude_model,
        max_tokens=1500,
        temperature=0.4,
        messages=[{"role": "user", "content": intro_prompt}],
    )
    intro_content = intro_response.content[0].text

    # Generate main sections
    main_sections = []
    previous_content = intro_content

    for i, section in enumerate(sections_outline):
        if section["title"].lower() in ["introduction", "conclusion"]:
            continue

        key_points = "\n".join([f"- {p}" for p in section.get("key_points", [])])

        section_prompt = SECTION_PROMPT.format(
            title=state["title"],
            section_title=section["title"],
            key_points=key_points or "Cover this topic thoroughly",
            research=research_text,
            previous_sections=previous_content[-2000:],  # Last 2000 chars for context
            section_word_count=section_words,
            tone=site_config.tone.value,
        )

        section_response = client.messages.create(
            model=api_config.claude_model,
            max_tokens=2000,
            temperature=0.4,
            messages=[{"role": "user", "content": section_prompt}],
        )

        section_content = section_response.content[0].text
        main_sections.append({
            "title": section["title"],
            "content": section_content,
        })
        previous_content += f"\n\n## {section['title']}\n\n{section_content}"

    # Generate conclusion
    conclusion_prompt = CONCLUSION_PROMPT.format(
        title=state["title"],
        topic=state["topic"],
        content=previous_content[-4000:],
        tone=site_config.tone.value,
    )

    conclusion_response = client.messages.create(
        model=api_config.claude_model,
        max_tokens=1500,
        temperature=0.4,
        messages=[{"role": "user", "content": conclusion_prompt}],
    )
    conclusion_content = conclusion_response.content[0].text

    # Combine full content
    full_content = f"# {state['title']}\n\n"
    full_content += intro_content + "\n\n"
    for section in main_sections:
        full_content += f"## {section['title']}\n\n{section['content']}\n\n"
    full_content += "## Conclusion\n\n" + conclusion_content

    # Calculate word count
    word_count = len(full_content.split())
    reading_time = f"{max(1, word_count // 200)} min read"

    return {
        "intro_content": intro_content,
        "main_sections": [f"## {s['title']}\n\n{s['content']}" for s in main_sections],
        "conclusion_content": conclusion_content,
        "full_content": full_content,
        "word_count": word_count,
        "reading_time": reading_time,
    }
