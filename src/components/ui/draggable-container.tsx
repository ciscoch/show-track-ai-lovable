
import React, { useState } from "react";
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
  className,
  onReorder 
}: DraggableContainerProps) => {
  const [internalItems, setInternalItems] = useState<DraggableItem[]>(items);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("text/plain"));

    const newItems = Array.from(onReorder ? items : internalItems);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(index, 0, reorderedItem);

    if (onReorder) {
      onReorder(newItems);
    } else {
      setInternalItems(newItems);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const displayItems = onReorder ? items : internalItems;

  return (
    <div className={cn("space-y-4", className)}>
      {displayItems.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
          className={cn(
            "rounded-lg border bg-card cursor-move transition-transform duration-200",
          )}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};
