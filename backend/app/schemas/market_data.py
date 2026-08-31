from datetime import datetime
from typing import List
from pydantic import BaseModel

class MarketTickerSchema(BaseModel):
    id: int
    symbol: str
    name: str
    asset_class: str
    price: float
    change: float
    change_percent: float
    intraday_trend: str
    previous_close: float
    day_high: float
    day_low: float
    sparkline: List[float] = []
    last_updated: datetime

class MarketDataListResponse(BaseModel):
    total: int
    tickers: List[MarketTickerSchema]
