"use client";

import React, { useState } from "react";
import { GitBranch, ArrowRight, Info, Zap } from "lucide-react";
import { MacroTransmissionNode } from "@/lib/types";

interface MacroTransmissionProps {
  nodes?: MacroTransmissionNode[];
}

export const MacroTransmission: React.FC<MacroTransmissionProps> = ({ nodes }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!nodes || nodes.length === 0) return null;

  const current = nodes[activeIdx];

  return (
    <div className="bg-surface-200 border border-border rounded-xl p-5 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase">
              Macro Transmission Engine
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Probabilistic Cross-Asset Transmission Mechanisms
            </p>
          </div>
        </div>

        {/* Tab selector for different macro triggers */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {nodes.map((node, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all whitespace-nowrap ${
                activeIdx === idx
                  ? "bg-blue-950 text-blue-300 border border-blue-500/60 font-semibold"
                  : "bg-surface-300 text-slate-400 hover:text-slate-200 border border-border/60"
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Active Trigger Banner */}
      <div className="mb-4 p-3 rounded-lg bg-surface-300 border border-blue-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-slate-100">
            {current.trigger}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40">
          {current.status}
        </span>
      </div>

      {/* Transmission Flow Sequence */}
      <div className="mb-5">
        <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-2 font-semibold">
          Transmission Sequence (Causal Chain):
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {current.transmission_steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-300/80 p-2.5 rounded-lg border border-border/80 flex flex-col justify-between text-xs relative group hover:border-slate-500 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                <span>STEP 0{idx + 1}</span>
                {idx < current.transmission_steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:inline" />
                )}
              </div>
              <span className="text-slate-300 leading-snug font-sans">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Net Asset Implications */}
      <div className="pt-3 border-t border-border/80 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-2.5 rounded bg-surface-300/60 border border-border">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">
            USD / DXY IMPLICATION
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {current.usd_effect}
          </span>
        </div>
        <div className="p-2.5 rounded bg-surface-300/60 border border-border">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">
            XAUUSD (GOLD) IMPLICATION
          </span>
          <span className="text-xs font-mono font-bold text-rose-400">
            {current.xauusd_effect}
          </span>
        </div>
        <div className="p-2.5 rounded bg-surface-300/60 border border-border">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">
            BTCUSD (BITCOIN) IMPLICATION
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {current.btcusd_effect}
          </span>
        </div>
      </div>
    </div>
  );
};
