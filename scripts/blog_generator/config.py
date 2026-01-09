"""
Configuration for Blog Generator
"""

import os
from dataclasses import dataclass, field
from typing import Optional
from enum import Enum


class OutputFormat(Enum):
    MDX = "mdx"  # For Next.js (ashganda.com)
    GHOST = "ghost"  # For Ghost CMS (insights.cloudgeeks.com.au)
    MARKDOWN = "markdown"  # Generic markdown


class Tone(Enum):
    PROFESSIONAL = "professional"
    CASUAL = "casual"
    TECHNICAL = "technical"
    EDUCATIONAL = "educational"


@dataclass
class SiteConfig:
    """Configuration for a specific site"""
    name: str
    domain: str
    author: str
    output_format: OutputFormat
    output_dir: str
    images_dir: str

    # Ghost-specific settings
    ghost_api_url: Optional[str] = None
    ghost_admin_key: Optional[str] = None

    # Content settings
    default_word_count: int = 1500
    default_image_count: int = 3
    tone: Tone = Tone.PROFESSIONAL
    reading_level: str = "general"

    # SEO settings
    target_country: str = "AU"
    target_language: str = "en"

    # Tags/categories
    default_tags: list = field(default_factory=lambda: ["AI", "Technology"])


@dataclass
class APIConfig:
    """API keys configuration"""
    anthropic_api_key: str
    tavily_api_key: str
    google_project_id: str
    google_location: str = "us-central1"

    # Model settings
    claude_model: str = "claude-sonnet-4-20250514"

    @classmethod
    def from_env(cls) -> "APIConfig":
        """Load API config from environment variables"""
        return cls(
            anthropic_api_key=os.environ.get("ANTHROPIC_API_KEY", ""),
            tavily_api_key=os.environ.get("TAVILY_API_KEY", ""),
            google_project_id=os.environ.get("GOOGLE_PROJECT_ID", ""),
            google_location=os.environ.get("GOOGLE_LOCATION", "us-central1"),
            claude_model=os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-20250514"),
        )


# Site configurations
# =============================================================================
# ASHGANDA.COM - Personal Brand
# =============================================================================
# Content Focus: Broad tech/AI thought leadership, industry trends, innovations
# Voice: Personal perspective, exploring cutting-edge technology
# Topics: AI developments, machine learning trends, data analytics, emerging tech
# =============================================================================
ASHGANDA_CONFIG = SiteConfig(
    name="Ash Ganda",
    domain="ashganda.com",
    author="Ash Ganda",
    output_format=OutputFormat.MDX,
    output_dir="src/content/posts",
    images_dir="public/images",
    default_word_count=1500,
    default_image_count=3,
    tone=Tone.PROFESSIONAL,
    reading_level="general",
    default_tags=["AI", "Technology", "Machine Learning", "Innovation"],
)

# Content pillars for Ash Ganda personal brand
ASHGANDA_CONTENT_PILLARS = [
    "AI & Machine Learning Developments",
    "Emerging Technology Trends",
    "Data Analytics & Insights",
    "Tech Industry Analysis",
    "Future of Technology",
]


# =============================================================================
# INSIGHTS.CLOUDGEEKS.COM.AU - Business Blog
# =============================================================================
# Content Focus: CloudGeeks service offerings, solutions, case studies
# Voice: Business-focused, demonstrating expertise and capabilities
# Topics: AI solutions, digital transformation, cloud infrastructure, SMB tech
# =============================================================================
CLOUDGEEKS_CONFIG = SiteConfig(
    name="CloudGeeks Insights",
    domain="insights.cloudgeeks.com.au",
    author="CloudGeeks Team",
    output_format=OutputFormat.GHOST,
    output_dir="output/ghost",
    images_dir="output/images",
    ghost_api_url=os.environ.get("GHOST_API_URL", ""),
    ghost_admin_key=os.environ.get("GHOST_ADMIN_KEY", ""),
    default_word_count=2000,
    default_image_count=4,
    tone=Tone.PROFESSIONAL,
    reading_level="business",
    default_tags=["AI Solutions", "Digital Transformation", "Cloud Infrastructure"],
)

# Content pillars aligned with CloudGeeks service offerings
CLOUDGEEKS_CONTENT_PILLARS = [
    # AI & Automation (matches Expertise pillar 1)
    "AI-Powered Business Solutions",
    "Intelligent Automation for SMBs",
    "Machine Learning Applications",
    # Digital Transformation (matches Expertise pillar 2)
    "Digital Transformation Strategies",
    "Business Process Modernization",
    "Cloud Migration & Adoption",
    # Infrastructure (matches Expertise pillar 3)
    "Scalable Cloud Infrastructure",
    "Azure & AWS Solutions",
    "IT Infrastructure Optimization",
    # Industry-specific (matches Industries section)
    "Healthcare Tech Solutions",
    "Professional Services Technology",
    "Manufacturing & Supply Chain AI",
    "Education Technology",
]


def get_site_config(site: str) -> SiteConfig:
    """Get configuration for a specific site"""
    configs = {
        "ashganda": ASHGANDA_CONFIG,
        "cloudgeeks": CLOUDGEEKS_CONFIG,
    }
    if site not in configs:
        raise ValueError(f"Unknown site: {site}. Available: {list(configs.keys())}")
    return configs[site]
