
import { Badge } from "@/types/models";
import BuckleShowcase from "@/components/badges/BuckleShowcase";

interface BuckleShowcaseSectionProps {
  badges: Badge[];
  title?: string;
}

const BuckleShowcaseSection = ({ badges, title }: BuckleShowcaseSectionProps) => {
  return (
    <div className="mt-2 mb-6">
      <BuckleShowcase 
        badges={badges} 
        title={title} 
      />
    </div>
  );
};

export default BuckleShowcaseSection;
