from datetime import datetime, timezone
from sqlalchemy import String, Text, Integer, Boolean, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class MarketAlert(Base):
    __tablename__ = "market_alerts"

    alert_type: Mapped[str] = mapped_column(String(50), index=True) # HIGH_IMPACT_EVENT, TRUMP_STATEMENT, YIELD_SPIKE, DXY_BREAKOUT, AI_BIAS_CHANGE
    title: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(Text)
    severity: Mapped[str] = mapped_column(String(20), default="HIGH") # LOW, MEDIUM, HIGH, CRITICAL
    
    affected_assets: Mapped[list] = mapped_column(JSON, default=list) # ["USD", "XAUUSD", "BTCUSD"]
    payload: Mapped[dict] = mapped_column(JSON, default=dict)
    
    sent_telegram: Mapped[bool] = mapped_column(Boolean, default=False)
    sent_web: Mapped[bool] = mapped_column(Boolean, default=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
