
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Link } from "lucide-react";
import QrCodeScanner from "./QrCodeScanner";

interface ConnectUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (code: string) => void;
}

const ConnectUserDialog = ({
  open,
  onOpenChange,
  onConnect,
}: ConnectUserDialogProps) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleConnect = () => {
    if (inviteCode.trim()) {
      onConnect(inviteCode.trim());
      setInviteCode("");
    }
  };

  const handleScanResult = (result: string) => {
    setInviteCode(result);
    setIsScanning(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect with a User</DialogTitle>
          <DialogDescription>
            Connect with a user using their invite code or QR code.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Invitation Code</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Enter invitation code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Ask the user to share their invitation code with you from their profile.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="qr" className="py-4">
            <div className="space-y-4">
              {isScanning ? (
                <div className="aspect-square w-full max-w-sm mx-auto border rounded-md flex items-center justify-center">
                  <QrCodeScanner onScan={handleScanResult} onCancel={() => setIsScanning(false)} />
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md border-dashed">
                  <QrCode className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan a QR code from a user's profile to connect with them.
                  </p>
                  <Button onClick={() => setIsScanning(true)}>
                    Start Scanning
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={handleConnect}
            disabled={!inviteCode.trim()}
          >
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectUserDialog;
