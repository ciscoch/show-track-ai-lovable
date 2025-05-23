
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import { LidarScanProps } from "./types";

const LidarScanTab = ({ animal }: LidarScanProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="relative border rounded-md p-2 h-60 bg-muted/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Box className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                No 3D scans available.<br />
                Use LIDAR-enabled device to scan.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full flex items-center">
          <Box className="h-4 w-4 mr-2" />
          Start 3D Scan
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/20 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Frame Score</div>
            <div className="text-2xl font-bold">--</div>
          </div>
          <div className="bg-muted/20 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Est. Volume</div>
            <div className="text-2xl font-bold">--</div>
          </div>
        </div>
        
        <div className="bg-muted/20 p-3 rounded-md">
          <div className="text-sm text-muted-foreground mb-1">3D Analysis</div>
          <p className="text-sm">
            LIDAR scanning creates a 3D model of your animal for precise body structure analysis and accurate weight estimations.
            <br /><br />
            <span className="text-xs italic">Note: Requires a LIDAR-enabled device, such as iPhone Pro models or compatible Android phones.</span>
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" size="sm">Scan History</Button>
          <Button variant="outline" size="sm">Export Model</Button>
        </div>
      </div>
    </div>
  );
};

export default LidarScanTab;
