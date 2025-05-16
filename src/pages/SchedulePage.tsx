
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { Badge } from "@/components/ui/badge";
import CountdownToRing from "@/components/CountdownToRing";

// Mock data for show events
interface ShowEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  animals: string[];
  category: "show" | "practice" | "appointment" | "other";
  notes?: string;
  reminder?: boolean;
}

const mockEvents: ShowEvent[] = [
  {
    id: "e1",
    title: "County Fair",
    date: new Date(new Date().setDate(new Date().getDate() + 15)),
    location: "County Fairgrounds",
    animals: ["1", "2"],
    category: "show",
    notes: "Main ring at 10am. Check-in by 8am.",
    reminder: true,
  },
  {
    id: "e2",
    title: "Practice Session",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    location: "Smith's Farm",
    animals: ["1", "3"],
    category: "practice",
    notes: "Focus on showmanship techniques",
  },
  {
    id: "e3",
    title: "Vet Appointment",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    location: "Dr. Wilson's Office",
    animals: ["2"],
    category: "appointment",
    notes: "Annual checkup and vaccinations",
    reminder: true,
  },
  {
    id: "e4",
    title: "State Fair",
    date: new Date(new Date().setDate(new Date().getDate() + 45)),
    location: "State Fairgrounds",
    animals: ["1", "2", "3"],
    category: "show",
    notes: "Arrival day June 15, show on June 16.",
    reminder: true,
  }
];

const SchedulePage = () => {
  const { animals, userSubscription } = useAppContext();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  const isProOrElite = userSubscription.level === "pro" || userSubscription.level === "elite";
  
  // Find events that occur on the selected date (for calendar view)
  const selectedDateEvents = mockEvents.filter(
    event => event.date.toDateString() === date.toDateString()
  );
  
  // Sort events by date (for list view)
  const sortedEvents = [...mockEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  
  // Filter to upcoming events only
  const upcomingEvents = sortedEvents.filter(
    event => event.date >= new Date(new Date().setHours(0, 0, 0, 0))
  );
  
  // Function to get the event badge color based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "show": return "bg-primary text-primary-foreground";
      case "practice": return "bg-green-500 text-white";
      case "appointment": return "bg-amber-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };
  
  return (
    <MainLayout title="Show Schedule">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex gap-4">
              <Button 
                variant={view === "calendar" ? "default" : "outline"} 
                onClick={() => setView("calendar")}
              >
                Calendar View
              </Button>
              <Button 
                variant={view === "list" ? "default" : "outline"} 
                onClick={() => setView("list")}
              >
                List View
              </Button>
            </div>
            
            <Button>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
          
          {view === "calendar" ? (
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
                              
                              <Badge className={getCategoryColor(event.category)}>
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </Badge>
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
          ) : (
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
          )}
        </div>
        
        {/* Countdown to the Ring component */}
        <div className="lg:col-span-1">
          <CountdownToRing events={mockEvents} />
        </div>
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
