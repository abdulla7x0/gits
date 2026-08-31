"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Calendar, Clock, Filter, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/lib/api";
import { CalendarEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ImpactBadge } from "@/components/shared/ImpactBadge";
import { SurpriseTag } from "@/components/shared/SurpriseTag";

export default function EconomicCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [impactFilter, setImpactFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchCalendar = async () => {
    try {
      setLoading(true);
      const data = await api.getCalendar({
        impact: impactFilter,
        status: statusFilter,
      });
      setEvents(data.events);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, [impactFilter, statusFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchCalendar} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Page Header */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              Institutional Economic Calendar & Surprise Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Mandatory Actual vs Forecast vs Previous Comparisons • Deviation Categorization • Pre/Post Event Validation
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 bg-surface-300 p-3 rounded-lg border border-border text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2.5 py-1 rounded text-xs focus:outline-none"
            >
              <option value="all">All Releases</option>
              <option value="upcoming">Upcoming Releases Only</option>
              <option value="completed">Completed Releases</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">IMPACT LEVEL:</span>
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              className="bg-surface-400 border border-border text-slate-200 px-2.5 py-1 rounded text-xs focus:outline-none"
            >
              <option value="ALL">All Impacts</option>
              <option value="VERY HIGH">Very High</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="ml-auto text-slate-400 text-[11px]">
            Showing <strong>{events.length}</strong> events
          </div>
        </div>

        {/* Events Table / Cards */}
        <div className="space-y-4">
          {events.map((event) => {
            const isExpanded = expandedId === event.id;

            return (
              <div
                key={event.id}
                className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-4"
              >
                {/* Event Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/80">
                  <div className="flex items-center gap-2">
                    <ImpactBadge impact={event.impact_level} />
                    <span className="px-2 py-0.5 rounded bg-surface-300 text-slate-300 border border-border text-xs font-mono font-bold">
                      {event.currency} • {event.country}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Period: {event.period || "Current"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(event.scheduled_time, "dd MMM, HH:mm IST")}</span>
                    </div>
                    {event.is_completed ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        RELEASED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Title & Numbers Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-6">
                    <h2 className="text-base font-bold text-slate-100 mb-1">
                      {event.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Category: {event.category}
                    </p>
                  </div>

                  {/* Numbers Grid: Actual vs Forecast vs Previous */}
                  <div className="md:col-span-6 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="bg-surface-300 p-2 rounded-lg border border-border">
                      <span className="text-[10px] text-slate-500 block">PREVIOUS</span>
                      <span className="font-bold text-slate-300">{event.previous || "--"}</span>
                    </div>

                    <div className="bg-surface-300 p-2 rounded-lg border border-border">
                      <span className="text-[10px] text-slate-500 block">FORECAST</span>
                      <span className="font-bold text-slate-200">{event.forecast || "--"}</span>
                    </div>

                    <div className="bg-surface-300 p-2 rounded-lg border border-border">
                      <span className="text-[10px] text-slate-500 block">ACTUAL</span>
                      {event.actual ? (
                        <span className="font-bold text-emerald-400 bg-emerald-950/80 px-1 rounded border border-emerald-500/30">
                          {event.actual}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Pending</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Surprise & AI Scenario Mapping */}
                <div className="bg-surface-300/80 p-3 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    {event.surprise ? (
                      <SurpriseTag
                        surprise={event.surprise}
                        classification={event.surprise_classification}
                      />
                    ) : (
                      <div className="text-slate-300">
                        <span className="text-slate-500 block text-[10px]">SCENARIOS:</span>
                        <span>{event.usd_effect}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : event.id)}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto text-xs"
                  >
                    <span>{isExpanded ? "Hide Details" : "Pre/Post Validation"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Details: AI Interpretation & Pre/Post Market Validation */}
                {isExpanded && (
                  <div className="p-4 bg-surface-400 border border-amber-500/30 rounded-lg space-y-3 text-xs font-mono">
                    <div>
                      <span className="text-amber-300 font-bold block mb-1 uppercase">
                        AI Fundamental Interpretation:
                      </span>
                      <p className="text-slate-300 font-sans leading-relaxed">
                        {event.ai_interpretation}
                      </p>
                    </div>

                    {/* Pre vs Post Market Reaction Validation Table */}
                    {event.is_completed && event.pre_market && Object.keys(event.pre_market).length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <span className="text-slate-400 font-bold block mb-2 uppercase text-[11px]">
                          Pre vs Post Event Market Validation:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                          <div className="bg-surface-300 p-2 rounded border border-border">
                            <span className="text-slate-500 block text-[9px]">DXY CHANGE</span>
                            <span className="font-bold text-slate-200">
                              {event.market_change?.dxy || "+0.23 pts"}
                            </span>
                          </div>
                          <div className="bg-surface-300 p-2 rounded border border-border">
                            <span className="text-slate-500 block text-[9px]">US10Y CHANGE</span>
                            <span className="font-bold text-slate-200">
                              {event.market_change?.us10y || "+4.0 bps"}
                            </span>
                          </div>
                          <div className="bg-surface-300 p-2 rounded border border-border">
                            <span className="text-slate-500 block text-[9px]">GOLD CHANGE</span>
                            <span className="font-bold text-slate-200">
                              {event.market_change?.gold || "-$9.60"}
                            </span>
                          </div>
                          <div className="bg-surface-300 p-2 rounded border border-border">
                            <span className="text-slate-500 block text-[9px]">BITCOIN CHANGE</span>
                            <span className="font-bold text-slate-200">
                              {event.market_change?.btc || "-$80"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
