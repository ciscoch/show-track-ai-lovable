
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClockIcon, Edit, Trash2, CalendarIcon, MapPinIcon, CheckCircleIcon, AlertCircleIcon, Users } from "lucide-react";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { ShowEvent } from "@/types/schedule";
import { Animal } from "@/types/models";

interface ScheduleListViewProps {
  todayEvents: ShowEvent[];
  upcomingEvents: ShowEvent[];
  animals: Animal[];
  getCategoryColor: (category: string) => string;
  isProOrElite: boolean;
  handleUpgrade: () => void;
  onPrepTimelineClick?: (event: ShowEvent) => void;
  onEditEvent?: (event: ShowEvent) => void;
  onDeleteEvent?: (event: ShowEvent) => void;
}

// Helper component for rendering event cards
const EventCard = ({ 
  event,
  animals,
  getCategoryColor,
  onPrepTimelineClick,
  onEditEvent,
  onDeleteEvent,
  isToday
}) => (
  <Card key={event.id} className={`overflow-hidden ${isToday ? 'border-primary border-2' : ''}`}>
    <div className={`h-2 ${getCategoryColor(event.category)}`} />
    <CardContent className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{event.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center mt-2">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">
                {event.date.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2">
            <Badge className={getCategoryColor(event.category)}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
            
            <div className="flex gap-2 mt-2">
              {event.category === "show" && onPrepTimelineClick && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onPrepTimelineClick(event)}
                >
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Prep Timeline
                </Button>
              )}
              
              <div className="flex">
                {onEditEvent && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEditEvent(event)}
                    className="mr-1"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                
                {onDeleteEvent && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onDeleteEvent(event)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {event.animals && event.animals.length > 0 && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>Animals</span>
            </div>
            <div className="flex flex-wrap gap-2">
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
        )}
        
        {event.notes && (
          <div className="mt-1 text-sm border-t pt-3">
            {event.reminder && (
              <div className="flex items-center mb-2">
                <AlertCircleIcon className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm font-medium">Reminder Set</span>
              </div>
            )}
            <p>{event.notes}</p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const ScheduleListView = ({
  todayEvents,
  upcomingEvents,
  animals,
  getCategoryColor,
  isProOrElite,
  handleUpgrade,
  onPrepTimelineClick,
  onEditEvent,
  onDeleteEvent
}: ScheduleListViewProps) => {
  return (
    <div className="space-y-8">
      {/* Today's Events Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Today's Schedule
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </Badge>
        </CardHeader>
        <CardContent>
          {todayEvents.length > 0 ? (
            <div className="space-y-4">
              {todayEvents.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  animals={animals}
                  getCategoryColor={getCategoryColor}
                  onPrepTimelineClick={onPrepTimelineClick}
                  onEditEvent={onEditEvent}
                  onDeleteEvent={onDeleteEvent}
                  isToday={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 flex flex-col items-center">
              <CheckCircleIcon className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">All clear! No events scheduled for today.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Upcoming Events Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  animals={animals}
                  getCategoryColor={getCategoryColor}
                  onPrepTimelineClick={onPrepTimelineClick}
                  onEditEvent={onEditEvent}
                  onDeleteEvent={onDeleteEvent}
                  isToday={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-3">No upcoming events scheduled.</p>
              <p className="text-sm text-muted-foreground mb-4">Add your first event to start planning your schedule.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!isProOrElite && (
        <PremiumFeatureBanner 
          title="Advanced Schedule Management"
          description="Upgrade to Pro or Elite for reminders, show readiness tracking, and automatic progress tracking for your animals."
          requiredLevel="pro"
          onUpgrade={handleUpgrade}
        />
      )}
    </div>
  );
};

export default ScheduleListView;
