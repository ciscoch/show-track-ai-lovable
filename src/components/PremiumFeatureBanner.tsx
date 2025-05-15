
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LockIcon } from "lucide-react";

type PremiumFeatureBannerProps = {
  title: string;
  description: string;
  requiredTier: 'pro' | 'elite';
  onUpgrade: () => void;
};

const PremiumFeatureBanner = ({ 
  title, 
  description, 
  requiredTier, 
  onUpgrade 
}: PremiumFeatureBannerProps) => {
  const tierStyle = requiredTier === 'pro' 
    ? "bg-accent text-accent-foreground" 
    : "bg-primary text-primary-foreground";
  
  return (
    <Alert className="relative border-2 border-dashed">
      <div className="absolute -top-3 right-4">
        <Badge className={tierStyle}>
          {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} Feature
        </Badge>
      </div>
      <LockIcon className="h-4 w-4" />
      <AlertTitle className="mt-2">{title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span>{description}</span>
        <Button 
          className={requiredTier === 'pro' ? "bg-accent hover:bg-accent/90" : ""}
          onClick={onUpgrade}
        >
          Upgrade to {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default PremiumFeatureBanner;
