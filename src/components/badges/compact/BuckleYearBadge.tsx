
import React from "react";
import { cn } from "@/lib/utils";
import { getSizeClasses } from "../utils/badgeStyles";

interface BuckleYearBadgeProps {
  year: number;
  isGlowUp: boolean;
  badgeType: string;
  size: "sm" | "md" | "lg";
}

const BuckleYearBadge = ({ year, isGlowUp, badgeType, size }: BuckleYearBadgeProps) => {
  const classes = getSizeClasses(size);
  
  return (
    <div 
      className={cn(
        "absolute flex items-center justify-center",
        "rounded-full shadow-md transform transition-transform group-hover:scale-110",
        "border-2 z-20",
        isGlowUp ? "-bottom-3 -right-3" : "-bottom-2 -right-2",
        isGlowUp 
          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-700" 
          : {
              "bronze": "bg-amber-600 border-amber-700 text-white",
              "silver": "bg-gray-400 border-gray-500 text-white",
              "gold": "bg-yellow-500 border-yellow-600 text-white",
              "platinum": "bg-indigo-600 border-indigo-700 text-white",
            }[badgeType] || "bg-primary border-primary-foreground text-white",
        isGlowUp ? classes.glowUpYearBuckle : classes.yearBuckle
      )}
    >
      {isGlowUp ? (
        <>
          <div className="absolute inset-0 rounded-full border border-yellow-300/30 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-yellow-300/40"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-yellow-300/40"></div>
          </div>
          <span className={cn(
            "font-bold",
            "text-yellow-100",
            classes.glowUpYearText
          )}>
            {String(year).slice(-2)}
          </span>
        </>
      ) : (
        <span className={cn("font-bold", classes.yearText)}>
          {String(year).slice(-2)}
        </span>
      )}
    </div>
  );
};

export default BuckleYearBadge;
