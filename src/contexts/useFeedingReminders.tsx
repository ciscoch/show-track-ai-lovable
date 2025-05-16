
import { FeedingSchedule, Animal, User } from '@/types/models';
import { useFeedingRemindersCore } from '@/hooks/feeding';

// Helper function to format time for display
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

interface UseFeedingRemindersProps {
  feedingSchedules: FeedingSchedule[];
  animals: Animal[];
  user: User | null;
}

// This is now a compatibility wrapper around the new modular hooks
export const useFeedingReminders = (props: UseFeedingRemindersProps) => {
  return useFeedingRemindersCore(props);
};
