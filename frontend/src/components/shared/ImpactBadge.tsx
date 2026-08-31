import React from "react";
import { getImpactBadgeStyle } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ImpactBadgeProps {
  impact: string;
  className?: string;
}

export const ImpactBadge: React.FC<ImpactBadgeProps> = ({ impact, className }) => {
  const badgeStyle = getImpactBadgeStyle(impact);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold",
        badgeStyle,
        className
      )}
    >
      {impact?.toUpperCase() === "VERY HIGH" ? "🔥 " : ""}
      {impact}
    </span>
  );
};
