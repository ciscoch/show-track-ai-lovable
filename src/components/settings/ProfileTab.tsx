
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

// Updated mock badges for the user, including the new buckle types
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
  },
  {
    id: "10",
    name: "Muscle-Up Buckle",
    description: "Gain 15+ lbs muscle mass (AI detected)",
    icon: "dumbbell",
    earnedAt: "2025-04-10",
    category: "muscle-up",
    type: "gold",
    year: 2025
  },
  {
    id: "11",
    name: "Glow-Up Buckle",
    description: "Upload 12 progress photos over 3+ months",
    icon: "camera",
    earnedAt: "2025-03-25",
    category: "glow-up",
    type: "silver",
    year: 2025
  },
  {
    id: "13",
    name: "Ring Debut Buckle",
    description: "Log your first show",
    icon: "star",
    earnedAt: "2025-04-15",
    category: "ring-debut",
    type: "bronze",
    year: 2025
  },
  {
    id: "14",
    name: "Top 3 Finisher Buckle",
    description: "Win 1st–3rd in class or breed",
    icon: "medal",
    earnedAt: "2025-04-20",
    category: "top-3",
    type: "silver",
    year: 2025
  },
  {
    id: "16",
    name: "Feed Smart Buckle",
    description: "Complete 5 feed plan challenges",
    icon: "book",
    earnedAt: "2025-04-25",
    category: "feed-smart",
    type: "silver",
    year: 2025
  },
  {
    id: "17",
    name: "Showmanship Scholar",
    description: "Watch 10 showmanship tip videos",
    icon: "file-text",
    earnedAt: "2025-05-10", 
    category: "showmanship-scholar",
    type: "gold",
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
