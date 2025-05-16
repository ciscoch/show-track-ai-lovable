
import React from "react";

const RegionalVariations: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Regional Judging Variations</h3>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-2 text-left">Region</th>
              <th className="p-2 text-left">Top Priority</th>
              <th className="p-2 text-left">Secondary Focus</th>
              <th className="p-2 text-left">Notable Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2 font-medium">Midwest</td>
              <td className="p-2">Structure</td>
              <td className="p-2">Muscle</td>
              <td className="p-2">Heavier emphasis on frame size</td>
            </tr>
            <tr className="border-t bg-muted/30">
              <td className="p-2 font-medium">South</td>
              <td className="p-2">Muscle</td>
              <td className="p-2">Overall Balance</td>
              <td className="p-2">Higher valuation of eye appeal</td>
            </tr>
            <tr className="border-t">
              <td className="p-2 font-medium">West</td>
              <td className="p-2">Functional Traits</td>
              <td className="p-2">Structure</td>
              <td className="p-2">More attention to movement quality</td>
            </tr>
            <tr className="border-t bg-muted/30">
              <td className="p-2 font-medium">Northeast</td>
              <td className="p-2">Balance</td>
              <td className="p-2">Structure</td>
              <td className="p-2">More traditional breed characteristics</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionalVariations;
