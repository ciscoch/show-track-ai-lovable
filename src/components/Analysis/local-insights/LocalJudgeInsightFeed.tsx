
import React from 'react';
import { Badge } from "@/components/ui/badge";

type LocalJudgeInsightFeedProps = {
  location?: string;
};

const LocalJudgeInsightFeed = ({ location = 'default' }: LocalJudgeInsightFeedProps) => {
  const localInsightsMap: Record<string, { recentShow: string; insights: string[] }> = {
    Texas: {
      recentShow: 'Houston Livestock Show',
      insights: [
        'Local judges prioritize structural correctness',
        'Moderate frame size with ample muscle'
      ]
    },
    Ohio: {
      recentShow: 'Ohio State Fair',
      insights: [
        'Balance and conditioning are heavily weighted',
        'Clean lines with strong topline preferred'
      ]
    },
    default: {
      recentShow: 'Local County Fair',
      insights: [
        'Focus on overall balance and soundness',
        'Presentation and grooming impact final decisions'
      ]
    }
  };

  const localInsights = localInsightsMap[location] || localInsightsMap['default'];

  return (
    <div className="border rounded-md p-4 bg-muted/10 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Local Judge Insights</h3>
        <Badge variant="outline">Recent: {localInsights.recentShow}</Badge>
      </div>
      <ul className="list-disc pl-4 space-y-1 text-sm">
        {localInsights.insights.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocalJudgeInsightFeed;
