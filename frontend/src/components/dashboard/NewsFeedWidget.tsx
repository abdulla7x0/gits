"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Newspaper, ArrowUpRight, Sparkles, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ImpactBadge } from "../shared/ImpactBadge";
import { TierBadge } from "../shared/TierBadge";
import { BiasBadge } from "../shared/BiasBadge";
import { SurpriseTag } from "../shared/SurpriseTag";

interface NewsFeedWidgetProps {
  news?: NewsItem[];
}

export const NewsFeedWidget: React.FC<NewsFeedWidgetProps> = ({ news }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  if (!news || news.length === 0) return null;

  const categories = ["ALL", "Federal Reserve", "Inflation", "Employment", "Geopolitics", "Crypto"];

  const filteredNews = activeCategory === "ALL"
    ? news
    : news.filter((n) => n.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-surface-300 border border-border text-emerald-400">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase">
              Live Macro News & AI Transmission
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Real-Time Filtered Economic Intelligence
            </p>
          </div>
        </div>

        <Link
          href="/news"
          className="text-xs font-mono text-slate-400 hover:text-slate-100 flex items-center gap-1 group"
        >
          <span>View All News</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-border/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-surface-100 text-emerald-300 border border-emerald-500/50 font-semibold"
                : "bg-surface-300 text-slate-400 hover:text-slate-200 border border-border/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Items List */}
      <div className="space-y-3">
        {filteredNews.slice(0, 4).map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-surface-300/70 border border-border/80 rounded-lg p-3.5 transition-colors hover:border-slate-500"
            >
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <TierBadge tier={item.source_tier} />
                  <ImpactBadge impact={item.impact_level} />
                  <span className="px-2 py-0.5 rounded bg-surface-400 text-slate-300 border border-border text-[10px] font-mono">
                    {item.category}
                  </span>
                  {item.sources_count > 1 && (
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 text-[10px] font-mono flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" />
                      {item.sources_count} SOURCES
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  {formatDate(item.published_at, "HH:mm IST")}
                </span>
              </div>

              {/* Headline */}
              <h4 className="text-sm font-semibold text-slate-100 mb-1.5 leading-snug">
                {item.headline}
              </h4>

              {/* Factual Summary */}
              <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                {item.summary}
              </p>

              {/* Surprise Tag if available */}
              {item.surprise && (
                <div className="mb-2">
                  <SurpriseTag surprise={item.surprise} />
                </div>
              )}

              {/* Quick Asset Transmission Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">IMPACT:</span>
                  <span className="text-[11px] text-slate-300">
                    USD: <strong className={item.usd_impact.includes("Bullish") ? "text-emerald-400" : item.usd_impact.includes("Bearish") ? "text-rose-400" : "text-amber-400"}>{item.usd_impact}</strong>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-[11px] text-slate-300">
                    XAU: <strong className={item.xauusd_impact.includes("Bullish") ? "text-emerald-400" : item.xauusd_impact.includes("Bearish") ? "text-rose-400" : "text-amber-400"}>{item.xauusd_impact}</strong>
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-[11px] text-slate-300">
                    BTC: <strong className={item.btcusd_impact.includes("Bullish") ? "text-emerald-400" : item.btcusd_impact.includes("Bearish") ? "text-rose-400" : "text-amber-400"}>{item.btcusd_impact}</strong>
                  </span>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>{isExpanded ? "Collapse AI Why" : "AI Transmission"}</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Expanded AI Macro Transmission Explanation */}
              {isExpanded && (
                <div className="mt-3 p-3 rounded bg-surface-400 border border-emerald-500/30 text-xs space-y-2 font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>WHY THIS MATTERS (TRANSMISSION MECHANISM):</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    {item.ai_why || item.ai_summary}
                  </p>

                  {/* Market Reaction Snapshot */}
                  {item.market_reaction && Object.keys(item.market_reaction).length > 0 && (
                    <div className="pt-2 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                      {item.market_reaction.dxy && (
                        <div>
                          <span className="text-slate-500 block">DXY REACTION</span>
                          <span className="text-slate-200 font-bold">{item.market_reaction.dxy}</span>
                        </div>
                      )}
                      {item.market_reaction.us10y && (
                        <div>
                          <span className="text-slate-500 block">US10Y REACTION</span>
                          <span className="text-slate-200 font-bold">{item.market_reaction.us10y}</span>
                        </div>
                      )}
                      {item.market_reaction.gold && (
                        <div>
                          <span className="text-slate-500 block">GOLD REACTION</span>
                          <span className="text-slate-200 font-bold">{item.market_reaction.gold}</span>
                        </div>
                      )}
                      {item.market_reaction.btc && (
                        <div>
                          <span className="text-slate-500 block">BITCOIN REACTION</span>
                          <span className="text-slate-200 font-bold">{item.market_reaction.btc}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
