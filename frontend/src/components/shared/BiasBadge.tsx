import React from "react";
import { cn } from "@/lib/utils";

interface BiasBadgeProps {
  bias: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BiasBadge: React.FC<BiasBadgeProps> = ({ bias, className, size = "md" }) => {
  const normalized = (bias || "NEUTRAL").toUpperCase();

  let colorClasses = "bg-neutral-900 text-neutral-300 border-neutral-700";
  let dotColor = "bg-neutral-400";

  if (normalized.includes("BULLISH") || normalized.includes("SUPPORTIVE")) {
    colorClasses = "bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]";
    dotColor = "bg-emerald-400";
  } else if (normalized.includes("BEARISH") || normalized.includes("PRESSURE") || normalized.includes("HOSTILE")) {
    colorClasses = "bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-[0_0_12px_rgba(239,68,68,0.15)]";
    dotColor = "bg-rose-400";
  } else if (normalized.includes("MIXED") || normalized.includes("NEUTRAL")) {
    colorClasses = "bg-amber-950/70 text-amber-300 border-amber-500/50";
    dotColor = "bg-amber-400";
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-mono tracking-wide",
    md: "px-2.5 py-1 text-xs font-mono font-medium tracking-wide",
    lg: "px-3.5 py-1.5 text-sm font-mono font-bold tracking-wider",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border uppercase transition-all duration-150",
        sizeClasses,
        colorClasses,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColor)} />
      {bias}
    </span>
  );
};
