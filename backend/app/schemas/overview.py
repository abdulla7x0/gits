from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class BiasCard(BaseModel):
    asset: str # "USD", "XAUUSD", "BTCUSD"
    bias: str # "BULLISH", "BEARISH", "NEUTRAL", "STRONG BULLISH", "STRONG BEARISH"
    score: int # -100 to +100
    confidence: int # 0 to 100
    reasons: List[str]
    dxy_trend: Optional[str] = None
    fed_expectations: Optional[str] = None
    treasury_yield_direction: Optional[str] = None
    risk_sentiment: Optional[str] = None

class SystemStatus(BaseModel):
    status: str = "ONLINE"
    is_demo: bool = True
    last_updated: datetime
    timezone_name: str = "IST / UTC"
    data_sources: Dict[str, str] = {
        "news": "ONLINE",
        "economic_calendar": "ONLINE",
        "market_data": "ONLINE",
        "ai_analysis": "ONLINE",
        "trump_feed": "ONLINE"
    }

class MacroTransmissionNode(BaseModel):
    trigger: str
    transmission_steps: List[str]
    usd_effect: str
    xauusd_effect: str
    btcusd_effect: str
    eurusd_effect: Optional[str] = None
    status: str # "Active", "Probabilistic"

class OverviewResponse(BaseModel):
    system_status: SystemStatus
    bias_cards: Dict[str, BiasCard]
    macro_transmission: List[MacroTransmissionNode]
    next_high_impact_event: Optional[Dict[str, Any]] = None
    recent_trump_post: Optional[Dict[str, Any]] = None
    top_alerts: List[Dict[str, Any]] = []
