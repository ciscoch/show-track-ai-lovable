import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TrendChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function loadTrends() {
      const { data, error } = await supabase
        .from("judging_trends")
        .select("*")
        .order("recorded_at", { ascending: true });

      if (error) {
        console.error("Error loading trend data:", error);
        return;
      }

      const grouped = data.reduce((acc, item) => {
        const key = item.recorded_at;
        if (!acc[key]) acc[key] = { recorded_at: key };
        acc[key][item.metric] = item.value;
        return acc;
      }, {});

      setChartData(Object.values(grouped));
    }

    loadTrends();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="recorded_at" />
        <YAxis domain={[60, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="structure" stroke="#3b82f6" />
        <Line type="monotone" dataKey="muscle" stroke="#10b981" />
        <Line type="monotone" dataKey="form" stroke="#8b5cf6" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;