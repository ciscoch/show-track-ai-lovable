
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface QrCodeScannerProps {
  onScan: (result: string) => void;
  onCancel: () => void;
}

// This is a mock QR scanner component. In a real app, you'd integrate with a library
// like react-qr-reader or use the Web API's BarcodeDetector if available
const QrCodeScanner = ({ onScan, onCancel }: QrCodeScannerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate camera initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDemoScan = () => {
    // In a real app, this would come from actual QR scanning
    const mockResult = "user-invite-12345";
    toast({
      title: "QR Code detected",
      description: `Code: ${mockResult}`,
    });
    onScan(mockResult);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Initializing camera...</p>
        </div>
      ) : (
        <>
          <div className="relative w-full aspect-square bg-gray-800 rounded-md overflow-hidden mb-4">
            {/* This would be the camera preview in a real app */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/3 h-2/3 border-2 border-white/50 rounded-lg"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/70 text-sm">Point camera at QR code</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleDemoScan}>
              Demo Scan
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QrCodeScanner;
