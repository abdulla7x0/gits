from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.schemas.trump_post import TrumpPostListResponse, TrumpPostSchema
from app.providers.social_provider import SocialMediaProvider

router = APIRouter()
provider = SocialMediaProvider()

@router.get("", response_model=TrumpPostListResponse)
async def get_trump_posts(
    topic: Optional[str] = Query(None, description="Filter by topic (FED, TARIFFS, BITCOIN, ENERGY, etc.)"),
    relevance: Optional[str] = Query(None, description="Filter by impact/relevance: VERY HIGH, HIGH, MEDIUM, LOW"),
    search: Optional[str] = Query(None, description="Search post text or analysis")
):
    """
    Returns live verified Trump statements and classifications with multi-asset transmission analysis.
    """
    posts = await provider.fetch_data()

    if topic and topic.lower() != "all":
        posts = [p for p in posts if topic.lower() in p.get("topic", "").lower()]

    if relevance and relevance.lower() != "all":
        posts = [p for p in posts if relevance.lower() in p.get("market_relevance", "").lower()]

    if search:
        s = search.lower()
        posts = [
            p for p in posts
            if s in p.get("original_text", "").lower()
            or s in p.get("topic", "").lower()
            or s in p.get("ai_interpretation", "").lower()
        ]

    high_impact_count = sum(1 for p in posts if "HIGH" in p.get("market_relevance", "").upper())
    topics = sorted(list(set(p.get("topic", "GENERAL") for p in posts)))

    return TrumpPostListResponse(
        total=len(posts),
        high_impact_count=high_impact_count,
        topics=topics,
        posts=[TrumpPostSchema(**p) for p in posts]
    )

@router.get("/{post_id}", response_model=TrumpPostSchema)
async def get_trump_post_detail(post_id: int):
    posts = await provider.fetch_data()
    post = next((p for p in posts if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Trump post record not found")
    return TrumpPostSchema(**post)
