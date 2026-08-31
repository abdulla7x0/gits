"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Activity, Radio, RefreshCw, Clock, ShieldCheck } from "lucide-react";
import { SystemStatusData } from "@/lib/types";

interface TopHeaderProps {
  status?: SystemStatusData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  status,
  onRefresh,
  isRefreshing = false,
}) => {
  const [timeState, setTimeState] = useState({
    utc: "",
    ist: "",
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // UTC
      const utcString = format(now, "HH:mm:ss") + " UTC";
      // IST (UTC+5:30)
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + " IST";

      setTimeState({ utc: utcString, ist: istString });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-surface-300 border-b border-border px-6 py-3 sticky top-0 z-20 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Platform Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-base font-bold font-mono tracking-wider text-slate-100 uppercase">
              XAU / BTC FUNDAMENTAL INTELLIGENCE
            </h2>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-surface-100 text-slate-400 border border-border">
            DECISION SUPPORT PLATFORM
          </span>
        </div>

        {/* Right: Clocks, System Status & Feed Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* Live Clocks */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-400/90 rounded border border-border/80 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeState.ist || "07:45:00 IST"}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{timeState.utc || "02:15:00 UTC"}</span>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/70 text-emerald-300 rounded border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">ONLINE</span>
          </div>

          {/* Data Sources Pills */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-surface-400 text-slate-300 border border-border flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> News
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-400 text-slate-300 border border-border flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Calendar
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-400 text-slate-300 border border-border flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Market Data
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-400 text-slate-300 border border-border flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> AI Transmission
            </span>
          </div>

          {/* Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded bg-surface-200 hover:bg-surface-100 text-slate-300 hover:text-white border border-border transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
