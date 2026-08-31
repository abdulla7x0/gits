from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any

# Current simulated reference time
NOW = datetime.now(timezone.utc)

SEED_NEWS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "headline": "FOMC Minutes Reveal Split on Rate Cut Timing Amid Resilient Services Inflation",
        "summary": "Federal Open Market Committee participants highlighted that while disinflation continues in goods, sticky shelter and services inflation warrant maintaining a restrictive policy stance for longer than financial markets currently price in.",
        "full_content": "The minutes of the recent FOMC meeting indicated broad agreement that the benchmark rate is likely at its peak for this tightening cycle. However, several members expressed concern that easing policy prematurely could reignite inflationary pressures. 10-year Treasury yields ticked up 4.2 bps following the release.",
        "source": "Federal Reserve (Official Minutes)",
        "source_url": "https://www.federalreserve.gov",
        "source_tier": "TIER 1",
        "category": "Federal Reserve",
        "impact_level": "HIGH",
        "published_at": NOW - timedelta(minutes=42),
        "ai_summary": "Hawkish bias maintained. Fed remains data-dependent with a high bar for aggressive cuts, sustaining upward pressure on real yields.",
        "usd_impact": "Bullish",
        "xauusd_impact": "Bearish",
        "btcusd_impact": "Neutral / Pressured",
        "ai_why": "Higher-for-longer Fed policy increases the opportunity cost of holding zero-yielding gold and limits sovereign liquidity injections that typically propel risk assets like Bitcoin.",
        "confidence": 84,
        "actual": "Hawkish Hold Sentiment",
        "forecast": "Neutral to Dovish",
        "previous": "Neutral",
        "surprise": "More Hawkish than Anticipated",
        "market_reaction": {
            "dxy": "+0.28%",
            "us10y": "+4.2 bps (to 4.28%)",
            "gold": "-$16.40 (to $2,504.20)",
            "btc": "-$420 (to $63,150)",
            "nasdaq": "-0.55%"
        },
        "cluster_id": "cluster_fomc_min_aug",
        "sources_count": 3,
        "related_sources": ["Federal Reserve (Official Minutes)", "Reuters", "Bloomberg"]
    },
    {
        "id": 2,
        "headline": "US Core CPI YoY Prints at 3.2% vs 3.4% Expected; Headline Inflation Cools to 2.9%",
        "summary": "Bureau of Labor Statistics reports Consumer Price Index rose 0.2% month-over-month, bringing annual headline inflation down to 2.9%, the lowest level since March 2021. Core CPI surprised to the downside at 3.2%.",
        "full_content": "The downside surprise in shelter prices and used vehicles contributed to the soft reading. Market pricing for a 50 bps Fed rate cut surged to 54% immediately following the print.",
        "source": "Bureau of Labor Statistics (BLS)",
        "source_url": "https://www.bls.gov",
        "source_tier": "TIER 1",
        "category": "Inflation",
        "impact_level": "VERY HIGH",
        "published_at": NOW - timedelta(hours=4, minutes=15),
        "ai_summary": "Disinflation confirmed. Soft CPI print reinforces expectations of monetary easing, dampening USD strength and sparking broad asset repricing.",
        "usd_impact": "Bearish",
        "xauusd_impact": "Bullish",
        "btcusd_impact": "Bullish",
        "ai_why": "Cooler inflation lowers nominal and real Treasury yields, weakening the USD index while boosting demand for non-yielding Gold and high-beta liquidity-sensitive assets like Bitcoin.",
        "confidence": 91,
        "actual": "3.2%",
        "forecast": "3.4%",
        "previous": "3.5%",
        "surprise": "-0.2% (Cooler than Expected)",
        "market_reaction": {
            "dxy": "-0.62%",
            "us10y": "-8.5 bps (to 4.21%)",
            "gold": "+$28.50 (to $2,522.80)",
            "btc": "+$1,840 (to $64,200)",
            "nasdaq": "+1.35%"
        },
        "cluster_id": "cluster_cpi_release_aug",
        "sources_count": 4,
        "related_sources": ["BLS", "Reuters", "Financial Times", "Bloomberg"]
    },
    {
        "id": 3,
        "headline": "US 10-Year Treasury Yield Crosses 4.30% Following Strong JOLTS Job Openings Data",
        "summary": "Job openings unexpectedly jumped to 8.18M, defying forecasts of 7.95M, underscoring resilient labor demand across healthcare and professional services.",
        "full_content": "The persistent tight labor market complicates the Fed's dual mandate, leading debt markets to price out aggressive year-end rate reductions.",
        "source": "Bloomberg Markets",
        "source_url": "https://www.bloomberg.com",
        "source_tier": "TIER 2",
        "category": "Employment",
        "impact_level": "MEDIUM",
        "published_at": NOW - timedelta(hours=8, minutes=30),
        "ai_summary": "Labor market resilience pushes benchmark yields higher, providing near-term support for USD and capping Gold upside.",
        "usd_impact": "Bullish",
        "xauusd_impact": "Bearish",
        "btcusd_impact": "Neutral",
        "ai_why": "Strong labor figures reduce recession probabilities and prompt the Fed to maintain tight monetary conditions, which sustains elevated yield hurdles for gold.",
        "confidence": 76,
        "actual": "8.18M",
        "forecast": "7.95M",
        "previous": "8.05M",
        "surprise": "+0.23M (Better than Expected)",
        "market_reaction": {
            "dxy": "+0.22%",
            "us10y": "+3.1 bps",
            "gold": "-$9.20",
            "btc": "-$110",
            "nasdaq": "-0.20%"
        },
        "cluster_id": "cluster_jolts_aug",
        "sources_count": 2,
        "related_sources": ["Bloomberg Markets", "Dow Jones"]
    },
    {
        "id": 4,
        "headline": "Middle East Geopolitical Tensions Escalate; Safe-Haven Inflows Detected in Precious Metals",
        "summary": "Reports of heightened naval activity in the Strait of Hormuz and diplomatic standoffs prompted institutional desk bids for sovereign gold reserves and physical delivery contracts.",
        "full_content": "Central bank bullion purchases continued for the 14th consecutive month, establishing an underlying structural floor under gold spot prices despite elevated dollar rates.",
        "source": "Reuters World News",
        "source_url": "https://www.reuters.com",
        "source_tier": "TIER 2",
        "category": "Geopolitics",
        "impact_level": "HIGH",
        "published_at": NOW - timedelta(hours=14),
        "ai_summary": "Geopolitical risk premium expands, decoupling Gold from strict yield correlation and providing robust downside support.",
        "usd_impact": "Neutral / Mild Safe Haven",
        "xauusd_impact": "Strong Bullish",
        "btcusd_impact": "Mixed / Initial Risk-Off",
        "ai_why": "Geopolitical escalation elevates the geopolitical tail-risk premium. Historically, Gold acts as the primary pristine collateral hedge, whereas Bitcoin exhibits mixed short-term beta before liquidity recovery.",
        "confidence": 82,
        "market_reaction": {
            "dxy": "+0.08%",
            "us10y": "-1.5 bps",
            "gold": "+$22.00",
            "btc": "-$350",
            "nasdaq": "-0.60%"
        },
        "cluster_id": "cluster_geopolitics_aug",
        "sources_count": 3,
        "related_sources": ["Reuters", "Associated Press", "Al Jazeera"]
    },
    {
        "id": 5,
        "headline": "Institutional Crypto ETP Inflows Rebound with $580M Weekly Net Additions",
        "summary": "U.S. spot Bitcoin ETFs recorded their third consecutive day of positive net inflows led by institutional asset managers accumulating on pullbacks.",
        "full_content": "Fidelity and BlackRock IBIT observed renewed aggregate buying, absorbing miner distribution and OTC inventory.",
        "source": "CoinDesk / SEC Filings",
        "source_url": "https://www.coindesk.com",
        "source_tier": "TIER 2",
        "category": "Crypto",
        "impact_level": "MEDIUM",
        "published_at": NOW - timedelta(hours=18),
        "ai_summary": "Sustained institutional absorption supports Bitcoin market structure, though broader macro headwinds restrict explosive breakouts.",
        "usd_impact": "Neutral",
        "xauusd_impact": "Neutral",
        "btcusd_impact": "Bullish",
        "ai_why": "Direct spot ETF liquidity absorptions reduce floating supply on spot exchanges, building structural support for BTCUSD.",
        "confidence": 78,
        "market_reaction": {
            "dxy": "0.00%",
            "us10y": "0.0 bps",
            "gold": "+$1.50",
            "btc": "+$950",
            "nasdaq": "+0.30%"
        },
        "cluster_id": "cluster_etf_inflows_aug",
        "sources_count": 2,
        "related_sources": ["CoinDesk", "Bloomberg Crypto"]
    }
]

