
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { Trend } from "@/components/admin/judge-insights/types";

interface TrendInsightsProps {
  trends: Trend[];
}

const TrendInsights: React.FC<TrendInsightsProps> = ({ trends }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {trends.slice(0, 3).map((trend, index) => (
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
  );
};

export default TrendInsights;
