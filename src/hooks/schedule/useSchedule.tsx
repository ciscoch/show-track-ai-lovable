
import { useState } from "react";
import { ShowEvent } from "@/types/schedule";
import { mockEvents } from "@/data/mockEvents";
import { useEventActions } from "./useEventActions";
import { useEventFilters } from "./useEventFilters";
import { useTimelineActions } from "./useTimelineActions";

export const useSchedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  const [events, setEvents] = useState<ShowEvent[]>(mockEvents);
  const [isSaving, setIsSaving] = useState(false);
  
  // Import event filtering functionality
  const { 
    selectedDateEvents, 
    upcomingEvents, 
    todayEvents 
  } = useEventFilters(events, date);
  
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
    date,
    setDate,
    view, 
    setView,
    events,
    setEvents,
    selectedDateEvents,
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
