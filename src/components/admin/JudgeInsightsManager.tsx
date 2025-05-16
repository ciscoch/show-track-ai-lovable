
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { JudgeInsightsProvider, getJudgeInsightsForSpecies } from "./judge-insights/JudgeInsightsContext";
import JudgeInsightsManagerContent from "./judge-insights/JudgeInsightsManagerContent";

interface JudgeInsightsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Main component with Dialog wrapper
const JudgeInsightsManager = ({ isOpen, onClose }: JudgeInsightsManagerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <JudgeInsightsProvider>
          <JudgeInsightsManagerContent onClose={onClose} />
        </JudgeInsightsProvider>
      </DialogContent>
    </Dialog>
  );
};

export default JudgeInsightsManager;
export { getJudgeInsightsForSpecies };
