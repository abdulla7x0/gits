"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight, ShieldAlert } from "lucide-react";
import { AlertItem } from "@/lib/types";

interface QuickAlertBannerProps {
  alert?: AlertItem;
}

export const QuickAlertBanner: React.FC<QuickAlertBannerProps> = ({ alert }) => {
  if (!alert) return null;

  const isTrump = alert.alert_type === "TRUMP_STATEMENT";

  return (
    <div
      className={`px-4 py-2 flex items-center justify-between text-xs font-mono border-b ${
        isTrump
          ? "bg-gradient-to-r from-rose-950/80 via-purple-950/70 to-surface-300 border-rose-600/50 text-rose-200"
          : "bg-gradient-to-r from-amber-950/80 via-surface-200 to-surface-300 border-amber-600/50 text-amber-200"
      }`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">
          {isTrump ? "TRUMP MARKET ALERT" : "HIGH IMPACT EVENT"}
        </span>
        <span className="font-semibold text-slate-100 truncate">{alert.title}</span>
        <span className="hidden md:inline text-slate-300 truncate">
          — {alert.message}
        </span>
      </div>

      <Link
        href={isTrump ? "/trump-posts" : "/alerts"}
        className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-white underline pl-2"
      >
        <span>View Impact</span>
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};
