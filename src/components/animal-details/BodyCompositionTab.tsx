
import React from "react";
import { Animal } from "@/types/models";
import BodyCompositionCard from "@/components/BodyCompositionCard";

interface BodyCompositionTabProps {
  animal: Animal;
}

const BodyCompositionTab = ({ animal }: BodyCompositionTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Body Composition Analysis</h2>
      <BodyCompositionCard animal={animal} />
    </div>
  );
};

export default BodyCompositionTab;
