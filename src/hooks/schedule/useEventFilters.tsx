
import { ShowEvent } from "@/types/schedule";

export const useEventFilters = (events: ShowEvent[], date: Date) => {
  // Find events that occur on the selected date (for calendar view)
  const selectedDateEvents = events.filter(
    event => event.date.toDateString() === date.toDateString()
  );
  
  // Sort events by date (for list view)
  const sortedEvents = [...events].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  
  // Filter to upcoming events only
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );
  
  // Filter for today's events
  const today = new Date();
  const todayEvents = events.filter(
    event => event.date.toDateString() === today.toDateString()
  );

  return {
    selectedDateEvents,
    upcomingEvents,
    todayEvents
  };
};
