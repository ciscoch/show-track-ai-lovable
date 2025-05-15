
import React from "react";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/models";

interface SubscriptionStatusProps {
  user: User | null;
}

const SubscriptionStatus = ({ user }: SubscriptionStatusProps) => {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Subscription Status</div>
        <Badge className={`py-1 px-3 text-xs ${
          user?.subscriptionLevel === 'elite' 
            ? 'bg-primary' 
            : user?.subscriptionLevel === 'pro' 
              ? 'bg-accent' 
              : 'bg-gray-600'
        }`}>
          {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)} Plan
        </Badge>
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">
        {user?.subscriptionEndDate ? (
          <span>Your subscription will renew on {new Date(user.subscriptionEndDate).toLocaleDateString()}</span>
        ) : (
          <span>Free plan. Upgrade any time to access premium features.</span>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
