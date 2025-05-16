
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import CountdownToRing from "@/components/CountdownToRing";
import ScheduleCalendarView from "@/components/schedule/ScheduleCalendarView";
import ScheduleListView from "@/components/schedule/ScheduleListView";
import ScheduleControls from "@/components/schedule/ScheduleControls";
import { useSchedule } from "@/hooks/useSchedule";
import { mockEvents } from "@/data/mockEvents";

const SchedulePage = () => {
  const { animals, userSubscription } = useAppContext();
  const {
    date,
    setDate,
    view,
    setView,
    selectedDateEvents,
    upcomingEvents,
    getCategoryColor,
    handleUpgrade
  } = useSchedule();
  
  const isProOrElite = userSubscription.level === "pro" || userSubscription.level === "elite";
  
  return (
    <MainLayout title="Show Schedule">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ScheduleControls view={view} setView={setView} />
          
          {view === "calendar" ? (
            <ScheduleCalendarView
              date={date}
              setDate={setDate}
              selectedDateEvents={selectedDateEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
            />
          ) : (
            <ScheduleListView
              upcomingEvents={upcomingEvents}
              animals={animals}
              getCategoryColor={getCategoryColor}
              isProOrElite={isProOrElite}
              handleUpgrade={handleUpgrade}
            />
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
