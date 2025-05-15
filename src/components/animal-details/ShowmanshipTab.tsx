
import React from "react";
import { Animal } from "@/types/models";
import ShowTipsCard from "@/components/ShowTipsCard";
import JudgeAnalysisCard from "@/components/JudgeAnalysisCard";

interface ShowmanshipTabProps {
  animal: Animal;
}

const ShowmanshipTab = ({ animal }: ShowmanshipTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Showmanship Resources</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <ShowTipsCard animal={animal} />
        <JudgeAnalysisCard animal={animal} />
      </div>
    </div>
  );
};

export default ShowmanshipTab;
