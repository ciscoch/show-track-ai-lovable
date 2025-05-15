
import React, { useEffect, useState } from "react";
import BadgeGallery from "./BadgeGallery";
import { checkBadgeUnlocks } from "./badgeLogic";

export default function Profile({ user }) {
  const [unlocked, setUnlocked] = useState(user.unlocked || []);

  useEffect(() => {
    checkBadgeUnlocks(user, setUnlocked);
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🏅 My Buckles</h2>
      <BadgeGallery unlocked={unlocked} />
    </div>
  );
}
