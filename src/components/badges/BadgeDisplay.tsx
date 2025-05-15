
import React from "react";
import { Badge } from "@/types/models";
import BadgeDetailsCard from "./details/BadgeDetailsCard";
import CompactBadge from "./compact/CompactBadge";

interface BadgeDisplayProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

const BadgeDisplay = ({ badge, size = "md", showDetails = false }: BadgeDisplayProps) => {
  if (showDetails) {
    return <BadgeDetailsCard badge={badge} size={size} />;
  }
  
  return <CompactBadge badge={badge} size={size} />;
};

export default BadgeDisplay;
