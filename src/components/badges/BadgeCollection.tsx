
import { useState } from "react";
import { Badge } from "@/types/models";
import BadgeDisplay from "./BadgeDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BadgeCollectionProps {
  badges: Badge[];
  title?: string;
}

const BadgeCollection = ({ badges, title }: BadgeCollectionProps) => {
  const [filter, setFilter] = useState<Badge["category"] | "all">("all");

  const filteredBadges = filter === "all" 
    ? badges 
    : badges.filter(badge => badge.category === filter);

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
          <TabsTrigger value="streak">Streaks</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map(badge => (
              <BadgeDisplay key={badge.id} badge={badge} showDetails />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges
              .filter(badge => badge.category === "achievement")
              .map(badge => (
                <BadgeDisplay key={badge.id} badge={badge} showDetails />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="streak">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges
              .filter(badge => badge.category === "streak")
              .map(badge => (
                <BadgeDisplay key={badge.id} badge={badge} showDetails />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="special">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges
              .filter(badge => badge.category === "special")
              .map(badge => (
                <BadgeDisplay key={badge.id} badge={badge} showDetails />
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
      
      {filteredBadges.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No badges in this category yet. Keep using the app to earn badges!</p>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;
