
import { SubscriptionTier } from "@/types/models";
import SubscriptionFeatureCard from "@/components/SubscriptionFeatureCard";

type SubscriptionPlan = {
  title: string;
  price: string;
  description: string;
  tier: SubscriptionTier["level"];
  features: string[];
};

type SubscriptionPlansSectionProps = {
  subscriptionPlans: SubscriptionPlan[];
  currentTier: string;
  onUpgrade: (tier: string) => void;
};

const SubscriptionPlansSection = ({ 
  subscriptionPlans, 
  currentTier, 
  onUpgrade 
}: SubscriptionPlansSectionProps) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Subscription Plans</h2>
        <p className="text-muted-foreground">Choose the plan that best fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <SubscriptionFeatureCard
            key={plan.tier}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            tier={plan.tier}
            isCurrentPlan={currentTier === plan.tier}
            onSelect={() => onUpgrade(plan.tier)}
            buttonText={plan.tier === 'free' ? "Current Tier" : "Upgrade"}
          />
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlansSection;
