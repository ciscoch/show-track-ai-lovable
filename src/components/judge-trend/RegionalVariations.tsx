
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RegionalVariations: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Regional Judging Variations</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="p-2 text-left">Region</TableHead>
              <TableHead className="p-2 text-left">Top Priority</TableHead>
              <TableHead className="p-2 text-left">Secondary Focus</TableHead>
              <TableHead className="p-2 text-left">Notable Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-t">
              <TableCell className="p-2 font-medium">Midwest</TableCell>
              <TableCell className="p-2">Structure</TableCell>
              <TableCell className="p-2">Muscle</TableCell>
              <TableCell className="p-2">Heavier emphasis on frame size</TableCell>
            </TableRow>
            <TableRow className="border-t bg-muted/30">
              <TableCell className="p-2 font-medium">South</TableCell>
              <TableCell className="p-2">Muscle</TableCell>
              <TableCell className="p-2">Overall Balance</TableCell>
              <TableCell className="p-2">Higher valuation of eye appeal</TableCell>
            </TableRow>
            <TableRow className="border-t">
              <TableCell className="p-2 font-medium">West</TableCell>
              <TableCell className="p-2">Functional Traits</TableCell>
              <TableCell className="p-2">Structure</TableCell>
              <TableCell className="p-2">More attention to movement quality</TableCell>
            </TableRow>
            <TableRow className="border-t bg-muted/30">
              <TableCell className="p-2 font-medium">Northeast</TableCell>
              <TableCell className="p-2">Balance</TableCell>
              <TableCell className="p-2">Structure</TableCell>
              <TableCell className="p-2">More traditional breed characteristics</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RegionalVariations;
