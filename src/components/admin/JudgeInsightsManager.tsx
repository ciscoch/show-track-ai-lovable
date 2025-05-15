
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import our new components
import SpeciesSelector from "./judge-insights/SpeciesSelector";
import CriteriaTabContent from "./judge-insights/CriteriaTabContent";
import TrendsTabContent from "./judge-insights/TrendsTabContent";
import TipsTabContent from "./judge-insights/TipsTabContent";
import DocumentsTabContent from "./judge-insights/DocumentsTabContent";
import ReviewScheduleTabContent from "./judge-insights/ReviewScheduleTabContent";
import { JudgeInsightsProvider, getJudgeInsightsForSpecies, useJudgeInsights } from "./judge-insights/JudgeInsightsContext";
import { JudgeInsights, Criteria, Trend, Tip } from "./judge-insights/types";
import * as z from "zod";

// Species options
const speciesOptions = [
  "Beef Cattle",
  "Swine",
  "Sheep",
  "Goats",
  "Horses"
];

interface JudgeInsightsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const JudgeInsightsManagerContent = ({ onClose }: { onClose: () => void }) => {
  const { insightsData, selectedSpecies, setSelectedSpecies, updateInsightsData } = useJudgeInsights();
  const [activeTab, setActiveTab] = React.useState("criteria");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  
  const resetEditState = () => {
    setIsEditMode(false);
    setEditIndex(-1);
  };
  
  // Handle species change
  const handleSpeciesChange = (species: string) => {
    setSelectedSpecies(species);
    resetEditState();
  };
  
  // Criteria handlers
  const handleCriteriaSubmit = (data: z.infer<typeof criteriaSchema>) => {
    const newCriteria = [...insightsData.criteria];
    if (isEditMode && editIndex >= 0) {
      newCriteria[editIndex] = data as Criteria;
    } else {
      newCriteria.push(data as Criteria);
    }
    updateInsightsData({
      ...insightsData,
      criteria: newCriteria
    });
    resetEditState();
  };
  
  const handleDeleteCriteria = (index: number) => {
    const newCriteria = [...insightsData.criteria];
    newCriteria.splice(index, 1);
    updateInsightsData({
      ...insightsData,
      criteria: newCriteria
    });
  };
  
  // Trend handlers
  const handleTrendSubmit = (data: z.infer<typeof trendSchema>) => {
    const { tags, ...trendData } = data;
    const newTrends = [...insightsData.trends];
    if (isEditMode && editIndex >= 0) {
      newTrends[editIndex] = trendData as Trend;
    } else {
      newTrends.push(trendData as Trend);
    }
    updateInsightsData({
      ...insightsData,
      trends: newTrends
    });
    resetEditState();
  };
  
  const handleDeleteTrend = (index: number) => {
    const newTrends = [...insightsData.trends];
    newTrends.splice(index, 1);
    updateInsightsData({
      ...insightsData,
      trends: newTrends
    });
  };
  
  // Tip handlers
  const handleTipSubmit = (data: z.infer<typeof tipSchema>) => {
    const newTips = [...insightsData.preparationTips];
    if (isEditMode && editIndex >= 0) {
      newTips[editIndex] = data as Tip;
    } else {
      newTips.push(data as Tip);
    }
    updateInsightsData({
      ...insightsData,
      preparationTips: newTips
    });
    resetEditState();
  };
  
  const handleDeleteTip = (index: number) => {
    const newTips = [...insightsData.preparationTips];
    newTips.splice(index, 1);
    updateInsightsData({
      ...insightsData,
      preparationTips: newTips
    });
  };
  
  // Document handler
  const handleDocumentSubmit = (data: z.infer<typeof documentSchema>) => {
    // In a real implementation, this would store documents related to the research
    console.log("Document submitted:", data);
    toast.success("Document added successfully");
  };
  
  // Review handler
  const handleReviewSubmit = (data: z.infer<typeof reviewSchema>) => {
    // In a real implementation, this would schedule reviews or refreshes
    console.log("Review schedule submitted:", data);
    toast.success("Review scheduled successfully");
  };
  
  // Save all changes
  const handleSaveChanges = () => {
    // In a real implementation, this would send all changes to the backend
    console.log("Saving changes for", selectedSpecies, insightsData);
    toast.success("Changes saved successfully");
    onClose();
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Judge Insights Research Manager</DialogTitle>
        <DialogDescription>
          Add, edit, or remove judge insights and research for premium content.
        </DialogDescription>
      </DialogHeader>
      
      <div className="flex flex-col gap-4">
        {/* Species Selector */}
        <SpeciesSelector 
          selectedSpecies={selectedSpecies}
          speciesOptions={speciesOptions}
          onSpeciesChange={handleSpeciesChange}
        />
        
        {/* Content Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="criteria">Judging Criteria</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="tips">Preparation Tips</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="schedule">Review Schedule</TabsTrigger>
          </TabsList>
          
          {/* Criteria Tab */}
          <TabsContent value="criteria">
            <CriteriaTabContent 
              criteria={insightsData.criteria}
              isEditMode={isEditMode}
              editIndex={editIndex}
              selectedSpecies={selectedSpecies}
              onSubmit={handleCriteriaSubmit}
              onEdit={(index) => { setIsEditMode(true); setEditIndex(index); }}
              onDelete={handleDeleteCriteria}
              onCancel={resetEditState}
            />
          </TabsContent>
          
          {/* Trends Tab */}
          <TabsContent value="trends">
            <TrendsTabContent 
              trends={insightsData.trends}
              isEditMode={isEditMode}
              editIndex={editIndex}
              selectedSpecies={selectedSpecies}
              onSubmit={handleTrendSubmit}
              onEdit={(index) => { setIsEditMode(true); setEditIndex(index); }}
              onDelete={handleDeleteTrend}
              onCancel={resetEditState}
            />
          </TabsContent>
          
          {/* Preparation Tips Tab */}
          <TabsContent value="tips">
            <TipsTabContent 
              tips={insightsData.preparationTips}
              isEditMode={isEditMode}
              editIndex={editIndex}
              selectedSpecies={selectedSpecies}
              onSubmit={handleTipSubmit}
              onEdit={(index) => { setIsEditMode(true); setEditIndex(index); }}
              onDelete={handleDeleteTip}
              onCancel={resetEditState}
            />
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentsTabContent onSubmit={handleDocumentSubmit} />
          </TabsContent>
          
          {/* Review Schedule Tab */}
          <TabsContent value="schedule">
            <ReviewScheduleTabContent onSubmit={handleReviewSubmit} />
          </TabsContent>
        </Tabs>
      </div>
      
      <DialogFooter className="flex justify-between items-center mt-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Currently managing content for <strong>{selectedSpecies}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save All Changes</Button>
        </div>
      </DialogFooter>
    </>
  );
};

// Import validation schema from component files to avoid redundancy
const { criteriaSchema } = CriteriaTabContent as any;
const { trendSchema } = TrendsTabContent as any;
const { tipSchema } = TipsTabContent as any;
const { documentSchema } = DocumentsTabContent as any;
const { reviewSchema } = ReviewScheduleTabContent as any;

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
