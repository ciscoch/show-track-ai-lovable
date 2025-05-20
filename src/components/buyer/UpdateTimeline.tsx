
import { Badge } from "@/components/ui/badge";

interface UpdateTimelineProps {
  userId: string;
}

interface TimelineEvent {
  id: string;
  type: "weight" | "journal" | "photo" | "expense" | "milestone";
  date: string;
  time?: string;
  title: string;
  details: string;
  animalName: string;
  animalId: string;
}

const UpdateTimeline = ({ userId }: UpdateTimelineProps) => {
  // Mock timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      id: "event1",
      type: "weight",
      date: "2025-05-15",
      time: "09:30 AM",
      title: "Weight Update",
      details: "Blue Ribbon gained 2.5 lbs since last week. Current weight: 1250 lbs.",
      animalName: "Blue Ribbon",
      animalId: "1"
    },
    {
      id: "event2",
      type: "journal",
      date: "2025-05-14",
      time: "04:15 PM",
      title: "New Journal Entry",
      details: "Updated feeding routine. Blue Ribbon is responding well to the new feed mixture.",
      animalName: "Blue Ribbon",
      animalId: "1"
    },
    {
      id: "event3",
      type: "photo",
      date: "2025-05-14",
      time: "11:00 AM",
      title: "New Photos Added",
      details: "Added 3 new photos showing muscle development.",
      animalName: "Blue Ribbon",
      animalId: "1"
    },
    {
      id: "event4",
      type: "milestone",
      date: "2025-05-10",
      title: "Training Milestone",
      details: "Successfully completed first showmanship practice session.",
      animalName: "Champion",
      animalId: "2"
    },
    {
      id: "event5",
      type: "weight",
      date: "2025-05-08",
      time: "08:45 AM",
      title: "Weight Update",
      details: "Champion gained 1.2 lbs this week. Current weight: 95 lbs.",
      animalName: "Champion",
      animalId: "2"
    }
  ];

  // Function to get badge color based on event type
  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "weight":
        return "bg-green-100 text-green-800";
      case "journal":
        return "bg-blue-100 text-blue-800";
      case "photo":
        return "bg-purple-100 text-purple-800";
      case "expense":
        return "bg-orange-100 text-orange-800";
      case "milestone":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Make sure we have events to display
  if (!timelineEvents || timelineEvents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent updates to display
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timelineEvents.map((event) => (
        <div key={event.id} className="relative pl-6 pb-6 border-l-2 border-muted">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
          
          <div className="mb-1 flex items-center gap-2">
            <Badge className={getEventBadgeColor(event.type)}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <span className="text-sm font-medium">{event.date}</span>
            {event.time && (
              <span className="text-sm text-muted-foreground">{event.time}</span>
            )}
          </div>
          
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            Animal: {event.animalName}
          </p>
          <p className="text-sm">{event.details}</p>
        </div>
      ))}
      
      <div className="text-center pt-4">
        <a href="#" className="text-sm text-primary hover:underline">
          View All Updates
        </a>
      </div>
    </div>
  );
};

export default UpdateTimeline;
