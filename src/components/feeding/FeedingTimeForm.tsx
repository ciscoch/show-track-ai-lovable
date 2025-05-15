
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { FeedingTime } from "@/types/models";
import { v4 as uuidv4 } from "uuid";

interface FeedingTimeFormProps {
  location: { latitude: number; longitude: number } | null;
  onAddFeedingTime: (feedingTime: FeedingTime) => void;
}

export const FeedingTimeForm = ({ location, onAddFeedingTime }: FeedingTimeFormProps) => {
  const [startHour, setStartHour] = useState("08");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("10");
  const [endMinute, setEndMinute] = useState("00");

  // Generate time option strings for dropdowns
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  const handleAddFeedingTime = () => {
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;
    
    // Validate time format
    if (!startTime.match(/^\d{2}:\d{2}$/) || !endTime.match(/^\d{2}:\d{2}$/)) {
      toast({
        title: "Invalid time format",
        description: "Please use HH:MM format for times",
        variant: "destructive"
      });
      return;
    }
    
    // Validate time logic
    if (startTime >= endTime) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time",
        variant: "destructive"
      });
      return;
    }

    // Add location data if available
    const locationData = location ? {
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: new Date().toISOString(),
    } : null;
    
    const newFeedingTime: FeedingTime = {
      id: uuidv4(),
      startTime,
      endTime,
      completed: false,
      lastCompleted: null,
      locationData,
    };
    
    onAddFeedingTime(newFeedingTime);
    
    // Reset inputs for next time
    setStartHour("08");
    setStartMinute("00");
    setEndHour("10");
    setEndMinute("00");
  };

  return (
    <div className="space-y-2">
      <Label>Feeding Times</Label>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
        <div>
          <Label htmlFor="start-hour">Start Hour</Label>
          <Select value={startHour} onValueChange={setStartHour}>
            <SelectTrigger id="start-hour">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hourOptions.map(hour => (
                <SelectItem key={`start-${hour}`} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="start-minute">Start Minute</Label>
          <Select value={startMinute} onValueChange={setStartMinute}>
            <SelectTrigger id="start-minute">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {minuteOptions.map(minute => (
                <SelectItem key={`startMin-${minute}`} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="end-hour">End Hour</Label>
          <Select value={endHour} onValueChange={setEndHour}>
            <SelectTrigger id="end-hour">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hourOptions.map(hour => (
                <SelectItem key={`end-${hour}`} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="end-minute">End Minute</Label>
          <Select value={endMinute} onValueChange={setEndMinute}>
            <SelectTrigger id="end-minute">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {minuteOptions.map(minute => (
                <SelectItem key={`endMin-${minute}`} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={handleAddFeedingTime} 
        variant="outline" 
        size="sm" 
        className="mt-2"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Time Block
        {location && (
          <span className="ml-1 text-xs text-muted-foreground">
            (with location data)
          </span>
        )}
      </Button>
    </div>
  );
};
