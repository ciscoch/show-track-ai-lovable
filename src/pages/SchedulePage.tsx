import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import CountdownToRing from "@/components/CountdownToRing";
import ScheduleCalendarView from "@/components/schedule/ScheduleCalendarView";
import ScheduleListView from "@/components/schedule/ScheduleListView";
import ScheduleControls from "@/components/schedule/ScheduleControls";
import PrepTimeline from "@/components/schedule/PrepTimeline";
import EventFormDialog from "@/components/schedule/EventFormDialog";
import { useSchedule } from "@/hooks/schedule/useSchedule";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShowEvent } from "@/types/schedule";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const SchedulePage = () => {
  const { animals, userSubscription } = useAppContext();
  const {
    date,
    setDate,
    view,
    setView,
    events,
    selectedDateEvents,
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
    <MainLayout title="Show Schedule">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ScheduleControls 
            view={view} 
            setView={setView} 
            onOpenTimelineClick={selectedDateEvents.length > 0 ? 
              () => handleOpenTimeline(selectedDateEvents[0]) : undefined}
            onAddEventClick={handleAddEvent}
          />
          
          {view === "calendar" ? (
            <ScheduleCalendarView
              date={date}
              setDate={setDate}
              selectedDateEvents={selectedDateEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
              onPrepTimelineClick={handleCreateNewTimeline}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          ) : (
            <ScheduleListView
              todayEvents={todayEvents}
              upcomingEvents={upcomingEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
              isProOrElite={isProOrElite}
              handleUpgrade={handleUpgrade}
              onPrepTimelineClick={handleCreateNewTimeline}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
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
              animals={animals}
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
        animals={animals}
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
