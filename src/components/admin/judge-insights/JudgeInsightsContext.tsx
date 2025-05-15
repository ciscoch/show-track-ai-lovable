
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { JudgeInsights } from './types';

// This function would normally fetch data from an API
// For now, we're using mock data that matches the existing structure
export const getJudgeInsightsForSpecies = (species: string): JudgeInsights => {
  // This is a mock implementation - in a real app this would fetch from an API
  const mockData: Record<string, JudgeInsights> = {
    "Beef Cattle": {
      criteria: [
        { name: "Muscle Expression", description: "Looking for well-defined, proportional muscling throughout the animal", importance: "High" },
        { name: "Structure", description: "Correct skeletal structure and sound movement", importance: "High" },
        { name: "Balance", description: "Overall visual appeal and proportionality", importance: "Medium" }
      ],
      trends: [
        { title: "Emphasis on Functional Structure", description: "Judges are placing increased value on sound structure that promotes longevity" },
        { title: "Moderate Frame Size", description: "The trend has moved away from extremely large animals toward more moderate, efficient frames" }
      ],
      preparationTips: [
        { title: "Strategic Diet Planning", description: "Adjust feeding 60-90 days before show to optimize condition and muscle expression" },
        { title: "Daily Handling", description: "Work with your animal daily to improve behavior and response to the show stick" }
      ]
    },
    "Swine": {
      criteria: [
        { name: "Muscle-to-Fat Ratio", description: "Ideal balance of lean muscle without excessive fat", importance: "High" },
        { name: "Structural Correctness", description: "Sound bone structure and movement", importance: "High" }
      ],
      trends: [
        { title: "Focus on Leanness", description: "Modern judging emphasizes lean muscle over excessive finish" }
      ],
      preparationTips: [
        { title: "Proper Diet Management", description: "Control protein and fat intake to achieve optimal muscle expression" }
      ]
    },
    "Sheep": {
      criteria: [
        { name: "Fleece Quality", description: "Clean, dense fleece with good staple length", importance: "Medium" },
        { name: "Carcass Merit", description: "Good muscle-to-bone ratio and finish", importance: "High" }
      ],
      trends: [
        { title: "Dual-Purpose Selection", description: "Increasing emphasis on animals that excel for both wool and meat production" }
      ],
      preparationTips: [
        { title: "Strategic Washing and Trimming", description: "Develop a washing schedule that optimizes fleece appearance without damaging wool quality" }
      ]
    },
    "Goats": {
      criteria: [
        { name: "Muscling", description: "Well-defined, balanced muscling", importance: "High" },
        { name: "Structural Correctness", description: "Strong, straight top line and sound legs", importance: "Medium" }
      ],
      trends: [
        { title: "Commercial Viability", description: "Emphasis on animals that would thrive in commercial production settings" }
      ],
      preparationTips: [
        { title: "Exercise Regimen", description: "Implement a consistent exercise program to improve muscle tone" }
      ]
    },
    "Horses": {
      criteria: [
        { name: "Movement", description: "Natural, fluid movement with good extension", importance: "High" },
        { name: "Conformation", description: "Proper skeletal structure and proportionality", importance: "High" }
      ],
      trends: [
        { title: "Functional Athletes", description: "Focus on horses that can perform their intended discipline effectively" }
      ],
      preparationTips: [
        { title: "Conditioning Program", description: "Develop a conditioning routine that builds muscle without causing stress" }
      ]
    }
  };
  
  return mockData[species] || {
    criteria: [],
    trends: [],
    preparationTips: []
  };
};

// Create context
interface JudgeInsightsContextType {
  insightsData: JudgeInsights;
  selectedSpecies: string;
  setSelectedSpecies: (species: string) => void;
  updateInsightsData: (data: JudgeInsights) => void;
}

const JudgeInsightsContext = createContext<JudgeInsightsContextType | undefined>(undefined);

export const useJudgeInsights = () => {
  const context = useContext(JudgeInsightsContext);
  if (!context) {
    throw new Error('useJudgeInsights must be used within a JudgeInsightsProvider');
  }
  return context;
};

interface JudgeInsightsProviderProps {
  children: ReactNode;
  initialSpecies?: string;
}

export const JudgeInsightsProvider = ({ children, initialSpecies = "Beef Cattle" }: JudgeInsightsProviderProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState(initialSpecies);
  const [insightsData, setInsightsData] = useState<JudgeInsights>(() => 
    getJudgeInsightsForSpecies(initialSpecies)
  );

  const updateInsightsData = (data: JudgeInsights) => {
    setInsightsData(data);
    // In a real app, this would also make an API call to save the data
  };

  React.useEffect(() => {
    // When species changes, fetch new data
    setInsightsData(getJudgeInsightsForSpecies(selectedSpecies));
  }, [selectedSpecies]);

  return (
    <JudgeInsightsContext.Provider value={{
      insightsData,
      selectedSpecies,
      setSelectedSpecies,
      updateInsightsData
    }}>
      {children}
    </JudgeInsightsContext.Provider>
  );
};
