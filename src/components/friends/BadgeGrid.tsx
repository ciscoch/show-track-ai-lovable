
import { Badge } from "@/types/models";
import BadgeDisplay from "@/components/badges/BadgeDisplay";
import { cn } from "@/lib/utils";

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  // Sort badges to prioritize special categories like glow-up
  const sortedBadges = [...badges].sort((a, b) => {
    // Feature special categories
    const specialCategories = ["glow-up", "champion", "muscle-up"];
    const aIsSpecial = specialCategories.includes(a.category);
    const bIsSpecial = specialCategories.includes(b.category);
    
    if (aIsSpecial && !bIsSpecial) return -1;
    if (!aIsSpecial && bIsSpecial) return 1;
    
    // Then by earned status
    if (a.earnedAt && !b.earnedAt) return -1;
    if (!a.earnedAt && b.earnedAt) return 1;
    
    // Then by type
    const typeOrder = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sortedBadges.map((badge) => (
        <div 
          key={badge.id} 
          className={cn(
            "flex flex-col items-center gap-2 p-2 rounded-lg transition-all", 
            badge.category === "glow-up" && "bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm hover:shadow"
          )}
        >
          <BadgeDisplay badge={badge} size="md" />
          <span className={cn(
            "text-xs font-medium text-center",
            badge.category === "glow-up" && "font-semibold text-yellow-700"
          )}>
            {badge.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BadgeGrid;
