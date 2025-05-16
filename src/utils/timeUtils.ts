
/**
 * Format time for display (e.g., "08:00" to "8:00 AM")
 */
export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

/**
 * Calculate days until a target date
 */
export const getDaysUntil = (targetDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  const timeDiff = target.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

/**
 * Format a countdown message based on days until event
 */
export const formatCountdown = (daysRemaining: number): string => {
  if (daysRemaining === 0) {
    return "Today!";
  } else if (daysRemaining === 1) {
    return "Tomorrow!";
  } else if (daysRemaining < 0) {
    return "Event has passed";
  } else {
    return `${daysRemaining} days`;
  }
};
