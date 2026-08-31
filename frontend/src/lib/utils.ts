import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string, formatStr: string = "dd MMM, HH:mm"): string {
  if (!dateString) return "--";
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (e) {
    return dateString;
  }
}

export function formatScore(score: number): string {
  return score > 0 ? `+${score}` : `${score}`;
}

export function getScoreColor(score: number): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  if (score >= 70) {
    return {
      bg: "bg-bullish-dark/40",
      text: "text-bullish-text",
      border: "border-bullish",
      label: "STRONG BULLISH",
    };
  }
  if (score >= 30) {
    return {
      bg: "bg-bullish-dark/30",
      text: "text-bullish-text",
      border: "border-bullish/60",
      label: "BULLISH",
    };
  }
  if (score > -30) {
    return {
      bg: "bg-neutral-dark/30",
      text: "text-neutral-text",
      border: "border-neutral/60",
      label: "NEUTRAL",
    };
  }
  if (score > -70) {
    return {
      bg: "bg-bearish-dark/30",
      text: "text-bearish-text",
      border: "border-bearish/60",
      label: "BEARISH",
    };
  }
  return {
    bg: "bg-bearish-dark/50",
    text: "text-bearish-text",
    border: "border-bearish",
    label: "STRONG BEARISH",
  };
}

export function getImpactBadgeStyle(impact: string) {
  switch (impact?.toUpperCase()) {
    case "VERY HIGH":
      return "bg-rose-950/70 text-rose-400 border border-rose-600/60 shadow-[0_0_12px_rgba(244,63,94,0.2)]";
    case "HIGH":
      return "bg-amber-950/70 text-amber-400 border border-amber-500/60";
    case "MEDIUM":
      return "bg-yellow-950/40 text-yellow-300 border border-yellow-600/40";
    case "LOW":
      return "bg-slate-900 text-slate-400 border border-slate-700";
    default:
      return "bg-slate-900 text-slate-400 border border-slate-700";
  }
}

export function getTierBadgeStyle(tier: string) {
  switch (tier?.toUpperCase()) {
    case "TIER 1":
      return "bg-emerald-950/80 text-emerald-300 border border-emerald-500/70 font-semibold";
    case "TIER 2":
      return "bg-blue-950/80 text-blue-300 border border-blue-500/70";
    case "TIER 3":
      return "bg-amber-950/60 text-amber-300 border border-amber-600/50";
    case "TIER 4":
      return "bg-purple-950/60 text-purple-300 border border-purple-600/50";
    default:
      return "bg-slate-800 text-slate-300 border border-slate-700";
  }
}
