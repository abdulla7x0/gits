"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { MessageSquareQuote, Search, Filter, Sparkles, ExternalLink, ShieldAlert, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { TrumpPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function TrumpMarketPostsPage() {
  const [posts, setPosts] = useState<TrumpPost[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [selectedRelevance, setSelectedRelevance] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchTrumpPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getTrumpPosts({
        topic: selectedTopic,
        relevance: selectedRelevance,
        search: search || undefined,
      });
      setPosts(data.posts);
      setTopics(data.topics);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrumpPosts();
  }, [selectedTopic, selectedRelevance, search]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchTrumpPosts} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-surface-200 via-surface-200 to-pink-950/30 border-2 border-rose-500/50 rounded-xl p-5 shadow-trumpGlow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1 rounded bg-rose-950/80 border border-rose-500/60 text-rose-400">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
                  Trump Market Posts & AI Transmission
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-600 text-white animate-pulse">
                  DEDICATED SECTION
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Preserved Original Statements • Real-Time Classification • Cross-Asset Macro Transmission Analysis
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Tariffs, Fed, Bitcoin, Energy..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-surface-300 border border-border rounded-lg text-slate-200 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 bg-surface-300 p-3 rounded-lg border border-border text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">TOPIC:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2.5 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Topics</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">MARKET RELEVANCE:</span>
            <select
              value={selectedRelevance}
              onChange={(e) => setSelectedRelevance(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2.5 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Relevance Levels</option>
              <option value="VERY HIGH">Very High Impact</option>
              <option value="HIGH">High Impact</option>
              <option value="MEDIUM">Medium Impact</option>
              <option value="LOW">Low Impact</option>
            </select>
          </div>

          <div className="ml-auto text-slate-400 text-[11px]">
            Showing <strong>{posts.length}</strong> statements
          </div>
        </div>

        {/* Trump Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-surface-200 border-2 border-rose-500/40 rounded-xl p-5 shadow-card space-y-4 flex flex-col justify-between hover:border-rose-500 transition-colors"
            >
              <div>
                {/* Post Header: Profile & Metadata */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-rose-500/60 flex items-center justify-center font-bold text-xs text-rose-300 font-mono">
                      DJT
                    </div>
                    <div>
                      <span className="font-bold text-slate-100 block text-xs">
                        {post.author_name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {post.author_handle} • {post.platform}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono text-slate-400">
                    <span>{formatDate(post.published_at, "dd MMM, HH:mm IST")}</span>
                  </div>
                </div>

                {/* Topic & Impact Badges */}
                <div className="flex flex-wrap items-center gap-2 my-3">
                  <span className="px-2.5 py-1 rounded bg-surface-300 text-slate-200 border border-border text-xs font-mono font-bold">
                    TOPIC: {post.topic}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-rose-950/90 text-rose-300 border border-rose-600/70 text-xs font-mono font-bold">
                    🔥 {post.market_relevance}
                  </span>
                  {post.alert_triggered && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-600 text-white font-bold animate-pulse">
                      ALERT TRIGGERED
                    </span>
                  )}
                </div>

                {/* Original Post (Preserved Verbatim) */}
                <div className="mb-4 bg-surface-300/90 border border-border rounded-lg p-3.5 text-xs text-slate-200 font-sans italic leading-relaxed">
                  <span className="text-slate-500 block text-[9px] not-italic font-mono uppercase mb-1.5 font-semibold">
                    ORIGINAL POST TEXT (UNALTERED VERBATIM):
                  </span>
                  &ldquo;{post.original_text}&rdquo;
                </div>

                {/* AI Macro Transmission Analysis */}
                <div className="bg-surface-300/60 border border-rose-500/30 rounded-lg p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI TRANSMISSION INTERPRETATION</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      CONFIDENCE: <strong className="text-slate-200">{post.confidence}/100</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {post.ai_interpretation}
                  </p>

                  {/* Multi-Asset Transmission Grid */}
                  <div className="pt-2 border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="bg-surface-400 p-2 rounded border border-border">
                      <span className="text-[9px] text-slate-500 block">USD IMPACT</span>
                      <span className="font-bold text-[11px] text-rose-400 block truncate">
                        {post.usd_impact}
                      </span>
                    </div>
                    <div className="bg-surface-400 p-2 rounded border border-border">
                      <span className="text-[9px] text-slate-500 block">XAUUSD IMPACT</span>
                      <span className="font-bold text-[11px] text-emerald-400 block truncate">
                        {post.xauusd_impact}
                      </span>
                    </div>
                    <div className="bg-surface-400 p-2 rounded border border-border">
                      <span className="text-[9px] text-slate-500 block">BTCUSD IMPACT</span>
                      <span className="font-bold text-[11px] text-amber-400 block truncate">
                        {post.btcusd_impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Link */}
              {post.source_url && (
                <div className="pt-2 border-t border-border/60 text-right">
                  <a
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                  >
                    <span>View Verified Source ({post.platform})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
