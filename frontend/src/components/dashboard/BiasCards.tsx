"use client";

import React from "react";
import Link from "next/link";
import { BiasCardData } from "@/lib/types";
import { BiasBadge } from "../shared/BiasBadge";
import { ScoreGauge } from "../shared/ScoreGauge";
import { ArrowUpRight } from "lucide-react";

interface BiasCardsProps {
  cards?: {
    USD?: BiasCardData;
    XAUUSD?: BiasCardData;
    BTCUSD?: BiasCardData;
    EURUSD?: BiasCardData;
  };
}

export const BiasCards: React.FC<BiasCardsProps> = ({ cards }) => {
  const usd = cards?.USD;
  const xau = cards?.XAUUSD;
  const btc = cards?.BTCUSD;
  const eur = cards?.EURUSD;

  const renderCard = (
    data: BiasCardData | undefined,
    fallbackAsset: string,
    href: string,
    accentColor: string
  ) => {
    if (!data) return null;

    const isBullish = data.bias.includes("BULLISH");
    const isBearish = data.bias.includes("BEARISH");

    return (
      <div
        className={`bg-surface-200 border rounded-xl p-5 flex flex-col justify-between transition-all hover:border-slate-500 duration-200 relative overflow-hidden shadow-card ${
          isBullish
            ? "border-emerald-500/30 hover:shadow-bullishGlow"
            : isBearish
            ? "border-rose-500/30 hover:shadow-bearishGlow"
            : "border-amber-500/30"
        }`}
      >
        {/* Subtle Background Glow */}
        <div
          className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none ${
            isBullish ? "bg-emerald-500" : isBearish ? "bg-rose-500" : "bg-amber-500"
          }`}
        />

        {/* Card Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono tracking-wider text-slate-100">
                {data.asset || fallbackAsset}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Macro Regime
              </span>
            </div>
            <Link
              href={href}
              className="text-xs font-mono text-slate-400 hover:text-slate-100 flex items-center gap-1 group"
            >
              <span>Outlook</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Directional Bias Badge & Score Gauge */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <BiasBadge bias={data.bias} size="lg" />
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">
                CONFIDENCE: <strong className="text-slate-200">{data.confidence}%</strong>
              </div>
            </div>
          </div>

          {/* Visual Score Gauge */}
          <div className="mb-4 bg-surface-300/80 p-2.5 rounded-lg border border-border/80">
            <ScoreGauge score={data.score} confidence={data.confidence} showLabels={true} />
          </div>

          {/* Macro Drivers List */}
          <div className="space-y-1.5 mb-4">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Live Macro Drivers:
            </span>
            <ul className="space-y-1.5">
              {data.reasons?.map((reason, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 flex items-start gap-2 bg-surface-300/40 p-1.5 rounded border border-border/40"
                >
                  <span className="text-slate-500 font-mono mt-0.5">•</span>
                  <span className="leading-tight">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card Footer Micro-Metrics */}
        <div className="pt-3 border-t border-border/80 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
          {data.fed_expectations && (
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">Policy / Rates:</span>
              <span className="text-slate-300 truncate block">{data.fed_expectations}</span>
            </div>
          )}
          {data.treasury_yield_direction && (
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">Yield Metric:</span>
              <span className="text-slate-300 truncate block">{data.treasury_yield_direction}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {renderCard(usd, "USD", "/usd", "blue")}
      {renderCard(xau, "XAUUSD", "/xauusd", "amber")}
      {renderCard(btc, "BTCUSD", "/btcusd", "emerald")}
      {renderCard(eur, "EURUSD", "/eurusd", "blue")}
    </section>
  );
};
