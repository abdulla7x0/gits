import React from "react";
import { cn } from "@/lib/utils";

interface SurpriseTagProps {
  surprise?: string;
  classification?: string;
  className?: string;
}

export const SurpriseTag: React.FC<SurpriseTagProps> = ({
  surprise,
  classification,
  className,
}) => {
  if (!surprise && !classification) return null;

  const label = classification || surprise || "";
  const isBetter = label.toLowerCase().includes("better") || label.toLowerCase().includes("cooler") || label.startsWith("+");
  const isWorse = label.toLowerCase().includes("worse") || label.toLowerCase().includes("hotter") || (label.startsWith("-") && !label.toLowerCase().includes("cooler"));

  let style = "bg-slate-900 text-slate-400 border-slate-700";
  if (isBetter) {
    style = "bg-emerald-950/80 text-emerald-300 border-emerald-500/50";
  } else if (isWorse) {
    style = "bg-rose-950/80 text-rose-300 border-rose-500/50";
  } else if (label.toLowerCase().includes("line")) {
    style = "bg-amber-950/80 text-amber-300 border-amber-500/50";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border font-medium",
        style,
        className
      )}
    >
      <span className="text-[9px] uppercase tracking-wider text-slate-400">SURPRISE:</span>
      <span>{label}</span>
    </span>
  );
};
