
import { useState, useEffect } from "react";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import MainLayout from "@/components/MainLayout";
import { useFeedingRemindersCore } from "@/hooks/feeding";

// Import refactored components
import { WeatherFeatureSection } from "@/components/feeding/WeatherFeatureSection";
import { FeedReminderHeader } from "@/components/feeding/FeedReminderHeader";
import { FeedingScheduleManager } from "@/components/feeding/FeedingScheduleManager";
import { Animal, FeedingSchedule, User } from "@/types/models";

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
  
  // Transform data to match expected types
  const transformedAnimals: Animal[] = animals.map(animal => ({
    ...animal,
    gender: (animal.gender || "male") as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || animal.birthdate || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: (animal.purpose || "other") as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number || animal.penNumber,
    breederName: animal.breeder_name || animal.breeder_name,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || animal.created_at || new Date().toISOString(),
    // Fix organization handling - ensure it's always an object or undefined
    organization: typeof animal.organization === 'string' 
      ? { id: animal.organization, name: animal.organization }
      : undefined
  }));

  const transformedSchedules: FeedingSchedule[] = feedingSchedules.map(schedule => ({
    ...schedule,
    animalId: schedule.animal_id || schedule.animalId || "",
    name: schedule.name || "Default Schedule",
    feedingTimes: (schedule.feeding_times || schedule.feedingTimes || []).map(time => ({
      ...time,
      startTime: time.startTime || "",
      endTime: time.endTime || "",
      completed: time.completed || false,
      lastCompleted: time.lastCompleted || null,
      locationData: time.locationData || null
    })),
    reminderEnabled: schedule.reminder_enabled ?? schedule.reminderEnabled ?? true,
    reminderMinutesBefore: schedule.reminder_minutes_before ?? schedule.reminderMinutesBefore ?? 30,
    createdAt: schedule.created_at || schedule.createdAt || new Date().toISOString()
  }));

  const transformedUser: User = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };
  
  // Use our new refactored hook
  const { location, hasWeatherAccess } = useFeedingRemindersCore({ 
    feedingSchedules: transformedSchedules, 
    animals: transformedAnimals, 
    user: transformedUser
  });

  // When an animal is selected, update selectedAnimalId
  useEffect(() => {
    if (selectedAnimalId && selectedAnimalId !== "all") {
      // We maintain this effect to ensure compatibility with the original behavior
    }
  }, [selectedAnimalId]);

  // Convert function signatures to match expected types
  const handleAddFeedingSchedule = async (schedule: FeedingSchedule) => {
    const scheduleToAdd = {
      animal_id: schedule.animalId,
      name: schedule.name,
      feeding_times: schedule.feedingTimes,
      reminder_enabled: schedule.reminderEnabled,
      reminder_minutes_before: schedule.reminderMinutesBefore
    };
    await addFeedingSchedule(scheduleToAdd);
  };

  const handleUpdateFeedingSchedule = async (schedule: FeedingSchedule) => {
    const scheduleToUpdate = {
      animal_id: schedule.animalId,
      name: schedule.name,
      feeding_times: schedule.feedingTimes,
      reminder_enabled: schedule.reminderEnabled,
      reminder_minutes_before: schedule.reminderMinutesBefore
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
