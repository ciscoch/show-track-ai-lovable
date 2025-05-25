
import { ShowEvent } from "@/types/schedule";
import { toast } from "@/hooks/use-toast";
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
      
      // Update local state only (no database operations)
      if (isNew) {
        setEvents(prev => [...prev, event]);
      } else {
        setEvents(prev => prev.map(e => e.id === event.id ? event : e));
      }

      logger.info("Event saved to local state only");
      toast({
        title: `Event ${isNew ? "Added" : "Updated"}`,
        description: `Your event was ${isNew ? "added" : "updated"} successfully.`,
      });
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
      // Remove from local state only
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      toast({
        title: "Event Deleted",
        description: "Event has been removed successfully.",
      });
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
