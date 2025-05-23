import React from "react";
import TrendChart from "@/components/Charts/TrendChart";

const TrendInsights = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Chart */}
      <div className="w-full">
        <TrendChart />
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-md border bg-background shadow-sm">
          <h3 className="font-semibold mb-2">🏆 Emphasis on Functional Structure</h3>
          <p className="text-sm text-muted-foreground">
            Judges are placing increased value on sound structure that promotes longevity.
          </p>
        </div>
        <div className="p-4 rounded-md border bg-background shadow-sm">
          <h3 className="font-semibold mb-2">🔍 Moderate Frame Size</h3>
          <p className="text-sm text-muted-foreground">
            The trend has moved away from extremely large animals toward more moderate, efficient frames.
          </p>
        </div>
      </div>

      {/* Regional Judging Table */}
      <div className="pt-6">
        <h2 className="text-xl font-bold mb-4">Regional Judging Variations</h2>
        <table className="min-w-full text-sm border rounded overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">Region</th>
              <th className="text-left p-2">Top Priority</th>
              <th className="text-left p-2">Secondary Focus</th>
              <th className="text-left p-2">Notable Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Midwest</td>
              <td>Structure</td>
              <td>Muscle</td>
              <td>Heavier emphasis on frame size</td>
            </tr>
            <tr>
              <td className="p-2">South</td>
              <td>Muscle</td>
              <td>Overall Balance</td>
              <td>Higher valuation of eye appeal</td>
            </tr>
            <tr>
              <td className="p-2">West</td>
              <td>Functional Traits</td>
              <td>Structure</td>
              <td>More attention to movement quality</td>
            </tr>
            <tr>
              <td className="p-2">Northeast</td>
              <td>Balance</td>
              <td>Structure</td>
              <td>More traditional breed characteristics</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendInsights;
