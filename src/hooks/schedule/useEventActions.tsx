
import { ShowEvent } from "@/types/schedule";
import { toast } from "@/hooks/use-toast";
import { supabase, isRealSupabaseConnection } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { navigate } from "@/platform/navigation";

export const useEventActions = (
  events: ShowEvent[], 
  setEvents: React.Dispatch<React.SetStateAction<ShowEvent[]>>,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
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
    navigate('/subscription');
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
        logger.warn("⚠️ Running in local-only mode: not connected to Supabase.");
        toast({
          title: "Local Save Mode",
          description: `Event ${isNew ? "added" : "updated"} in local state only (no Supabase connection).`,
        });
        setIsSaving(false);
        return;
      }
      
      // Save to Supabase if connected
      logger.info("Checking for authenticated user...");
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        logger.warn("No authenticated user found:", userError);
        toast({
          title: "Not logged in",
          description: "You must be logged in to save events to Supabase.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      logger.info("User authenticated:", user.id);
      logger.info("Saving event to Supabase 'events' table...");

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
        logger.info("Supabase save successful!");
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
  
  const deleteEvent = async (eventId: string) => {
    try {
      // Remove from local state first
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      const usingRealSupabase = isRealSupabaseConnection();
      
      // Show appropriate toast for local mode
      if (!usingRealSupabase) {
        logger.warn("⚠️ Running in local-only mode: not connected to Supabase.");
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
        logger.warn("No authenticated user found:", userError);
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
    getCategoryColor,
    handleUpgrade,
    saveEvent,
    deleteEvent
  };
};
