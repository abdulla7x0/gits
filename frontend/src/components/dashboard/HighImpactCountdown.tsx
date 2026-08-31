"use client";

import React, { useState, useEffect } from "react";
import { Timer, AlertTriangle, Calendar, TrendingUp } from "lucide-react";
import { CalendarEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { parseISO, differenceInSeconds } from "date-fns";

interface HighImpactCountdownProps {
  event?: CalendarEvent;
}

export const HighImpactCountdown: React.FC<HighImpactCountdownProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    if (!event?.scheduled_time) return;

    const calculateTime = () => {
      try {
        const target = parseISO(event.scheduled_time);
        const now = new Date();
        const diffSeconds = differenceInSeconds(target, now);

        if (diffSeconds <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
          return;
        }

        const days = Math.floor(diffSeconds / (3600 * 24));
        const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      } catch (e) {
        // fallback
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [event?.scheduled_time]);

  if (!event) return null;

  return (
    <div className="bg-gradient-to-br from-surface-200 via-surface-200 to-rose-950/20 border border-rose-500/40 rounded-xl p-5 shadow-card relative overflow-hidden">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-border/80">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-rose-600 text-white animate-pulse">
            🔥 HIGH IMPACT COUNTDOWN
          </span>
          <span className="text-xs font-mono text-slate-400">
            {event.currency} / {event.country}
          </span>
        </div>
        <span className="text-xs font-mono text-slate-300">
          {formatDate(event.scheduled_time, "dd MMM, HH:mm")} IST
        </span>
      </div>

      {/* Event Title */}
      <h3 className="text-base font-bold font-mono text-slate-100 mb-3">
        {event.title}
      </h3>

      {/* Countdown Digits */}
      <div className="mb-4 bg-surface-300/90 border border-rose-500/30 rounded-lg p-3">
        <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
          TIME REMAINING UNTIL RELEASE:
        </span>
        {timeLeft.isPast ? (
          <div className="text-sm font-mono font-bold text-amber-400">
            RELEASED / PENDING CONFIRMATION
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-surface-400 p-1.5 rounded border border-border">
              <span className="text-lg font-bold text-rose-400">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-[9px] text-slate-500 block">DAYS</span>
            </div>
            <div className="bg-surface-400 p-1.5 rounded border border-border">
              <span className="text-lg font-bold text-rose-400">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-[9px] text-slate-500 block">HOURS</span>
            </div>
            <div className="bg-surface-400 p-1.5 rounded border border-border">
              <span className="text-lg font-bold text-rose-400">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-[9px] text-slate-500 block">MINS</span>
            </div>
            <div className="bg-surface-400 p-1.5 rounded border border-border">
              <span className="text-lg font-bold text-rose-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-[9px] text-slate-500 block">SECS</span>
            </div>
          </div>
        )}
      </div>

      {/* Pre-Release Forecast & Consensus */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-mono">
        <div className="bg-surface-300/60 p-2 rounded border border-border">
          <span className="text-[10px] text-slate-400 block uppercase">CONSENSUS FORECAST:</span>
          <span className="font-bold text-slate-200">{event.forecast || "0.2% / 2.6%"}</span>
        </div>
        <div className="bg-surface-300/60 p-2 rounded border border-border">
          <span className="text-[10px] text-slate-400 block uppercase">PREVIOUS READING:</span>
          <span className="font-bold text-slate-300">{event.previous || "0.2% / 2.6%"}</span>
        </div>
      </div>

      {/* Expected Macro Scenario */}
      {event.usd_effect && (
        <div className="text-xs bg-surface-300/40 p-2 rounded border border-border text-slate-300 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            SCENARIO MAPPING:
          </span>
          <div className="text-[11px] font-mono text-slate-300">
            <strong>USD:</strong> {event.usd_effect}
          </div>
          <div className="text-[11px] font-mono text-slate-300">
            <strong>XAUUSD:</strong> {event.xauusd_effect}
          </div>
        </div>
      )}
    </div>
  );
};
