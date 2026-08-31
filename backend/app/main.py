from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.core.database import engine
from app.models.base import Base
from app.api.v1.api_router import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing XAU / BTC Fundamental Intelligence Backend...")
    # Initialize database tables
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables verified and initialized.")
    except Exception as e:
        logger.warning(f"Database initialization warning (running in demo memory mode): {e}")
    yield
    logger.info("Shutting down Fundamental Intelligence Backend...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "name": settings.PROJECT_NAME,
        "version": "1.0.0",
        "status": "ONLINE",
        "demo_mode": settings.DEMO_MODE,
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }

@app.get("/health")
async def health():
    return {
        "status": "HEALTHY",
        "environment": settings.ENVIRONMENT,
        "demo_mode": settings.DEMO_MODE
    }
