
import React, { useState } from "react";
import { User, Badge } from "@/types/models";
import EmailVerificationModal from "./EmailVerificationModal";
import ProfileForm from "./ProfileForm";
import DeleteAccountSection from "./DeleteAccountSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BadgeDisplay from "../badges/BadgeDisplay";
import BuckleShowcase from "@/components/badges/BuckleShowcase";

interface ProfileTabProps {
  user: User | null;
}

// Mock badges for the user
const mockUserBadges: Badge[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first users to join Stock Show Manager",
    icon: "award",
    earnedAt: "2025-01-15",
    category: "special",
    type: "gold",
    year: 2025
  },
  {
    id: "2",
    name: "Weight Tracking Streak - 7 Days",
    description: "Logged animal weights for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-10",
    category: "streak",
    type: "bronze",
    year: 2025
  }
];

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [emailVerified, setEmailVerified] = useState(true);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [userBadges] = useState<Badge[]>(mockUserBadges);
  
  const handleEmailChange = (email: string) => {
    setNewEmail(email);
    setEmailVerified(false);
    setIsEmailVerificationOpen(true);
  };
  
  const handleEmailVerified = () => {
    setIsEmailVerificationOpen(false);
    setEmailVerified(true);
  };

  return (
    <>
      <ProfileForm 
        user={user} 
        emailVerified={emailVerified}
        onEmailChange={handleEmailChange}
      />
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>My Buckle Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <BuckleShowcase badges={userBadges} />
          <div className="flex justify-end mt-4">
            <a href="/friends?tab=badges" className="text-sm text-primary hover:underline">
              View all badges
            </a>
          </div>
        </CardContent>
      </Card>
      
      <DeleteAccountSection />
      
      <EmailVerificationModal
        email={newEmail || user?.email || ""}
        open={isEmailVerificationOpen}
        onClose={() => setIsEmailVerificationOpen(false)}
        onVerified={handleEmailVerified}
      />
    </>
  );
};

export default ProfileTab;
