
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ZapIcon, CrownIcon, SparklesIcon } from "lucide-react";

type SubscriptionTier = 'free' | 'pro' | 'elite';

type SubscriptionFeatureCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
  onSelect: () => void;
  buttonText?: string;
  highlightedFeatures?: string[];
};

const SubscriptionFeatureCard = ({
  title,
  price,
  description,
  features,
  tier,
  isCurrentPlan = false,
  onSelect,
  buttonText = "Select Plan",
  highlightedFeatures = []
}: SubscriptionFeatureCardProps) => {
  // Determine card styling based on the tier and if it's current
  const cardStyles = cn(
    "h-full flex flex-col",
    isCurrentPlan && "border-primary border-2",
    tier === 'pro' && !isCurrentPlan && "border-accent border-2",
    tier === 'elite' && "shadow-xl",
  );

  // Determine badge styling based on the tier
  const badgeStyles = cn(
    tier === 'free' && "bg-gray-600 hover:bg-gray-600/90",
    tier === 'pro' && "bg-accent hover:bg-accent/90",
    tier === 'elite' && "bg-primary hover:bg-primary/90",
  );

  // Determine button styling based on the tier
  const buttonStyles = cn(
    "w-full",
    tier === 'free' && "bg-gray-600 hover:bg-gray-600/90",
    tier === 'pro' && "bg-accent hover:bg-accent/90",
    tier === 'elite' && "bg-primary hover:bg-primary/90",
  );
  
  // Get the appropriate icon based on the tier
  const TierIcon = tier === 'elite' 
    ? CrownIcon 
    : tier === 'pro' 
      ? ZapIcon 
      : SparklesIcon;

  return (
    <Card className={cardStyles}>
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 z-10">
          <Badge className="bg-primary animate-pulse">Current Plan</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl flex items-center">
            <TierIcon className={`h-5 w-5 mr-2 ${tier === 'pro' ? 'text-accent' : tier === 'elite' ? 'text-primary' : 'text-gray-600'}`} />
            {title}
          </CardTitle>
          <Badge className={badgeStyles}>
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </Badge>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-start ${highlightedFeatures.includes(feature) ? "font-medium" : ""}`}>
              <span className={`mr-2 ${highlightedFeatures.includes(feature) 
                ? tier === 'pro' 
                  ? "text-accent" 
                  : tier === 'elite' 
                    ? "text-primary" 
                    : "text-green-500"
                : "text-primary"}`}>
                {highlightedFeatures.includes(feature) ? "★" : "✓"}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={buttonStyles}
          onClick={onSelect}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionFeatureCard;
