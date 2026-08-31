from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.schemas.news import NewsListResponse, NewsItemSchema
from app.providers.news_provider import NewsProvider
from app.services.deduplication import NewsDeduplicator

router = APIRouter()
provider = NewsProvider()

@router.get("", response_model=NewsListResponse)
async def get_news(
    category: Optional[str] = Query(None, description="Filter by category"),
    impact: Optional[str] = Query(None, description="Filter by impact level: LOW, MEDIUM, HIGH, VERY HIGH"),
    asset: Optional[str] = Query(None, description="Filter by affected asset: USD, XAUUSD, BTCUSD, EURUSD"),
    tier: Optional[str] = Query(None, description="Filter by source tier: TIER 1, TIER 2, TIER 3, TIER 4"),
    search: Optional[str] = Query(None, description="Search keyword in headline/summary"),
):
    """
    Returns live macro news stream aggregated from the Federal Reserve, MarketWatch, and CoinDesk with AI transmission analysis.
    """
    items = await provider.fetch_data()

    if category and category.lower() != "all":
        items = [i for i in items if i.get("category", "").lower() == category.lower()]

    if impact and impact.lower() != "all":
        items = [i for i in items if i.get("impact_level", "").lower() == impact.lower()]

    if tier and tier.lower() != "all":
        items = [i for i in items if i.get("source_tier", "").lower() == tier.lower()]

    if asset:
        asset_lower = asset.lower()
        if "usd" in asset_lower:
            items = [i for i in items if i.get("usd_impact") != "Neutral" or "usd" in i.get("headline", "").lower() or "dollar" in i.get("headline", "").lower()]
        elif "xau" in asset_lower or "gold" in asset_lower:
            items = [i for i in items if i.get("xauusd_impact") != "Neutral" or "gold" in i.get("headline", "").lower()]
        elif "btc" in asset_lower or "crypto" in asset_lower:
            items = [i for i in items if i.get("btcusd_impact") != "Neutral" or "crypto" in i.get("headline", "").lower() or "btc" in i.get("headline", "").lower() or "bitcoin" in i.get("headline", "").lower()]
        elif "eur" in asset_lower:
            items = [i for i in items if "eur" in i.get("headline", "").lower() or "ecb" in i.get("headline", "").lower() or "euro" in i.get("headline", "").lower()]

    if search:
        s = search.lower()
        items = [
            i for i in items
            if s in i.get("headline", "").lower()
            or s in i.get("summary", "").lower()
            or s in i.get("ai_why", "").lower()
        ]

    # Deduplicate / cluster
    deduped = NewsDeduplicator.cluster_articles(items)
    categories = sorted(list(set(i.get("category", "General") for i in deduped)))

    return NewsListResponse(
        total=len(deduped),
        categories=categories,
        items=[NewsItemSchema(**item) for item in deduped]
    )

@router.get("/{news_id}", response_model=NewsItemSchema)
async def get_news_detail(news_id: int):
    items = await provider.fetch_data()
    item = next((i for i in items if i["id"] == news_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="News item not found")
    return NewsItemSchema(**item)
