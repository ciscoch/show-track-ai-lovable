
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LegacyBadgeAdapter from "./LegacyBadgeAdapter";

interface ProfileBadgesProps {
  user: any;
}

const ProfileBadges = ({ user }: ProfileBadgesProps) => {
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(user?.unlocked || []);
  
  useEffect(() => {
    // Import the legacy badge logic to check for unlocked badges
    import("../../../public/badgeLogic").then(({ checkBadgeUnlocks }) => {
      checkBadgeUnlocks(user, (newUnlocked: string[]) => {
        setUnlockedBadges(newUnlocked);
      });
    });
  }, [user]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>🏅 My Buckles</CardTitle>
      </CardHeader>
      <CardContent>
        <LegacyBadgeAdapter badgeIds={unlockedBadges} user={user} />
        <div className="flex justify-end mt-4">
          <a href="/friends?tab=badges" className="text-sm text-primary hover:underline">
            View all badges
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBadges;
