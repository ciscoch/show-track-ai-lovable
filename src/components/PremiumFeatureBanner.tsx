
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LockIcon, ZapIcon } from "lucide-react";

type PremiumFeatureBannerProps = {
  title: string;
  description: string;
  requiredLevel: 'pro' | 'elite';
  onUpgrade?: () => void;
  currentLevel?: 'free' | 'pro' | 'elite';
  className?: string;
};

const PremiumFeatureBanner = ({ 
  title, 
  description, 
  requiredLevel, 
  onUpgrade,
  currentLevel = 'free',
  className = ''
}: PremiumFeatureBannerProps) => {
  const tierStyle = requiredLevel === 'pro' 
    ? "bg-accent text-accent-foreground" 
    : "bg-primary text-primary-foreground";
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    }
  };
  
  const isUpgradable = (currentLevel === 'free') || 
    (currentLevel === 'pro' && requiredLevel === 'elite');
  
  return (
    <Alert className={`relative border-2 border-dashed ${className}`}>
      <div className="absolute -top-3 right-4">
        <Badge className={tierStyle}>
          {requiredLevel === 'pro' ? <ZapIcon className="h-3 w-3 mr-1" /> : <></>}
          {requiredLevel.charAt(0).toUpperCase() + requiredLevel.slice(1)} Feature
        </Badge>
      </div>
      <LockIcon className="h-4 w-4" />
      <AlertTitle className="mt-2">{title}</AlertTitle>
      <AlertDescription className="mt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span>{description}</span>
        {isUpgradable && (
          <Button 
            className={requiredLevel === 'pro' ? "bg-accent hover:bg-accent/90" : ""}
            onClick={handleUpgrade}
          >
            Upgrade to {requiredLevel.charAt(0).toUpperCase() + requiredLevel.slice(1)}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default PremiumFeatureBanner;
