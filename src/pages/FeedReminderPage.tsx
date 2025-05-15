
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { getWeatherForecast, detectWeatherAlerts } from "@/services/weatherService";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { useNavigate } from "react-router-dom";

// Import refactored components
import { ScheduleForm } from "@/components/feeding/ScheduleForm";
import { ScheduleList } from "@/components/feeding/ScheduleList";
import { LocationStatus } from "@/components/feeding/LocationStatus";
import WeatherAlerts from "@/components/weather/WeatherAlerts";

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
  
  const navigate = useNavigate();
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("all");
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  
  // Geolocation and weather state
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherAlerts, setWeatherAlerts] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Check if the user has a premium subscription (pro or elite)
  const hasWeatherAccess = user?.subscriptionLevel === 'pro' || user?.subscriptionLevel === 'elite';

  // Request geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation && hasWeatherAccess) {
      setIsLoadingWeather(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError("Unable to retrieve your location. Weather alerts disabled.");
          setIsLoadingWeather(false);
          console.error("Geolocation error:", error);
        }
      );
    } else if (!hasWeatherAccess) {
      setLocationError(null);
      setIsLoadingWeather(false);
    } else {
      setLocationError("Geolocation is not supported by your browser. Weather alerts disabled.");
      setIsLoadingWeather(false);
    }
  }, [hasWeatherAccess]);

  // Fetch weather forecast when location is available
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location || !hasWeatherAccess) return;
      
      try {
        const forecast = await getWeatherForecast(location.latitude, location.longitude);
        const alerts = detectWeatherAlerts(forecast);
        setWeatherAlerts(alerts);
        
        const products = getRecommendedProducts(alerts);
        setRecommendedProducts(products);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast({
          title: "Weather Data Error",
          description: "Unable to fetch weather alerts. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingWeather(false);
      }
    };
    
    fetchWeatherData();
  }, [location, hasWeatherAccess]);

  // When an animal is selected, filter to its schedules
  useEffect(() => {
    if (selectedAnimalId && selectedAnimalId !== "all") {
      setEditingSchedule(prev => prev ? { ...prev, animalId: selectedAnimalId } : null);
    }
  }, [selectedAnimalId]);

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

  const handleUpgradeClick = () => {
    navigate('/subscription');
  };

  const getRecommendedProducts = (alerts: any[]) => {
    // Mock function to return recommended products based on weather alerts
    const products: any[] = [];
    
    for (const alert of alerts) {
      if (alert.event.toLowerCase().includes('freeze') || alert.event.toLowerCase().includes('cold')) {
        products.push({
          title: "Heated Water Bucket",
          description: "Keep your animal's water from freezing in cold temperatures",
          price: "$49.99",
          imageUrl: "https://placehold.co/100x100",
          affiliateUrl: "https://amazon.com/sample-product"
        });
        
        products.push({
          title: "Cold Weather Animal Blanket",
          description: "Insulated blanket for livestock during freezing temperatures",
          price: "$39.99",
          imageUrl: "https://placehold.co/100x100",
          affiliateUrl: "https://amazon.com/sample-product"
        });
      }
      
      if (alert.event.toLowerCase().includes('heat')) {
        products.push({
          title: "Livestock Cooling Fan",
          description: "Keep your animals cool during hot weather",
          price: "$89.99",
          imageUrl: "https://placehold.co/100x100",
          affiliateUrl: "https://amazon.com/sample-product"
        });
        
        products.push({
          title: "Animal Shade Structure",
          description: "Portable shade to protect animals from excessive heat",
          price: "$129.99",
          imageUrl: "https://placehold.co/100x100",
          affiliateUrl: "https://amazon.com/sample-product"
        });
      }
      
      if (alert.event.toLowerCase().includes('storm') || alert.event.toLowerCase().includes('rain')) {
        products.push({
          title: "Waterproof Animal Shelter",
          description: "Protect your animals from storms and heavy rain",
          price: "$199.99",
          imageUrl: "https://placehold.co/100x100",
          affiliateUrl: "https://amazon.com/sample-product"
        });
      }
    }
    
    return products;
  };

  return (
    <MainLayout title="Feed Reminders">
      <div className="space-y-8">
        {/* Weather alerts section - Premium feature */}
        {!hasWeatherAccess ? (
          <PremiumFeatureBanner
            title="Weather Alerts"
            description="Receive weather alerts and recommended products for your animals based on your location. Upgrade to Pro or Elite to access this feature."
            requiredLevel="pro"
            onUpgrade={handleUpgradeClick}
            currentLevel={user?.subscriptionLevel || 'free'}
          />
        ) : (
          <>
            <LocationStatus isLoading={isLoadingWeather} error={locationError} />
            
            {!isLoadingWeather && !locationError && (
              <WeatherAlerts alerts={weatherAlerts} products={recommendedProducts} />
            )}
          </>
        )}

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
    </MainLayout>
  );
};

export default FeedReminderPage;
