"""
Blog State - TypedDict for LangGraph state management
"""

from typing import TypedDict, List, Optional, Dict, Any


class ImagePrompt(TypedDict):
    prompt: str
    alt_text: str
    filename: str
    aspect_ratio: str  # "1:1", "16:9", "9:16"


class GeneratedImage(TypedDict):
    path: str
    alt_text: str
    aspect_ratio: str
    url: Optional[str]  # For Ghost/external hosting


class BlogState(TypedDict):
    """State object passed through the LangGraph pipeline"""

    # Input
    topic: str
    primary_keyword: Optional[str]
    target_word_count: int
    target_image_count: int
    tags: List[str]

    # Planning
    plan: str
    sections_outline: List[Dict[str, Any]]

    # Research
    research_content: List[str]
    academic_sources: List[str]

    # Content
    title: str
    intro_content: str
    main_sections: List[str]
    conclusion_content: str
    full_content: str

    # SEO
    meta_description: str
    excerpt: str
    focus_keyword_short: str
    focus_keyword_long: str

    # Images
    image_prompts: List[ImagePrompt]
    generated_images: List[GeneratedImage]
    featured_image: Optional[str]

    # Output tracking
    slug: str
    reading_time: str
    word_count: int

    # Errors
    errors: List[str]


def create_initial_state(
    topic: str,
    primary_keyword: Optional[str] = None,
    target_word_count: int = 1500,
    target_image_count: int = 3,
    tags: Optional[List[str]] = None,
) -> BlogState:
    """Create initial state for blog generation"""
    return BlogState(
        topic=topic,
        primary_keyword=primary_keyword,
        target_word_count=target_word_count,
        target_image_count=target_image_count,
        tags=tags or [],
        plan="",
        sections_outline=[],
        research_content=[],
        academic_sources=[],
        title="",
        intro_content="",
        main_sections=[],
        conclusion_content="",
        full_content="",
        meta_description="",
        excerpt="",
        focus_keyword_short="",
        focus_keyword_long="",
        image_prompts=[],
        generated_images=[],
        featured_image=None,
        slug="",
        reading_time="",
        word_count=0,
        errors=[],
    )
