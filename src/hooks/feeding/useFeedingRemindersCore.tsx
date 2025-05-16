
import { FeedingSchedule, Animal, User } from '@/types/models';
import { useWeatherAlerts } from './useWeatherAlerts';
import { useReminderNotifications } from './useReminderNotifications';

interface UseFeedingRemindersCoreProps {
  feedingSchedules: FeedingSchedule[];
  animals: Animal[];
  user: User | null;
}

export const useFeedingRemindersCore = ({ 
  feedingSchedules, 
  animals, 
  user 
}: UseFeedingRemindersCoreProps) => {
  // Handle weather alerts
  const { location, hasWeatherAccess } = useWeatherAlerts({ user });
  
  // Handle feeding reminders
  useReminderNotifications({ feedingSchedules, animals });

  return {
    location,
    hasWeatherAccess
  };
};
