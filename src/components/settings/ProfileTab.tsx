
import React, { useState } from "react";
import { User } from "@/types/models";
import EmailVerificationModal from "./EmailVerificationModal";
import ProfileForm from "./ProfileForm";
import DeleteAccountSection from "./DeleteAccountSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BuckleShowcase from "@/components/badges/BuckleShowcase";
import { mockBadges } from "@/data/mockBadges";

interface ProfileTabProps {
  user: User | null;
}

// Select a subset of mock badges for the profile showcase
const profileBadges = mockBadges.filter(badge => 
  badge.earnedAt !== null && 
  ["muscle-up", "glow-up", "ring-debut", "top-3", "feed-smart", "showmanship-scholar"].includes(badge.category)
).slice(0, 8);

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [emailVerified, setEmailVerified] = useState(true);
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [userBadges] = useState(profileBadges);
  
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
