from datetime import datetime, timezone
from sqlalchemy import String, Text, Integer, Float, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class NewsArticle(Base):
    __tablename__ = "news_articles"

    headline: Mapped[str] = mapped_column(String(500), index=True)
    summary: Mapped[str] = mapped_column(Text)
    full_content: Mapped[str] = mapped_column(Text, nullable=True)
    source: Mapped[str] = mapped_column(String(100), index=True)
    source_url: Mapped[str] = mapped_column(String(500), nullable=True)
    source_tier: Mapped[str] = mapped_column(String(20), default="TIER 2")  # TIER 1, TIER 2, TIER 3, TIER 4
    category: Mapped[str] = mapped_column(String(50), index=True)  # Federal Reserve, Inflation, Employment, Treasury, Geopolitics, etc.
    impact_level: Mapped[str] = mapped_column(String(20), default="MEDIUM")  # LOW, MEDIUM, HIGH, VERY HIGH
    
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    
    # AI Interpretation & Transmission Mechanism
    ai_summary: Mapped[str] = mapped_column(Text, nullable=True)
    usd_impact: Mapped[str] = mapped_column(String(30), default="Neutral")  # Bullish, Bearish, Neutral, Potentially Supportive, etc.
    xauusd_impact: Mapped[str] = mapped_column(String(30), default="Neutral")
    btcusd_impact: Mapped[str] = mapped_column(String(30), default="Neutral")
    ai_why: Mapped[str] = mapped_column(Text, nullable=True)
    confidence: Mapped[int] = mapped_column(Integer, default=70)  # 0 - 100
    
    # Expected vs Actual (if relevant)
    actual: Mapped[str] = mapped_column(String(50), nullable=True)
    forecast: Mapped[str] = mapped_column(String(50), nullable=True)
    previous: Mapped[str] = mapped_column(String(50), nullable=True)
    surprise: Mapped[str] = mapped_column(String(50), nullable=True)
    
    # Market Reaction Snapshot
    market_reaction: Mapped[dict] = mapped_column(JSON, default=dict)  # { "dxy": "+0.18%", "us10y": "+3.4 bps", "gold": "-$12.50", "btc": "-$240", "nasdaq": "-0.45%" }
    
    # Deduplication
    cluster_id: Mapped[str] = mapped_column(String(100), nullable=True, index=True)
    sources_count: Mapped[int] = mapped_column(Integer, default=1)
    related_sources: Mapped[list] = mapped_column(JSON, default=list)
