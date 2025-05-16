
import React from "react";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import our components
import SpeciesSelector from "./SpeciesSelector";
import CriteriaTabContent from "./CriteriaTabContent";
import TrendsTabContent from "./TrendsTabContent";
import TipsTabContent from "./TipsTabContent";
import DocumentsTabContent from "./DocumentsTabContent";
import ReviewScheduleTabContent from "./ReviewScheduleTabContent";
import { useJudgeInsights } from "./JudgeInsightsContext";
import { criteriaSchema } from "./schemas/criteriaSchema";
import { trendSchema } from "./schemas/trendSchema";
import { tipSchema } from "./schemas/tipSchema";
import { documentSchema } from "./schemas/documentSchema";
import { reviewSchema } from "./schemas/reviewSchema";

interface JudgeInsightsManagerContentProps {
  onClose: () => void;
}

const JudgeInsightsManagerContent = ({ onClose }: JudgeInsightsManagerContentProps) => {
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
  const handleCriteriaSubmit = (data: any) => {
    const newCriteria = [...insightsData.criteria];
    if (isEditMode && editIndex >= 0) {
      newCriteria[editIndex] = data;
    } else {
      newCriteria.push(data);
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
  const handleTrendSubmit = (data: any) => {
    const { tags, ...trendData } = data;
    const newTrends = [...insightsData.trends];
    if (isEditMode && editIndex >= 0) {
      newTrends[editIndex] = trendData;
    } else {
      newTrends.push(trendData);
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
  const handleTipSubmit = (data: any) => {
    const newTips = [...insightsData.preparationTips];
    if (isEditMode && editIndex >= 0) {
      newTips[editIndex] = data;
    } else {
      newTips.push(data);
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
  const handleDocumentSubmit = (data: any) => {
    console.log("Document submitted:", data);
    toast.success("Document added successfully");
  };
  
  // Review handler
  const handleReviewSubmit = (data: any) => {
    console.log("Review schedule submitted:", data);
    toast.success("Review scheduled successfully");
  };
  
  // Save all changes
  const handleSaveChanges = () => {
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

// Species options
export const speciesOptions = [
  "Beef Cattle",
  "Swine",
  "Sheep",
  "Goats",
  "Horses"
];

export default JudgeInsightsManagerContent;
