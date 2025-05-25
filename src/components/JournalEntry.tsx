
import { JournalEntry as JournalEntryType } from "@/types/models";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import SocialShareButtons from "./journal/SocialShareButtons";

export interface JournalEntryProps {
  entry: JournalEntryType & {
    animalId?: string;
  };
  animalName?: string;
}

const JournalEntry = ({ entry, animalName }: JournalEntryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const moodColor = {
    positive: "bg-emerald-100 text-emerald-800 border-emerald-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
    negative: "bg-amber-100 text-amber-800 border-amber-200"
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    return format(new Date(`1970-01-01T${timeString}`), 'h:mm a');
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <div className="text-sm text-muted-foreground">
              {formatDate(entry.date)}
              {entry.time && ` at ${formatTime(entry.time)}`}
            </div>
            {animalName && (
              <div className="font-medium">{animalName}</div>
            )}
          </div>
          
          {entry.mood && (
            <Badge variant="outline" className={moodColor[entry.mood]}>
              {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-1">{entry.title}</h3>
      </CardHeader>
      <CardContent>
        <div className={`whitespace-pre-wrap ${!isExpanded && entry.content.length > 300 ? "line-clamp-5" : ""}`}>
          {entry.content}
        </div>
        
        {entry.content.length > 300 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-primary font-medium text-sm mt-2"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
        
        {entry.images && entry.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.images.map((url, index) => (
              <div
                key={index}
                className="w-24 h-24 rounded-md overflow-hidden border bg-muted"
              >
                <img
                  src={url}
                  alt={`Journal entry ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-4">
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <SocialShareButtons 
          title={entry.title}
          text={entry.content}
        />
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
