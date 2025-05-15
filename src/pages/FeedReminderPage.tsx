
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { AlarmClockIcon, PlusIcon, XIcon, CheckIcon, BellIcon } from "lucide-react";
import { FeedingSchedule, FeedingTime } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";

const FeedReminderPage = () => {
  const { animals, feedingSchedules, addFeedingSchedule, updateFeedingSchedule, deleteFeedingSchedule, completeFeedingTime } = useAppContext();
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [newSchedule, setNewSchedule] = useState<Partial<FeedingSchedule>>({
    id: uuidv4(),
    animalId: "",
    name: "",
    feedingTimes: [],
    reminderEnabled: true,
    reminderMinutesBefore: 30,
  });
  const [editMode, setEditMode] = useState(false);
  const [startHour, setStartHour] = useState("08");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("10");
  const [endMinute, setEndMinute] = useState("00");

  // When an animal is selected, filter to its schedules
  useEffect(() => {
    if (selectedAnimalId) {
      setNewSchedule(prev => ({ ...prev, animalId: selectedAnimalId }));
    }
  }, [selectedAnimalId]);

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
    
    const newFeedingTime: FeedingTime = {
      id: uuidv4(),
      startTime,
      endTime,
      completed: false,
      lastCompleted: null,
    };
    
    setNewSchedule(prev => ({
      ...prev,
      feedingTimes: [...(prev.feedingTimes || []), newFeedingTime]
    }));
    
    // Reset inputs for next time
    setStartHour("08");
    setStartMinute("00");
    setEndHour("10");
    setEndMinute("00");
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
    
    if (editMode) {
      updateFeedingSchedule(completeSchedule);
      toast({
        title: "Schedule updated",
        description: "Feed schedule has been updated successfully",
      });
    } else {
      addFeedingSchedule(completeSchedule);
      toast({
        title: "Schedule created",
        description: "New feed schedule has been created",
      });
    }
    
    // Reset form
    setNewSchedule({
      id: uuidv4(),
      animalId: selectedAnimalId,
      name: "",
      feedingTimes: [],
      reminderEnabled: true,
      reminderMinutesBefore: 30,
    });
    setEditMode(false);
  };

  const handleEditSchedule = (schedule: FeedingSchedule) => {
    setNewSchedule(schedule);
    setEditMode(true);
  };

  const handleDeleteSchedule = (id: string) => {
    deleteFeedingSchedule(id);
    toast({
      title: "Schedule deleted",
      description: "Feed schedule has been removed",
    });
  };

  const handleMarkAsCompleted = (scheduleId: string, timeId: string) => {
    completeFeedingTime(scheduleId, timeId);
    toast({
      title: "Feeding completed",
      description: "Feeding has been marked as completed",
    });
  };

  const getAnimalSchedules = () => {
    if (!selectedAnimalId) return feedingSchedules;
    return feedingSchedules.filter(schedule => schedule.animalId === selectedAnimalId);
  };

  // Get animal's name by ID
  const getAnimalName = (animalId: string) => {
    return animals.find(animal => animal.id === animalId)?.name || "Unknown Animal";
  };

  // Format time for display (e.g., "08:00" to "8:00 AM")
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
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

  // Generate time option strings for dropdowns
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  return (
    <MainLayout title="Feed Reminders">
      <div className="space-y-8">
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
              </Button>
              
              {newSchedule.feedingTimes && newSchedule.feedingTimes.length > 0 && (
                <div className="space-y-2 mt-4">
                  <Label>Added Time Blocks:</Label>
                  <div className="space-y-2">
                    {newSchedule.feedingTimes.map(time => (
                      <div key={time.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span>{formatTime(time.startTime)} - {formatTime(time.endTime)}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveFeedingTime(time.id)}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
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
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Feed Schedules</h2>
            <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All animals</SelectItem>
                {animals.map(animal => (
                  <SelectItem key={animal.id} value={animal.id}>{animal.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {getAnimalSchedules().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAnimalSchedules().map(schedule => (
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
                          onClick={() => handleEditSchedule(schedule)}
                        >
                          <AlarmClockIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteSchedule(schedule.id)}
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
                              onClick={() => handleMarkAsCompleted(schedule.id, time.id)}
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
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <AlarmClockIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No feeding schedules found</p>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Create your first feeding schedule to get reminders when it's time to feed your animals.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedReminderPage;