SEED_TRUMP_POSTS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "post_identifier": "truth_social_trump_98412",
        "author_name": "Donald J. Trump",
        "author_handle": "@realDonaldTrump",
        "platform": "Truth Social",
        "source_url": "https://truthsocial.com/@realDonaldTrump/posts/11293849128",
        "original_text": "The Federal Reserve MUST LOWER INTEREST RATES IMMEDIATELY! Too Slow, as usual. We are paying ridiculous amounts to service our National Debt while other countries are laughing at our high Dollar. Our manufacturers need a competitive Dollar, and American energy must be unleashed to CRUSH inflation!",
        "published_at": NOW - timedelta(hours=2, minutes=18),
        "topic": "FED / INTEREST RATES",
        "market_relevance": "VERY HIGH IMPACT",
        "risk_level": "High Volatility",
        "ai_interpretation": "Direct rhetorical pressure on the Federal Reserve to accelerate interest rate cuts and address dollar valuation. This signals potential future policy friction regarding central bank independence, while advocating for pro-easing, pro-growth monetary conditions.",
        "usd_impact": "Bearish (Devaluation / Easing Bias)",
        "xauusd_impact": "Bullish (Lower yields & debasement hedge)",
        "btcusd_impact": "Potentially Bullish (Liquidity expansion expectation)",
        "confidence": 85,
        "alert_triggered": True
    },
    {
        "id": 2,
        "post_identifier": "truth_social_trump_98390",
        "author_name": "Donald J. Trump",
        "author_handle": "@realDonaldTrump",
        "platform": "Truth Social",
        "source_url": "https://truthsocial.com/@realDonaldTrump/posts/11293214829",
        "original_text": "We will impose a comprehensive 25% Universal Reciprocal Tariff on all imported steel, aluminum, and autos from countries that manipulate their currencies and exploit American workers. We will protect our great industries and bring trillions back home!",
        "published_at": NOW - timedelta(hours=16, minutes=45),
        "topic": "TARIFFS / TRADE",
        "market_relevance": "HIGH IMPACT",
        "risk_level": "Elevated Uncertainty",
        "ai_interpretation": "Reiterates aggressive trade protectionism. Broad tariffs tend to create stagflationary friction (elevating goods import costs while slowing global trade velocity), historically prompting safe-haven bids for Gold and cross-border currency volatility.",
        "usd_impact": "Mixed (Tariff inflation vs Global growth drag)",
        "xauusd_impact": "Potentially Supportive (Safe-haven & tariff inflation hedge)",
        "btcusd_impact": "Mixed (Initial risk-off before inflation hedge narrative)",
        "confidence": 80,
        "alert_triggered": True
    },
    {
        "id": 3,
        "post_identifier": "truth_social_trump_98210",
        "author_name": "Donald J. Trump",
        "author_handle": "@realDonaldTrump",
        "platform": "Truth Social",
        "source_url": "https://truthsocial.com/@realDonaldTrump/posts/11292109482",
        "original_text": "I want Bitcoin and Crypto mined, minted, and built in the USA! We will create a National Strategic Bitcoin Stockpile so America leads the future of digital finance. Never sell your Bitcoin!",
        "published_at": NOW - timedelta(days=1, hours=6),
        "topic": "BITCOIN / CRYPTO",
        "market_relevance": "HIGH IMPACT",
        "risk_level": "Bullish Catalyst",
        "ai_interpretation": "Strategic policy stance favoring sovereign crypto adoption and domestic mining incentives. Elevates Bitcoin's status into national reserve asset discourse.",
        "usd_impact": "Neutral",
        "xauusd_impact": "Neutral",
        "btcusd_impact": "Strong Bullish (Reserve legitimacy & institutional bid)",
        "confidence": 88,
        "alert_triggered": False
    },
    {
        "id": 4,
        "post_identifier": "truth_social_trump_98150",
        "author_name": "Donald J. Trump",
        "author_handle": "@realDonaldTrump",
        "platform": "Truth Social",
        "source_url": "https://truthsocial.com/@realDonaldTrump/posts/11291502938",
        "original_text": "DRILL BABY DRILL! We will double our oil and gas output in record time, lowering gasoline below $2.00/gallon and eliminating inflation at the source.",
        "published_at": NOW - timedelta(days=2, hours=10),
        "topic": "ENERGY / OIL",
        "market_relevance": "MEDIUM IMPACT",
        "risk_level": "Disinflationary",
        "ai_interpretation": "Supply-side energy expansion pledge designed to lower headline input costs. Lower energy costs reduce headline inflation expectations and could ease yield pressures.",
        "usd_impact": "Neutral to Mild Bearish",
        "xauusd_impact": "Neutral (Lower energy inflation vs steady real growth)",
        "btcusd_impact": "Supportive (Lower energy costs for miners)",
        "confidence": 72,
        "alert_triggered": False
    }
]

