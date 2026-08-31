"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Globe, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { api } from "@/lib/api";
import { AssetOutlook } from "@/lib/types";
import { BiasBadge } from "@/components/shared/BiasBadge";
import { ScoreGauge } from "@/components/shared/ScoreGauge";

export default function EURUSDOutlookPage() {
  const [outlook, setOutlook] = useState<AssetOutlook | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOutlook = async () => {
    try {
      setLoading(true);
      const data = await api.getOutlooks();
      setOutlook(data.eurusd || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutlook();
  }, []);

  if (!outlook) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchOutlook} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Hero Card */}
        <div className="bg-surface-200 border border-border rounded-xl p-6 shadow-card space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono text-slate-100 tracking-wider">
                  EURUSD FUNDAMENTAL OUTLOOK
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Euro / US Dollar Macro Intelligence • ECB vs Fed Monetary Policy • Transatlantic Yield Differentials • Eurozone Trade
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
              EXECUTIVE MACRO SUMMARY:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {outlook.executive_summary}
            </p>
          </div>
        </div>

        {/* Core Drivers & Validation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-3">
            <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
              Primary Macro Drivers
            </h2>
            <ul className="space-y-2 text-xs font-mono">
              {outlook.primary_drivers.map((d, i) => (
                <li key={i} className="bg-surface-300/70 p-2.5 rounded border border-border flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-0.5">{i + 1}.</span>
                  <span className="text-slate-200">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-3">
            <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
              Market Reaction Validation
            </h2>
            <div className="p-3 bg-surface-300/70 rounded border border-border space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">
                Observed Exchange Rate Reaction vs Yield Spread:
              </span>
              <p className="text-xs font-sans text-slate-200 leading-relaxed">
                {outlook.market_reaction_validation}
              </p>
            </div>
            <div className="p-3 bg-surface-300/40 rounded border border-border">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Active Transmission Rule:
              </span>
              <span className="text-xs font-mono font-bold text-blue-300">
                {outlook.macro_transmission_rule}
              </span>
            </div>
          </div>
        </div>

        {/* Bullish & Bearish Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-200 border border-emerald-500/30 rounded-xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider">
                Supportive / Bullish Factors for EUR
              </h2>
            </div>
            <div className="space-y-3">
              {outlook.bullish_factors.map((f, i) => (
                <div key={i} className="p-3 bg-surface-300/60 rounded-lg border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-emerald-300">{f.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      Strength: {f.strength}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{f.description}</p>
                  {f.source && <span className="text-[10px] font-mono text-slate-500 block">Source: {f.source}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-200 border border-rose-500/30 rounded-xl p-5 shadow-card space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-500/20 text-rose-400">
              <TrendingDown className="w-4 h-4" />
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider">
                Headwinds / Bearish Factors for EUR
              </h2>
            </div>
            <div className="space-y-3">
              {outlook.bearish_factors.map((f, i) => (
                <div key={i} className="p-3 bg-surface-300/60 rounded-lg border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-rose-300">{f.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/40">
                      Strength: {f.strength}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{f.description}</p>
                  {f.source && <span className="text-[10px] font-mono text-slate-500 block">Source: {f.source}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Events to Watch */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-3">
          <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
            What to Watch Next (EURUSD Macro Catalysts)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            {outlook.key_events_to_watch.map((e, i) => (
              <div key={i} className="bg-surface-300/80 p-3 rounded-lg border border-border flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span>{e}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
