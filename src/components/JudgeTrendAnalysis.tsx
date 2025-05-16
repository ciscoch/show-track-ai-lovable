
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { useAppContext } from "@/contexts/AppContext";
import { getJudgeInsightsForSpecies } from "@/components/admin/JudgeInsightsManager";
import { mapSpeciesToInsightFormat } from "./judge-trend/speciesMapping";
import { getTrendData } from "./judge-trend/trendData";
import TrendChart from "./judge-trend/TrendChart";
import TrendInsights from "./judge-trend/TrendInsights";
import RegionalVariations from "./judge-trend/RegionalVariations";

interface JudgeTrendAnalysisProps {
  species: string;
  showPremiumBanner?: boolean;
}

const JudgeTrendAnalysis: React.FC<JudgeTrendAnalysisProps> = ({ 
  species,
  showPremiumBanner = true
}) => {
  const { userSubscription } = useAppContext();
  const isElite = userSubscription.level === "elite";
  
  // Convert species to format used by insights
  const mappedSpecies = mapSpeciesToInsightFormat(species);
  const insights = getJudgeInsightsForSpecies(mappedSpecies);
  
  // Get trend data for visualization
  const trendData = getTrendData();
  
  // If not elite and banner should be shown, show premium banner
  if (!isElite && showPremiumBanner) {
    return (
      <PremiumFeatureBanner
        title="Judge Trend Analysis"
        description="Upgrade to Elite to access detailed judge trend analysis, showing how judging criteria evolve over time across different shows and regions."
        requiredLevel="elite"
        currentLevel={userSubscription.level}
        onUpgrade={() => window.location.href = '/subscription'}
      />
    );
  }
  
  // If elite or we want to show the content anyway, render the actual component
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Judge Trend Analysis</CardTitle>
          </div>
          <CardDescription>See how judging trends have evolved over time</CardDescription>
        </div>
        {isElite && (
          <Badge className="bg-primary">Elite Feature</Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trend Chart */}
        <TrendChart trendData={trendData} />
        
        {/* Key Trend Insights */}
        <TrendInsights trends={insights.trends} />
        
        {/* Regional Variations */}
        <RegionalVariations />
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Download Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JudgeTrendAnalysis;
