
import { useState } from "react";
import { Animal, FeedingSchedule } from "@/types/models";

interface FeedReminderHeaderProps {
  animals: Animal[];
  setSelectedAnimalId: (id: string) => void;
  selectedAnimalId: string;
}

export const FeedReminderHeader = ({ 
  animals, 
  setSelectedAnimalId,
  selectedAnimalId
}: FeedReminderHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Feed Reminders</h1>
        <p className="text-gray-500">Create and manage feeding schedules for your animals</p>
      </div>
      
      <div className="w-full sm:w-auto">
        <select 
          value={selectedAnimalId}
          onChange={(e) => setSelectedAnimalId(e.target.value)}
          className="w-full sm:w-auto bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Animals</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
