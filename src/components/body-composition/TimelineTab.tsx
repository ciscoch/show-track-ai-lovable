
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { TimelineViewProps } from "./types";

const TimelineTab = ({ animal }: TimelineViewProps) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4 h-72 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <LineChart className="h-10 w-10 text-accent mx-auto mb-2" />
          <p className="text-muted-foreground mb-4">
            Timeline visualization shows body changes over time.<br />
            No data available yet. Take photos or scans to track changes.
          </p>
          <Button variant="outline" size="sm">
            View Example Timeline
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">Feed Conversion</div>
          <p className="text-sm">Track how efficiently your animal converts feed to weight gain.</p>
        </div>
        
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">Muscle Growth</div>
          <p className="text-sm">Visualize muscle development over time with AI analysis.</p>
        </div>
        
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">Body Structure</div>
          <p className="text-sm">Track structural changes as your animal develops.</p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm">Export Charts</Button>
        <Button variant="outline" size="sm">Generate Report</Button>
      </div>
    </div>
  );
};

export default TimelineTab;
