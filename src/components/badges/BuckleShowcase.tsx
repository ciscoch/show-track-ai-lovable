
import React from "react";
import { Badge } from "@/types/models";
import EmptyBuckleState from "./showcase/EmptyBuckleState";
import BuckleShowcaseHeader from "./showcase/BuckleShowcaseHeader";
import BuckleCarousel from "./showcase/BuckleCarousel";

interface BuckleShowcaseProps {
  badges: Badge[];
  title?: string;
}

const BuckleShowcase = ({ badges = [], title = "My Buckle Collection" }: BuckleShowcaseProps) => {
  // Filter for earned badges only (those with an earnedAt date)
  const earnedBadges = badges.filter(badge => badge.earnedAt);
  
  // Sort badges by type (platinum, gold, silver, bronze) and prioritize glow-up category
  const sortedBadges = [...earnedBadges].sort((a, b) => {
    // Prioritize glow-up buckles
    if (a.category === "glow-up" && b.category !== "glow-up") return -1;
    if (a.category !== "glow-up" && b.category === "glow-up") return 1;
    
    // Then by type
    const typeOrder = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  if (sortedBadges.length === 0) {
    return <EmptyBuckleState />;
  }

  return (
    <div className="space-y-4">
      <BuckleShowcaseHeader title={title} badgeCount={sortedBadges.length} />
      <BuckleCarousel badges={sortedBadges} />
    </div>
  );
};

export default BuckleShowcase;
