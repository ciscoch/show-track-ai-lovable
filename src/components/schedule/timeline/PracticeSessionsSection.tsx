
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ClockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrepTimeline } from "@/types/schedule";
import { v4 as uuidv4 } from 'uuid';

interface PracticeSessionsSectionProps {
  timeline: PrepTimeline;
  onTimelineChange: (updatedTimeline: PrepTimeline) => void;
}

const PracticeSessionsSection = ({ timeline, onTimelineChange }: PracticeSessionsSectionProps) => {
  const addPracticeSession = () => {
    onTimelineChange({
      ...timeline,
      showmanshipPractices: [
        ...(timeline.showmanshipPractices || []),
        {
          id: uuidv4(),
          date: new Date(new Date().setDate(new Date().getDate() + 1)),
          completed: false
        }
      ]
    });
  };

  const togglePracticeCompleted = (id: string) => {
    onTimelineChange({
      ...timeline,
      showmanshipPractices: timeline.showmanshipPractices?.map(practice => 
        practice.id === id ? { ...practice, completed: !practice.completed } : practice
      )
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Showmanship Practice Sessions</CardTitle>
        <Button size="sm" onClick={addPracticeSession}>Add Practice</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timeline.showmanshipPractices && timeline.showmanshipPractices.length > 0 ? (
            timeline.showmanshipPractices.map(practice => (
              <div key={practice.id} className="flex items-center space-x-2 border-b pb-2">
                <Checkbox 
                  id={`practice-${practice.id}`} 
                  checked={practice.completed}
                  onCheckedChange={() => togglePracticeCompleted(practice.id)}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-grow justify-start text-left font-normal",
                        practice.completed && "line-through opacity-50"
                      )}
                    >
                      <ClockIcon className="mr-2 h-4 w-4" />
                      {format(practice.date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={practice.date}
                      onSelect={(date) => {
                        if (!date) return;
                        onTimelineChange({
                          ...timeline,
                          showmanshipPractices: timeline.showmanshipPractices?.map(p => 
                            p.id === practice.id ? { ...p, date } : p
                          )
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No practice sessions scheduled. Add your first practice session.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeSessionsSection;
