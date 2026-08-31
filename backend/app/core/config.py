import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "XAU / BTC Fundamental Intelligence"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "supersecretdevelopmentkey_fundamental_intelligence_xau_btc_2026"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    DEMO_MODE: bool = False

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./fundamental_intel.db"

    # CORS Origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    # Optional Live Data API Keys (Prepared for Phase 2+)
    OPENAI_API_KEY: str = ""
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_CHAT_ID: str = ""
    FRED_API_KEY: str = ""
    FINANCIAL_MODELING_PREP_API_KEY: str = ""
    ALPHA_VANTAGE_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
