"""
Research Node - Web research using Tavily API
"""

from typing import Dict, Any, List
from tavily import TavilyClient

from ..state import BlogState
from ..config import SiteConfig, APIConfig


def create_search_queries(topic: str, site_name: str) -> List[str]:
    """Generate search queries based on topic and site context"""
    base_queries = [
        f"{topic} latest developments 2025",
        f"{topic} research findings",
        f"{topic} best practices",
    ]

    if "ashganda" in site_name.lower():
        # Personal brand - broader tech focus
        base_queries.extend([
            f"{topic} industry trends",
            f"{topic} future predictions",
        ])
    else:
        # CloudGeeks - business/SMB focus
        base_queries.extend([
            f"{topic} for small business",
            f"{topic} enterprise solutions",
            f"{topic} ROI business case",
        ])

    return base_queries[:4]  # Limit to 4 queries


def research_node(state: BlogState, site_config: SiteConfig, api_config: APIConfig) -> Dict[str, Any]:
    """
    Perform web research using Tavily API.

    Args:
        state: Current blog state
        site_config: Site-specific configuration
        api_config: API keys configuration

    Returns:
        Updated state with research_content and academic_sources
    """
    client = TavilyClient(api_key=api_config.tavily_api_key)

    queries = create_search_queries(state["topic"], site_config.name)

    research_content = []
    academic_sources = []

    for query in queries:
        try:
            response = client.search(
                query=query,
                search_depth="advanced",
                max_results=3,
                include_domains=[
                    "arxiv.org",
                    "nature.com",
                    "sciencedirect.com",
                    "springer.com",
                    "ieee.org",
                    "acm.org",
                    "medium.com",
                    "techcrunch.com",
                    "wired.com",
                    "forbes.com",
                    "hbr.org",
                    "mckinsey.com",
                    "gartner.com",
                ],
            )

            for result in response.get("results", []):
                content = f"Source: {result.get('title', 'Unknown')}\n"
                content += f"URL: {result.get('url', '')}\n"
                content += f"Content: {result.get('content', '')}\n"
                research_content.append(content)

                # Track academic sources
                url = result.get("url", "").lower()
                if any(domain in url for domain in ["arxiv", "nature.com", "sciencedirect", "springer", "ieee", "acm"]):
                    academic_sources.append({
                        "title": result.get("title", ""),
                        "url": result.get("url", ""),
                    })

        except Exception as e:
            research_content.append(f"Search error for '{query}': {str(e)}")

    return {
        "research_content": research_content,
        "academic_sources": [f"{s['title']} - {s['url']}" for s in academic_sources],
    }
