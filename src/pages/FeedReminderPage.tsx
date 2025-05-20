
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
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
  } = useAppContext();
  
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

  return (
    <MainLayout title="Feed Reminders" user={user}>
      <div className="space-y-8">
        {/* Header with animal selector */}
        <FeedReminderHeader 
          animals={animals}
          setSelectedAnimalId={setSelectedAnimalId}
          selectedAnimalId={selectedAnimalId}
        />
        
        {/* Weather alerts section - Premium feature */}
        <WeatherFeatureSection 
          hasWeatherAccess={hasWeatherAccess}
          user={user}
        />
        
        {/* Feeding schedule management */}
        <FeedingScheduleManager
          animals={animals}
          feedingSchedules={feedingSchedules}
          addFeedingSchedule={addFeedingSchedule}
          updateFeedingSchedule={updateFeedingSchedule}
          deleteFeedingSchedule={deleteFeedingSchedule}
          completeFeedingTime={completeFeedingTime}
          selectedAnimalId={selectedAnimalId}
          location={location}
          hasWeatherAccess={hasWeatherAccess}
        />
      </div>
    </MainLayout>
  );
};

export default FeedReminderPage;
