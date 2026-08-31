import React from "react";
import { getTierBadgeStyle, cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: string;
  className?: string;
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier, className }) => {
  const style = getTierBadgeStyle(tier);

  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider",
        style,
        className
      )}
    >
      {tier}
    </span>
  );
};
