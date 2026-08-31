"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { TrendingUp, TrendingDown, Activity, Sparkles, BarChart2 } from "lucide-react";
import { api } from "@/lib/api";
import { MarketTicker } from "@/lib/types";

export default function MarketDataPage() {
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const data = await api.getMarketData();
      setTickers(data.tickers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchMarketData} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Page Banner */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              Cross-Asset Fundamental Market Monitor
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Multi-Asset Price Action Validation: DXY • US10Y • US02Y • Gold (XAUUSD) • Bitcoin (BTCUSD) • Nasdaq • S&P 500 • WTI Crude
          </p>
        </div>

        {/* Tickers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tickers.map((t) => {
            const isUp = t.change >= 0;

            return (
              <div
                key={t.symbol}
                className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-4 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold font-mono text-slate-100 block">
                      {t.symbol}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {t.name}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-300 text-slate-300 border border-border">
                    {t.asset_class}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-border">
                  <span className="text-2xl font-bold font-mono text-slate-100">
                    {t.price > 1000
                      ? t.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : t.price.toFixed(t.symbol.includes("US") ? 3 : 2)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      isUp
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                        : "bg-rose-950/80 text-rose-400 border border-rose-500/40"
                    }`}
                  >
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isUp ? `+${t.change_percent.toFixed(2)}%` : `${t.change_percent.toFixed(2)}%`}
                  </span>
                </div>

                {/* Day Range */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-border/80">
                  <div>
                    <span className="text-slate-500 block text-[9px]">DAY LOW</span>
                    <span className="text-slate-200">{t.day_low}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">DAY HIGH</span>
                    <span className="text-slate-200">{t.day_high}</span>
                  </div>
                </div>

                {/* Intraday Sparkline Bar */}
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">
                    INTRADAY TREND: {t.intraday_trend}
                  </span>
                  <div className="flex items-end gap-1.5 h-8 bg-surface-300 p-1 rounded border border-border">
                    {t.sparkline?.map((val, idx) => {
                      const min = Math.min(...t.sparkline);
                      const max = Math.max(...t.sparkline);
                      const heightPercent = max === min ? 50 : Math.max(15, ((val - min) / (max - min)) * 100);

                      return (
                        <div
                          key={idx}
                          className={`flex-1 rounded-sm ${isUp ? "bg-emerald-500/60" : "bg-rose-500/60"}`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
