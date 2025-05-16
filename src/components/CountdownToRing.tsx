
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlarmClockIcon } from "lucide-react";
import { getDaysUntil, formatCountdown } from "@/utils/timeUtils";

interface CountdownEvent {
  id: string;
  title: string;
  date: Date;
  category: string;
}

interface CountdownToRingProps {
  events: CountdownEvent[];
}

const CountdownToRing = ({ events }: CountdownToRingProps) => {
  // Filter to only show events and sort by upcoming date
  const upcomingShowEvents = events
    .filter(event => 
      event.category === "show" && 
      getDaysUntil(event.date) >= 0
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Take only the closest 3 shows
  const nearestShows = upcomingShowEvents.slice(0, 3);

  if (nearestShows.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlarmClockIcon className="h-5 w-5 text-primary" />
            Countdown to the Ring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No upcoming shows scheduled. Add shows to your schedule to see countdowns.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlarmClockIcon className="h-5 w-5 text-primary" />
          Countdown to the Ring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nearestShows.map(event => {
          const daysRemaining = getDaysUntil(event.date);
          const countdownText = formatCountdown(daysRemaining);
          
          return (
            <div key={event.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.date.toLocaleDateString()}
                </p>
              </div>
              <Badge 
                className={`px-3 py-1 ${
                  daysRemaining <= 7 
                    ? "bg-primary" 
                    : daysRemaining <= 30 
                      ? "bg-amber-500" 
                      : "bg-green-500"
                } text-white`}
              >
                {countdownText}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CountdownToRing;