SEED_CALENDAR: List[Dict[str, Any]] = [
    {
        "id": 1,
        "title": "US Core PCE Price Index (MoM & YoY)",
        "currency": "USD",
        "country": "United States",
        "category": "Inflation",
        "impact_level": "VERY HIGH",
        "scheduled_time": NOW + timedelta(days=1, hours=14, minutes=30),
        "period": "July",
        "forecast": "0.2% / 2.6%",
        "previous": "0.2% / 2.6%",
        "actual": None,
        "surprise": None,
        "surprise_classification": "Pending Release",
        "usd_effect": "If > 0.3%: Strong Bullish; If < 0.2%: Bearish",
        "xauusd_effect": "If > 0.3%: Bearish; If < 0.2%: Bullish",
        "btcusd_effect": "If > 0.3%: Pressured; If < 0.2%: Supportive",
        "ai_interpretation": "The Fed's preferred inflation gauge. A deviation of >= 0.1% from the 0.2% MoM consensus will directly recalibrate FOMC rate trajectory probabilities.",
        "expected_effect": "High intraday volatility expected across DXY, US10Y yields, and Gold within the first 15 minutes of release.",
        "pre_market": {
            "dxy": 104.15,
            "us10y": 4.25,
            "gold": 2512.50,
            "btc": 63800.00
        },
        "post_market": {},
        "market_change": {},
        "is_completed": False,
        "confidence": 92
    },
    {
        "id": 2,
        "title": "Non-Farm Payrolls (NFP) & Unemployment Rate",
        "currency": "USD",
        "country": "United States",
        "category": "Employment",
        "impact_level": "VERY HIGH",
        "scheduled_time": NOW + timedelta(days=3, hours=9, minutes=0),
        "period": "August",
        "forecast": "165K / 4.3%",
        "previous": "114K / 4.3%",
        "actual": None,
        "surprise": None,
        "surprise_classification": "Pending Release",
        "usd_effect": "If > 190K: Bullish; If < 130K: Bearish",
        "xauusd_effect": "If > 190K: Bearish; If < 130K: Bullish",
        "btcusd_effect": "If > 190K: Mixed; If < 130K: Bullish (Rate Cut Catalyst)",
        "ai_interpretation": "Key labor market benchmark. After the previous 114K print triggered Sahm Rule recession discussions, this print determines whether labor cooling is orderly or accelerating.",
        "expected_effect": "Decisive driver of the multi-week trend for the US Dollar Index and Gold carry trades.",
        "pre_market": {},
        "post_market": {},
        "market_change": {},
        "is_completed": False,
        "confidence": 94
    },
    {
        "id": 3,
        "title": "FOMC Fed Chair Powell Keynote Speech",
        "currency": "USD",
        "country": "United States",
        "category": "Federal Reserve",
        "impact_level": "VERY HIGH",
        "scheduled_time": NOW + timedelta(days=5, hours=18, minutes=0),
        "period": "Symposium",
        "forecast": "Dovish/Balanced Guidance",
        "previous": "Balanced",
        "actual": None,
        "surprise": None,
        "surprise_classification": "Pending Event",
        "usd_effect": "Sensitive to rate-cut pacing cues",
        "xauusd_effect": "Direct sensitivity to real yield framing",
        "btcusd_effect": "Sensitive to global dollar liquidity outlook",
        "ai_interpretation": "Expected to outline the macroeconomic conditions for the upcoming rate easing cycle.",
        "expected_effect": "High market focus on nuance between 25 bps vs 50 bps opening move.",
        "pre_market": {},
        "post_market": {},
        "market_change": {},
        "is_completed": False,
        "confidence": 90
    },
    {
        "id": 4,
        "title": "US Initial Jobless Claims",
        "currency": "USD",
        "country": "United States",
        "category": "Employment",
        "impact_level": "HIGH",
        "scheduled_time": NOW - timedelta(hours=6),
        "period": "Week ending Aug 24",
        "forecast": "232K",
        "previous": "233K",
        "actual": "228K",
        "surprise": "-4K (Lower layoffs)",
        "surprise_classification": "Better Than Expected",
        "usd_effect": "Bullish",
        "xauusd_effect": "Mildly Bearish",
        "btcusd_effect": "Neutral",
        "ai_interpretation": "Claims dropped to 228K, showing no signs of sudden labor market deterioration. This tempered expectations of an emergency 50 bps rate cut.",
        "expected_effect": "Stabilized short-term bond yields.",
        "pre_market": {
            "dxy": 103.95,
            "us10y": 4.22,
            "gold": 2518.00,
            "btc": 63400.00
        },
        "post_market": {
            "dxy": 104.18,
            "us10y": 4.26,
            "gold": 2508.40,
            "btc": 63320.00
        },
        "market_change": {
            "dxy": "+0.23 pts",
            "us10y": "+4.0 bps",
            "gold": "-$9.60",
            "btc": "-$80"
        },
        "is_completed": True,
        "confidence": 86
    }
]

