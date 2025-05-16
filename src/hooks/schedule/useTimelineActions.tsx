
import { useState } from "react";
import { ShowEvent, PrepTimeline } from "@/types/schedule";
import { toast } from "@/hooks/use-toast";
import { supabase, isRealSupabaseConnection } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const useTimelineActions = (
  events: ShowEvent[], 
  setEvents: React.Dispatch<React.SetStateAction<ShowEvent[]>>,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
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

  return {
    saveEventTimeline,
    createTimelineForEvent
  };
};
