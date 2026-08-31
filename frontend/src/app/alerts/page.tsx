"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Bell, Send, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import { AlertItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [telegramPreview, setTelegramPreview] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await api.getAlerts();
      setAlerts(data.alerts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handlePreviewTelegram = (alert: AlertItem) => {
    const preview = `🚨 <b>${alert.title}</b>\n\n${alert.message}\n\n<b>Affected Assets:</b> ${alert.affected_assets.join(", ")}\n<b>Severity:</b> ${alert.severity}\n\n🌐 <a href="http://localhost:3000">Open Fundamental Intelligence</a>`;
    setTelegramPreview(preview);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={fetchAlerts} isRefreshing={loading} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        {/* Header */}
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-rose-400" />
            <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              Market Intelligence Alerts & Telegram Dispatch
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Real-Time Notifications for High-Impact Releases • Trump Market Posts • Yield Spikes • AI Bias Shifts
          </p>
        </div>

        {/* Telegram Integration Configuration Card */}
        <div className="bg-surface-200 border border-blue-500/30 rounded-xl p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-blue-400">
            <Send className="w-4 h-4" />
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider">
              Telegram Bot Integration Setup
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Connect your Telegram Channel or Private Bot to receive instant high-impact macro alerts and Trump market-moving statements directly on your mobile device.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-surface-300 p-2.5 rounded border border-border">
              <span className="text-slate-500 block text-[10px]">BOT STATUS</span>
              <span className="text-emerald-400 font-bold">READY (SIMULATED IN DEMO MODE)</span>
            </div>
            <div className="bg-surface-300 p-2.5 rounded border border-border">
              <span className="text-slate-500 block text-[10px]">ALERT CHANNELS</span>
              <span className="text-slate-200 font-bold">Web Push Notification + Telegram Bot API</span>
            </div>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Active Market Alerts ({alerts.length})
            </h2>

            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      alert.severity === "CRITICAL"
                        ? "bg-rose-950 text-rose-300 border border-rose-500"
                        : "bg-amber-950 text-amber-300 border border-amber-500"
                    }`}
                  >
                    {alert.severity} SEVERITY
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {formatDate(alert.created_at, "dd MMM, HH:mm IST")}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-mono">
                  {alert.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans">
                  {alert.message}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">ASSETS:</span>
                    {alert.affected_assets.map((a) => (
                      <span key={a} className="px-1.5 py-0.5 rounded bg-surface-300 text-slate-200 border border-border text-[10px]">
                        {a}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePreviewTelegram(alert)}
                    className="px-2.5 py-1 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 hover:bg-blue-900 text-xs flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Preview Telegram Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Telegram Mockup Phone Screen */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Telegram Message Preview Box
            </h2>
            <div className="bg-surface-300 border border-border rounded-xl p-4 shadow-card space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-border text-xs font-mono text-slate-300">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Telegram Bot Preview (@XAU_BTC_Intel_Bot)</span>
              </div>

              <div className="bg-surface-400/90 border border-border rounded-lg p-4 font-sans text-xs text-slate-200 space-y-3 shadow-inner">
                {telegramPreview ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: telegramPreview.replace(/\n/g, "<br/>") }}
                    className="leading-relaxed font-mono text-[11px]"
                  />
                ) : (
                  <div className="text-slate-500 italic font-mono text-[11px]">
                    Click &ldquo;Preview Telegram Dispatch&rdquo; on any alert on the left to see the structured bot dispatch template.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