SEED_MARKET_SNAPSHOTS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "symbol": "DXY",
        "name": "US Dollar Index",
        "asset_class": "CURRENCY",
        "price": 104.18,
        "change": 0.24,
        "change_percent": 0.23,
        "intraday_trend": "BULLISH",
        "previous_close": 103.94,
        "day_high": 104.32,
        "day_low": 103.88,
        "sparkline": [103.90, 103.94, 104.02, 104.10, 104.25, 104.18],
        "last_updated": NOW
    },
    {
        "id": 2,
        "symbol": "US10Y",
        "name": "US 10-Year Benchmark Yield",
        "asset_class": "FIXED_INCOME",
        "price": 4.265,
        "change": 0.045,
        "change_percent": 1.07,
        "intraday_trend": "BULLISH",
        "previous_close": 4.220,
        "day_high": 4.290,
        "day_low": 4.210,
        "sparkline": [4.21, 4.22, 4.24, 4.27, 4.29, 4.265],
        "last_updated": NOW
    },
    {
        "id": 3,
        "symbol": "US02Y",
        "name": "US 2-Year Policy-Sensitive Yield",
        "asset_class": "FIXED_INCOME",
        "price": 4.028,
        "change": 0.038,
        "change_percent": 0.95,
        "intraday_trend": "BULLISH",
        "previous_close": 3.990,
        "day_high": 4.050,
        "day_low": 3.985,
        "sparkline": [3.98, 3.99, 4.01, 4.04, 4.05, 4.028],
        "last_updated": NOW
    },
    {
        "id": 4,
        "symbol": "XAUUSD",
        "name": "Gold / US Dollar",
        "asset_class": "COMMODITY",
        "price": 2506.80,
        "change": -11.20,
        "change_percent": -0.44,
        "intraday_trend": "BEARISH",
        "previous_close": 2518.00,
        "day_high": 2524.50,
        "day_low": 2501.20,
        "sparkline": [2520.0, 2524.5, 2515.0, 2508.0, 2502.0, 2506.8],
        "last_updated": NOW
    },
    {
        "id": 5,
        "symbol": "BTCUSD",
        "name": "Bitcoin / US Dollar",
        "asset_class": "CRYPTO",
        "price": 63450.00,
        "change": 320.00,
        "change_percent": 0.51,
        "intraday_trend": "SIDEWAYS",
        "previous_close": 63130.00,
        "day_high": 64200.00,
        "day_low": 62800.00,
        "sparkline": [63100, 63800, 64200, 63200, 62900, 63450],
        "last_updated": NOW
    },
    {
        "id": 6,
        "symbol": "NQ",
        "name": "Nasdaq 100 Futures",
        "asset_class": "EQUITIES",
        "price": 19680.00,
        "change": -65.00,
        "change_percent": -0.33,
        "intraday_trend": "BEARISH",
        "previous_close": 19745.00,
        "day_high": 19820.00,
        "day_low": 19620.00,
        "sparkline": [19750, 19820, 19780, 19650, 19620, 19680],
        "last_updated": NOW
    },
    {
        "id": 7,
        "symbol": "SPX",
        "name": "S&P 500 Index",
        "asset_class": "EQUITIES",
        "price": 5580.40,
        "change": -12.10,
        "change_percent": -0.22,
        "intraday_trend": "BEARISH",
        "previous_close": 5592.50,
        "day_high": 5608.00,
        "day_low": 5572.00,
        "sparkline": [5595, 5608, 5590, 5575, 5572, 5580.4],
        "last_updated": NOW
    },
    {
        "id": 8,
        "symbol": "WTI",
        "name": "Crude Oil WTI",
        "asset_class": "COMMODITY",
        "price": 76.45,
        "change": 0.85,
        "change_percent": 1.12,
        "intraday_trend": "BULLISH",
        "previous_close": 75.60,
        "day_high": 77.10,
        "day_low": 75.30,
        "sparkline": [75.5, 75.8, 76.2, 77.0, 76.8, 76.45],
        "last_updated": NOW
    }
]

