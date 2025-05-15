import { useAppContext } from "@/contexts/AppContext";
import { Animal } from "@/types/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PremiumFeatureBanner from "./PremiumFeatureBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpenIcon, BarChart3Icon, TrophyIcon } from "lucide-react";

interface JudgeInsightsCardProps {
  animal: Animal;
}

// Helper function to get judge insights data based on species
export function getJudgeInsightsForSpecies(species: string) {
  // Default research data
  let insightsData = {
    criteria: [
      { name: "Structure", description: "Proper skeletal framework and body confirmation", importance: "High" },
      { name: "Muscling", description: "Muscle definition and volume", importance: "High" },
      { name: "Balance", description: "Proportional body parts and overall symmetry", importance: "Medium" },
      { name: "Growth Potential", description: "Frame size and capacity for continued growth", importance: "Medium" },
      { name: "Movement", description: "Smooth, efficient locomotion", importance: "Medium" }
    ],
    trends: [
      { title: "Focus on Functionality", description: "Judges are increasingly focusing on animals that exhibit practical, functional traits rather than just aesthetic qualities." },
      { title: "Market Relevance", description: "Animals that display characteristics valued in current markets are receiving higher placements." },
      { title: "Performance Data Integration", description: "More judges are incorporating performance data alongside visual assessment in their evaluations." }
    ],
    preparationTips: [
      { title: "Strategic Conditioning", description: "Focus conditioning efforts on enhancing the animal's natural muscling without overfeeding." },
      { title: "Proper Stance Training", description: "Practice setting your animal up to accentuate its structural strengths and minimize weaknesses." },
      { title: "Movement Practice", description: "Train your animal to move smoothly and confidently in the ring at the appropriate pace." },
      { title: "Grooming Emphasis", description: "Pay special attention to grooming areas that highlight structural and muscling advantages." }
    ]
  };

  // Species-specific research data
  switch (species.toLowerCase()) {
    case 'beef cattle':
    case 'cattle':
    case 'cow':
    case 'steer':
    case 'heifer':
      insightsData = {
        criteria: [
          { name: "Muscle Expression", description: "Volume and shape of muscle, especially in the hindquarter", importance: "High" },
          { name: "Structural Correctness", description: "Strong topline, correct set to legs, sound feet", importance: "High" },
          { name: "Balance & Style", description: "Proportional blending of body parts, eye appeal", importance: "High" },
          { name: "Growth & Performance", description: "Frame size, capacity, weight for age", importance: "Medium" },
          { name: "Carcass Quality Indicators", description: "Signs of good marbling, ribeye area potential", importance: "Medium" }
        ],
        trends: [
          { title: "Moderate Frame Sizes", description: "Judges are favoring moderate-framed, deep-bodied cattle over extremely tall, framey animals." },
          { title: "Muscle Shape Over Size", description: "Preference for shape and dimension of muscle rather than just overall mass." },
          { title: "Functional Efficiency", description: "Increased emphasis on cattle that appear feed efficient and functionally sound." },
          { title: "Carcass Merit Indicators", description: "Growing focus on visible indicators of potential carcass quality and yield." }
        ],
        preparationTips: [
          { title: "Strategic Hair Management", description: "Use proper hair programs to enhance the animal's natural muscle expression and frame." },
          { title: "Stance Training", description: "Train your cattle to stand wide behind to showcase muscle and square in front to display structural correctness." },
          { title: "Condition Targeting", description: "Aim for finish that enhances muscle expression without excessive fat cover." },
          { title: "Movement Focus", description: "Ensure smooth, tracking movement that demonstrates structural soundness." }
        ]
      };
      break;

    case 'swine':
    case 'pig':
    case 'hog':
    case 'gilt':
    case 'barrow':
      insightsData = {
        criteria: [
          { name: "Muscle Shape & Volume", description: "Expressive muscle, especially in ham and loin areas", importance: "High" },
          { name: "Structural Design", description: "Wide-based, correct set to legs, sound movement", importance: "High" },
          { name: "Product Indicators", description: "Signs of quality meat yield and leanness", importance: "High" },
          { name: "Growth Efficiency", description: "Frame, capacity, and indicators of feed efficiency", importance: "Medium" },
          { name: "Overall Balance", description: "Proportional development from front to rear", importance: "Medium" }
        ],
        trends: [
          { title: "Athletic Design", description: "Preference for more athletic, mobile hogs over extremely heavy-muscled, stiff-moving animals." },
          { title: "Practical Muscle", description: "Focus on practical, usable muscle expression rather than extreme muscling." },
          { title: "Structural Emphasis", description: "Increased priority on sound structure and movement, especially in breeding stock classes." },
          { title: "Moderate Size", description: "Favoring moderate-framed hogs that still express adequate muscle and bone." }
        ],
        preparationTips: [
          { title: "Movement Training", description: "Practice driving your hog with proper techniques to showcase natural movement and structural advantages." },
          { title: "Skin and Hair Care", description: "Implement skin and hair programs that enhance the appearance of muscle expression." },
          { title: "Weight Management", description: "Target optimal weight ranges that showcase muscle without excess fat or appearing underfinished." },
          { title: "Show Ring Strategy", description: "Keep your hog moving at the right pace and distance from the judge to highlight its best attributes." }
        ]
      };
      break;

    case 'sheep':
    case 'lamb':
    case 'ewe':
    case 'ram':
    case 'wether':
      insightsData = {
        criteria: [
          { name: "Muscle Expression", description: "Volume and shape in leg, rack, and shoulder", importance: "High" },
          { name: "Structural Correctness", description: "Level topline, proper feet and leg structure", importance: "High" },
          { name: "Balance & Style", description: "Proportional development, eye appeal, presence", importance: "High" },
          { name: "Handle & Finish", description: "Proper finish and firmness over the rack and loin", importance: "Medium" },
          { name: "Growth Indicators", description: "Frame, capacity, and weight-for-age considerations", importance: "Medium" }
        ],
        trends: [
          { title: "Natural Presentation", description: "Moving away from extreme fitting to more natural, performance-oriented presentation." },
          { title: "Practical Size", description: "Preference for moderate-framed lambs with excellent muscle expression over extremely tall individuals." },
          { title: "Handle Importance", description: "Increasing emphasis on firmness and appropriate finish when judges handle lambs." },
          { title: "Performance Integration", description: "More judges considering performance data alongside visual evaluation." }
        ],
        preparationTips: [
          { title: "Balanced Bracing", description: "Practice appropriate bracing techniques that showcase muscle without appearing unnatural." },
          { title: "Strategic Trimming", description: "Develop trimming strategies that enhance natural muscle expression and structural advantages." },
          { title: "Handle Development", description: "Focus on feed programs that develop firm handling over the rack and loin." },
          { title: "Movement Training", description: "Train your lamb to move fluidly with head up to demonstrate structural correctness." }
        ]
      };
      break;

    case 'goat':
    case 'goats':
    case 'kid':
    case 'doe':
    case 'buck':
      insightsData = {
        criteria: [
          { name: "Muscle Dimension", description: "Volume and expression in leg, rack, and forearm", importance: "High" },
          { name: "Structural Design", description: "Level topline, correct angles to joints, sound feet", importance: "High" },
          { name: "Production Efficiency", description: "Frame, capacity, and growth indicators", importance: "High" },
          { name: "Balance & Style", description: "Clean-fronted, proportional development throughout", importance: "Medium" },
          { name: "Market Indicators", description: "Leanness and potential yield considerations", importance: "Medium" }
        ],
        trends: [
          { title: "Practical Muscle", description: "Preference for practically muscled, functional goats over extremely heavy but stiff individuals." },
          { title: "Structural Priority", description: "Increased emphasis on correct structure and movement over excessive muscle." },
          { title: "Capacity Focus", description: "Growing priority on goats displaying good rib and lower body capacity." },
          { title: "Breeding Value", description: "Even in market classes, consideration of potential breeding value is increasing." }
        ],
        preparationTips: [
          { title: "Controlled Handling", description: "Practice proper handling techniques that allow the goat to display natural muscle and structure." },
          { title: "Body Conditioning", description: "Target conditioning that showcases muscle expression without excessive fat cover." },
          { title: "Stance Training", description: "Train your goat to stand square and wide to highlight structural advantages." },
          { title: "Bracing Technique", description: "Develop appropriate bracing methods that showcase muscle dimension without appearing forced." }
        ]
      };
      break;

    case 'horse':
    case 'horses':
    case 'equine':
    case 'pony':
      insightsData = {
        criteria: [
          { name: "Movement Quality", description: "Correctness, freedom, and athleticism of gaits", importance: "High" },
          { name: "Conformation", description: "Correct structural alignment and balance", importance: "High" },
          { name: "Balance & Proportion", description: "Harmonious relationship between body parts", importance: "High" },
          { name: "Breed Type", description: "Adherence to breed standards and characteristics", importance: "Medium" },
          { name: "Presence & Expression", description: "Alert expression, carriage, and ring presence", importance: "Medium" }
        ],
        trends: [
          { title: "Functional Focus", description: "Increased emphasis on functional conformation over extreme type characteristics." },
          { title: "Movement Priority", description: "Greater weight given to quality of movement, especially in performance breeds." },
          { title: "Balanced Approach", description: "Judges seeking horses with balance between type, conformation, and movement." },
          { title: "Practical Characteristics", description: "Growing preference for practically built, usable horses in all disciplines." }
        ],
        preparationTips: [
          { title: "Movement Training", description: "Develop your horse's natural movement through proper conditioning and training." },
          { title: "Presentation Strategy", description: "Plan your ring presentation to highlight your horse's best structural and movement features." },
          { title: "Conditioning Program", description: "Implement conditioning that develops appropriate muscling and fitness for your discipline." },
          { title: "Ring Presence", description: "Train for alert, responsive behavior and confident carriage in the show ring." }
        ]
      };
      break;
  }
  
  return insightsData;
}

