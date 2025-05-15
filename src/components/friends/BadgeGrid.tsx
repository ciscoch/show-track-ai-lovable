
import { Badge } from "@/types/models";
import BadgeDisplay from "@/components/badges/BadgeDisplay";

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {badges.map((badge) => (
        <div key={badge.id} className="flex flex-col items-center gap-2">
          <BadgeDisplay badge={badge} size="md" />
          <span className="text-xs font-medium text-center">{badge.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BadgeGrid;
