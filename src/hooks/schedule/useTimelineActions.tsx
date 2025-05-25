
import { useState } from "react";
import { ShowEvent, PrepTimeline } from "@/types/schedule";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import { v4 as uuidv4 } from "uuid";

export const useTimelineActions = (
  events: ShowEvent[], 
  setEvents: React.Dispatch<React.SetStateAction<ShowEvent[]>>,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
  const saveEventTimeline = async (eventId: string, timeline: PrepTimeline) => {
    try {
      setIsSaving(true);
      
      // Update local state only
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, prepTimeline: timeline } 
            : event
        )
      );
      
      logger.info("Timeline saved to local state only");
      toast({
        title: "Timeline Saved",
        description: "Your show preparation timeline was saved successfully.",
      });
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

  return {
    saveEventTimeline,
    createTimelineForEvent
  };
};
