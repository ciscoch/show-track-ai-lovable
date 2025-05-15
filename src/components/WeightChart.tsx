
import { WeightEntry } from "@/types/models";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';

type WeightChartProps = {
  weights: WeightEntry[];
  animalId: string;
  targetWeight?: number;
  showFullHistory?: boolean;
};

const WeightChart = ({ weights, animalId, targetWeight, showFullHistory = false }: WeightChartProps) => {
  // Filter weights for this animal
  const animalWeights = weights
    .filter(entry => entry.animalId === animalId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Limit to last 6 entries or show all if showFullHistory
  const displayWeights = showFullHistory 
    ? animalWeights 
    : animalWeights.slice(-6);
  
  // Format data for the chart
  const chartData = displayWeights.map(entry => ({
    date: format(new Date(entry.date), 'MMM dd'),
    weight: entry.weight,
    target: targetWeight,
    // Calculate daily gain if there are more than 1 entries
    dailyGain: 0, // We'll calculate this next
  }));
  
  // Calculate daily gain
  for (let i = 1; i < chartData.length; i++) {
    const currentEntry = displayWeights[i];
    const prevEntry = displayWeights[i-1];
    
    const currentDate = new Date(currentEntry.date);
    const prevDate = new Date(prevEntry.date);
    
    const daysDiff = Math.max(1, Math.round((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)));
    const weightDiff = currentEntry.weight - prevEntry.weight;
    
    chartData[i].dailyGain = parseFloat((weightDiff / daysDiff).toFixed(2));
  }
  
  // Calculate statistics
  const initialWeight = animalWeights.length > 0 ? animalWeights[0].weight : 0;
  const currentWeight = animalWeights.length > 0 ? animalWeights[animalWeights.length - 1].weight : 0;
  const totalGain = currentWeight - initialWeight;
  
  // Calculate average daily gain over entire period
  let avgDailyGain = 0;
  if (animalWeights.length > 1) {
    const firstDate = new Date(animalWeights[0].date);
    const lastDate = new Date(animalWeights[animalWeights.length - 1].date);
    const totalDays = Math.max(1, Math.round((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));
    avgDailyGain = parseFloat((totalGain / totalDays).toFixed(2));
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weight Tracking</CardTitle>
        <CardDescription>Track weight progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'weight' || name === 'target') return [`${value} lbs`, name];
                  if (name === 'dailyGain') return [`${value} lbs/day`, 'Daily Gain'];
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#16a34a"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                name="Weight"
              />
              {chartData.some(d => d.dailyGain !== 0) && (
                <Line
                  type="monotone"
                  dataKey="dailyGain"
                  stroke="#facc15"
                  strokeDasharray="5 5"
                  name="Daily Gain"
                />
              )}
              {targetWeight && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#dc2626"
                  strokeDasharray="3 3"
                  name="Target"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Initial:</span> {initialWeight} lbs
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Current:</span> {currentWeight} lbs
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Total Gain:</span> {totalGain} lbs
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Avg Daily Gain:</span> {avgDailyGain} lbs/day
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeightChart;
