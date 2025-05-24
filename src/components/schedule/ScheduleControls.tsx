
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, ClockIcon } from "lucide-react";

interface ScheduleControlsProps {
  onOpenTimelineClick?: () => void;
  onAddEventClick: () => void;
}

const ScheduleControls = ({ 
  onOpenTimelineClick, 
  onAddEventClick 
}: ScheduleControlsProps) => {
  return (
    <div className="flex justify-between mb-6 gap-4">
      <h2 className="text-2xl font-semibold">Schedule</h2>
      
      <div className="flex gap-2">
        {onOpenTimelineClick && (
          <Button onClick={onOpenTimelineClick} variant="outline">
            <ClockIcon className="h-4 w-4 mr-2" />
            Prep Timeline
          </Button>
        )}
        <Button onClick={onAddEventClick}>
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default ScheduleControls;
