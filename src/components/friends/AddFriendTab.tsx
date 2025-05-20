
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { generateId } from "@/lib/utils";

const AddFriendTab = () => {
  const [email, setEmail] = useState("");
  
  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to send an invitation
    toast({
      title: "Friend invitation sent",
      description: `An invitation has been sent to ${email}`,
    });
    
    setEmail("");
  };
  
  const handleSocialShare = (platform: string) => {
    const url = typeof window !== "undefined"
      ? window.location.origin + "/friends?invite=" + generateId()
      : "";
    
    // In a real app, this would use the Web Share API or platform-specific sharing
    toast({
      title: "Link copied",
      description: `Share this link with your friend: ${url}`,
    });
    
    // Copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add a Friend</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Send Email Invitation</CardTitle>
          <CardDescription>
            Enter your friend's email to send them an invitation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFriend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit">Send Invitation</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Share via Social Media</CardTitle>
          <CardDescription>
            Invite friends through your social networks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => handleSocialShare("facebook")}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialShare("instagram")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialShare("linkedin")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFriendTab;
