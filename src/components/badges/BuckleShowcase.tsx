import React from "react";
import { Badge } from "@/types/models";
import BadgeDisplay from "./BadgeDisplay";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

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
    return (
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground opacity-40 mb-2" />
          <h3 className="font-semibold text-lg">No Buckles Yet</h3>
          <p className="text-sm text-muted-foreground">
            Complete achievements to earn buckles for your showcase
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Award className="h-4 w-4 mr-1" />
          <span>{sortedBadges.length} buckles earned</span>
        </div>
      </div>
      
      <div className="relative py-4">
        <Carousel 
          className="w-full"
          opts={{
            align: "center",
            loop: sortedBadges.length > 3,
          }}
        >
          <CarouselContent>
            {sortedBadges.map((badge) => (
              <CarouselItem key={badge.id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="p-1">
                  <Card className="border-0 shadow-none hover:bg-accent transition-colors rounded-lg">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <BadgeDisplay badge={badge} size="lg" />
                      <div className="mt-4 space-y-1">
                        <h3 className="font-medium text-sm">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground">{badge.year || "—"}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {sortedBadges.length > 1 && (
            <>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default BuckleShowcase;
