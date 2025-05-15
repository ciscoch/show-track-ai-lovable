
import React from "react";
import { Badge } from "@/types/models";
import { 
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BuckleCarouselItem from "./BuckleCarouselItem";

interface BuckleCarouselProps {
  badges: Badge[];
}

const BuckleCarousel = ({ badges }: BuckleCarouselProps) => {
  return (
    <div className="relative py-4">
      <Carousel 
        className="w-full"
        opts={{
          align: "center",
          loop: badges.length > 3,
        }}
      >
        <CarouselContent>
          {badges.map((badge) => (
            <BuckleCarouselItem key={badge.id} badge={badge} />
          ))}
        </CarouselContent>
        {badges.length > 1 && (
          <>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BuckleCarousel;
