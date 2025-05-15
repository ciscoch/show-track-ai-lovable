
import React from "react";
import { Badge } from "@/types/models";
import { cn } from "@/lib/utils";
import BadgeIcon from "../icons/BadgeIcon";
import BuckleYearBadge from "./BuckleYearBadge";
import { getSizeClasses } from "../utils/badgeStyles";

interface CompactBadgeProps {
  badge: Badge;
  size: "sm" | "md" | "lg";
}

const CompactBadge = ({ badge, size }: CompactBadgeProps) => {
  const isGlowUpBuckle = badge.category === "glow-up";
  const classes = getSizeClasses(size);
  
  return (
    <div 
      className="relative group" 
      title={`${badge.name} ${badge.year ? `(${badge.year})` : ''}`}
    >
      {/* Enhanced badge display */}
      <div 
        className={cn(
          "rounded-full flex items-center justify-center", 
          classes.icon,
          isGlowUpBuckle && "overflow-visible"
        )}
      >
        {/* Base circle with ornate border for buckles */}
        <div className={cn(
          "absolute inset-0 rounded-full",
          {
            "border-2 border-amber-600": badge.type === "bronze" && !isGlowUpBuckle,
            "border-2 border-gray-400": badge.type === "silver" && !isGlowUpBuckle,
            "border-2 border-yellow-500": badge.type === "gold" && !isGlowUpBuckle,
            "border-2 border-indigo-600": badge.type === "platinum" && !isGlowUpBuckle,
            "border-[3px] border-yellow-600 shadow-lg": isGlowUpBuckle,
          }
        )}></div>
        
        {/* Badge icon */}
        <div className={cn(
          "absolute inset-0 rounded-full flex items-center justify-center z-10",
          {
            "bg-primary/10": !isGlowUpBuckle,
            "bg-gradient-to-br from-gray-300 to-gray-400": isGlowUpBuckle
          }
        )}>
          <BadgeIcon 
            icon={badge.icon} 
            className={cn(
              classes.iconSize,
              isGlowUpBuckle && "text-yellow-500"
            )} 
          />
        </div>
        
        {/* Rodeo buckle with year - enhanced for glow-up */}
        {badge.year && (
          <BuckleYearBadge 
            year={badge.year}
            isGlowUp={isGlowUpBuckle}
            badgeType={badge.type}
            size={size}
          />
        )}
      </div>
    </div>
  );
};

export default CompactBadge;
