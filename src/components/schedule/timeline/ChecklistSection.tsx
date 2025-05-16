
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PrepTimeline } from "@/types/schedule";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';

interface ChecklistSectionProps {
  timeline: PrepTimeline;
  onTimelineChange: (updatedTimeline: PrepTimeline) => void;
}

const ChecklistSection = ({ timeline, onTimelineChange }: ChecklistSectionProps) => {
  const addChecklistItem = () => {
    onTimelineChange({
      ...timeline,
      checklistItems: [
        ...(timeline.checklistItems || []),
        {
          id: uuidv4(),
          item: "",
          completed: false
        }
      ]
    });
  };

  const updateChecklistItem = (id: string, value: string) => {
    onTimelineChange({
      ...timeline,
      checklistItems: timeline.checklistItems?.map(item => 
        item.id === id ? { ...item, item: value } : item
      )
    });
  };

  const toggleChecklistItemCompleted = (id: string) => {
    onTimelineChange({
      ...timeline,
      checklistItems: timeline.checklistItems?.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Show Day Checklist</CardTitle>
        <Button size="sm" onClick={addChecklistItem}>Add Item</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timeline.checklistItems && timeline.checklistItems.length > 0 ? (
            timeline.checklistItems.map(item => (
              <div key={item.id} className="flex items-center space-x-2 border-b pb-2">
                <Checkbox 
                  id={`checklist-${item.id}`} 
                  checked={item.completed}
                  onCheckedChange={() => toggleChecklistItemCompleted(item.id)}
                />
                <Input
                  value={item.item}
                  onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                  className={cn(item.completed && "line-through opacity-50")}
                  placeholder="Enter checklist item"
                />
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No checklist items added. Add your first item.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistSection;
