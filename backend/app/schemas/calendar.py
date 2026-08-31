from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class CalendarEventSchema(BaseModel):
    id: int
    title: str
    currency: str
    country: str
    category: str
    impact_level: str  # LOW, MEDIUM, HIGH, VERY HIGH
    scheduled_time: datetime
    period: Optional[str] = None
    
    forecast: Optional[str] = None
    previous: Optional[str] = None
    actual: Optional[str] = None
    
    surprise: Optional[str] = None
    surprise_classification: Optional[str] = None
    
    usd_effect: str
    xauusd_effect: str
    btcusd_effect: str
    
    ai_interpretation: Optional[str] = None
    expected_effect: Optional[str] = None
    
    pre_market: Dict[str, Any] = {}
    post_market: Dict[str, Any] = {}
    market_change: Dict[str, Any] = {}
    
    is_completed: bool
    confidence: int

class CalendarListResponse(BaseModel):
    total: int
    upcoming_count: int
    completed_count: int
    events: List[CalendarEventSchema]
