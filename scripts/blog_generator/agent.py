"""
Blog Generator Agent - LangGraph-based pipeline orchestrator
"""

from typing import Dict, Any, Optional, Callable
from datetime import datetime

from .state import BlogState, create_initial_state
from .config import SiteConfig, APIConfig, get_site_config
from .nodes.planner import plan_node
from .nodes.research import research_node
from .nodes.writer import writer_node
from .nodes.images import images_node
from .nodes.seo import seo_node
from .nodes.output import output_node


class BlogGenerator:
    """
    Orchestrates the blog generation pipeline.

    Pipeline stages:
    1. Plan - Create detailed outline
    2. Research - Web research via Tavily
    3. Write - Generate content with Claude
    4. SEO - Optimize metadata
    5. Images - Generate AI images
    6. Output - Save MDX or publish to Ghost
    """

    def __init__(
        self,
        site: str,
        api_config: Optional[APIConfig] = None,
        progress_callback: Optional[Callable[[str, int], None]] = None,
    ):
        """
        Initialize the blog generator.

        Args:
            site: Site identifier ("ashganda" or "cloudgeeks")
            api_config: API configuration (loads from env if not provided)
            progress_callback: Optional callback for progress updates (message, percentage)
        """
        self.site_config = get_site_config(site)
        self.api_config = api_config or APIConfig.from_env()
        self.progress_callback = progress_callback

    def _report_progress(self, message: str, percentage: int):
        """Report progress to callback if available"""
        print(f"[{percentage}%] {message}")
        if self.progress_callback:
            self.progress_callback(message, percentage)

    def generate(
        self,
        topic: str,
        primary_keyword: Optional[str] = None,
        word_count: Optional[int] = None,
        image_count: Optional[int] = None,
        tags: Optional[list] = None,
    ) -> Dict[str, Any]:
        """
        Generate a complete blog post.

        Args:
            topic: The blog post topic
            primary_keyword: SEO keyword (defaults to topic)
            word_count: Target word count (uses site default if not specified)
            image_count: Number of images (uses site default if not specified)
            tags: List of tags (uses site default if not specified)

        Returns:
            Dict with generation results including file path or Ghost API response
        """
        start_time = datetime.now()

        # Initialize state
        state = create_initial_state(
            topic=topic,
            primary_keyword=primary_keyword,
            target_word_count=word_count or self.site_config.default_word_count,
            target_image_count=image_count if image_count is not None else self.site_config.default_image_count,
            tags=tags or list(self.site_config.default_tags),
        )

        try:
            # Stage 1: Planning
            self._report_progress("Creating content outline...", 10)
            plan_result = plan_node(state, self.site_config, self.api_config)
            state.update(plan_result)

            # Stage 2: Research
            self._report_progress("Researching topic...", 25)
            research_result = research_node(state, self.site_config, self.api_config)
            state.update(research_result)

            # Stage 3: Writing
            self._report_progress("Writing content...", 40)
            writer_result = writer_node(state, self.site_config, self.api_config)
            state.update(writer_result)

            # Stage 4: SEO
            self._report_progress("Optimizing SEO metadata...", 60)
            seo_result = seo_node(state, self.site_config, self.api_config)
            state.update(seo_result)

            # Stage 5: Images
            if state["target_image_count"] > 0:
                self._report_progress(f"Generating {state['target_image_count']} images...", 75)
                images_result = images_node(state, self.site_config, self.api_config)
                state.update(images_result)
            else:
                self._report_progress("Skipping image generation...", 75)

            # Stage 6: Output
            self._report_progress("Saving output...", 90)
            output_result = output_node(state, self.site_config)

            # Calculate duration
            duration = (datetime.now() - start_time).total_seconds()
            self._report_progress(f"Complete! Generated in {duration:.1f}s", 100)

            return {
                "success": True,
                "title": state["title"],
                "slug": state["slug"],
                "word_count": state["word_count"],
                "reading_time": state["reading_time"],
                "images_generated": len(state.get("generated_images", [])),
                "output": output_result,
                "duration_seconds": duration,
            }

        except Exception as e:
            self._report_progress(f"Error: {str(e)}", -1)
            return {
                "success": False,
                "error": str(e),
                "topic": topic,
            }


def generate_blog(
    topic: str,
    site: str = "ashganda",
    primary_keyword: Optional[str] = None,
    word_count: Optional[int] = None,
    image_count: Optional[int] = None,
    tags: Optional[list] = None,
) -> Dict[str, Any]:
    """
    Convenience function to generate a blog post.

    Args:
        topic: The blog post topic
        site: Site identifier ("ashganda" or "cloudgeeks")
        primary_keyword: SEO keyword
        word_count: Target word count
        image_count: Number of images
        tags: List of tags

    Returns:
        Generation result dict
    """
    generator = BlogGenerator(site=site)
    return generator.generate(
        topic=topic,
        primary_keyword=primary_keyword,
        word_count=word_count,
        image_count=image_count,
        tags=tags,
    )
