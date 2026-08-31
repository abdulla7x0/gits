# XAU / BTC Fundamental Intelligence

Institutional macroeconomic decision-support platform engineered to continuously collect, classify, analyze, and present macroeconomic, geopolitical, and political intelligence impacting **XAUUSD (Gold)**, **BTCUSD (Bitcoin)**, **USD / DXY**, and **US Treasury Yields**.

---

## 🏛️ Platform Architecture (Phase 1 — Foundation)

```
tahammil/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/
│   │   │   ├── overview.py         # System status, 3 Large Bias Cards, Macro Transmission Nodes
│   │   │   ├── news.py             # Deduplicated live news feed, source tiers, AI why & reactions
│   │   │   ├── calendar.py         # Consensus vs Actuals, Surprises, Pre/Post reactions
│   │   │   ├── trump_posts.py      # Dedicated Trump Market Posts & classification
│   │   │   ├── market_data.py      # DXY, US10Y, US02Y, XAU, BTC, NQ, SPX, Oil
│   │   │   ├── outlook.py          # Detailed XAUUSD and BTCUSD fundamental outlooks
│   │   │   ├── alerts.py           # Alerts and Telegram notifications preview/log
│   │   │   └── reports.py          # Daily Morning Brief & Weekly Macro Reports
│   │   │   └── api_router.py
│   │   ├── core/
│   │   │   ├── config.py           # Pydantic v2 Settings & environment loader
│   │   │   ├── database.py         # Async SQLAlchemy engine & session factory
│   │   │   └── logging.py          # Structured logging
│   │   ├── models/                 # SQLAlchemy DB Models (Postgres & SQLite async compatible)
│   │   ├── schemas/                # Pydantic response & validation schemas
│   │   ├── services/               # Macro transmission rules, scoring (-100 to +100), deduplication
│   │   └── providers/              # Provider abstraction layer (news, calendar, market, social)
│   ├── tests/
│   │   └── test_api.py             # Pytest automated test suite
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Executive Fundamental Dashboard
│   │   │   ├── news/               # Live Macro News & AI Transmission
│   │   │   ├── calendar/           # Economic Calendar with countdowns & surprises
│   │   │   ├── trump-posts/        # Dedicated Trump Market Posts (Verbatim + Multi-Asset badges)
│   │   │   ├── xauusd/             # XAUUSD Deep Fundamental Outlook
│   │   │   ├── btcusd/             # BTCUSD Deep Fundamental Outlook
│   │   │   ├── usd/                # USD & Treasury Yield Matrix
│   │   │   ├── market-data/        # Live Cross-Asset Monitor
│   │   │   ├── alerts/             # Real-time Alerts & Telegram Integration Center
│   │   │   ├── reports/            # Daily Morning Brief & Weekly Macro Report
│   │   │   ├── watchlist/          # Personal Fundamental Notes & Watchlist
│   │   │   └── settings/           # System Settings & Provider Diagnostics
│   │   ├── components/             # Institutional dark-themed UI components
│   │   └── lib/                    # API client, TypeScript domain types, utilities
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## ⚡ Quick Start & Running Locally

### 1. Backend (FastAPI + Async SQLAlchemy)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run automated tests
PYTHONPATH=. pytest tests/test_api.py

# Start Backend Server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
* Interactive API Docs: `http://localhost:8000/docs`
* Health Check: `http://localhost:8000/health`

### 2. Frontend (Next.js 14 + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev
```
* Access Web Application: `http://localhost:3000`

---

## 🧭 Core Fundamental Features Built in Phase 1

1. **Executive 30-Second Dashboard**: Answers all 14 macro questions instantly without information overload.
2. **Overall Fundamental Bias**: Large triple scorecards for **USD**, **XAUUSD**, and **BTCUSD** (-100 to +100 scale) with confidence metrics and causal drivers.
3. **Macro Transmission Engine**: Transparent, probabilistic causal links explaining *how* data flows through yields, currencies, and assets.
4. **Dedicated Trump Market Posts**: Visually isolated section preserving unaltered verbatim post text, topic classification, and multi-asset AI transmission analysis.
5. **Economic Calendar with Surprises**: Mandatory **Actual vs Forecast vs Previous** calculations with pre/post event validation.
6. **Cross-Asset Market Data Ticker**: Real-time monitor of DXY, US10Y, US02Y, XAUUSD, BTCUSD, NQ, SPX, and WTI.
7. **Multi-Source Deduplication**: Story clustering indicating multi-outlet corroboration (`3 SOURCES REPORTING`).
8. **Source Reliability Tiers**: Strict classification from Tier 1 (Official Gov/Fed) down to Tier 4.
9. **Alerts & Telegram Integration**: Web push and simulated Telegram bot dispatch formatting.
10. **Automated Reports**: Morning Macro Brief and Weekly Syntheses.
