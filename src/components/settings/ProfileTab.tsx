
import React, { useState } from "react";
import { User } from "@/types/models";
import EmailVerificationModal from "./EmailVerificationModal";
import ProfileForm from "./ProfileForm";
import DeleteAccountSection from "./DeleteAccountSection";
import AboutMeSection from "./AboutMeSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BuckleShowcase from "@/components/badges/BuckleShowcase";
import ProfileBadges from "@/components/badges/ProfileBadges";
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
  
  const handleEmailChange = (email: string) => {
    setNewEmail(email);
    setEmailVerified(false);
    setIsEmailVerificationOpen(true);
  };
  
  const handleEmailVerified = () => {
    setIsEmailVerificationOpen(false);
    setEmailVerified(true);
  };

  // Create a user object compatible with the legacy badge system
  const legacyUser = user ? {
    ...user,
    unlocked: user.badges?.map(b => b.badgeId) || [],
    // These fields simulate what the legacy system expects
    muscleGain: 20, // Example value to trigger the muscle_up badge
    photos: Array(15).fill({}), // Example to trigger glow_up badge
    mentorTags: ['user1', 'user2', 'user3'], // For mentor badge
    shows: [{ id: 'show1', name: 'First Show' }], // For ring_debut badge
    placements: [{ place: 2, show: 'Show Championship' }] // For top_3_finisher badge
  } : null;

  return (
    <>
      <ProfileForm
        user={user}
        emailVerified={emailVerified}
        onEmailChange={handleEmailChange}
      />

      <AboutMeSection user={user} />
      
      {legacyUser && (
        <div className="mt-6">
          <ProfileBadges user={legacyUser} />
        </div>
      )}
      
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
