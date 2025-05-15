
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import { FeedingTime } from "@/types/models";
import { formatTime } from "@/utils/timeUtils";

interface FeedingTimesListProps {
  feedingTimes: FeedingTime[];
  onRemoveFeedingTime: (id: string) => void;
}

export const FeedingTimesList = ({ feedingTimes, onRemoveFeedingTime }: FeedingTimesListProps) => {
  if (!feedingTimes || feedingTimes.length === 0) return null;
  
  return (
    <div className="space-y-2 mt-4">
      <Label>Added Time Blocks:</Label>
      <div className="space-y-2">
        {feedingTimes.map(time => (
          <div key={time.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex flex-col">
              <span>{formatTime(time.startTime)} - {formatTime(time.endTime)}</span>
              {time.locationData && (
                <span className="text-xs text-muted-foreground">
                  Location data will be stored
                </span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemoveFeedingTime(time.id)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
