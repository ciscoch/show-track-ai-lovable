
import { useEffect, useState } from 'react';
import { FeedingSchedule, Animal } from '@/types/models';
import { toast } from "@/hooks/use-toast";
import { getWeatherForecast, detectWeatherAlerts } from '@/services/weatherService';

interface UseFeedingRemindersProps {
  feedingSchedules: FeedingSchedule[];
  animals: Animal[];
}

export const useFeedingReminders = ({ feedingSchedules, animals }: UseFeedingRemindersProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  // Request geolocation once
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error in reminders:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Check weather alerts once a day
    const checkWeatherAlerts = async () => {
      if (!location) return;
      
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
    if (location) {
      checkWeatherAlerts();
    }
    
    // Check weather alerts once a day
    const weatherCheckInterval = setInterval(() => {
      if (location) {
        checkWeatherAlerts();
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(weatherCheckInterval);
  }, [location]);

  useEffect(() => {
    const checkFeedingReminders = () => {
      const now = new Date();
      
      feedingSchedules.forEach(schedule => {
        if (!schedule.reminderEnabled) return;
        
        schedule.feedingTimes.forEach(time => {
          if (time.completed) return;
          
          // Reset completion status at midnight
          if (time.lastCompleted) {
            const lastCompletedDate = new Date(time.lastCompleted).toDateString();
            const today = now.toDateString();
            
            if (lastCompletedDate === today) return; // Already completed today
          }
          
          // Parse end time
          const [endHour, endMinute] = time.endTime.split(':').map(Number);
          const endTimeDate = new Date();
          endTimeDate.setHours(endHour, endMinute, 0, 0);
          
          // Calculate reminder time
          const reminderTime = new Date(endTimeDate);
          reminderTime.setMinutes(reminderTime.getMinutes() - (schedule.reminderMinutesBefore || 30));
          
          // If current time is past the reminder time but before end time, show reminder
          if (now >= reminderTime && now <= endTimeDate) {
            const animalName = animals.find(a => a.id === schedule.animalId)?.name || "your animal";
            
            // Only show reminder if we haven't already shown one in the last 15 minutes
            const storageKey = `reminder-shown-${schedule.id}-${time.id}`;
            const lastReminderShown = localStorage.getItem(storageKey);
            
            if (!lastReminderShown || (Date.now() - parseInt(lastReminderShown)) > 15 * 60 * 1000) {
              toast({
                title: "Feeding Reminder",
                description: `Time to feed ${animalName}! Feeding window ends at ${formatTime(time.endTime)}.`,
                duration: 10000, // Show for 10 seconds
              });
              
              // Store the time we showed this reminder
              localStorage.setItem(storageKey, Date.now().toString());
            }
          }
        });
      });
    };
    
    // Check immediately and then every minute
    checkFeedingReminders();
    const interval = setInterval(checkFeedingReminders, 60000);
    
    return () => clearInterval(interval);
  }, [feedingSchedules, animals]);
};

// Helper function to format time for display
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};
