
import React, { useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, ClockIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShowEvent, PrepTimeline } from "@/types/schedule";
import { Animal } from "@/types/models";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";

interface PrepTimelineProps {
  event: ShowEvent;
  animals: Animal[];
  onSaveTimeline: (eventId: string, timeline: PrepTimeline) => void;
}

const PrepTimeline = ({ event, animals, onSaveTimeline }: PrepTimelineProps) => {
  // Initialize timeline state from event or with defaults
  const [timeline, setTimeline] = useState<PrepTimeline>(
    event.prepTimeline || {
      finalWeighIn: addDays(event.date, -1),
      hairTrimming: addDays(event.date, -2),
      feedAdjustment: {
        type: "taper",
        startDate: addDays(event.date, -7),
        notes: "Reduce feed gradually"
      },
      showmanshipPractices: [
        {
          id: uuidv4(),
          date: addDays(event.date, -14),
          completed: false
        },
        {
          id: uuidv4(),
          date: addDays(event.date, -7),
          completed: false
        }
      ],
      checklistItems: [
        { id: uuidv4(), item: "Show box", completed: false },
        { id: uuidv4(), item: "Trailer cleaned", completed: false },
        { id: uuidv4(), item: "Health papers", completed: false },
        { id: uuidv4(), item: "Registration papers", completed: false },
        { id: uuidv4(), item: "Feed for show", completed: false }
      ]
    }
  );

  const [targetWeights, setTargetWeights] = useState<{[key: string]: number}>(
    () => {
      const weights: {[key: string]: number} = {};
      event.animals.forEach(animalId => {
        const animal = animals.find(a => a.id === animalId);
        if (animal) {
          // Set default target based on species (simplified example)
          switch(animal.species) {
            case 'goat': weights[animalId] = 100; break;
            case 'cattle': weights[animalId] = 1200; break;
            case 'pig': weights[animalId] = 280; break;
            case 'sheep': weights[animalId] = 140; break;
            default: weights[animalId] = 0;
          }
        }
      });
      return weights;
    }
  );

  const daysUntilShow = Math.max(0, differenceInDays(event.date, new Date()));

  const handleSaveTimeline = () => {
    const updatedTimeline = {
      ...timeline,
      targetWeightGoal: Object.values(targetWeights)[0] // Just saving the first target for now
    };
    
    onSaveTimeline(event.id, updatedTimeline);
    toast({
      title: "Timeline saved",
      description: "Your show preparation timeline has been updated"
    });
  };

  const addPracticeSession = () => {
    setTimeline(prev => ({
      ...prev,
      showmanshipPractices: [
        ...(prev.showmanshipPractices || []),
        {
          id: uuidv4(),
          date: addDays(new Date(), 1),
          completed: false
        }
      ]
    }));
  };

  const togglePracticeCompleted = (id: string) => {
    setTimeline(prev => ({
      ...prev,
      showmanshipPractices: prev.showmanshipPractices?.map(practice => 
        practice.id === id ? { ...practice, completed: !practice.completed } : practice
      )
    }));
  };

  const addChecklistItem = () => {
    setTimeline(prev => ({
      ...prev,
      checklistItems: [
        ...(prev.checklistItems || []),
        {
          id: uuidv4(),
          item: "",
          completed: false
        }
      ]
    }));
  };

  const updateChecklistItem = (id: string, value: string) => {
    setTimeline(prev => ({
      ...prev,
      checklistItems: prev.checklistItems?.map(item => 
        item.id === id ? { ...item, item: value } : item
      )
    }));
  };

  const toggleChecklistItemCompleted = (id: string) => {
    setTimeline(prev => ({
      ...prev,
      checklistItems: prev.checklistItems?.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Preparation Timeline</h2>
        <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {daysUntilShow} days until show
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key dates section */}
        <Card>
          <CardHeader>
            <CardTitle>Key Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Final Weigh-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !timeline.finalWeighIn && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {timeline.finalWeighIn ? (
                      format(timeline.finalWeighIn, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={timeline.finalWeighIn}
                    onSelect={(date) => setTimeline(prev => ({ ...prev, finalWeighIn: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hair Trimming</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !timeline.hairTrimming && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {timeline.hairTrimming ? (
                      format(timeline.hairTrimming, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={timeline.hairTrimming}
                    onSelect={(date) => setTimeline(prev => ({ ...prev, hairTrimming: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Feed Adjustment Start</label>
              <div className="flex space-x-2">
                <select 
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={timeline.feedAdjustment?.type || "taper"}
                  onChange={(e) => setTimeline(prev => ({
                    ...prev,
                    feedAdjustment: {
                      ...(prev.feedAdjustment || { startDate: addDays(event.date, -7) }),
                      type: e.target.value as "taper" | "boost"
                    }
                  }))}
                >
                  <option value="taper">Taper</option>
                  <option value="boost">Boost</option>
                </select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !timeline.feedAdjustment?.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {timeline.feedAdjustment?.startDate ? (
                        format(timeline.feedAdjustment.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={timeline.feedAdjustment?.startDate}
                      onSelect={(date) => setTimeline(prev => ({
                        ...prev,
                        feedAdjustment: {
                          ...(prev.feedAdjustment || { type: "taper" }),
                          startDate: date as Date
                        }
                      }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Input 
                placeholder="Feed adjustment notes"
                value={timeline.feedAdjustment?.notes || ""}
                onChange={(e) => setTimeline(prev => ({
                  ...prev,
                  feedAdjustment: {
                    ...(prev.feedAdjustment || { type: "taper", startDate: addDays(event.date, -7) }),
                    notes: e.target.value
                  }
                }))}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Weight targets section */}
        <Card>
          <CardHeader>
            <CardTitle>Weight Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {event.animals.map(animalId => {
                const animal = animals.find(a => a.id === animalId);
                return animal ? (
                  <div key={animalId} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {animal.name} Target Weight (lbs)
                    </label>
                    <Input
                      type="number"
                      value={targetWeights[animalId] || 0}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setTargetWeights(prev => ({
                          ...prev,
                          [animalId]: isNaN(value) ? 0 : value
                        }));
                      }}
                    />
                    <div className="text-xs text-muted-foreground">
                      Current weight: {animal.currentWeight || "Unknown"} lbs
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Showmanship practice sessions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Showmanship Practice Sessions</CardTitle>
          <Button size="sm" onClick={addPracticeSession}>Add Practice</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {timeline.showmanshipPractices && timeline.showmanshipPractices.length > 0 ? (
              timeline.showmanshipPractices.map(practice => (
                <div key={practice.id} className="flex items-center space-x-2 border-b pb-2">
                  <Checkbox 
                    id={`practice-${practice.id}`} 
                    checked={practice.completed}
                    onCheckedChange={() => togglePracticeCompleted(practice.id)}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-grow justify-start text-left font-normal",
                          practice.completed && "line-through opacity-50"
                        )}
                      >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        {format(practice.date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={practice.date}
                        onSelect={(date) => {
                          if (!date) return;
                          setTimeline(prev => ({
                            ...prev,
                            showmanshipPractices: prev.showmanshipPractices?.map(p => 
                              p.id === practice.id ? { ...p, date } : p
                            )
                          }));
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No practice sessions scheduled. Add your first practice session.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Checklist items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Show Day Checklist</CardTitle>
          <Button size="sm" onClick={addChecklistItem}>Add Item</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {timeline.checklistItems && timeline.checklistItems.length > 0 ? (
              timeline.checklistItems.map(item => (
                <div key={item.id} className="flex items-center space-x-2 border-b pb-2">
                  <Checkbox 
                    id={`checklist-${item.id}`} 
                    checked={item.completed}
                    onCheckedChange={() => toggleChecklistItemCompleted(item.id)}
                  />
                  <Input
                    value={item.item}
                    onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                    className={cn(item.completed && "line-through opacity-50")}
                    placeholder="Enter checklist item"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No checklist items added. Add your first item.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveTimeline}>
          Save Timeline
        </Button>
      </div>
    </div>
  );
};

export default PrepTimeline;
