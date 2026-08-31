from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class NewsItemSchema(BaseModel):
    id: int
    headline: str
    summary: str
    full_content: Optional[str] = None
    source: str
    source_url: Optional[str] = None
    source_tier: str  # TIER 1, TIER 2, TIER 3, TIER 4
    category: str
    impact_level: str  # LOW, MEDIUM, HIGH, VERY HIGH
    published_at: datetime
    
    ai_summary: Optional[str] = None
    usd_impact: str
    xauusd_impact: str
    btcusd_impact: str
    ai_why: Optional[str] = None
    confidence: int
    
    actual: Optional[str] = None
    forecast: Optional[str] = None
    previous: Optional[str] = None
    surprise: Optional[str] = None
    
    market_reaction: Dict[str, Any] = {}
    
    cluster_id: Optional[str] = None
    sources_count: int = 1
    related_sources: List[str] = []

class NewsListResponse(BaseModel):
    total: int
    categories: List[str]
    items: List[NewsItemSchema]