SEED_BIAS_CARDS: Dict[str, Any] = {
    "USD": {
        "asset": "USD",
        "bias": "BULLISH",
        "score": 64,
        "confidence": 74,
        "reasons": [
            "Resilient labor claims and steady JOLTS job openings support economic growth",
            "FOMC minutes emphasize restrictive stance against persistent service costs",
            "10-Year Treasury yields climbing towards 4.30% provide yield advantage"
        ],
        "dxy_trend": "Intraday Ascending Channel (104.18)",
        "fed_expectations": "Rate cut pacing recalibrated; 25 bps favored over 50 bps",
        "treasury_yield_direction": "Rising (+4.5 bps on US10Y)",
        "risk_sentiment": "Moderate Risk-Off"
    },
    "XAUUSD": {
        "asset": "XAUUSD",
        "bias": "BEARISH",
        "score": -42,
        "confidence": 68,
        "reasons": [
            "Short-term headwind from rising US real yields and firm DXY dollar index",
            "Priced-in rate cuts facing repricing after solid employment data",
            "Underlying structural support maintained by central-bank gold buying and Middle East tension"
        ],
        "dxy_trend": "USD strength creating inverse drag on bullion",
        "fed_expectations": "Delayed aggressive easing raises holding opportunity cost",
        "treasury_yield_direction": "Real yield expansion creates resistance near $2,520-$2,530",
        "risk_sentiment": "Geopolitical hedge floor countering yield pressure"
    },
    "BTCUSD": {
        "asset": "BTCUSD",
        "bias": "NEUTRAL",
        "score": 14,
        "confidence": 54,
        "reasons": [
            "Positive net ETF inflows ($580M weekly) offset by macro yield headwinds",
            "Nasdaq correlation experiencing slight pressure due to higher discount rates",
            "Pro-crypto political rhetoric (Trump Strategic Stockpile proposal) provides sentiment buffer"
        ],
        "dxy_trend": "DXY strength keeping momentum range-bound ($62.8K - $64.5K)",
        "fed_expectations": "Monetary easing path still intact for late 2024 / 2025",
        "treasury_yield_direction": "Yield bounce limiting immediate explosive speculative upside",
        "risk_sentiment": "Consolidating within broader macro liquidity regime"
    }
}

