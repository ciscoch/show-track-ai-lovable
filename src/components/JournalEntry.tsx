
import { JournalEntry as JournalEntryType } from "@/types/models";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface JournalEntryProps {
  entry: JournalEntryType;
  animalName?: string;
}

const JournalEntry = ({ entry, animalName }: JournalEntryProps) => {
  const moodColor = {
    good: "bg-emerald-100 text-emerald-800 border-emerald-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
    concerning: "bg-amber-100 text-amber-800 border-amber-200"
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <div className="text-sm text-muted-foreground">
              {formatDate(entry.date)}
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
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap">
          {entry.content}
        </div>
        
        {entry.imageUrls && entry.imageUrls.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.imageUrls.map((url, index) => (
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
      
      {entry.tags && entry.tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default JournalEntry;
