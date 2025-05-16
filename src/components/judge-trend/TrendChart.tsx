
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface TrendChartProps {
  trendData: {
    month: string;
    structure: number;
    muscle: number;
    form: number;
  }[];
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData }) => {
  return (
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
  );
};

export default TrendChart;
