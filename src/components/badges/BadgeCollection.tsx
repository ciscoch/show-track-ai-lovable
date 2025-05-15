
import { Badge } from "@/types/models";
import BadgeDisplay from "./BadgeDisplay";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BadgeCollectionProps {
  badges: Badge[];
}

const BadgeCollection = ({ badges }: BadgeCollectionProps) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Group badges by category
  const badgesByCategory = badges.reduce((acc, badge) => {
    const category = badge.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case "achievement": return "Achievements";
      case "streak": return "Streaks";
      case "participation": return "Participation";
      case "special": return "Special";
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
        <div key={category}>
          <h3 className="text-lg font-medium mb-3">{getCategoryName(category)}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryBadges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => setSelectedBadge(badge)}
              >
                <BadgeDisplay badge={badge} size="md" />
                <span className="text-xs font-medium text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Badge Details Dialog */}
      <Dialog open={!!selectedBadge} onOpenChange={(open) => !open && setSelectedBadge(null)}>
        <DialogContent>
          {selectedBadge && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBadge.name}</DialogTitle>
                <DialogDescription>
                  {selectedBadge.category.charAt(0).toUpperCase() + selectedBadge.category.slice(1)} • {selectedBadge.type.charAt(0).toUpperCase() + selectedBadge.type.slice(1)}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <BadgeDisplay badge={selectedBadge} size="lg" />
                <p className="text-center">{selectedBadge.description}</p>
                {selectedBadge.earnedAt ? (
                  <p className="text-sm text-muted-foreground">
                    Earned on {new Date(selectedBadge.earnedAt).toLocaleDateString()}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Not yet earned</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedBadge(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BadgeCollection;
