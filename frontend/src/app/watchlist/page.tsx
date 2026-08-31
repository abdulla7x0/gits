"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/layout/TopHeader";
import { Star, Plus, Trash2, CheckCircle2, Bookmark } from "lucide-react";

export default function WatchlistPage() {
  const [items, setItems] = useState([
    { id: 1, symbol: "XAUUSD", title: "Spot Gold / USD", note: "Watch real yields near 4.30% for resistance rejection" },
    { id: 2, symbol: "BTCUSD", title: "Bitcoin / USD", note: "Monitor spot ETF inflows and $64,500 liquidity pool" },
    { id: 3, symbol: "DXY", title: "US Dollar Index", note: "Ascending trendline support test around 103.95" },
    { id: 4, symbol: "US10Y", title: "US 10-Year Benchmark", note: "Key resistance at 4.30% level" },
  ]);

  const [newSymbol, setNewSymbol] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        symbol: newSymbol.toUpperCase(),
        title: `${newSymbol.toUpperCase()} Watch Item`,
        note: newNote || "No notes added",
      },
    ]);
    setNewSymbol("");
    setNewNote("");
  };

  const handleRemove = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopHeader onRefresh={() => {}} />

      <main className="p-5 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
        <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wider">
              Fundamental Watchlist & Trader Notes
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Personal Fundamental Filter Watchlist • Key Levels & Macro Transmission Triggers
          </p>
        </div>

        {/* Add Item Form */}
        <form
          onSubmit={handleAdd}
          className="bg-surface-200 border border-border rounded-xl p-5 shadow-card space-y-4"
        >
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Add Watchlist Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs font-mono">
            <input
              type="text"
              placeholder="Symbol (e.g. XAUUSD, BTCUSD, US02Y)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="md:col-span-4 bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="Fundamental hypothesis / what to watch"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="md:col-span-6 bg-surface-300 border border-border rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-amber-950 text-amber-300 border border-amber-500/50 hover:bg-amber-900 rounded-lg px-4 py-2 font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Watch</span>
            </button>
          </div>
        </form>

        {/* Watchlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface-200 border border-border rounded-xl p-4 shadow-card flex items-start justify-between gap-3"
            >
              <div className="space-y-1 font-mono text-xs">
                <span className="font-bold text-base text-slate-100 block">
                  {item.symbol}
                </span>
                <span className="text-[11px] text-slate-400 block">{item.title}</span>
                <p className="text-xs text-slate-300 font-sans mt-2 bg-surface-300 p-2.5 rounded border border-border">
                  {item.note}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 rounded transition-colors"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
