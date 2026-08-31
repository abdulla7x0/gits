"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Activity } from "lucide-react";
import { MarketTicker } from "@/lib/types";

interface MarketDataTickerProps {
  tickers?: MarketTicker[];
}

export const MarketDataTicker: React.FC<MarketDataTickerProps> = ({ tickers }) => {
  if (!tickers || tickers.length === 0) return null;

  return (
    <div className="bg-surface-300 border-y border-border px-4 py-2 overflow-x-auto select-none">
      <div className="flex items-center gap-4 min-w-max">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 border-r border-border pr-3">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="uppercase font-bold tracking-wider text-slate-300">
            CROSS-ASSET MONITOR
          </span>
        </div>

        {tickers.map((t) => {
          const isUp = t.change >= 0;
          const isNeutral = t.change === 0;

          return (
            <div
              key={t.symbol}
              className="flex items-center gap-2.5 px-3 py-1 rounded bg-surface-400/80 border border-border/80 text-xs font-mono hover:border-slate-500 transition-colors"
            >
              {/* Symbol & Name */}
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-100">{t.symbol}</span>
                <span className="text-[10px] text-slate-500 hidden xl:inline">({t.name.split(" ")[0]})</span>
              </div>

              {/* Price */}
              <span className="font-semibold text-slate-200">
                {t.price > 1000
                  ? t.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : t.price.toFixed(t.symbol.includes("US") ? 3 : 2)}
              </span>

              {/* Change % badge */}
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isUp
                    ? "bg-emerald-950/90 text-emerald-400 border border-emerald-500/40"
                    : "bg-rose-950/90 text-rose-400 border border-rose-500/40"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-2.5 h-2.5" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5" />
                )}
                {isUp ? `+${t.change_percent.toFixed(2)}%` : `${t.change_percent.toFixed(2)}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
