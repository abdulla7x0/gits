"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { QuickAlertBanner } from "@/components/layout/QuickAlertBanner";
import { MarketDataTicker } from "@/components/dashboard/MarketDataTicker";
import { BiasCards } from "@/components/dashboard/BiasCards";
import { MacroTransmission } from "@/components/dashboard/MacroTransmission";
import { HighImpactCountdown } from "@/components/dashboard/HighImpactCountdown";
import { TrumpFeedWidget } from "@/components/dashboard/TrumpFeedWidget";
import { NewsFeedWidget } from "@/components/dashboard/NewsFeedWidget";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { api } from "@/lib/api";
import {
  OverviewData,
  NewsItem,
  CalendarEvent,
  TrumpPost,
  MarketTicker,
  AlertItem,
} from "@/lib/types";
import { Info, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [calendar, setCalendar] = useState<CalendarEvent[]>([]);
  const [trumpPosts, setTrumpPosts] = useState<TrumpPost[]>([]);
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const [ovData, newsData, calData, trumpData, marketData, alertsData] =
        await Promise.all([
          api.getOverview(),
          api.getNews(),
          api.getCalendar(),
          api.getTrumpPosts(),
          api.getMarketData(),
          api.getAlerts(),
        ]);

      setOverview(ovData);
      setNews(newsData.items);
      setCalendar(calData.events);
      setTrumpPosts(trumpData.posts);
      setTickers(marketData.tickers);
      setAlerts(alertsData.alerts);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeAlert = alerts.length > 0 ? alerts[0] : undefined;
  const recentTrump = trumpPosts.length > 0 ? trumpPosts[0] : undefined;
  const nextEvent = calendar.find((e) => !e.is_completed && e.impact_level === "VERY HIGH") || calendar[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <TopHeader
        status={overview?.system_status}
        onRefresh={fetchData}
        isRefreshing={isRefreshing}
      />

      {/* Cross-Asset Ticker Bar */}
      <MarketDataTicker tickers={tickers} />

      {/* Quick Alert Banner */}
      <QuickAlertBanner alert={activeAlert} />

      {/* Main Content Body */}
      <main className="p-5 md:p-6 space-y-6 max-w-[1700px] w-full mx-auto">
        {/* Real Data Feed Notice Banner */}
        <div className="bg-surface-200/90 border border-emerald-500/40 rounded-lg px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-300 shadow-[0_0_15px_rgba(16,185,129,0.08)]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              REAL-TIME FEEDS CONNECTED
            </span>
            <span className="text-slate-200">
              Live Quotes (XAUUSD, BTCUSD, EURUSD, DXY, US10Y) • Real Federal Reserve Wires • Authoritative Calendar
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold">
            🟢 LIVE STREAM ACTIVE
          </span>
        </div>

        {/* 1. Overall Fundamental Bias (Triple Cards: USD, XAUUSD, BTCUSD) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Macro Fundamental Regime & Scoring (-100 to +100)
            </h2>
            <span className="text-[11px] font-mono text-slate-500">
              Multi-Variable Matrix: Data + Surprise + Reaction + Context
            </span>
          </div>
          <BiasCards cards={overview?.bias_cards} />
        </section>

        {/* 2. Macro Transmission Engine (Visual Causal Chain) */}
        <section>
          <MacroTransmission nodes={overview?.macro_transmission} />
        </section>

        {/* 3. Middle & Right Grid (News, Calendar, Countdown, Trump Posts) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Middle Column (7 cols): News Feed & Economic Calendar */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Macro News Feed */}
            <NewsFeedWidget news={news} />

            {/* Economic Calendar & Surprise Matrix */}
            <CalendarWidget events={calendar} />
          </div>

          {/* Right Column (5 cols): High Impact Countdown & Dedicated Trump Feed */}
          <div className="lg:col-span-5 space-y-6">
            {/* Next High Impact Release Countdown */}
            <HighImpactCountdown event={nextEvent} />

            {/* Dedicated Trump Market Posts Widget */}
            <TrumpFeedWidget post={recentTrump} />
          </div>
        </section>
      </main>
    </div>
  );
}
