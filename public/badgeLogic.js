
export function checkBadgeUnlocks(user, setUnlocked) {
  const earned = [];

  if (user.muscleGain >= 15) earned.push("muscle_up");
  if (user.photos?.length >= 12) earned.push("glow_up");
  if (user.mentorTags?.length >= 3) earned.push("mentor");
  if (user.shows?.length >= 1) earned.push("ring_debut");
  if (user.placements?.some(p => p.place <= 3)) earned.push("top_3_finisher");

  const newBadges = earned.filter(b => !user.unlocked.includes(b));
  if (newBadges.length > 0) {
    setUnlocked([...user.unlocked, ...newBadges]);
  }
}
