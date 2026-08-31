import React from "react";
import { formatScore, cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number; // -100 to +100
  confidence?: number;
  showLabels?: boolean;
  size?: "sm" | "md";
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  confidence,
  showLabels = true,
  size = "md",
}) => {
  // Normalize score (-100 to +100) to percentage (0% to 100%)
  const percentage = Math.min(100, Math.max(0, ((score + 100) / 200) * 100));
  const isPositive = score >= 0;

  return (
    <div className="w-full space-y-1.5">
      {showLabels && (
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">FUNDAMENTAL SCORE:</span>
            <span
              className={cn(
                "font-bold px-1.5 py-0.5 rounded",
                score > 25
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                  : score < -25
                  ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                  : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
              )}
            >
              {formatScore(score)}
            </span>
          </div>
          {confidence !== undefined && (
            <span className="text-slate-400">
              CONFIDENCE: <strong className="text-slate-200">{confidence}/100</strong>
            </span>
          )}
        </div>
      )}

      {/* Meter Track */}
      <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        {/* Neutral Zero Center Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-600 z-10" />

        {/* Dynamic Bar Fill */}
        {isPositive ? (
          <div
            className="absolute top-0 bottom-0 left-1/2 bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 rounded-r-sm"
            style={{ width: `${(score / 100) * 50}%` }}
          />
        ) : (
          <div
            className="absolute top-0 bottom-0 right-1/2 bg-gradient-to-l from-rose-600 to-rose-400 transition-all duration-500 rounded-l-sm"
            style={{ width: `${(Math.abs(score) / 100) * 50}%` }}
          />
        )}
      </div>

      {/* Scale Range Footnotes */}
      <div className="flex justify-between text-[10px] font-mono text-slate-500 px-0.5">
        <span>-100 (Strong Bearish)</span>
        <span>0 (Neutral)</span>
        <span>+100 (Strong Bullish)</span>
      </div>
    </div>
  );
};
