from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class FundamentalScoreRecord(Base):
    __tablename__ = "fundamental_scores"

    asset: Mapped[str] = mapped_column(String(30), index=True) # USD, XAUUSD, BTCUSD
    score: Mapped[int] = mapped_column(Integer) # -100 to +100
    bias: Mapped[str] = mapped_column(String(30)) # STRONG BULLISH, BULLISH, NEUTRAL, BEARISH, STRONG BEARISH
    confidence: Mapped[int] = mapped_column(Integer, default=75) # 0 - 100
    
    primary_drivers: Mapped[list] = mapped_column(JSON, default=list)
    bearish_factors: Mapped[list] = mapped_column(JSON, default=list)
    bullish_factors: Mapped[list] = mapped_column(JSON, default=list)
    key_risks: Mapped[list] = mapped_column(JSON, default=list)
    what_to_watch: Mapped[list] = mapped_column(JSON, default=list)
    
    summary: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
