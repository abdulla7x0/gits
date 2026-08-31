"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Newspaper, Search, Filter, Sparkles, Layers, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ImpactBadge } from "@/components/shared/ImpactBadge";
import { TierBadge } from "@/components/shared/TierBadge";
import { SurpriseTag } from "@/components/shared/SurpriseTag";

export default function LiveNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [selectedImpact, setSelectedImpact] = useState("ALL");
  const [selectedTier, setSelectedTier] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await api.getNews({
        category: selectedCat,
        impact: selectedImpact,
        tier: selectedTier,
        search: search || undefined,
      });
      setNews(data.items);
      setCategories(data.categories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCat, selectedImpact, selectedTier, search]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchNews} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Newspaper className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
                Live Macroeconomic News & AI Transmission
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Categorized, Deduplicated, Tier-Classified & Macro-Analyzed in Real-Time
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Fed, CPI, Tariffs, Gold..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-surface-300 border border-border rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-surface-300 p-3 rounded-lg border border-border text-xs font-mono">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">CATEGORY:</span>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Impact Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">IMPACT:</span>
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Impacts</option>
              <option value="VERY HIGH">Very High</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Tier Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">SOURCE TIER:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Tiers</option>
              <option value="TIER 1">Tier 1 (Official Gov/Fed)</option>
              <option value="TIER 2">Tier 2 (Reuters/Bloomberg)</option>
              <option value="TIER 3">Tier 3 (Secondary Financial)</option>
              <option value="TIER 4">Tier 4 (Social/Unverified)</option>
            </select>
          </div>

          <div className="ml-auto text-slate-400 text-[11px]">
            Showing <strong>{news.length}</strong> reports
          </div>
        </div>

        {/* News Stream */}
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-4"
            >
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TierBadge tier={item.source_tier} />
                  <ImpactBadge impact={item.impact_level} />
                  <span className="px-2 py-0.5 rounded bg-surface-300 text-slate-300 border border-border text-xs font-mono font-medium">
                    {item.category}
                  </span>
                  {item.sources_count > 1 && (
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-mono flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {item.sources_count} SOURCES REPORTING (Deduplicated)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Source: <strong className="text-slate-200">{item.source}</strong></span>
                  <span>•</span>
                  <span>{formatDate(item.published_at, "dd MMM, HH:mm IST")}</span>
                </div>
              </div>

              {/* Headline & Body */}
              <div>
                <h2 className="text-base font-bold text-slate-100 mb-2">
                  {item.headline}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.summary}
                </p>
                {item.full_content && (
                  <p className="text-xs text-slate-400 mt-2 font-sans italic border-l-2 border-slate-700 pl-3">
                    {item.full_content}
                  </p>
                )}
              </div>

              {/* Actual vs Forecast & Surprise */}
              {(item.actual || item.surprise) && (
                <div className="flex flex-wrap items-center gap-3 p-2.5 bg-surface-300/80 rounded-lg border border-border text-xs font-mono">
                  {item.actual && (
                    <div>
                      <span className="text-slate-500 block text-[10px]">ACTUAL:</span>
                      <span className="font-bold text-emerald-400">{item.actual}</span>
                    </div>
                  )}
                  {item.forecast && (
                    <div>
                      <span className="text-slate-500 block text-[10px]">FORECAST:</span>
                      <span className="text-slate-300">{item.forecast}</span>
                    </div>
                  )}
                  {item.previous && (
                    <div>
                      <span className="text-slate-500 block text-[10px]">PREVIOUS:</span>
                      <span className="text-slate-400">{item.previous}</span>
                    </div>
                  )}
                  {item.surprise && (
                    <div className="ml-auto">
                      <SurpriseTag surprise={item.surprise} />
                    </div>
                  )}
                </div>
              )}

              {/* Structured AI Macro Transmission Box */}
              <div className="bg-surface-300/90 border border-emerald-500/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>AI MACROECONOMIC TRANSMISSION ANALYSIS</span>
                  </div>
                  <span className="text-slate-400">
                    CONFIDENCE: <strong className="text-slate-200">{item.confidence}/100</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Macro Transmission Mechanism:</strong> {item.ai_why || item.ai_summary}
                </p>

                {/* Triple Impact Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-border/80 text-xs font-mono text-center">
                  <div className="p-2 rounded bg-surface-400 border border-border">
                    <span className="text-[10px] text-slate-500 block">USD / DXY IMPACT</span>
                    <span className="font-bold text-slate-200">{item.usd_impact}</span>
                  </div>
                  <div className="p-2 rounded bg-surface-400 border border-border">
                    <span className="text-[10px] text-slate-500 block">XAUUSD (GOLD) IMPACT</span>
                    <span className="font-bold text-slate-200">{item.xauusd_impact}</span>
                  </div>
                  <div className="p-2 rounded bg-surface-400 border border-border">
                    <span className="text-[10px] text-slate-500 block">BTCUSD (BITCOIN) IMPACT</span>
                    <span className="font-bold text-slate-200">{item.btcusd_impact}</span>
                  </div>
                </div>

                {/* Market Reaction Snapshot */}
                {item.market_reaction && Object.keys(item.market_reaction).length > 0 && (
                  <div className="pt-2 border-t border-border/60">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
                      Intraday Cross-Asset Reaction Snapshot:
                    </span>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      {Object.entries(item.market_reaction).map(([k, v]) => (
                        <div key={k} className="bg-surface-400 px-2.5 py-1 rounded border border-border">
                          <span className="text-slate-500 uppercase mr-1">{k}:</span>
                          <span className="text-slate-200 font-bold">{v as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
