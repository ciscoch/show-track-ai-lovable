
import React, { useState, useEffect } from "react";
import { Badge } from "@/types/models";
import BuckleShowcase from "./BuckleShowcase";

interface LegacyBadgeAdapterProps {
  badgeIds?: string[];
  user?: any;
}

/**
 * Adapter component that converts legacy badge IDs to the modern Badge type
 * and displays them using the modern BuckleShowcase component
 */
const LegacyBadgeAdapter = ({ badgeIds = [], user }: LegacyBadgeAdapterProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  
  useEffect(() => {
    // Import the legacy badge list dynamically to avoid bundling issues
    import("../../../public/badgeList").then(({ badgeList }) => {
      // Convert legacy badges to the modern Badge format
      const modernBadges: Badge[] = badgeIds.map(id => {
        const legacyBadge = badgeList.find((b: any) => b.id === id);
        if (!legacyBadge) return null;
        
        // Extract image filename from the path for proper display
        const imageUrl = legacyBadge.image;
        
        return {
          id: legacyBadge.id,
          name: legacyBadge.title,
          description: legacyBadge.criteria,
          icon: mapIconType(legacyBadge.id),
          earnedAt: new Date().toISOString(), // Since these are unlocked badges
          category: mapCategory(legacyBadge.id),
          type: mapBadgeType(legacyBadge.id),
          year: 2025, // Hardcoded from the badge names that end with 2025
          imageUrl: imageUrl // Add the imageUrl property
        };
      }).filter(Boolean) as Badge[];
      
      setBadges(modernBadges);
    });
  }, [badgeIds]);

  // Map legacy badge IDs to modern icon names
  const mapIconType = (id: string): string => {
    switch (id) {
      case "muscle_up": return "dumbbell";
      case "glow_up": return "camera";
      case "mentor": return "award";
      case "ring_debut": return "star";
      case "top_3_finisher": return "medal";
      default: return "award";
    }
  };
  
  // Map legacy badge IDs to modern badge categories
  const mapCategory = (id: string): Badge["category"] => {
    switch (id) {
      case "muscle_up": return "muscle-up";
      case "glow_up": return "glow-up";
      case "mentor": return "special";
      case "ring_debut": return "ring-debut";
      case "top_3_finisher": return "top-3";
      default: return "achievement";
    }
  };
  
  // Map legacy badge IDs to modern badge types
  const mapBadgeType = (id: string): Badge["type"] => {
    switch (id) {
      case "muscle_up": return "gold";
      case "glow_up": return "silver";
      case "mentor": return "gold";
      case "ring_debut": return "bronze";
      case "top_3_finisher": return "silver";
      default: return "bronze";
    }
  };
  
  if (badges.length === 0) {
    return null;
  }

  return (
    <BuckleShowcase 
      badges={badges} 
      title="My Buckle Collection" 
    />
  );
};

export default LegacyBadgeAdapter;
