
import React, { useState } from "react";
import { Animal } from "@/types/models";
import ShowTipsCard from "@/components/ShowTipsCard";
import JudgeAnalysisCard from "@/components/JudgeAnalysisCard";
import JudgeInsightsCard from "@/components/JudgeInsightsCard";
import JudgeTrendAnalysis from "@/components/JudgeTrendAnalysis";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import JudgeInsightsManager from "@/components/admin/JudgeInsightsManager";
import { useAppContext } from "@/contexts/AppContext";

interface ShowmanshipTabProps {
  animal: Animal;
}

const ShowmanshipTab = ({ animal }: ShowmanshipTabProps) => {
  const { user } = useAppContext();
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  
  // Check if user is admin (in a real app, this would use proper roles)
  const isAdmin = user?.email?.endsWith('@admin.com') || user?.email === 'admin@example.com';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Showmanship Resources</h2>
        
        {isAdmin && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsManagerOpen(true)}
          >
            <FileTextIcon className="h-4 w-4" />
            Manage Research Content
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ShowTipsCard animal={animal} />
        {/* Pass a default location so local insights can be shown */}
        <JudgeAnalysisCard animal={animal} location="Texas" />
        <JudgeInsightsCard animal={animal} />
        <JudgeTrendAnalysis />
      </div>
      
      {isAdmin && (
        <JudgeInsightsManager 
          isOpen={isManagerOpen} 
          onClose={() => setIsManagerOpen(false)}
        />
      )}
    </div>
  );
};

export default ShowmanshipTab;
