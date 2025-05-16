
import { useState } from "react";
import { ShowEvent, PrepTimeline } from "@/types/schedule";
import { mockEvents } from "@/data/mockEvents";
import { toast } from "@/hooks/use-toast";
import { supabase, isRealSupabaseConnection } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const useSchedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list"); // Set list as default
  const [events, setEvents] = useState<ShowEvent[]>(mockEvents);
  const [isSaving, setIsSaving] = useState(false);
  
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

  const saveEvent = async (event: ShowEvent) => {
    try {
      setIsSaving(true);
      const isNew = !events.some(e => e.id === event.id);
      
      // Update local state
      if (isNew) {
        setEvents(prev => [...prev, event]);
      } else {
        setEvents(prev => prev.map(e => e.id === event.id ? event : e));
      }

      const usingRealSupabase = isRealSupabaseConnection();
      
      // Show appropriate toast for local mode
      if (!usingRealSupabase) {
        console.warn("⚠️ Running in local-only mode: not connected to Supabase.");
        toast({
          title: "Local Save Mode",
          description: `Event ${isNew ? "added" : "updated"} in local state only (no Supabase connection).`,
        });
        setIsSaving(false);
        return;
      }
      
      // Save to Supabase if connected
      console.log("Checking for authenticated user...");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.warn("No authenticated user found:", userError);
        toast({
          title: "Not logged in",
          description: "You must be logged in to save events to Supabase.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      console.log("User authenticated:", user.id);
      console.log("Saving event to Supabase 'events' table...");

      // Prepare event data for Supabase (format dates as ISO strings)
      const eventData = {
        id: event.id,
        user_id: user.id,
        title: event.title,
        date: event.date.toISOString(),
        location: event.location,
        animals: event.animals,
        category: event.category,
        notes: event.notes || null,
        reminder: event.reminder || false,
        prep_timeline: event.prepTimeline || null
      };

      const { error } = await supabase
        .from("events")
        .upsert(eventData, { onConflict: "id" });

      if (error) {
        console.error("Supabase Save Error:", error);
        toast({
          title: "Save Failed",
          description: `Could not save to Supabase: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log("Supabase save successful!");
        toast({
          title: `Event ${isNew ? "Added" : "Updated"}`,
          description: `Your event was ${isNew ? "added" : "updated"} successfully.`,
        });
      }
    } catch (error) {
      console.error("Error saving event:", error);
      toast({
        title: "Error",
        description: "Could not save your event.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveEventTimeline = async (eventId: string, timeline: PrepTimeline) => {
    try {
      setIsSaving(true);
      
      // Update local state first
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, prepTimeline: timeline } 
            : event
        )
      );
      
      const usingRealSupabase = isRealSupabaseConnection();
      
      // Show appropriate toast for local mode
      if (!usingRealSupabase) {
        console.warn("⚠️ Running in local-only mode: not connected to Supabase.");
        toast({
          title: "Local Save Mode",
          description: "Timeline saved to local state only (no Supabase connection).",
        });
        setIsSaving(false);
        return;
      }

      console.log("Checking for authenticated user...");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.warn("No authenticated user found:", userError);
        toast({
          title: "Not logged in",
          description: "You must be logged in to save your timeline to Supabase.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Get the current event to update
      const currentEvent = events.find(e => e.id === eventId);
      
      if (!currentEvent) {
        toast({
          title: "Error",
          description: "Event not found",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }

      console.log("User authenticated:", user.id);
      console.log("Saving to Supabase 'events' table...");

      // Update the event with the new timeline
      const { error } = await supabase
        .from("events")
        .upsert({
          id: eventId,
          user_id: user.id,
          title: currentEvent.title,
          date: currentEvent.date.toISOString(),
          location: currentEvent.location,
          animals: currentEvent.animals,
          category: currentEvent.category,
          notes: currentEvent.notes || null,
          reminder: currentEvent.reminder || false,
          prep_timeline: timeline
        }, {
          onConflict: "id"
        });

      if (error) {
        console.error("Supabase Save Error:", error);
        toast({
          title: "Save Failed",
          description: `Could not save to Supabase: ${error.message}`,
          variant: "destructive",
        });
      } else {
        console.log("Supabase save successful!");
        toast({
          title: "Timeline Saved",
          description: "Your show preparation timeline was saved successfully to Supabase.",
        });
      }
    } catch (error) {
      console.error("Error saving timeline:", error);
      toast({
        title: "Error",
        description: "Could not save your timeline.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const createTimelineForEvent = (eventId: string): PrepTimeline => {
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      throw new Error("Event not found");
    }
    
    return {
      finalWeighIn: new Date(event.date.getTime() - 24 * 60 * 60 * 1000), // 1 day before event
      hairTrimming: new Date(event.date.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days before event
      feedAdjustment: {
        type: "taper",
        startDate: new Date(event.date.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week before
        notes: "Gradually reduce feed to achieve target weight"
      },
      showmanshipPractices: [
        {
          id: uuidv4(),
          date: new Date(event.date.getTime() - 14 * 24 * 60 * 60 * 1000), // 2 weeks before
          completed: false
        },
        {
          id: uuidv4(),
          date: new Date(event.date.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week before
          completed: false
        }
      ],
      checklistItems: [
        {
          id: uuidv4(),
          item: "Grooming supplies",
          completed: false
        },
        {
          id: uuidv4(),
          item: "Show equipment",
          completed: false
        },
        {
          id: uuidv4(),
          item: "Health certificates",
          completed: false
        }
      ]
    };
  };
  
  const deleteEvent = async (eventId: string) => {
    try {
      // Remove from local state first
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      const usingRealSupabase = isRealSupabaseConnection();
      
      // Show appropriate toast for local mode
      if (!usingRealSupabase) {
        console.warn("⚠️ Running in local-only mode: not connected to Supabase.");
        toast({
          title: "Local Delete Mode",
          description: "Event removed from local state only (no Supabase connection).",
        });
        return;
      }
      
      // Delete from Supabase if connected
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.warn("No authenticated user found:", userError);
        toast({
          title: "Not logged in",
          description: "You must be logged in to delete events from Supabase.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase Delete Error:", error);
        toast({
          title: "Delete Failed",
          description: `Could not delete from Supabase: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Event Deleted",
          description: "Event has been removed successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Could not delete the event.",
        variant: "destructive"
      });
    }
  };

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
