
import { useState, useEffect } from "react";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import MainLayout from "@/components/MainLayout";
import { useFeedingRemindersCore } from "@/hooks/feeding";

// Import refactored components
import { WeatherFeatureSection } from "@/components/feeding/WeatherFeatureSection";
import { FeedReminderHeader } from "@/components/feeding/FeedReminderHeader";
import { FeedingScheduleManager } from "@/components/feeding/FeedingScheduleManager";

const FeedReminderPage = () => {
  const { 
    animals, 
    feedingSchedules, 
    addFeedingSchedule, 
    updateFeedingSchedule, 
    deleteFeedingSchedule, 
    completeFeedingTime,
    user
  } = useSupabaseApp();
  
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("all");
  
  // Use our new refactored hook
  const { location, hasWeatherAccess } = useFeedingRemindersCore({ 
    feedingSchedules, 
    animals, 
    user 
  });

  // When an animal is selected, update selectedAnimalId
  useEffect(() => {
    if (selectedAnimalId && selectedAnimalId !== "all") {
      // We maintain this effect to ensure compatibility with the original behavior
    }
  }, [selectedAnimalId]);

  // Convert function signatures to match expected types
  const handleAddFeedingSchedule = async (schedule: any) => {
    const scheduleToAdd = {
      ...schedule,
      animal_id: schedule.animalId || schedule.animal_id,
      feeding_times: schedule.feedingTimes || schedule.feeding_times,
      reminder_enabled: schedule.reminderEnabled ?? schedule.reminder_enabled ?? true,
      reminder_minutes_before: schedule.reminderMinutesBefore ?? schedule.reminder_minutes_before ?? 30
    };
    await addFeedingSchedule(scheduleToAdd);
  };

  const handleUpdateFeedingSchedule = async (schedule: any) => {
    const scheduleToUpdate = {
      ...schedule,
      animal_id: schedule.animalId || schedule.animal_id,
      feeding_times: schedule.feedingTimes || schedule.feeding_times,
      reminder_enabled: schedule.reminderEnabled ?? schedule.reminder_enabled ?? true,
      reminder_minutes_before: schedule.reminderMinutesBefore ?? schedule.reminder_minutes_before ?? 30
    };
    await updateFeedingSchedule(schedule.id, scheduleToUpdate);
  };

  const handleCompleteFeedingTime = async (scheduleId: string, timeId: string, locationData?: any) => {
    // Find the time index
    const schedule = feedingSchedules.find(s => s.id === scheduleId);
    if (schedule) {
      const timeIndex = schedule.feeding_times.findIndex(t => t.id === timeId);
      if (timeIndex >= 0) {
        await completeFeedingTime(scheduleId, timeIndex);
      }
    }
  };

  // Transform data to match expected types
  const transformedAnimals = animals.map(animal => ({
    ...animal,
    gender: animal.gender || "male" as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || animal.birthdate || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: animal.purpose || "other" as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number || animal.penNumber,
    breederName: animal.breeder_name || animal.breederName,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || animal.createdAt || new Date().toISOString()
  }));

  const transformedSchedules = feedingSchedules.map(schedule => ({
    ...schedule,
    animalId: schedule.animal_id,
    feedingTimes: schedule.feeding_times.map(time => ({
      ...time,
      startTime: time.startTime,
      endTime: time.endTime,
      completed: time.completed,
      lastCompleted: time.lastCompleted,
      locationData: time.locationData
    })),
    reminderEnabled: schedule.reminder_enabled,
    reminderMinutesBefore: schedule.reminder_minutes_before,
    createdAt: schedule.created_at || new Date().toISOString()
  }));

  const transformedUser = user ? {
    ...user,
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : null;

  return (
    <MainLayout title="Feed Reminders" user={transformedUser}>
      <div className="space-y-8">
        {/* Header with animal selector */}
        <FeedReminderHeader 
          animals={transformedAnimals}
          setSelectedAnimalId={setSelectedAnimalId}
          selectedAnimalId={selectedAnimalId}
        />
        
        {/* Weather alerts section - Premium feature */}
        <WeatherFeatureSection 
          hasWeatherAccess={hasWeatherAccess}
          user={transformedUser}
        />
        
        {/* Feeding schedule management */}
        <FeedingScheduleManager
          animals={transformedAnimals}
          feedingSchedules={transformedSchedules}
          addFeedingSchedule={handleAddFeedingSchedule}
          updateFeedingSchedule={handleUpdateFeedingSchedule}
          deleteFeedingSchedule={deleteFeedingSchedule}
          completeFeedingTime={handleCompleteFeedingTime}
          selectedAnimalId={selectedAnimalId}
          location={location}
          hasWeatherAccess={hasWeatherAccess}
        />
      </div>
    </MainLayout>
  );
};

export default FeedReminderPage;
