
import { useState } from "react";
import { ShowEvent } from "@/types/schedule";
import { mockEvents } from "@/data/mockEvents";
import { useEventActions } from "./useEventActions";
import { useEventFilters } from "./useEventFilters";
import { useTimelineActions } from "./useTimelineActions";

export const useSchedule = () => {
  const [events, setEvents] = useState<ShowEvent[]>(mockEvents);
  const [isSaving, setIsSaving] = useState(false);
  
  // Import event filtering functionality
  const { 
    upcomingEvents, 
    todayEvents 
  } = useEventFilters(events);
  
  // Import event action functionality
  const { 
    getCategoryColor, 
    handleUpgrade, 
    saveEvent,
    deleteEvent 
  } = useEventActions(events, setEvents, setIsSaving);
  
  // Import timeline functionality
  const { 
    saveEventTimeline, 
    createTimelineForEvent 
  } = useTimelineActions(events, setEvents, setIsSaving);

  return {
    events,
    setEvents,
    upcomingEvents,
    todayEvents,
    getCategoryColor,
    handleUpgrade,
    saveEvent,
    saveEventTimeline,
    createTimelineForEvent,
    deleteEvent,
    isSaving
  };
};

export default useSchedule;
