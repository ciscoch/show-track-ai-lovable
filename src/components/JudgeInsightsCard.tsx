
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Animal } from '@/types/models';
import { Separator } from './ui/separator';
import { getJudgeInsightsForSpecies } from './admin/JudgeInsightsManager';

interface JudgeInsightsCardProps {
  animal: Animal;
}

const JudgeInsightsCard = ({ animal }: JudgeInsightsCardProps) => {
  // Convert the animal species to the format expected by getJudgeInsightsForSpecies
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
    
    const lowerCaseSpecies = animal.species.toLowerCase();
    for (const key in speciesMap) {
      if (lowerCaseSpecies.includes(key)) {
        return speciesMap[key];
      }
    }
    return 'Beef Cattle'; // Default if no match is found
  };
  
  const insights = getJudgeInsightsForSpecies(mappedSpecies());

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Judge Analysis</CardTitle>
            <CardDescription className="pt-1">
              Insights based on research with experienced livestock judges
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10">Elite Feature</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Top Judging Criteria Section */}
          <section>
            <h3 className="text-lg font-medium mb-2">Top Judging Criteria</h3>
            <div className="space-y-4">
              {insights.criteria.map((criterion, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{criterion.name}</h4>
                    <Badge className={
                      criterion.importance === 'High' ? 'bg-primary' : 
                      criterion.importance === 'Medium' ? 'bg-accent' : 
                      'bg-muted'
                    }>
                      {criterion.importance} Importance
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{criterion.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <Separator />
          
          {/* Current Judging Trends Section */}
          <section>
            <h3 className="text-lg font-medium mb-2">Current Judging Trends</h3>
            <div className="space-y-3">
              {insights.trends.map((trend, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="font-medium">{trend.title}</h4>
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Updated quarterly based on competition results
        </p>
      </CardFooter>
    </Card>
  );
};

export default JudgeInsightsCard;
