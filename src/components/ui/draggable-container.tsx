
import React from "react";
import { cn } from "@/lib/utils";

export interface DraggableItem {
  id: string;
  content: React.ReactNode;
}

interface DraggableContainerProps {
  items: DraggableItem[];
  className?: string;
  onReorder?: (items: DraggableItem[]) => void;
}

export const DraggableContainer = ({ 
  items, 
  className
}: DraggableContainerProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "rounded-lg border bg-card transition-transform duration-200",
          )}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};
