from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class FactorItem(BaseModel):
    title: str
    description: str
    impact: str # "BULLISH", "BEARISH", "NEUTRAL"
    strength: int # 1 to 10
    source: Optional[str] = None

class AssetOutlookSchema(BaseModel):
    asset: str
    bias: str # "BULLISH", "BEARISH", "NEUTRAL", etc.
    score: int # -100 to +100
    confidence: int
    executive_summary: str
    
    primary_drivers: List[str]
    bullish_factors: List[FactorItem]
    bearish_factors: List[FactorItem]
    key_events_to_watch: List[str]
    market_reaction_validation: str
    macro_transmission_rule: str
    last_updated: datetime

class OutlookResponse(BaseModel):
    xauusd: AssetOutlookSchema
    btcusd: AssetOutlookSchema
    usd: AssetOutlookSchema
    eurusd: Optional[AssetOutlookSchema] = None
