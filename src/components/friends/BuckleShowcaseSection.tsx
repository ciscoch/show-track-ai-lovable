
import { Badge } from "@/types/models";
import BuckleShowcase from "@/components/badges/BuckleShowcase";

interface BuckleShowcaseSectionProps {
  badges: Badge[];
  title?: string;
}

const BuckleShowcaseSection = ({ badges, title }: BuckleShowcaseSectionProps) => {
  // Filter to highlight glow-up buckles first if present
  const sortedBadges = [...badges].sort((a, b) => {
    // Prioritize glow-up buckles
    if (a.category === "glow-up" && b.category !== "glow-up") return -1;
    if (a.category !== "glow-up" && b.category === "glow-up") return 1;
    
    // Then by type (platinum, gold, silver, bronze)
    const typeOrder = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <div className="mt-2 mb-6">
      <BuckleShowcase 
        badges={sortedBadges} 
        title={title} 
      />
    </div>
  );
};

export default BuckleShowcaseSection;
