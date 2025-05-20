
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { QrCode, Share2 } from "lucide-react";
import { generateId } from "@/lib/utils";

const QRCodeTab = () => {
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Generate a unique invite code
    const inviteCode = generateId();
    if (typeof window !== "undefined") {
      setQrValue(`${window.location.origin}/friends?invite=${inviteCode}`);
    }
  }, []);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: 'Add me as a friend',
          text: 'Scan this QR code to add me as a friend on Stock Show Manager',
          url: qrValue,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(qrValue);
      }
      toast({
        title: "Link copied",
        description: "Share this link with your friends",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your QR Code</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Share Your QR Code</CardTitle>
          <CardDescription>
            Let friends scan this QR code to add you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div 
            ref={qrRef} 
            className="bg-white p-4 rounded-lg mb-4"
            style={{ width: "250px", height: "250px" }}
          >
            {/* This would render a real QR code in a production app */}
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded">
              <QrCode size={200} />
              <span className="sr-only">QR Code for {qrValue}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground text-center">
            When scanned, this QR code will invite the person to connect with you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeTab;
