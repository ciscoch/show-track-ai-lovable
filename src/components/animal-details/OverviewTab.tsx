
import React from "react";
import { Animal, WeightEntry, JournalEntry } from "@/types/models";
import WeightChart from "@/components/WeightChart";
import BodyCompositionCard from "@/components/BodyCompositionCard";
import ShowTipsCard from "@/components/ShowTipsCard";
import RecentJournalEntries from "./RecentJournalEntries";

interface OverviewTabProps {
  animal: Animal;
  weights: WeightEntry[];
  animalJournals: JournalEntry[];
  targetWeight?: number;
}

const OverviewTab = ({ animal, weights, animalJournals, targetWeight }: OverviewTabProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeightChart 
          weights={weights} 
          animalId={animal.id}
          targetWeight={targetWeight}
        />
        
        <RecentJournalEntries animalJournals={animalJournals} animalId={animal.id} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BodyCompositionCard animal={animal} />
        <ShowTipsCard animal={animal} />
      </div>
    </div>
  );
};

export default OverviewTab;
