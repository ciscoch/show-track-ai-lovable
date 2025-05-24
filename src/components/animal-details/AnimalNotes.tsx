
import React from "react";
import { Animal } from "@/types/models";

interface AnimalNotesProps {
  animal: Animal;
}

const AnimalNotes = ({ animal }: AnimalNotesProps) => {
  if (!animal.notes) return null;
  
  return (
    <div className="mt-4 p-4 bg-muted/20 rounded-md">
      <p className="text-sm text-muted-foreground mb-1">Notes</p>
      <p>{animal.notes}</p>
    </div>
  );
};

export default AnimalNotes;
