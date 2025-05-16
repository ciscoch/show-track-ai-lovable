
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShowEvent } from "@/types/schedule";
import { Animal } from "@/types/models";

interface ScheduleCalendarViewProps {
  date: Date;
  setDate: (date: Date) => void;
  selectedDateEvents: ShowEvent[];
  animals: Animal[];
  getCategoryColor: (category: string) => string;
  onPrepTimelineClick?: (event: ShowEvent) => void;
}

const ScheduleCalendarView = ({
  date,
  setDate,
  selectedDateEvents,
  animals,
  getCategoryColor,
  onPrepTimelineClick,
}: ScheduleCalendarViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
            className="rounded-md border"
            initialFocus
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className={`h-1 ${getCategoryColor(event.category)}`} />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {event.animals.map(animalId => {
                            const animal = animals.find(a => a.id === animalId);
                            return animal ? (
                              <Badge key={animalId} variant="outline">
                                {animal.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                        
                        {event.category === "show" && onPrepTimelineClick && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onPrepTimelineClick(event)}
                          >
                            <ClockIcon className="h-4 w-4 mr-1" />
                            Prep Timeline
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {event.notes && (
                      <div className="mt-3 text-sm">{event.notes}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No events scheduled for this day.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleCalendarView;
