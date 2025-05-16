
import React, { useState, useEffect } from "react";
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
  const [timeline, setTimeline] = useState<PrepTimelineType>(
    event.prepTimeline || createDefaultTimeline(event.date)
  );

  const [targetWeights, setTargetWeights] = useState<{ [key: string]: number }>(
    () => generateDefaultTargetWeights(animals, event.animals)
  );

  const [isSaving, setIsSaving] = useState(false);
  const daysUntilShow = Math.max(0, differenceInDays(event.date, new Date()));
  const usingRealSupabase = isRealSupabaseConnection();

  useEffect(() => {
    console.log("PrepTimeline connection status:", usingRealSupabase ? "Using real Supabase connection" : "Using local fallback mode");
  }, [usingRealSupabase]);

  const handleSaveTimeline = async () => {
    try {
      setIsSaving(true);
      const updatedTimeline = {
        ...timeline,
        targetWeightGoal: Object.values(targetWeights)[0]
      };

      console.log("Attempting to save timeline:", updatedTimeline);
      
      if (!usingRealSupabase) {
        console.warn("⚠️ Running in local-only mode: not connected to Supabase.");
        console.log("Saved locally:", updatedTimeline);
        toast({
          title: "Local Save Mode",
          description: "Data saved to local state only (no Supabase connection).",
        });
        onSaveTimeline(event.id, updatedTimeline);
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

      console.log("User authenticated:", user.id);
      console.log("Saving to Supabase 'show_plans' table...");

      const { error } = await supabase
        .from("show_plans")
        .upsert({
          user_id: user.id,
          event_id: event.id,
          prep_timeline: updatedTimeline
        }, {
          onConflict: "event_id"
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
        onSaveTimeline(event.id, updatedTimeline);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Preparation Timeline</h2>
        <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {daysUntilShow} days until show
        </div>
      </div>

      {!usingRealSupabase && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4">
          <p className="text-amber-800 text-sm">
            <strong>Testing Mode:</strong> Using local storage only. Connect to Supabase to save data permanently.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KeyDatesSection
          timeline={timeline}
          eventDate={event.date}
          onTimelineChange={setTimeline}
        />

        <WeightTargetsSection
          animals={animals}
          eventAnimals={event.animals}
          targetWeights={targetWeights}
          onTargetWeightsChange={setTargetWeights}
        />
      </div>

      <PracticeSessionsSection
        timeline={timeline}
        onTimelineChange={setTimeline}
      />

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
