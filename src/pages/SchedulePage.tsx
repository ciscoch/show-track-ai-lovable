
import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import CountdownToRing from "@/components/CountdownToRing";
import ScheduleCalendarView from "@/components/schedule/ScheduleCalendarView";
import ScheduleListView from "@/components/schedule/ScheduleListView";
import ScheduleControls from "@/components/schedule/ScheduleControls";
import PrepTimeline from "@/components/schedule/PrepTimeline";
import { useSchedule } from "@/hooks/useSchedule";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShowEvent } from "@/types/schedule";

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
    getCategoryColor,
    handleUpgrade,
    saveEventTimeline
  } = useSchedule();
  
  const [selectedEvent, setSelectedEvent] = useState<ShowEvent | null>(null);
  const [showTimelineDialog, setShowTimelineDialog] = useState(false);
  
  const isProOrElite = userSubscription.level === "pro" || userSubscription.level === "elite";
  
  const handleOpenTimeline = (event: ShowEvent) => {
    setSelectedEvent(event);
    setShowTimelineDialog(true);
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
          />
          
          {view === "calendar" ? (
            <ScheduleCalendarView
              date={date}
              setDate={setDate}
              selectedDateEvents={selectedDateEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
              onPrepTimelineClick={handleOpenTimeline}
            />
          ) : (
            <ScheduleListView
              upcomingEvents={upcomingEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
              isProOrElite={isProOrElite}
              handleUpgrade={handleUpgrade}
              onPrepTimelineClick={handleOpenTimeline}
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
    </MainLayout>
  );
};

export default SchedulePage;
