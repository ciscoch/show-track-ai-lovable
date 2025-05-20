
import { useState, useEffect } from 'react';
import { User } from '@/types/models';
import { toast } from "@/hooks/use-toast";
import { getWeatherForecast, detectWeatherAlerts } from '@/services/weatherService';
import { getCurrentPosition } from '@/platform/geolocation';

interface UseWeatherAlertsProps {
  user: User | null;
}

export const useWeatherAlerts = ({ user }: UseWeatherAlertsProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Check if the user has weather alert access (pro or elite subscription)
  const hasWeatherAccess = user?.subscriptionLevel === 'pro' || user?.subscriptionLevel === 'elite';
  
  // Request geolocation once
  useEffect(() => {
    if (hasWeatherAccess) {
      getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error in weather alerts:", error);
        }
      );
    }
  }, [hasWeatherAccess]);

  useEffect(() => {
    // Check weather alerts once a day
    const checkWeatherAlerts = async () => {
      if (!location || !hasWeatherAccess) return;
      
      try {
        const forecast = await getWeatherForecast(location.latitude, location.longitude);
        const alerts = detectWeatherAlerts(forecast);
        
        // Show important weather alerts as toasts
        for (const alert of alerts) {
          if (alert.severity === 'high' || alert.severity === 'medium') {
            toast({
              title: alert.event,
              description: alert.description,
              duration: 10000, // Show for 10 seconds
            });
          }
        }
      } catch (error) {
        console.error("Error checking weather alerts:", error);
      }
    };
    
    // Check weather once when location is available
    if (location && hasWeatherAccess) {
      checkWeatherAlerts();
    }
    
    // Check weather alerts once a day
    const weatherCheckInterval = setInterval(() => {
      if (location && hasWeatherAccess) {
        checkWeatherAlerts();
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(weatherCheckInterval);
  }, [location, hasWeatherAccess]);

  return {
    location,
    hasWeatherAccess
  };
};
