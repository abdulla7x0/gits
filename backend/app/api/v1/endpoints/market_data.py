from fastapi import APIRouter
from app.schemas.market_data import MarketDataListResponse, MarketTickerSchema
from app.providers.market_provider import MarketDataProvider

router = APIRouter()
provider = MarketDataProvider()

@router.get("", response_model=MarketDataListResponse)
async def get_market_data():
    """
    Returns live cross-asset tickers from real market endpoints:
    XAUUSD, BTCUSD, EURUSD, DXY, US10Y, US02Y, Nasdaq, S&P 500, and WTI Crude.
    """
    tickers_data = await provider.fetch_data()
    return MarketDataListResponse(
        total=len(tickers_data),
        tickers=[MarketTickerSchema(**m) for m in tickers_data]
    )
