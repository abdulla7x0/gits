from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class MarketSnapshot(Base):
    __tablename__ = "market_snapshots"

    symbol: Mapped[str] = mapped_column(String(30), unique=True, index=True) # DXY, US10Y, US02Y, XAUUSD, BTCUSD, NQ, SPX, WTI
    name: Mapped[str] = mapped_column(String(100))
    asset_class: Mapped[str] = mapped_column(String(50)) # CURRENCY, FIXED_INCOME, COMMODITY, CRYPTO, EQUITIES
    
    price: Mapped[float] = mapped_column(Float)
    change: Mapped[float] = mapped_column(Float, default=0.0)
    change_percent: Mapped[float] = mapped_column(Float, default=0.0)
    intraday_trend: Mapped[str] = mapped_column(String(30), default="BULLISH") # BULLISH, BEARISH, SIDEWAYS
    
    previous_close: Mapped[float] = mapped_column(Float, default=0.0)
    day_high: Mapped[float] = mapped_column(Float, default=0.0)
    day_low: Mapped[float] = mapped_column(Float, default=0.0)
    
    sparkline: Mapped[list] = mapped_column(JSON, default=list) # Array of recent intraday price points
    last_updated: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