SEED_ALERTS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "alert_type": "TRUMP_STATEMENT",
        "title": "🚨 TRUMP MARKET ALERT — FED / INTEREST RATES",
        "message": "Donald Trump posted on Truth Social demanding immediate Federal Reserve rate cuts and criticising high USD valuation.",
        "severity": "CRITICAL",
        "affected_assets": ["USD", "XAUUSD", "BTCUSD"],
        "payload": {
            "topic": "FED / INTEREST RATES",
            "impact": "VERY HIGH",
            "usd": "Bearish",
            "xauusd": "Bullish",
            "btcusd": "Potentially Bullish",
            "confidence": 85
        },
        "sent_telegram": True,
        "sent_web": True,
        "is_read": False,
        "created_at": NOW - timedelta(hours=2, minutes=18)
    },
    {
        "id": 2,
        "alert_type": "HIGH_IMPACT_EVENT",
        "title": "🔥 UPCOMING HIGH IMPACT: US Core PCE Price Index",
        "message": "US Core PCE Price Index scheduled in 1 day 14 hours. Consensus forecast: 0.2% MoM / 2.6% YoY.",
        "severity": "HIGH",
        "affected_assets": ["USD", "XAUUSD", "BTCUSD"],
        "payload": {
            "event": "Core PCE",
            "scheduled": (NOW + timedelta(days=1, hours=14, minutes=30)).isoformat(),
            "impact": "VERY HIGH"
        },
        "sent_telegram": True,
        "sent_web": True,
        "is_read": False,
        "created_at": NOW - timedelta(hours=5)
    },
    {
        "id": 3,
        "alert_type": "YIELD_SPIKE",
        "title": "📈 US 10-Year Yield Rises Above 4.26%",
        "message": "Benchmark US10Y yields pushed up 4.5 bps following steady initial jobless claims data.",
        "severity": "MEDIUM",
        "affected_assets": ["USD", "XAUUSD"],
        "payload": {
            "symbol": "US10Y",
            "change": "+4.5 bps",
            "current": 4.265
        },
        "sent_telegram": False,
        "sent_web": True,
        "is_read": True,
        "created_at": NOW - timedelta(hours=6)
    }
]

