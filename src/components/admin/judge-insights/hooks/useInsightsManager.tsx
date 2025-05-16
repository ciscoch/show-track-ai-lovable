
import React from "react";
import { toast } from "sonner";
import { JudgeInsights } from "../types";

interface UseInsightsManagerProps {
  insightsData: JudgeInsights;
  selectedSpecies: string;
  setSelectedSpecies: (species: string) => void;
  updateInsightsData: (data: JudgeInsights) => void;
  onClose: () => void;
}

export const useInsightsManager = ({
  insightsData,
  selectedSpecies,
  setSelectedSpecies,
  updateInsightsData,
  onClose
}: UseInsightsManagerProps) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(-1);
  
  const resetEditState = () => {
    setIsEditMode(false);
    setEditIndex(-1);
  };
  
  const setEditModeAndIndex = (mode: boolean, index: number) => {
    setIsEditMode(mode);
    setEditIndex(index);
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
  
  return {
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
  };
};
