"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  DollarSign,
  Coins,
  Bitcoin,
  MessageSquareQuote,
  TrendingUp,
  Bell,
  Star,
  Settings,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Live News", href: "/news", icon: Newspaper },
  { label: "Economic Calendar", href: "/calendar", icon: Calendar },
  { label: "USD Fundamentals", href: "/usd", icon: DollarSign },
  { label: "XAUUSD Outlook", href: "/xauusd", icon: Coins },
  { label: "BTCUSD Outlook", href: "/btcusd", icon: Bitcoin },
  { label: "EURUSD Outlook", href: "/eurusd", icon: DollarSign },
  {
    label: "Trump Market Posts",
    href: "/trump-posts",
    icon: MessageSquareQuote,
    badge: "NEW",
    special: true,
  },
  { label: "Market Data", href: "/market-data", icon: TrendingUp },
  { label: "Alerts", href: "/alerts", icon: Bell },
  { label: "Reports & Briefs", href: "/reports", icon: FileText },
  { label: "Watchlist", href: "/watchlist", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-300 border-r border-border flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-border/70 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Coins className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-100 tracking-wider font-mono">
              XAU / BTC
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">
              Fundamental Intel
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group",
                  isActive
                    ? item.special
                      ? "bg-rose-950/50 text-rose-300 border border-rose-500/50 font-semibold shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                      : "bg-surface-100 text-emerald-400 border border-emerald-500/30 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                    : item.special
                    ? "text-rose-400/90 hover:bg-rose-950/30 hover:text-rose-200 border border-transparent hover:border-rose-900/40"
                    : "text-slate-400 hover:bg-surface-200 hover:text-slate-200 border border-transparent hover:border-border/60"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? item.special
                          ? "text-rose-400"
                          : "text-emerald-400"
                        : item.special
                        ? "text-rose-400/80 group-hover:text-rose-300"
                        : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold font-mono tracking-wider rounded bg-rose-900/80 text-rose-300 border border-rose-600/60 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Mode Badge */}
      <div className="p-3 border-t border-border/80 bg-surface-400/60">
        <div className="flex items-center justify-between px-2 py-1.5 bg-slate-900/90 rounded border border-border text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">REAL DATA FEED</span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold">
            LIVE
          </span>
        </div>
      </div>
    </aside>
  );
};
