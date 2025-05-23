
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type TrendEntry = {
  recorded_at: string;
  structure?: number;
  muscle?: number;
  form?: number;
};

const TrendChart = () => {
  const [chartData, setChartData] = useState<TrendEntry[]>([]);

  useEffect(() => {
    async function fetchTrendData() {
      const { data, error } = await supabase
        .from("judging_trends")
        .select("*")
        .order("recorded_at", { ascending: true });

      if (error) {
        console.error("Failed to load trend data:", error);
        return;
      }

      const grouped = data.reduce<Record<string, TrendEntry>>((acc, row) => {
        const date = row.recorded_at;
        if (!acc[date]) acc[date] = { recorded_at: date };
        // Use type assertion to safely access the metric property
        acc[date][row.metric as keyof Pick<TrendEntry, "structure" | "muscle" | "form">] = row.value;
        return acc;
      }, {});

      setChartData(Object.values(grouped));
    }

    fetchTrendData();
  }, []);

  return (
    <div className="bg-background border rounded-md p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Judging Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="recorded_at" />
          <YAxis domain={[60, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="structure" stroke="#3b82f6" name="Structure" />
          <Line type="monotone" dataKey="muscle" stroke="#10b981" name="Muscle" />
          <Line type="monotone" dataKey="form" stroke="#8b5cf6" name="Form" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
