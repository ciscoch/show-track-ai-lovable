import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { localFeedData, LocalInsight } from './localFeedData';

interface LocalJudgeInsightFeedProps {
  location?: string;
  /** Interval in milliseconds to rotate insights */
  intervalMs?: number;
}

const LocalJudgeInsightFeed = ({ location = 'default', intervalMs = 8000 }: LocalJudgeInsightFeedProps) => {
  const insights = localFeedData[location] || localFeedData['default'];
  const [startIndex, setStartIndex] = React.useState(0);

  React.useEffect(() => {
    if (insights.length <= 1) return;
    const id = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % insights.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [insights, intervalMs]);

  const getVisible = (): LocalInsight[] => {
    const end = startIndex + 3;
    return end <= insights.length
      ? insights.slice(startIndex, end)
      : insights.slice(startIndex).concat(insights.slice(0, end - insights.length));
  };

  return (
    <div className="space-y-3">
      {getVisible().map((insight, idx) => (
        <Card key={idx} className="border">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{insight.judge}</span>
              <Badge variant="outline">{insight.show}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{insight.insight}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LocalJudgeInsightFeed;
