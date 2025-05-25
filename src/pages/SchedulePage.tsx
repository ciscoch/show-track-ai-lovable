
import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import CountdownToRing from "@/components/CountdownToRing";
import ScheduleListView from "@/components/schedule/ScheduleListView";
import ScheduleControls from "@/components/schedule/ScheduleControls";
import PrepTimeline from "@/components/schedule/PrepTimeline";
import EventFormDialog from "@/components/schedule/EventFormDialog";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShowEvent } from "@/types/schedule";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Animal, User } from "@/types/models";

const SchedulePage = () => {
  const { animals, userSubscription, user } = useAppContext();
  const {
    events,
    upcomingEvents,
    todayEvents,
    getCategoryColor,
    handleUpgrade,
    saveEvent,
    saveEventTimeline,
    createTimelineForEvent,
    deleteEvent
  } = useSchedule();
  
  const [selectedEvent, setSelectedEvent] = useState<ShowEvent | null>(null);
  const [showTimelineDialog, setShowTimelineDialog] = useState(false);
  const [showEventFormDialog, setShowEventFormDialog] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<ShowEvent | undefined>(undefined);
  const [eventToDelete, setEventToDelete] = useState<ShowEvent | null>(null);
  
  const isProOrElite = userSubscription.level === "pro" || userSubscription.level === "elite";

  // Transform animals to match expected types
  const transformedAnimals: Animal[] = animals.map(animal => ({
    ...animal,
    gender: (animal.gender || "male") as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || animal.birthdate || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: (animal.purpose || "other") as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number || animal.penNumber,
    breederName: animal.breeder_name || animal.breeder_name,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || animal.created_at || new Date().toISOString(),
    organization: typeof animal.organization === 'string' 
      ? { id: animal.organization, name: animal.organization }
      : undefined
  }));

  const transformedUser: User = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };
  
  const handleOpenTimeline = (event: ShowEvent) => {
    setSelectedEvent(event);
    setShowTimelineDialog(true);
  };

  const handleCreateNewTimeline = (event: ShowEvent) => {
    setSelectedEvent(event);
    
    // If event doesn't have a prep timeline, create a default one
    if (!event.prepTimeline) {
      try {
        const defaultTimeline = createTimelineForEvent(event.id);
        const updatedEvent = { ...event, prepTimeline: defaultTimeline };
        saveEvent(updatedEvent);
        setSelectedEvent(updatedEvent);
      } catch (error) {
        console.error("Failed to create timeline:", error);
      }
    }
    
    setShowTimelineDialog(true);
  };

  const handleAddEvent = () => {
    setEventToEdit(undefined);
    setShowEventFormDialog(true);
  };

  const handleEditEvent = (event: ShowEvent) => {
    setEventToEdit(event);
    setShowEventFormDialog(true);
  };

  const handleDeleteEvent = (event: ShowEvent) => {
    setEventToDelete(event);
  };
  
  return (
    <MainLayout title="Show Schedule" user={transformedUser}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ScheduleControls 
            onOpenTimelineClick={todayEvents.length > 0 ? 
              () => handleOpenTimeline(todayEvents[0]) : undefined}
            onAddEventClick={handleAddEvent}
          />
          
          <ScheduleListView
            todayEvents={todayEvents}
            upcomingEvents={upcomingEvents}
            animals={transformedAnimals}
            getCategoryColor={getCategoryColor}
            isProOrElite={isProOrElite}
            handleUpgrade={handleUpgrade}
            onPrepTimelineClick={handleCreateNewTimeline}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
        
        {/* Countdown to the Ring component */}
        <div className="lg:col-span-1">
          <CountdownToRing events={events} />
        </div>
      </div>
      
      {/* Prep Timeline Dialog */}
      <Dialog open={showTimelineDialog} onOpenChange={setShowTimelineDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.title} - Preparation Timeline
            </DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <PrepTimeline 
              event={selectedEvent}
              animals={transformedAnimals}
              onSaveTimeline={saveEventTimeline}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Event Form Dialog */}
      <EventFormDialog
        open={showEventFormDialog}
        onOpenChange={setShowEventFormDialog}
        onSave={saveEvent}
        animals={transformedAnimals}
        event={eventToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={(open) => !open && setEventToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (eventToDelete) {
                  deleteEvent(eventToDelete.id);
                  setEventToDelete(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default SchedulePage;
