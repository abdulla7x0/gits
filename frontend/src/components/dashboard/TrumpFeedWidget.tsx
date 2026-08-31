"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareQuote, ArrowUpRight, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";
import { TrumpPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface TrumpFeedWidgetProps {
  post?: TrumpPost;
}

export const TrumpFeedWidget: React.FC<TrumpFeedWidgetProps> = ({ post }) => {
  if (!post) return null;

  return (
    <div className="bg-gradient-to-br from-surface-200 via-surface-200 to-pink-950/20 border-2 border-rose-500/50 rounded-xl p-5 shadow-trumpGlow relative overflow-hidden">
      {/* Visual Accent Badge */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-rose-500/30">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-rose-950/80 border border-rose-500/60 text-rose-400">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold font-mono tracking-wider text-rose-300 uppercase">
            TRUMP MARKET POST
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-600 text-white animate-pulse">
            NEW
          </span>
        </div>

        <Link
          href="/trump-posts"
          className="text-xs font-mono text-rose-300 hover:text-white flex items-center gap-1 group"
        >
          <span>All Posts</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Author & Timestamp */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-rose-500/40 flex items-center justify-center font-bold text-[10px] text-rose-300 font-mono">
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
        <span className="text-[11px] font-mono text-slate-400">
          {formatDate(post.published_at, "dd MMM, HH:mm")}
        </span>
      </div>

      {/* Topic & Market Relevance */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded bg-surface-300 text-slate-200 border border-border text-[11px] font-mono font-bold">
          TOPIC: {post.topic}
        </span>
        <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-600/60 text-[11px] font-mono font-bold">
          🔥 {post.market_relevance}
        </span>
      </div>

      {/* Original Verbatim Post Text */}
      <div className="mb-4 bg-surface-300/90 border border-border rounded-lg p-3 text-xs text-slate-200 font-sans italic leading-relaxed relative">
        <span className="text-slate-500 block text-[9px] not-italic font-mono uppercase mb-1">
          ORIGINAL POST TEXT (VERBATIM):
        </span>
        &ldquo;{post.original_text}&rdquo;
      </div>

      {/* AI Market Interpretation */}
      <div className="bg-surface-300/60 border border-rose-500/30 rounded-lg p-3 mb-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-rose-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI MARKET INTERPRETATION</span>
          </div>
          <span className="text-[10px] text-slate-400">
            CONFIDENCE: <strong className="text-slate-200">{post.confidence}/100</strong>
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-snug">
          {post.ai_interpretation}
        </p>

        {/* Potential Asset Impact Badges */}
        <div className="pt-2 border-t border-border/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="bg-surface-400 p-1.5 rounded border border-border">
            <span className="text-[9px] text-slate-400 block">USD</span>
            <span className="font-bold text-[11px] text-rose-400 truncate block">
              {post.usd_impact.split(" ")[0]}
            </span>
          </div>
          <div className="bg-surface-400 p-1.5 rounded border border-border">
            <span className="text-[9px] text-slate-400 block">XAUUSD</span>
            <span className="font-bold text-[11px] text-emerald-400 truncate block">
              {post.xauusd_impact.split(" ")[0]}
            </span>
          </div>
          <div className="bg-surface-400 p-1.5 rounded border border-border">
            <span className="text-[9px] text-slate-400 block">BTCUSD</span>
            <span className="font-bold text-[11px] text-amber-400 truncate block">
              {post.btcusd_impact.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Source Reference Link */}
      {post.source_url && (
        <div className="text-right">
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
          >
            <span>View Source on {post.platform}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
