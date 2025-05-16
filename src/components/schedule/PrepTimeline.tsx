
import React, { useState } from "react";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { ShowEvent, PrepTimeline as PrepTimelineType } from "@/types/schedule";
import { Animal } from "@/types/models";
import { toast } from "@/hooks/use-toast";
import KeyDatesSection from "./timeline/KeyDatesSection";
import WeightTargetsSection from "./timeline/WeightTargetsSection";
import PracticeSessionsSection from "./timeline/PracticeSessionsSection";
import ChecklistSection from "./timeline/ChecklistSection";
import { generateDefaultTargetWeights, createDefaultTimeline } from "./timeline/timelineUtils";
import { supabase, isRealSupabaseConnection } from "@/lib/supabaseClient";

interface PrepTimelineProps {
  event: ShowEvent;
  animals: Animal[];
  onSaveTimeline: (eventId: string, timeline: PrepTimelineType) => void;
}

const PrepTimeline = ({ event, animals, onSaveTimeline }: PrepTimelineProps) => {
  // Initialize timeline state from event or with defaults
  const [timeline, setTimeline] = useState<PrepTimelineType>(
    event.prepTimeline || createDefaultTimeline(event.date)
  );

  const [targetWeights, setTargetWeights] = useState<{[key: string]: number}>(
    () => generateDefaultTargetWeights(animals, event.animals)
  );

  const [isSaving, setIsSaving] = useState(false);
  const daysUntilShow = Math.max(0, differenceInDays(event.date, new Date()));

  const handleSaveTimeline = async () => {
    try {
      setIsSaving(true);
      const updatedTimeline = {
        ...timeline,
        targetWeightGoal: Object.values(targetWeights)[0]
      };

      // If not connected to a real Supabase instance, show test mode message
      if (!isRealSupabaseConnection()) {
        console.log("Test mode: Using mock Supabase connection");
        toast({
          title: "Test Mode",
          description: "Using mock Supabase connection. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to a real instance.",
          variant: "default"
        });
        
        // Still update local state even in test mode
        onSaveTimeline(event.id, updatedTimeline);
        
        toast({
          title: "Timeline saved locally",
          description: "Your timeline was saved to local state only (not to Supabase)"
        });
        
        setIsSaving(false);
        return;
      }
      
      // Real Supabase connection flow
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Save to Supabase if the user is authenticated
        console.log("Saving timeline to Supabase for user:", user.id);
        const { error } = await supabase
          .from("show_plans")
          .upsert(
            {
              user_id: user.id,
              event_id: event.id,
              prep_timeline: updatedTimeline
            },
            { onConflict: "event_id" }
          );

        if (error) {
          console.error("Failed to save timeline:", error);
          toast({
            title: "Error",
            description: "Could not save your timeline to Supabase.",
            variant: "destructive"
          });
          setIsSaving(false);
          return;
        }
        
        console.log("Timeline successfully saved to Supabase");
      } else {
        console.log("No authenticated user found. Timeline will only be saved locally.");
        toast({
          title: "Not logged in",
          description: "You need to be logged in to save to Supabase. Timeline saved locally only.",
          variant: "default"
        });
      }
      
      // Always call the parent handler to update local state
      onSaveTimeline(event.id, updatedTimeline);
      
      toast({
        title: "Timeline saved",
        description: "Your show preparation timeline has been updated"
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Preparation Timeline</h2>
        <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {daysUntilShow} days until show
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key dates section */}
        <KeyDatesSection 
          timeline={timeline}
          eventDate={event.date}
          onTimelineChange={setTimeline}
        />

        {/* Weight targets section */}
        <WeightTargetsSection 
          animals={animals}
          eventAnimals={event.animals}
          targetWeights={targetWeights}
          onTargetWeightsChange={setTargetWeights}
        />
      </div>

      {/* Showmanship practice sessions */}
      <PracticeSessionsSection
        timeline={timeline}
        onTimelineChange={setTimeline}
      />

      {/* Checklist items */}
      <ChecklistSection
        timeline={timeline}
        onTimelineChange={setTimeline}
      />

      <div className="flex justify-end">
        <Button onClick={handleSaveTimeline} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Timeline"}
        </Button>
      </div>
    </div>
  );
};

export default PrepTimeline;
