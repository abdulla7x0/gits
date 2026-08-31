from datetime import datetime, timezone
from sqlalchemy import String, Text, Integer, Float, DateTime, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class EconomicEvent(Base):
    __tablename__ = "economic_events"

    title: Mapped[str] = mapped_column(String(255), index=True)
    currency: Mapped[str] = mapped_column(String(10), default="USD", index=True)
    country: Mapped[str] = mapped_column(String(50), default="United States")
    category: Mapped[str] = mapped_column(String(50), default="Inflation")
    impact_level: Mapped[str] = mapped_column(String(20), default="HIGH")  # LOW, MEDIUM, HIGH, VERY HIGH
    
    scheduled_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    period: Mapped[str] = mapped_column(String(50), nullable=True)  # e.g., "Aug", "Q2", "Weekly"
    
    forecast: Mapped[str] = mapped_column(String(50), nullable=True)
    previous: Mapped[str] = mapped_column(String(50), nullable=True)
    actual: Mapped[str] = mapped_column(String(50), nullable=True)
    
    surprise: Mapped[str] = mapped_column(String(50), nullable=True)
    surprise_classification: Mapped[str] = mapped_column(String(50), nullable=True)  # "Much better than expected", "In line", "Worse than expected", etc.
    
    usd_effect: Mapped[str] = mapped_column(String(30), default="Neutral")
    xauusd_effect: Mapped[str] = mapped_column(String(30), default="Neutral")
    btcusd_effect: Mapped[str] = mapped_column(String(30), default="Neutral")
    
    ai_interpretation: Mapped[str] = mapped_column(Text, nullable=True)
    expected_effect: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Pre / Post event market validation
    pre_market: Mapped[dict] = mapped_column(JSON, default=dict)   # {"dxy": 104.20, "us10y": 4.28, "gold": 2510.0, "btc": 63400.0}
    post_market: Mapped[dict] = mapped_column(JSON, default=dict)  # {"dxy": 104.55, "us10y": 4.34, "gold": 2492.0, "btc": 62850.0}
    market_change: Mapped[dict] = mapped_column(JSON, default=dict)
    
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    confidence: Mapped[int] = mapped_column(Integer, default=80)
