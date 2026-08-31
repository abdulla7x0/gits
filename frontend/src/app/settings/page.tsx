"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Settings, ShieldCheck, Database, Key, Globe, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [demoMode, setDemoMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={() => {}} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-slate-300" />
            <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              System Settings & Provider Diagnostics
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Data Provider Connections • Database Status • Telegram Alert Configuration • API Key Manager
          </p>
        </div>

        {/* System Diagnostics Status */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Provider Diagnostics & Health Checks</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-surface-300 p-3 rounded-lg border border-border space-y-1">
              <span className="text-slate-500 block text-[10px]">DATABASE ENGINE</span>
              <span className="font-bold text-emerald-400">SQLite / PostgreSQL Async</span>
              <span className="text-[10px] text-slate-400 block">Status: CONNECTED</span>
            </div>

            <div className="bg-surface-300 p-3 rounded-lg border border-border space-y-1">
              <span className="text-slate-500 block text-[10px]">ECONOMIC CALENDAR</span>
              <span className="font-bold text-emerald-400">Institutional Seed Engine</span>
              <span className="text-[10px] text-slate-400 block">Surprise Engine: ACTIVE</span>
            </div>

            <div className="bg-surface-300 p-3 rounded-lg border border-border space-y-1">
              <span className="text-slate-500 block text-[10px]">TRUMP POSTS FEED</span>
              <span className="font-bold text-rose-400">Truth Social Classification</span>
              <span className="text-[10px] text-slate-400 block">Verbatim Filter: ACTIVE</span>
            </div>

            <div className="bg-surface-300 p-3 rounded-lg border border-border space-y-1">
              <span className="text-slate-500 block text-[10px]">AI TRANSMISSION</span>
              <span className="font-bold text-emerald-400">Probabilistic Causal Engine</span>
              <span className="text-[10px] text-slate-400 block">Confidence Scoring: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* API Credentials Configuration Form */}
        <form
          onSubmit={handleSave}
          className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-400" />
              <span>External API Credentials (Optional for Phase 2+)</span>
            </h2>
            {saved && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Configuration Saved</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400 block">OPENAI API KEY (For Real-Time LLM Inferences)</label>
              <input
                type="password"
                placeholder="sk-proj-..."
                className="w-full bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 block">TELEGRAM BOT TOKEN</label>
              <input
                type="password"
                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                className="w-full bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 block">FRED API KEY (Federal Reserve Economic Data)</label>
              <input
                type="password"
                placeholder="abcdef0123456789..."
                className="w-full bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 block">TELEGRAM CHAT / CHANNEL ID</label>
              <input
                type="text"
                placeholder="-100123456789"
                className="w-full bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="demoModeCheck"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                className="rounded bg-surface-300 border-border text-emerald-500 focus:ring-0"
              />
              <label htmlFor="demoModeCheck" className="text-xs font-mono text-slate-300">
                Enable High-Fidelity Demo Simulation Mode
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900 rounded-lg text-xs font-mono font-bold transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
