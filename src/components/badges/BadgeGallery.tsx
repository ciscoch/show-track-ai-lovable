
import React from "react";
import { badgeList } from "@/data/badgeList";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BadgeGalleryProps {
  unlocked: string[];
}

export default function BadgeGallery({ unlocked = [] }: BadgeGalleryProps) {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {badgeList.map((buckle) => {
        const isUnlocked = unlocked.includes(buckle.id);
        
        return (
          <Card 
            key={buckle.id} 
            className={cn(
              "text-center p-4 hover:shadow-md transition-all", 
              isUnlocked && "bg-gradient-to-b from-gray-50 to-gray-100"
            )}
          >
            <img
              src={buckle.image}
              alt={buckle.title}
              className={cn(
                "w-32 h-32 object-contain mx-auto mb-2",
                !isUnlocked && "opacity-40 grayscale"
              )}
            />
            <div className="mt-2 font-bold text-sm">{buckle.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{buckle.criteria}</div>
            {isUnlocked && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Unlocked
                </span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
