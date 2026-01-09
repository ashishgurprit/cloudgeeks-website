# Blog Generator Pipeline

Automated AI-powered blog post generation for:
- **ashganda.com** - Personal brand, tech thought leadership
- **insights.cloudgeeks.com.au** - CloudGeeks business solutions

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONTHLY TOPICS INPUT                         │
│                 content/topics-{site}.json                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 SCHEDULER (GitHub Actions)                      │
│  • Ashganda: Daily at 6 AM AEDT                                │
│  • CloudGeeks: Tue/Thu at 7 AM AEDT                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              BLOG GENERATOR PIPELINE                            │
│                                                                 │
│  1. Planner    → Content outline with Claude                   │
│  2. Research   → Web research with Tavily                      │
│  3. Writer     → Full content generation with Claude           │
│  4. SEO        → Metadata optimization                         │
│  5. Images     → AI image generation with Gemini/Imagen        │
│  6. Output     → MDX file or Ghost API publish                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       OUTPUT                                    │
│  Ashganda: src/content/posts/{slug}.mdx                        │
│  CloudGeeks: Ghost CMS via Admin API                           │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Install Dependencies

```bash
cd scripts
pip install -r requirements.txt
```

### 2. Set Environment Variables

```bash
cp .env.example .env
# Edit .env with your API keys
```

Required keys:
- `ANTHROPIC_API_KEY` - Claude AI
- `TAVILY_API_KEY` - Web research
- `GOOGLE_PROJECT_ID` - Image generation
- `GHOST_ADMIN_KEY` - (CloudGeeks only)

### 3. Generate a Blog Post

```bash
# Single topic
python scripts/generate.py --topic "Your topic here" --site ashganda

# From queue
python scripts/generate.py --queue --site ashganda

# With options
python scripts/generate.py \
  --topic "Cloud Migration Guide" \
  --site cloudgeeks \
  --words 2500 \
  --images 4 \
  --keyword "cloud migration"
```

## Topics Queue

Edit `content/topics-{site}.json` to schedule posts for the month:

```json
{
  "schedule": [
    {
      "id": "2025-01-15",
      "scheduled_date": "2025-01-15",
      "topic": "Your blog topic here",
      "keyword": "seo keyword",
      "tags": ["AI", "Technology"],
      "status": "pending"
    }
  ]
}
```

Status values:
- `pending` - Not yet generated
- `completed` - Successfully generated
- `failed` - Generation failed

## GitHub Actions

### Ashganda (Daily)
- File: `.github/workflows/generate-blog.yml`
- Schedule: 6 AM AEDT daily
- Manual trigger: Yes (with topic input)

### CloudGeeks (Tue/Thu)
- File: `.github/workflows/generate-cloudgeeks.yml`
- Schedule: 7 AM AEDT on Tue/Thu
- Manual trigger: Yes (with topic input)

### Required Secrets

Add these in GitHub repo settings → Secrets:

```
ANTHROPIC_API_KEY
TAVILY_API_KEY
GOOGLE_PROJECT_ID
GOOGLE_LOCATION
GHOST_API_URL        (CloudGeeks only)
GHOST_ADMIN_KEY      (CloudGeeks only)
```

## Content Strategy

### Ash Ganda (Personal Brand)
**Focus:** Broad tech/AI thought leadership

Content Pillars:
1. AI & Machine Learning Developments
2. Emerging Technology Trends
3. Data Analytics & Insights
4. Tech Industry Analysis
5. Future of Technology

### CloudGeeks Insights (Business)
**Focus:** Service offerings & solutions for SMBs

Content Pillars:
1. AI-Powered Business Solutions
2. Digital Transformation Strategies
3. Cloud Infrastructure & Migration
4. Industry-Specific Solutions
5. SMB Technology Optimization

## File Structure

```
scripts/
├── blog_generator/
│   ├── __init__.py
│   ├── agent.py          # Main pipeline orchestrator
│   ├── config.py         # Site configurations
│   ├── state.py          # State management
│   └── nodes/
│       ├── planner.py    # Content outline
│       ├── research.py   # Tavily web search
│       ├── writer.py     # Claude content generation
│       ├── images.py     # AI image generation
│       ├── seo.py        # SEO metadata
│       └── output.py     # MDX/Ghost output
├── generate.py           # CLI entry point
├── requirements.txt
└── README.md

content/
├── topics-ashganda.json
└── topics-cloudgeeks.json

.github/workflows/
├── generate-blog.yml         # Ashganda automation
└── generate-cloudgeeks.yml   # CloudGeeks automation
```

## Troubleshooting

### API Errors
- Check environment variables are set correctly
- Verify API keys are valid and have sufficient credits
- Check rate limits haven't been exceeded

### Image Generation Fails
- Ensure GOOGLE_PROJECT_ID is correct
- Verify Vertex AI API is enabled in GCP
- Check service account has required permissions

### Ghost Publishing Fails
- Verify GHOST_ADMIN_KEY format: `{id}:{secret}`
- Check Ghost API URL is correct
- Ensure integration has write permissions

## Estimated Costs

Per blog post (approximate):
- Claude API: $1.50 - $3.00
- Tavily API: $0.10 - $0.20
- Imagen API: $0.12 - $0.32
- **Total: ~$1.75 - $3.50 per post**

Monthly (assuming 15 posts):
- **~$25 - $55/month**
