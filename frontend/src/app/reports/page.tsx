"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { FileText, Sun, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function ReportsPage() {
  const [daily, setDaily] = useState<any>(null);
  const [weekly, setWeekly] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"DAILY" | "WEEKLY">("DAILY");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [d, w] = await Promise.all([
          api.getDailyReport(),
          api.getWeeklyReport(),
        ]);
        setDaily(d);
        setWeekly(w);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={() => {}} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Header */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
                Automated Macro Intelligence Reports & Briefs
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Daily Morning Executive Briefs • Weekly Multi-Asset Macroeconomic Syntheses
            </p>
          </div>

          <div className="flex items-center bg-surface-300 p-1 rounded-lg border border-border text-xs font-mono">
            <button
              onClick={() => setActiveTab("DAILY")}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeTab === "DAILY"
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Daily Morning Brief</span>
            </button>
            <button
              onClick={() => setActiveTab("WEEKLY")}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                activeTab === "WEEKLY"
                  ? "bg-blue-950/80 text-blue-300 border border-blue-500/50 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Macro Report</span>
            </button>
          </div>
        </div>

        {/* Report Content */}
        {activeTab === "DAILY" && daily && (
          <div className="bg-surface-200 border border-border rounded-xl p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-lg font-bold font-mono text-slate-100">
                {daily.title}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                DATE: {daily.date}
              </span>
            </div>

            {/* Scorecards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface-300 p-4 rounded-xl border border-border text-center font-mono">
                <span className="text-xs text-slate-400 block mb-1">USD BIAS</span>
                <span className="text-base font-bold text-emerald-400">
                  {daily.scores.USD.bias} ({daily.scores.USD.score > 0 ? `+${daily.scores.USD.score}` : daily.scores.USD.score})
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Confidence: {daily.scores.USD.confidence}%</span>
              </div>

              <div className="bg-surface-300 p-4 rounded-xl border border-border text-center font-mono">
                <span className="text-xs text-slate-400 block mb-1">XAUUSD BIAS</span>
                <span className="text-base font-bold text-rose-400">
                  {daily.scores.XAUUSD.bias} ({daily.scores.XAUUSD.score})
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Confidence: {daily.scores.XAUUSD.confidence}%</span>
              </div>

              <div className="bg-surface-300 p-4 rounded-xl border border-border text-center font-mono">
                <span className="text-xs text-slate-400 block mb-1">BTCUSD BIAS</span>
                <span className="text-base font-bold text-amber-400">
                  {daily.scores.BTCUSD.bias} (+{daily.scores.BTCUSD.score})
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Confidence: {daily.scores.BTCUSD.confidence}%</span>
              </div>
            </div>

            {/* Drivers */}
            <div className="bg-surface-300/60 p-4 rounded-xl border border-border space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-300 tracking-wider block">
                Top 3 Macro Drivers Today:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200 font-sans">
                {daily.top_3_drivers.map((d: string, i: number) => (
                  <li key={i} className="bg-surface-400 p-2 rounded border border-border/80">
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trump Watch & What to Watch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-300/60 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-rose-300 tracking-wider block">
                  Trump Market Watch ({daily.trump_market_watch.relevant_posts_count} Relevant Posts):
                </span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {daily.trump_market_watch.highlight}
                </p>
              </div>

              <div className="bg-surface-300/60 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-300 tracking-wider block">
                  What to Watch Next:
                </span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {daily.what_to_watch}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Report */}
        {activeTab === "WEEKLY" && weekly && (
          <div className="bg-surface-200 border border-border rounded-xl p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-lg font-bold font-mono text-slate-100">
                {weekly.title}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {weekly.week_label}
              </span>
            </div>

            <div className="p-4 bg-surface-300/70 rounded-xl border border-border space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider block">
                Executive Synthesis:
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {weekly.summary_of_week}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-300/60 p-4 rounded-xl border border-border space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider block">
                  Biggest Economic Surprises:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
                  {weekly.biggest_surprises.map((s: string, i: number) => (
                    <li key={i} className="bg-surface-400 p-2 rounded border border-border">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-300/60 p-4 rounded-xl border border-border space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider block">
                  What Changed This Week?
                </span>
                <p className="text-xs text-slate-200 font-mono leading-relaxed bg-surface-400 p-3 rounded border border-border">
                  {weekly.what_changed_this_week}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
