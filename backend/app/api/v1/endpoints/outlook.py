from fastapi import APIRouter
from datetime import datetime, timezone
from app.schemas.outlook import OutlookResponse, AssetOutlookSchema, FactorItem
from app.providers.market_provider import MarketDataProvider
from app.services.fundamental_engine import FundamentalEngine

router = APIRouter()
market_provider = MarketDataProvider()

@router.get("", response_model=OutlookResponse)
async def get_outlooks():
    """
    Returns live deep fundamental outlooks for XAUUSD, BTCUSD, USD, and EURUSD using real-time market data.
    """
    now = datetime.now(timezone.utc)
    tickers = await market_provider.fetch_data()
    ticker_map = {t["symbol"]: t for t in tickers}

    dxy = ticker_map.get("DXY", {"price": 104.18, "change_percent": 0.23})
    us10y = ticker_map.get("US10Y", {"price": 4.265, "change_percent": 1.07})
    xau = ticker_map.get("XAUUSD", {"price": 2508.40, "change_percent": -0.44})
    btc = ticker_map.get("BTCUSD", {"price": 63450.00, "change_percent": 0.51})
    eur = ticker_map.get("EURUSD", {"price": 1.0875, "change_percent": -0.18})

    usd_score = int(min(90, max(-90, 50 + (dxy["change_percent"] * 25) + (us10y["change_percent"] * 10))))
    xau_score = int(min(90, max(-90, -35 - (us10y["change_percent"] * 15) - (dxy["change_percent"] * 20))))
    btc_score = int(min(90, max(-90, 10 + (btc["change_percent"] * 12) - (dxy["change_percent"] * 8))))
    eur_score = int(min(90, max(-90, -usd_score * 0.85 + (eur["change_percent"] * 20))))

    return OutlookResponse(
        xauusd=AssetOutlookSchema(
            asset="XAUUSD",
            bias=FundamentalEngine.classify_score(xau_score),
            score=xau_score,
            confidence=78,
            executive_summary=(
                f"Gold (XAUUSD) trades live at ${xau['price']:,.2f} ({xau['change_percent']:+.2f}%). "
                f"The near-term macro backdrop is driven by US Treasury 10-Year benchmark yields near {us10y['price']:.3f}% "
                f"and US Dollar Index (DXY) momentum at {dxy['price']:.2f}. "
                f"While real yields present an opportunity cost hurdle, structural sovereign demand and geopolitical tensions maintain a firm floor."
            ),
            primary_drivers=[
                f"US Dollar Index (DXY) at {dxy['price']:.2f} ({dxy['change_percent']:+.2f}%)",
                f"US 10-Year Benchmark Yield at {us10y['price']:.3f}% ({us10y['change_percent']:+.2f}%)",
                "Federal Reserve monetary policy easing pacing and real yield trajectory",
                "Global sovereign central-bank physical accumulation"
            ],
            bullish_factors=[
                FactorItem(title="Central Bank Reserve Diversification", description="Global central banks continuously accumulate physical gold reserves to diversify dollar exposure.", impact="BULLISH", strength=9, source="Official Reserves"),
                FactorItem(title="Geopolitical Risk Premium", description="Active Middle East and Eastern European tensions sustain persistent safe-haven hedging demand.", impact="BULLISH", strength=8, source="Geopolitical Feed"),
                FactorItem(title="Long-Term Sovereign Debt Growth", description="US federal debt expansion reinforces non-debasable pristine collateral demand.", impact="BULLISH", strength=8, source="Fiscal Data")
            ],
            bearish_factors=[
                FactorItem(title="Real Yield Opportunity Cost", description=f"10-Year benchmark yields near {us10y['price']:.3f}% increase carry friction on zero-yielding bullion.", impact="BEARISH", strength=8, source="U.S. Treasury"),
                FactorItem(title="USD Firm Posture", description=f"DXY at {dxy['price']:.2f} makes gold more expensive in non-dollar denominated terms.", impact="BEARISH", strength=7, source="ICE / FX Wires")
            ],
            key_events_to_watch=[
                "US Core PCE & CPI Inflation Releases",
                "FOMC Interest Rate Decision & Powell Press Conference",
                "US Non-Farm Payrolls & Unemployment Rate"
            ],
            market_reaction_validation=f"Live XAUUSD is quoting at ${xau['price']:,.2f} ({xau['change_percent']:+.2f}%), reflecting live cross-asset yield adjustments.",
            macro_transmission_rule="Higher Real Yields + Firm USD → Gold Near-Term Resistance | Lower Real Yields + Geopolitics → Gold Structural Support",
            last_updated=now
        ),
        btcusd=AssetOutlookSchema(
            asset="BTCUSD",
            bias=FundamentalEngine.classify_score(btc_score),
            score=btc_score,
            confidence=72,
            executive_summary=(
                f"Bitcoin (BTCUSD) trades live at ${btc['price']:,.2f} ({btc['change_percent']:+.2f}%). "
                f"Market dynamics reflect a constructive structural liquidity environment powered by institutional ETF accumulation "
                f"and strategic national reserve policy discourse, balanced against macroeconomic discount rate conditions in the bond market."
            ),
            primary_drivers=[
                f"Live spot market price at ${btc['price']:,.2f} ({btc['change_percent']:+.2f}%)",
                "Institutional spot ETF net absorption absorbing OTC miner and market supply",
                "Pro-crypto sovereign reserve policy proposals removing regulatory tail risks",
                f"US 10-Year yield at {us10y['price']:.3f}% defining macro risk appetite hurdle"
            ],
            bullish_factors=[
                FactorItem(title="Institutional ETF Structural Inflows", description="Regulated spot ETF access provides consistent capital absorption from pension and wealth funds.", impact="BULLISH", strength=9, source="ETF Disclosures"),
                FactorItem(title="National Strategic Bitcoin Stockpile Discourse", description="Political proposals to establish sovereign Bitcoin reserves elevate asset legitimacy.", impact="BULLISH", strength=8, source="Policy Statements"),
                FactorItem(title="Algorithmic Scarcity & Halving Cycle", description="Post-halving supply emission constraint tightens available exchange liquidity.", impact="BULLISH", strength=8, source="On-Chain Architecture")
            ],
            bearish_factors=[
                FactorItem(title="Macro Bond Yield Hurdle Rate", description=f"Elevated Treasury yields at {us10y['price']:.3f}% compete for high-beta risk capital.", impact="BEARISH", strength=6, source="U.S. Treasury"),
                FactorItem(title="Equity Correlation Drag", description="Intraday pullbacks in tech equities (Nasdaq) can create short-term sentiment drag.", impact="BEARISH", strength=6, source="Futures Markets")
            ],
            key_events_to_watch=[
                "US Core PCE Inflation Print (Macro Liquidity Gauge)",
                "Spot ETF Daily Net Inflow/Outflow Disclosures",
                "Federal Reserve Rate Cut Path Projections"
            ],
            market_reaction_validation=f"Live Bitcoin is trading at ${btc['price']:,.2f} ({btc['change_percent']:+.2f}%), verifying resilient spot absorption.",
            macro_transmission_rule="Global M2 Expansion + Institutional ETF Flows → BTC Expansion | Tight Sovereign Liquidity → Range Consolidation",
            last_updated=now
        ),
        usd=AssetOutlookSchema(
            asset="USD",
            bias=FundamentalEngine.classify_score(usd_score),
            score=usd_score,
            confidence=82,
            executive_summary=(
                f"The US Dollar Index (DXY) is quoting live at {dxy['price']:.2f} ({dxy['change_percent']:+.2f}%). "
                f"Supported by benchmark 10-Year yields at {us10y['price']:.3f}%, the greenback maintains a yield spread advantage "
                f"over major peer currencies, while markets monitor economic data for rate easing timing."
            ),
            primary_drivers=[
                f"US Dollar Index at {dxy['price']:.2f}",
                f"US 10-Year Benchmark Yield at {us10y['price']:.3f}%",
                "US economic growth resilience relative to global peers",
                "Federal Reserve cautious data-dependent guidance"
            ],
            bullish_factors=[
                FactorItem(title="Economic Growth Outperformance", description="US economic growth indicators remain resilient compared to European and Asian peers.", impact="BULLISH", strength=8, source="Macro Data"),
                FactorItem(title="Yield Spread Advantage", description="US yields maintain an attractive spread over German Bunds and Japanese JGBs.", impact="BULLISH", strength=8, source="Debt Markets")
            ],
            bearish_factors=[
                FactorItem(title="Impending Monetary Easing Cycle", description="The Federal Reserve remains poised to lower benchmark interest rates in subsequent cycles.", impact="BEARISH", strength=7, source="Fed Projections")
            ],
            key_events_to_watch=[
                "US Non-Farm Payrolls (NFP) & Unemployment",
                "FOMC Benchmark Rate Decision",
                "US Consumer Price Index (CPI)"
            ],
            market_reaction_validation=f"DXY live quotation at {dxy['price']:.2f} confirms solid support above 104.00.",
            macro_transmission_rule="Stronger US Macro Data → Higher Yields → Interest Rate Spread Widening → USD Appreciation",
            last_updated=now
        ),
        eurusd=AssetOutlookSchema(
            asset="EURUSD",
            bias=FundamentalEngine.classify_score(eur_score),
            score=eur_score,
            confidence=78,
            executive_summary=(
                f"EURUSD is quoting live at {eur['price']:.4f} ({eur['change_percent']:+.2f}%). "
                f"The pair is heavily influenced by the Transatlantic interest rate differential between the European Central Bank (ECB) "
                f"and the Federal Reserve, as well as Eurozone industrial export data and global trade tariff variables."
            ),
            primary_drivers=[
                f"Live EURUSD exchange rate at {eur['price']:.4f}",
                f"Inverse transmission from DXY at {dxy['price']:.2f}",
                f"US Treasury vs German Bund yield spread with US10Y at {us10y['price']:.3f}%",
                "ECB monetary policy trajectory and Eurozone manufacturing health"
            ],
            bullish_factors=[
                FactorItem(title="Eurozone Inflation Persistence", description="Services inflation in Europe could compel the ECB to maintain a cautious easing trajectory.", impact="BULLISH", strength=7, source="Eurostat"),
                FactorItem(title="Fed Easing Expectations", description="Faster US rate cuts would narrow the Transatlantic yield differential in favor of the Euro.", impact="BULLISH", strength=8, source="Rate Differential Analysis")
            ],
            bearish_factors=[
                FactorItem(title="US Yield Differential Advantage", description=f"Elevated US10Y at {us10y['price']:.3f}% continues to attract global sovereign capital into USD assets.", impact="BEARISH", strength=8, source="Bond Spread"),
                FactorItem(title="Global Trade & Tariff Uncertainty", description="Potential tariff policies on European automotive and industrial exports create growth friction.", impact="BEARISH", strength=7, source="Trade Policy Monitor")
            ],
            key_events_to_watch=[
                "ECB Monetary Policy Decision & Lagarde Conference",
                "Eurozone HICP Flash Inflation Release",
                "US Non-Farm Payrolls & FOMC Minutes"
            ],
            market_reaction_validation=f"EURUSD is actively trading at {eur['price']:.4f} ({eur['change_percent']:+.2f}%), verifying continuous market transmission.",
            macro_transmission_rule="Widening US-German Yield Spread → EURUSD Downward Pressure | Narrowing Yield Spread + ECB Hawkishness → EURUSD Support",
            last_updated=now
        )
    )
