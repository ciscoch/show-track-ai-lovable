
import React from "react";
import { JournalEntry } from "@/types/models";
import JournalEntryComponent from "@/components/JournalEntry";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface JournalEntriesTabProps {
  animalJournals: JournalEntry[];
  animalId: string;
}

const JournalEntriesTab = ({ animalJournals, animalId }: JournalEntriesTabProps) => {
  const navigate = useNavigate();

  const handleAddJournalEntry = () => {
    navigate(`/animal/${animalId}/add-journal`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Journal Entries</h2>
        <Button onClick={handleAddJournalEntry}>Add Entry</Button>
      </div>
      
      <div className="space-y-6">
        {animalJournals.length > 0 ? (
          animalJournals.map(entry => (
            <JournalEntryComponent key={entry.id} entry={entry} />
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No journal entries yet. Start tracking your observations.
              </p>
              <Button onClick={handleAddJournalEntry}>Create First Entry</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JournalEntriesTab;
