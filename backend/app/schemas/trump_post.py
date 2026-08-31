from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class TrumpPostSchema(BaseModel):
    id: int
    post_identifier: str
    author_name: str
    author_handle: str
    platform: str
    source_url: Optional[str] = None
    
    original_text: str
    published_at: datetime
    
    topic: str
    market_relevance: str
    risk_level: str
    
    ai_interpretation: str
    usd_impact: str
    xauusd_impact: str
    btcusd_impact: str
    confidence: int
    alert_triggered: bool

class TrumpPostListResponse(BaseModel):
    total: int
    high_impact_count: int
    topics: List[str]
    posts: List[TrumpPostSchema]
