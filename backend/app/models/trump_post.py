from datetime import datetime, timezone
from sqlalchemy import String, Text, Integer, DateTime, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class TrumpPost(Base):
    __tablename__ = "trump_posts"

    post_identifier: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    author_name: Mapped[str] = mapped_column(String(100), default="Donald J. Trump")
    author_handle: Mapped[str] = mapped_column(String(100), default="@realDonaldTrump")
    platform: Mapped[str] = mapped_column(String(50), default="Truth Social")  # Truth Social, X, Press Statement
    source_url: Mapped[str] = mapped_column(String(500), nullable=True)
    
    original_text: Mapped[str] = mapped_column(Text)
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    
    # Classification
    topic: Mapped[str] = mapped_column(String(50), index=True)  # TARIFFS, FED, CHINA, BITCOIN, DOLLAR, TAX, ENERGY, GEOPOLITICS, etc.
    market_relevance: Mapped[str] = mapped_column(String(30), default="HIGH")  # VERY HIGH IMPACT, HIGH IMPACT, MEDIUM IMPACT, LOW IMPACT, NO CLEAR MARKET IMPACT
    risk_level: Mapped[str] = mapped_column(String(30), default="Elevated")
    
    # AI Macro Transmission
    ai_interpretation: Mapped[str] = mapped_column(Text)
    usd_impact: Mapped[str] = mapped_column(String(30), default="Mixed")
    xauusd_impact: Mapped[str] = mapped_column(String(30), default="Potentially Supportive")
    btcusd_impact: Mapped[str] = mapped_column(String(30), default="Mixed")
    confidence: Mapped[int] = mapped_column(Integer, default=75)
    
    alert_triggered: Mapped[bool] = mapped_column(Boolean, default=False)
