
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlarmClockIcon, XIcon, CheckIcon, BellIcon } from "lucide-react";
import { Animal, FeedingSchedule, FeedingTime } from "@/types/models";
import { formatTime } from "@/utils/timeUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScheduleListProps {
  schedules: FeedingSchedule[];
  animals: Animal[];
  onEditSchedule: (schedule: FeedingSchedule) => void;
  onDeleteSchedule: (id: string) => void;
  onCompleteFeeding: (scheduleId: string, timeId: string) => void;
}

export const ScheduleList = ({
  schedules,
  animals,
  onEditSchedule,
  onDeleteSchedule,
  onCompleteFeeding
}: ScheduleListProps) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("all");

  // Filter schedules by animal
  const filteredSchedules = selectedAnimalId === "all" 
    ? schedules 
    : schedules.filter(schedule => schedule.animalId === selectedAnimalId);

  // Get animal's name by ID
  const getAnimalName = (animalId: string) => {
    return animals.find(animal => animal.id === animalId)?.name || "Unknown Animal";
  };

  // Check if a feeding time is due today and not completed
  const isFeedingDueToday = (feedingTime: FeedingTime) => {
    if (feedingTime.completed) return false;
    
    // Reset completion status at midnight
    const lastCompletedDate = feedingTime.lastCompleted 
      ? new Date(feedingTime.lastCompleted).toDateString() 
      : null;
    const today = new Date().toDateString();
    
    return lastCompletedDate !== today;
  };

  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlarmClockIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No feeding schedules found</p>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Create your first feeding schedule to get reminders when it's time to feed your animals.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Feed Schedules</h2>
        <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by animal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All animals</SelectItem>
            {animals.map(animal => (
              <SelectItem key={animal.id} value={animal.id}>{animal.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchedules.map(schedule => (
          <Card key={schedule.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{schedule.name}</CardTitle>
                  <CardDescription>{getAnimalName(schedule.animalId)}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEditSchedule(schedule)}
                  >
                    <AlarmClockIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDeleteSchedule(schedule.id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {schedule.feedingTimes.map(time => (
                  <div 
                    key={time.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      isFeedingDueToday(time) ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-muted'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{formatTime(time.startTime)} - {formatTime(time.endTime)}</span>
                      {time.completed && (
                        <span className="text-xs text-muted-foreground">
                          Completed {time.lastCompleted ? new Date(time.lastCompleted).toLocaleString() : ''}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isFeedingDueToday(time) && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <BellIcon className="h-3 w-3" />
                          <span>Due Today</span>
                        </Badge>
                      )}
                      
                      <Button 
                        variant={time.completed ? "outline" : "default"} 
                        size="sm" 
                        onClick={() => onCompleteFeeding(schedule.id, time.id)}
                        disabled={time.completed}
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        {time.completed ? "Done" : "Complete"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