SEED_OUTLOOKS: Dict[str, Any] = {
    "xauusd": {
        "asset": "XAUUSD",
        "bias": "BEARISH",
        "score": -42,
        "confidence": 68,
        "executive_summary": "The near-term macroeconomic environment for Gold (XAUUSD) has turned moderately hostile due to a firming US Dollar and an uptick in benchmark 10-Year Treasury yields following better-than-expected labor data and cautious FOMC minutes. However, a strong structural floor remains established by ongoing central bank accumulation and geopolitical instability in the Middle East.",
        "primary_drivers": [
            "US Dollar Index (DXY) rebound towards 104.20",
            "US 10-Year Treasury yield rise to 4.265% increasing opportunity cost",
            "Market pricing out aggressive 50 bps opening rate cut by the Federal Reserve",
            "Structural central bank physical demand dampening steep corrections"
        ],
        "bullish_factors": [
            {
                "title": "Geopolitical Tail-Risk Premium",
                "description": "Heightened tensions in the Middle East and ongoing Ukraine conflict sustain safe-haven hedging demand.",
                "impact": "BULLISH",
                "strength": 8,
                "source": "Reuters World News"
            },
            {
                "title": "Central Bank Reserve Diversification",
                "description": "Global sovereign institutions continue net purchases of physical gold for de-dollarization.",
                "impact": "BULLISH",
                "strength": 9,
                "source": "World Gold Council / IMF"
            },
            {
                "title": "Trump Tariff Protectionism Rhetoric",
                "description": "Potential universal reciprocal tariffs increase global stagflation risks, historically supportive of gold.",
                "impact": "BULLISH",
                "strength": 7,
                "source": "Truth Social Official Posts"
            }
        ],
        "bearish_factors": [
            {
                "title": "Rising US Real Yields",
                "description": "10-Year TIPS and nominal yields rebounding, raising the hurdle rate against zero-yielding bullion.",
                "impact": "BEARISH",
                "strength": 8,
                "source": "U.S. Treasury"
            },
            {
                "title": "USD Short-Term Strength",
                "description": "DXY strength makes gold more expensive in non-USD currencies, dampening physical retail bids.",
                "impact": "BEARISH",
                "strength": 7,
                "source": "ICE / Bloomberg"
            },
            {
                "title": "Fed Hawkish Patience",
                "description": "FOMC members cautious on declaring victory over services inflation.",
                "impact": "BEARISH",
                "strength": 8,
                "source": "FOMC Minutes"
            }
        ],
        "key_events_to_watch": [
            "US Core PCE Price Index (Tomorrow 14:30 UTC)",
            "US Non-Farm Payrolls & Unemployment Rate (Friday)",
            "FOMC Chair Powell Speech at Jackson Hole"
        ],
        "market_reaction_validation": "Spot Gold has pulled back -$11.20 (-0.44%) from $2,518.00 down to $2,506.80, confirming that market participants are currently reacting to the higher yield environment.",
        "macro_transmission_rule": "Sticky Inflation / Firm Labor → Higher Real Yields → USD Appreciation → Gold Selling Pressure",
        "last_updated": NOW
    },
    "btcusd": {
        "asset": "BTCUSD",
        "bias": "NEUTRAL",
        "score": 14,
        "confidence": 54,
        "executive_summary": "Bitcoin (BTCUSD) is currently oscillating in a neutral macroeconomic equilibrium. On one hand, persistent institutional ETF net accumulation ($580M weekly) and favorable political discourse regarding a Strategic Bitcoin Stockpile provide substantial structural bids. On the other hand, the firm US dollar, rising yields, and mild equity consolidation (Nasdaq down 0.33%) restrain immediate expansionary breakout momentum.",
        "primary_drivers": [
            "US spot ETF institutional inflows providing strong price absorption",
            "Macro dollar/yield rally imposing a temporary ceiling on speculative liquidity",
            "High political relevance from pro-crypto U.S. election proposals",
            "Range-bound consolidation between $62,800 and $64,500"
        ],
        "bullish_factors": [
            {
                "title": "Institutional ETF Absorption",
                "description": "Continuous positive net daily flows absorbing OTC supply and miner sales.",
                "impact": "BULLISH",
                "strength": 8,
                "source": "Farside Investors / SEC Filings"
            },
            {
                "title": "National Strategic Bitcoin Reserve Discourse",
                "description": "Political momentum to treat Bitcoin as a strategic sovereign asset removes regulatory tail-risks.",
                "impact": "BULLISH",
                "strength": 8,
                "source": "Trump Truth Social Policy Statements"
            },
            {
                "title": "Long-Term Sovereign Debasement Narrative",
                "description": "US national debt growth trajectory ($35T+) reinforces programmatic scarcity thesis.",
                "impact": "BULLISH",
                "strength": 7,
                "source": "Congressional Budget Office"
            }
        ],
        "bearish_factors": [
            {
                "title": "Short-Term Dollar Strength & Yield Rise",
                "description": "Rising US10Y yields compete with high-beta risk assets for global capital.",
                "impact": "BEARISH",
                "strength": 6,
                "source": "U.S. Treasury"
            },
            {
                "title": "Nasdaq 100 Correlation Drag",
                "description": "Mild risk-off tech equity pullback dampens speculative intraday leverage.",
                "impact": "BEARISH",
                "strength": 6,
                "source": "CME Futures"
            }
        ],
        "key_events_to_watch": [
            "US Core PCE Price Index release (Liquidity impact)",
            "Spot ETF daily net inflow/outflow disclosures",
            "Upcoming crypto regulatory legislative votes"
        ],
        "market_reaction_validation": "BTCUSD trades at $63,450 (+0.51%), showing resilience against the equity pullback but unable to break above key $64,500 liquidity pools.",
        "macro_transmission_rule": "Global Liquidity Conditions + ETF Inflows vs Yield Hurdle Rates → BTC Range Dynamics",
        "last_updated": NOW
    },
    "usd": {
        "asset": "USD",
        "bias": "BULLISH",
        "score": 64,
        "confidence": 74,
        "executive_summary": "The US Dollar Index (DXY) maintains a constructive fundamental posture, supported by stable labor market indicators (Jobless Claims 228K vs 232K expected) and FOMC minutes underscoring a cautious approach towards rate cuts. The yield differential advantage of the greenback remains solid against peer major currencies.",
        "primary_drivers": [
            "Jobless claims and JOLTS data confirming labor stability",
            "US 10-Year yield pushing to 4.265%",
            "Rate cut expectations moderated to 25 bps rather than 50 bps",
            "European and Asian growth softness widening macro divergence"
        ],
        "bullish_factors": [
            {
                "title": "Economic Resilience & Strong Growth",
                "description": "US economic indicators continue to outperform peers in the G10 complex.",
                "impact": "BULLISH",
                "strength": 8,
                "source": "BEA GDP / ISM Services"
            },
            {
                "title": "Yield Spread Advantage",
                "description": "US Treasury yield spread over Bunds and JGBs remains wide.",
                "impact": "BULLISH",
                "strength": 8,
                "source": "Bond Markets"
            }
        ],
        "bearish_factors": [
            {
                "title": "Impending Rate Cut Cycle",
                "description": "The Fed is still poised to begin policy easing in the coming meetings.",
                "impact": "BEARISH",
                "strength": 7,
                "source": "FedWatch"
            }
        ],
        "key_events_to_watch": [
            "Core PCE Release",
            "August Non-Farm Payrolls",
            "FOMC September Rate Decision"
        ],
        "market_reaction_validation": "DXY is trading at 104.18 (+0.23%), hovering near the session high.",
        "macro_transmission_rule": "Stronger Data → Higher Yields → Widening Interest Rate Differentials → DXY Appreciation",
        "last_updated": NOW
    }
}

