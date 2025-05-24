
import { ShowEvent } from "@/types/schedule";

export const useEventFilters = (events: ShowEvent[]) => {
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
    upcomingEvents,
    todayEvents
  };
};
