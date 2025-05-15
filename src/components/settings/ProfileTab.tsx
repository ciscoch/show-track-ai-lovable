
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SaveIcon, UserIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/models";

interface ProfileTabProps {
  user: User | null;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleProfileUpdate}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Subscription Status</div>
              <Badge className={`py-1 px-3 text-xs ${
                user?.subscriptionLevel === 'elite' 
                  ? 'bg-primary' 
                  : user?.subscriptionLevel === 'pro' 
                    ? 'bg-accent' 
                    : 'bg-gray-600'
              }`}>
                {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)} Plan
              </Badge>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              {user?.subscriptionEndDate ? (
                <span>Your subscription will renew on {new Date(user.subscriptionEndDate).toLocaleDateString()}</span>
              ) : (
                <span>Free plan. Upgrade any time to access premium features.</span>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="flex items-center gap-1">
            <SaveIcon className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileTab;
