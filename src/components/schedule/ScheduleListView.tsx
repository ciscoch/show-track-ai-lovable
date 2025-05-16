
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClockIcon, Edit, Trash2 } from "lucide-react";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { ShowEvent } from "@/types/schedule";
import { Animal } from "@/types/models";

interface ScheduleListViewProps {
  upcomingEvents: ShowEvent[];
  animals: Animal[];
  getCategoryColor: (category: string) => string;
  isProOrElite: boolean;
  handleUpgrade: () => void;
  onPrepTimelineClick?: (event: ShowEvent) => void;
  onEditEvent?: (event: ShowEvent) => void;
  onDeleteEvent?: (event: ShowEvent) => void;
}

const ScheduleListView = ({
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className={`h-1 ${getCategoryColor(event.category)}`} />
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div className="flex-1">
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
                        
                        {event.notes && (
                          <div className="mt-3 text-sm">{event.notes}</div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                        <p className="text-sm font-medium">
                          {event.date.toLocaleDateString()}
                        </p>
                        
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
                          
                          {onEditEvent && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEditEvent(event)}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming events scheduled.
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
