
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlarmClockIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Animal, FeedingSchedule, FeedingTime } from "@/types/models";
import { FeedingTimeForm } from "./FeedingTimeForm";
import { FeedingTimesList } from "./FeedingTimesList";

interface ScheduleFormProps {
  animals: Animal[];
  selectedAnimalId: string;
  onSave: (schedule: FeedingSchedule) => void;
  initialSchedule?: FeedingSchedule;
  location: { latitude: number; longitude: number } | null;
}

export const ScheduleForm = ({ 
  animals, 
  selectedAnimalId, 
  onSave, 
  initialSchedule,
  location 
}: ScheduleFormProps) => {
  const [newSchedule, setNewSchedule] = useState<Partial<FeedingSchedule>>(
    initialSchedule || {
      id: uuidv4(),
      animalId: selectedAnimalId,
      name: "",
      feedingTimes: [],
      reminderEnabled: true,
      reminderMinutesBefore: 30,
    }
  );
  
  const editMode = !!initialSchedule;

  const handleAddFeedingTime = (feedingTime: FeedingTime) => {
    setNewSchedule(prev => ({
      ...prev,
      feedingTimes: [...(prev.feedingTimes || []), feedingTime]
    }));
  };

  const handleRemoveFeedingTime = (id: string) => {
    setNewSchedule(prev => ({
      ...prev,
      feedingTimes: prev.feedingTimes?.filter(time => time.id !== id) || []
    }));
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.animalId || !newSchedule.name || !newSchedule.feedingTimes?.length) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const completeSchedule: FeedingSchedule = {
      id: newSchedule.id || uuidv4(),
      animalId: newSchedule.animalId,
      name: newSchedule.name,
      feedingTimes: newSchedule.feedingTimes || [],
      reminderEnabled: newSchedule.reminderEnabled || true,
      reminderMinutesBefore: newSchedule.reminderMinutesBefore || 30,
      createdAt: new Date().toISOString(),
    };
    
    onSave(completeSchedule);
    
    // Reset form if not in edit mode
    if (!editMode) {
      setNewSchedule({
        id: uuidv4(),
        animalId: selectedAnimalId,
        name: "",
        feedingTimes: [],
        reminderEnabled: true,
        reminderMinutesBefore: 30,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlarmClockIcon className="h-5 w-5" />
          <span>Feed Reminder Setup</span>
        </CardTitle>
        <CardDescription>
          Create feeding schedules and get reminders before each feeding time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="animal-select">Animal</Label>
            <Select 
              value={newSchedule.animalId} 
              onValueChange={(value) => setNewSchedule(prev => ({ ...prev, animalId: value }))}
            >
              <SelectTrigger id="animal-select">
                <SelectValue placeholder="Select animal" />
              </SelectTrigger>
              <SelectContent>
                {animals.map(animal => (
                  <SelectItem key={animal.id} value={animal.id}>
                    {animal.name} ({animal.species})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="schedule-name">Schedule Name</Label>
            <Input 
              id="schedule-name" 
              placeholder="e.g., Daily Feeding"
              value={newSchedule.name}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))} 
            />
          </div>
        </div>
        
        <FeedingTimeForm
          location={location}
          onAddFeedingTime={handleAddFeedingTime}
        />
        
        <FeedingTimesList
          feedingTimes={newSchedule.feedingTimes || []}
          onRemoveFeedingTime={handleRemoveFeedingTime}
        />
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="reminder-toggle"
              checked={newSchedule.reminderEnabled}
              onCheckedChange={(checked) => setNewSchedule(prev => ({ ...prev, reminderEnabled: checked }))}
            />
            <Label htmlFor="reminder-toggle">Enable Reminders</Label>
          </div>
          
          {newSchedule.reminderEnabled && (
            <div className="ml-6">
              <Label htmlFor="reminder-minutes">Remind me before (minutes)</Label>
              <Select 
                value={newSchedule.reminderMinutesBefore?.toString()} 
                onValueChange={(value) => setNewSchedule(prev => ({ ...prev, reminderMinutesBefore: parseInt(value) }))}
              >
                <SelectTrigger id="reminder-minutes">
                  <SelectValue placeholder="Select minutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSchedule}>
          {editMode ? "Update Schedule" : "Create Schedule"}
        </Button>
      </CardFooter>
    </Card>
  );
};
