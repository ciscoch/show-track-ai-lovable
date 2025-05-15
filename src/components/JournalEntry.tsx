
import { JournalEntry as JournalEntryType } from "@/types/models";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type JournalEntryProps = {
  entry: JournalEntryType;
};

const JournalEntry = ({ entry }: JournalEntryProps) => {
  const moodIcons = {
    'good': '😊',
    'neutral': '😐',
    'concerning': '😟'
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{format(new Date(entry.date), 'MMMM d, yyyy')}</CardTitle>
          {entry.mood && (
            <div className="text-2xl" title={`Mood: ${entry.mood}`}>
              {moodIcons[entry.mood]}
            </div>
          )}
        </div>
        <CardDescription>Journal Entry</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="whitespace-pre-line">
          {entry.content}
        </p>
        
        {entry.imageUrls && entry.imageUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {entry.imageUrls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`Journal image ${index + 1}`}
                className="rounded-md object-cover h-32 w-full"
              />
            ))}
          </div>
        )}
      </CardContent>
      {entry.tags && entry.tags.length > 0 && (
        <CardFooter className="flex gap-2 flex-wrap pt-0">
          {entry.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              #{tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default JournalEntry;
