
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
import { useInsightsManager } from "./hooks/useInsightsManager";
import { speciesOptions } from "./constants";

interface JudgeInsightsManagerContentProps {
  onClose: () => void;
}

const JudgeInsightsManagerContent = ({ onClose }: JudgeInsightsManagerContentProps) => {
  const { insightsData, selectedSpecies, setSelectedSpecies, updateInsightsData } = useJudgeInsights();
  const [activeTab, setActiveTab] = React.useState("criteria");
  
  const { 
    isEditMode, 
    editIndex, 
    resetEditState,
    handleSpeciesChange,
    handleCriteriaSubmit,
    handleDeleteCriteria,
    handleTrendSubmit,
    handleDeleteTrend,
    handleTipSubmit,
    handleDeleteTip,
    handleDocumentSubmit,
    handleReviewSubmit,
    handleSaveChanges,
    setEditModeAndIndex
  } = useInsightsManager({
    insightsData,
    selectedSpecies,
    setSelectedSpecies,
    updateInsightsData,
    onClose
  });
  
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
              onEdit={(index) => setEditModeAndIndex(true, index)}
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
              onEdit={(index) => setEditModeAndIndex(true, index)}
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
              onEdit={(index) => setEditModeAndIndex(true, index)}
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

export default JudgeInsightsManagerContent;
