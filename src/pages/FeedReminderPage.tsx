
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";

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
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Check if the user has a premium subscription (pro or elite)
  const hasWeatherAccess = user?.subscriptionLevel === 'pro' || user?.subscriptionLevel === 'elite';

  // Request geolocation on component mount (for location-aware features)
  useEffect(() => {
    if (navigator.geolocation && hasWeatherAccess) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, [hasWeatherAccess]);

  // When an animal is selected, update selectedAnimalId
  useEffect(() => {
    if (selectedAnimalId && selectedAnimalId !== "all") {
      // We maintain this effect to ensure compatibility with the original behavior
    }
  }, [selectedAnimalId]);

  return (
    <MainLayout title="Feed Reminders">
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
