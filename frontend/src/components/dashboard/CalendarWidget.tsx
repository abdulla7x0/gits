"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { CalendarEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ImpactBadge } from "../shared/ImpactBadge";
import { SurpriseTag } from "../shared/SurpriseTag";

interface CalendarWidgetProps {
  events?: CalendarEvent[];
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events }) => {
  const [tab, setTab] = useState<"UPCOMING" | "COMPLETED">("UPCOMING");

  if (!events || events.length === 0) return null;

  const filteredEvents = events.filter((e) =>
    tab === "UPCOMING" ? !e.is_completed : e.is_completed
  );

  return (
    <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-surface-300 border border-border text-amber-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase">
              Economic Calendar & Surprise Engine
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Consensus vs Actuals & Cross-Asset Validation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-300 p-0.5 rounded-lg border border-border text-xs font-mono">
            <button
              onClick={() => setTab("UPCOMING")}
              className={`px-2.5 py-1 rounded transition-all ${
                tab === "UPCOMING"
                  ? "bg-amber-950/80 text-amber-300 border border-amber-500/50 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Upcoming ({events.filter((e) => !e.is_completed).length})
            </button>
            <button
              onClick={() => setTab("COMPLETED")}
              className={`px-2.5 py-1 rounded transition-all ${
                tab === "COMPLETED"
                  ? "bg-amber-950/80 text-amber-300 border border-amber-500/50 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Completed ({events.filter((e) => e.is_completed).length})
            </button>
          </div>

          <Link
            href="/calendar"
            className="text-xs font-mono text-slate-400 hover:text-slate-100 flex items-center gap-1 group"
          >
            <span>Full Calendar</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Calendar Releases Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-border/80 text-[10px] text-slate-400 uppercase tracking-wider">
              <th className="pb-2">Date / Time</th>
              <th className="pb-2">Impact</th>
              <th className="pb-2">Event</th>
              <th className="pb-2">Forecast</th>
              <th className="pb-2">Previous</th>
              <th className="pb-2">Actual</th>
              <th className="pb-2">Surprise / Implication</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-surface-300/40 transition-colors">
                <td className="py-3 text-slate-300 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{formatDate(event.scheduled_time, "dd MMM, HH:mm")}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">{event.currency}</span>
                </td>

                <td className="py-3 whitespace-nowrap">
                  <ImpactBadge impact={event.impact_level} />
                </td>

                <td className="py-3 pr-2">
                  <span className="font-semibold text-slate-100 block">{event.title}</span>
                  <span className="text-[10px] text-slate-400">{event.category}</span>
                </td>

                <td className="py-3 text-slate-300 whitespace-nowrap">
                  {event.forecast || "--"}
                </td>

                <td className="py-3 text-slate-400 whitespace-nowrap">
                  {event.previous || "--"}
                </td>

                <td className="py-3 whitespace-nowrap">
                  {event.actual ? (
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      {event.actual}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Pending</span>
                  )}
                </td>

                <td className="py-3">
                  {event.surprise ? (
                    <SurpriseTag
                      surprise={event.surprise}
                      classification={event.surprise_classification}
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      USD: {event.usd_effect.split(";")[0]}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
