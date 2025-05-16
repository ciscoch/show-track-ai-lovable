
import { useEffect } from 'react';
import { FeedingSchedule, Animal } from '@/types/models';
import { toast } from "@/hooks/use-toast";
import { formatTime } from "@/utils/timeUtils";

interface UseReminderNotificationsProps {
  feedingSchedules: FeedingSchedule[];
  animals: Animal[];
}

export const useReminderNotifications = ({ 
  feedingSchedules, 
  animals 
}: UseReminderNotificationsProps) => {
  
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

  return {};
};
