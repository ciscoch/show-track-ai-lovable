
import React from "react";
import { Badge } from "@/types/models";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import BadgeDisplay from "../BadgeDisplay";

interface BuckleCarouselItemProps {
  badge: Badge;
}

const BuckleCarouselItem = ({ badge }: BuckleCarouselItemProps) => {
  return (
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
  );
};

export default BuckleCarouselItem;
