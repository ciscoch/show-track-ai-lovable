
import { useState } from "react";
import { ShowEvent } from "@/types/schedule";
import { mockEvents } from "@/data/mockEvents";

export const useSchedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Find events that occur on the selected date (for calendar view)
  const selectedDateEvents = mockEvents.filter(
    event => event.date.toDateString() === date.toDateString()
  );
  
  // Sort events by date (for list view)
  const sortedEvents = [...mockEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  
  // Filter to upcoming events only
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );
  
  // Function to get the event badge color based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "show": return "bg-primary text-primary-foreground";
      case "practice": return "bg-green-500 text-white";
      case "appointment": return "bg-amber-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };

  return {
    date,
    setDate,
    view, 
    setView,
    selectedDateEvents,
    upcomingEvents,
    getCategoryColor,
    handleUpgrade
  };
};
