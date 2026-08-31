from fastapi import APIRouter
from app.api.v1.endpoints import overview, news, calendar, trump_posts, market_data, outlook, alerts, reports

api_router = APIRouter()

api_router.include_router(overview.router, prefix="/overview", tags=["Overview"])
api_router.include_router(news.router, prefix="/news", tags=["Live News"])
api_router.include_router(calendar.router, prefix="/calendar", tags=["Economic Calendar"])
api_router.include_router(trump_posts.router, prefix="/trump-posts", tags=["Trump Market Posts"])
api_router.include_router(market_data.router, prefix="/market-data", tags=["Market Data"])
api_router.include_router(outlook.router, prefix="/outlook", tags=["Outlooks"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