SEED_REPORTS: Dict[str, Any] = {
    "daily_brief": {
        "title": "🌅 DAILY MACRO FUNDAMENTAL BRIEF",
        "date": NOW.strftime("%d %b %Y"),
        "scores": {
            "USD": {"bias": "BULLISH", "score": 64, "confidence": 74},
            "XAUUSD": {"bias": "BEARISH", "score": -42, "confidence": 68},
            "BTCUSD": {"bias": "NEUTRAL", "score": 14, "confidence": 54}
        },
        "top_3_drivers": [
            "1. Federal Reserve policy patience & cautious FOMC minutes",
            "2. US 10-Year Treasury yields climbing to 4.265%",
            "3. Robust initial jobless claims reinforcing US labor resilience"
        ],
        "today_high_impact_events": [
            "US Initial Jobless Claims: Released at 228K (Better than 232K expected)",
            "US Core PCE Price Index: Tomorrow 14:30 UTC"
        ],
        "trump_market_watch": {
            "relevant_posts_count": 2,
            "highlight": "Trump demanded immediate Fed rate cuts on Truth Social, signaling potential macro friction around central bank independence."
        },
        "what_to_watch": "Core PCE inflation numbers tomorrow + US 10-Year yield trajectory around the key 4.30% resistance."
    },
    "weekly_report": {
        "title": "📊 WEEKLY MACRO INTELLIGENCE REPORT",
        "week_label": "Week 35, 2026",
        "summary_of_week": "The macro regime shifted from deep rate-cut pricing towards balanced data-dependency as US labor numbers stabilized and FOMC minutes tempered excessive easing speculation. Gold consolidated off all-time highs as yields bounced, while Bitcoin maintained solid institutional backing through sustained spot ETF net inflows.",
        "biggest_surprises": [
            "Initial Jobless Claims fell to 228K (Forecast: 232K)",
            "Core CPI printed at 3.2% vs 3.4% consensus",
            "Trump announced renewed Universal Tariff proposals"
        ],
        "what_changed_this_week": "DXY rebounded from 103.80 to 104.18 (+0.36%). US10Y gained +8.5 bps to 4.265%. Gold retreated -$18.00 from peak. Bitcoin remained firm above $63,000.",
        "upcoming_week_risk_catalysts": [
            "US Non-Farm Payrolls (NFP)",
            "FOMC Keynote Address",
            "ISM Manufacturing & Services PMIs"
        ]
    }
}
