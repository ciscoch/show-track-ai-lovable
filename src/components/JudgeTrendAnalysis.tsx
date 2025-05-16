
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { TrendingUp, Medal, Award, Trophy } from "lucide-react";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { getJudgeInsightsForSpecies } from "@/components/admin/JudgeInsightsManager";

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
  const mappedSpecies = () => {
    const speciesMap: Record<string, string> = {
      'cattle': 'Beef Cattle',
      'cow': 'Beef Cattle',
      'beef': 'Beef Cattle',
      'steer': 'Beef Cattle',
      'heifer': 'Beef Cattle',
      'pig': 'Swine',
      'hog': 'Swine',
      'swine': 'Swine',
      'sheep': 'Sheep',
      'lamb': 'Sheep',
      'goat': 'Goats',
      'horse': 'Horses',
      'pony': 'Horses'
    };
    
    const lowerCaseSpecies = species.toLowerCase();
    for (const key in speciesMap) {
      if (lowerCaseSpecies.includes(key)) {
        return speciesMap[key];
      }
    }
    return 'Beef Cattle'; // Default if no match is found
  };
  
  const insights = getJudgeInsightsForSpecies(mappedSpecies());
  
  // Mock trend data for visualization
  const trendData = [
    { month: 'Jan', structure: 85, muscle: 60, form: 72 },
    { month: 'Feb', structure: 83, muscle: 65, form: 75 },
    { month: 'Mar', structure: 86, muscle: 70, form: 78 },
    { month: 'Apr', structure: 89, muscle: 75, form: 80 },
    { month: 'May', structure: 87, muscle: 80, form: 82 },
    { month: 'Jun', structure: 90, muscle: 85, form: 85 },
  ];
  
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
        <div className="h-72">
          <ChartContainer 
            config={{
              structure: { color: "#2563eb", label: "Structure" },
              muscle: { color: "#10b981", label: "Muscle Development" },
              form: { color: "#8b5cf6", label: "Form/Function" },
            }}
          >
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="structure" 
                stroke="var(--color-structure, #2563eb)" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="muscle" 
                stroke="var(--color-muscle, #10b981)" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="form" 
                stroke="var(--color-form, #8b5cf6)" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
        
        {/* Key Trend Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.trends.slice(0, 3).map((trend, index) => (
            <Card key={index} className="bg-muted/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {index === 0 ? <Trophy className="h-4 w-4 text-primary" /> :
                   index === 1 ? <Medal className="h-4 w-4 text-accent" /> :
                   <Award className="h-4 w-4 text-muted-foreground" />}
                  <CardTitle className="text-sm">{trend.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{trend.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Regional Variations */}
        <div>
          <h3 className="text-lg font-medium mb-3">Regional Judging Variations</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left">Region</th>
                  <th className="p-2 text-left">Top Priority</th>
                  <th className="p-2 text-left">Secondary Focus</th>
                  <th className="p-2 text-left">Notable Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 font-medium">Midwest</td>
                  <td className="p-2">Structure</td>
                  <td className="p-2">Muscle</td>
                  <td className="p-2">Heavier emphasis on frame size</td>
                </tr>
                <tr className="border-t bg-muted/30">
                  <td className="p-2 font-medium">South</td>
                  <td className="p-2">Muscle</td>
                  <td className="p-2">Overall Balance</td>
                  <td className="p-2">Higher valuation of eye appeal</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2 font-medium">West</td>
                  <td className="p-2">Functional Traits</td>
                  <td className="p-2">Structure</td>
                  <td className="p-2">More attention to movement quality</td>
                </tr>
                <tr className="border-t bg-muted/30">
                  <td className="p-2 font-medium">Northeast</td>
                  <td className="p-2">Balance</td>
                  <td className="p-2">Structure</td>
                  <td className="p-2">More traditional breed characteristics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
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
