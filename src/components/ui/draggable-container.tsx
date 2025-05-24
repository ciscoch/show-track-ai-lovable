
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
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
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newItems = Array.from(onReorder ? items : internalItems);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    
    if (onReorder) {
      onReorder(newItems);
    } else {
      setInternalItems(newItems);
    }
  };

  // Use the controlled items if onReorder is provided, otherwise use internal state
  const displayItems = onReorder ? items : internalItems;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn("space-y-4", className)}
          >
            {displayItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "rounded-lg border bg-card cursor-move",
                      snapshot.isDragging && "ring-2 ring-primary shadow-lg",
                      "transition-transform duration-200"
                    )}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
