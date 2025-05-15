
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/types/models";
import { useNavigate } from "react-router-dom";

interface RecentJournalEntriesProps {
  animalJournals: JournalEntry[];
  animalId: string;
}

const RecentJournalEntries = ({ animalJournals, animalId }: RecentJournalEntriesProps) => {
  const navigate = useNavigate();

  const handleAddJournalEntry = () => {
    navigate(`/animal/${animalId}/add-journal`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Journal Entries</CardTitle>
        <CardDescription>Your latest observations</CardDescription>
      </CardHeader>
      <CardContent>
        {animalJournals.length > 0 ? (
          <div className="space-y-4 max-h-[350px] overflow-y-auto">
            {animalJournals.slice(0, 2).map(journal => (
              <div key={journal.id} className="p-3 border rounded-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {new Date(journal.date).toLocaleDateString()}
                  </span>
                  {journal.mood && (
                    <span title={`Mood: ${journal.mood}`}>
                      {journal.mood === 'positive' ? '😊' : 
                       journal.mood === 'neutral' ? '😐' : '😟'}
                    </span>
                  )}
                </div>
                <p className="text-sm line-clamp-3">{journal.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No journal entries yet.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleAddJournalEntry}
        >
          Add Journal Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentJournalEntries;
