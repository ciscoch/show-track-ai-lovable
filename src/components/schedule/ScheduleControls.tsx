
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, ClockIcon } from "lucide-react";

interface ScheduleControlsProps {
  view: "calendar" | "list";
  setView: (view: "calendar" | "list") => void;
  onOpenTimelineClick?: () => void;
  onAddEventClick: () => void;
}

const ScheduleControls = ({ 
  view, 
  setView, 
  onOpenTimelineClick, 
  onAddEventClick 
}: ScheduleControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="flex gap-4">
        <Button 
          variant={view === "calendar" ? "default" : "outline"} 
          onClick={() => setView("calendar")}
        >
          Calendar View
        </Button>
        <Button 
          variant={view === "list" ? "default" : "outline"} 
          onClick={() => setView("list")}
        >
          List View
        </Button>
      </div>
      
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
