
import { useState } from "react";
import { Animal, FeedingSchedule } from "@/types/models";
import { toast } from "@/hooks/use-toast";

// Import refactored components
import { ScheduleForm } from "@/components/feeding/ScheduleForm";
import { ScheduleList } from "@/components/feeding/ScheduleList";

interface FeedingScheduleManagerProps {
  animals: Animal[];
  feedingSchedules: FeedingSchedule[];
  addFeedingSchedule: (schedule: FeedingSchedule) => void;
  updateFeedingSchedule: (schedule: FeedingSchedule) => void;
  deleteFeedingSchedule: (id: string) => void;
  completeFeedingTime: (scheduleId: string, timeId: string, locationData?: {latitude: number; longitude: number; timestamp: string} | null) => void;
  selectedAnimalId: string;
  location: { latitude: number; longitude: number } | null;
  hasWeatherAccess: boolean;
}

export const FeedingScheduleManager = ({ 
  animals,
  feedingSchedules,
  addFeedingSchedule,
  updateFeedingSchedule,
  deleteFeedingSchedule,
  completeFeedingTime,
  selectedAnimalId,
  location,
  hasWeatherAccess
}: FeedingScheduleManagerProps) => {
  const [editingSchedule, setEditingSchedule] = useState<any>(null);

  const handleSaveSchedule = (schedule: any) => {
    if (editingSchedule) {
      updateFeedingSchedule(schedule);
      toast({
        title: "Schedule updated",
        description: "Feed schedule has been updated successfully",
      });
      setEditingSchedule(null);
    } else {
      addFeedingSchedule(schedule);
      toast({
        title: "Schedule created",
        description: "New feed schedule has been created",
      });
    }
  };

  const handleEditSchedule = (schedule: any) => {
    setEditingSchedule(schedule);
  };

  const handleDeleteSchedule = (id: string) => {
    deleteFeedingSchedule(id);
    toast({
      title: "Schedule deleted",
      description: "Feed schedule has been removed",
    });
  };

  const handleMarkAsCompleted = (scheduleId: string, timeId: string) => {
    // Add location data when marking as completed
    const locationData = location ? {
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: new Date().toISOString(),
    } : null;
    
    completeFeedingTime(scheduleId, timeId, locationData);
    
    toast({
      title: "Feeding completed",
      description: "Feeding has been marked as completed",
    });
  };

  return (
    <div className="space-y-8">
      {/* Schedule form */}
      <ScheduleForm
        animals={animals}
        selectedAnimalId={selectedAnimalId}
        onSave={handleSaveSchedule}
        initialSchedule={editingSchedule}
        location={hasWeatherAccess ? location : null}
      />
      
      {/* Schedules list */}
      <ScheduleList
        schedules={feedingSchedules}
        animals={animals}
        onEditSchedule={handleEditSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onCompleteFeeding={handleMarkAsCompleted}
      />
    </div>
  );
};
