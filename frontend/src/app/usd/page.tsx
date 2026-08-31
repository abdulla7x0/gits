"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { DollarSign, TrendingUp, TrendingDown, Layers, Activity } from "lucide-react";
import { api } from "@/lib/api";
import { AssetOutlook, MarketTicker } from "@/lib/types";
import { BiasBadge } from "@/components/shared/BiasBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";

export default function USDFundamentalsPage() {
  const [outlook, setOutlook] = useState<AssetOutlook | null>(null);
  const [tickers, setTickers] = useState<MarketTicker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [outlooksData, marketData] = await Promise.all([
          api.getOutlooks(),
          api.getMarketData(),
        ]);
        setOutlook(outlooksData.usd);
        setTickers(marketData.tickers);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!outlook) return null;

  const dxy = tickers.find((t) => t.symbol === "DXY");
  const us10y = tickers.find((t) => t.symbol === "US10Y");
  const us02y = tickers.find((t) => t.symbol === "US02Y");

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={() => {}} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Hero Card */}
        <div className="bg-surface-200 border border-border rounded-xl p-6 shadow-card space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono text-slate-100 tracking-wider">
                  USD / DXY FUNDAMENTALS & TREASURY YIELDS
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Federal Reserve Expectations • Rate Cut Timing • Yield Spread Differentials
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BiasBadge bias={outlook.bias} size="lg" />
              <div className="px-3 py-1.5 rounded-lg bg-surface-300 border border-border text-xs font-mono">
                <span className="text-slate-500">CONFIDENCE:</span>{" "}
                <strong className="text-slate-100">{outlook.confidence}/100</strong>
              </div>
            </div>
          </div>

          {/* Score Gauge */}
          <div className="bg-surface-300/80 p-4 rounded-xl border border-border">
            <ScoreGauge score={outlook.score} confidence={outlook.confidence} />
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-surface-300/50 border border-border space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider block">
              USD MACRO REGIME SUMMARY:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {outlook.executive_summary}
            </p>
          </div>
        </div>

        {/* Treasury Yields Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-200 border border-border rounded-xl p-4 shadow-card">
            <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
              US DOLLAR INDEX (DXY)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-100">
                {dxy?.price.toFixed(2) || "104.18"}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                +{dxy?.change_percent.toFixed(2) || "0.23"}%
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-2">
              Ascending intraday channel above 104.00 support
            </span>
          </div>

          <div className="bg-surface-200 border border-border rounded-xl p-4 shadow-card">
            <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
              US 10-YEAR BENCHMARK (US10Y)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-100">
                {us10y?.price.toFixed(3) || "4.265"}%
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                +{us10y?.change_percent.toFixed(2) || "1.07"}%
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-2">
              Yield resilience creating headwind for zero-yield Gold
            </span>
          </div>

          <div className="bg-surface-200 border border-border rounded-xl p-4 shadow-card">
            <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
              US 2-YEAR POLICY YIELD (US02Y)
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-100">
                {us02y?.price.toFixed(3) || "4.028"}%
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                +{us02y?.change_percent.toFixed(2) || "0.95"}%
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-2">
              Reflects Federal Reserve short-term policy easing path
            </span>
          </div>
        </div>

        {/* Bullish & Bearish Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-200 border border-emerald-500/30 rounded-xl p-5 shadow-card space-y-3">
            <h2 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
              USD Bullish Factors
            </h2>
            <div className="space-y-3">
              {outlook.bullish_factors.map((f, i) => (
                <div key={i} className="p-3 bg-surface-300/60 rounded-lg border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-emerald-300">{f.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400">
                      Strength: {f.strength}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{f.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-200 border border-rose-500/30 rounded-xl p-5 shadow-card space-y-3">
            <h2 className="text-sm font-bold font-mono text-rose-400 uppercase tracking-wider">
              USD Bearish Factors
            </h2>
            <div className="space-y-3">
              {outlook.bearish_factors.map((f, i) => (
                <div key={i} className="p-3 bg-surface-300/60 rounded-lg border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-rose-300">{f.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-400">
                      Strength: {f.strength}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
