import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "HEALTHY"

@pytest.mark.asyncio
async def test_overview():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/overview")
    assert response.status_code == 200
    data = response.json()
    assert "bias_cards" in data
    assert "USD" in data["bias_cards"]
    assert "XAUUSD" in data["bias_cards"]
    assert "BTCUSD" in data["bias_cards"]
    assert data["bias_cards"]["USD"]["bias"] == "BULLISH"

@pytest.mark.asyncio
async def test_news():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/news")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    assert len(data["items"]) > 0
    assert "usd_impact" in data["items"][0]

@pytest.mark.asyncio
async def test_trump_posts():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/trump-posts")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    assert "original_text" in data["posts"][0]
    assert "ai_interpretation" in data["posts"][0]

@pytest.mark.asyncio
async def test_calendar():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/calendar")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    assert "forecast" in data["events"][0]

@pytest.mark.asyncio
async def test_market_data():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/market-data")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] > 0
    symbols = [t["symbol"] for t in data["tickers"]]
    assert "DXY" in symbols
    assert "XAUUSD" in symbols
    assert "BTCUSD" in symbols