const JudgeInsightsCard = ({ animal }: JudgeInsightsCardProps) => {
  const { userSubscription } = useAppContext();
  const isElite = userSubscription.level === 'elite';
  
  const handleNavigateToSubscriptions = () => {
    window.location.href = '/subscription';
  };
  
  if (!isElite) {
    return (
      <PremiumFeatureBanner
        title="Premium Judge Insights"
        description="Access deep research on what high-selling show judges look for in each type of livestock."
        requiredLevel="elite"
        onUpgrade={handleNavigateToSubscriptions}
      />
    );
  }
  
  // Get insights based on animal species
  const insights = getJudgeInsightsForSpecies(animal.species);
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-5 w-5 text-primary" />
            <CardTitle>Judge Insights Research</CardTitle>
          </div>
          <Badge className="bg-primary">Elite Feature</Badge>
        </div>
        <CardDescription>
          Deep research on what high-selling judges look for in {animal.species}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="criteria">Judging Criteria</TabsTrigger>
            <TabsTrigger value="trends">Current Trends</TabsTrigger>
            <TabsTrigger value="preparation">Preparation Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="criteria" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3Icon className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Key Judging Criteria for {animal.species}</h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Criteria</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Importance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.criteria.map((criterion, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{criterion.name}</TableCell>
                    <TableCell>{criterion.description}</TableCell>
                    <TableCell>
                      <Badge className={
                        criterion.importance === 'High' ? 'bg-primary' : 
                        criterion.importance === 'Medium' ? 'bg-accent' : 
                        'bg-muted'
                      }>
                        {criterion.importance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpenIcon className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Current Trends in {animal.species} Judging</h3>
            </div>
            
            <div className="space-y-4">
              {insights.trends.map((trend, index) => (
                <div key={index} className="border rounded-md p-3">
                  <h4 className="font-medium mb-1">{trend.title}</h4>
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="preparation" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpenIcon className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Preparation Tips Based on Judge Research</h3>
            </div>
            
            <div className="space-y-3">
              {insights.preparationTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge className="mt-1">{index + 1}</Badge>
                  <div>
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JudgeInsightsCard;
