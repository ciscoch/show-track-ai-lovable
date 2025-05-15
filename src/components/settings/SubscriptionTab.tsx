
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, SubscriptionLevel } from "@/types/models";

interface SubscriptionTabProps {
  user: User | null;
  userSubscription: SubscriptionLevel;
}

const SubscriptionTab = ({ user, userSubscription }: SubscriptionTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Subscription</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Current Plan</h3>
            <p className="text-muted-foreground">
              {userSubscription.level.charAt(0).toUpperCase() + userSubscription.level.slice(1)} Plan
            </p>
          </div>
          
          <Badge className={`py-1 px-3 text-xs ${
            user?.subscriptionLevel === 'elite' 
              ? 'bg-primary' 
              : user?.subscriptionLevel === 'pro' 
                ? 'bg-accent' 
                : 'bg-gray-600'
          }`}>
            {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)}
          </Badge>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Features Included</h3>
          <ul className="space-y-2">
            {userSubscription.features?.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button onClick={() => window.location.href = '/subscription'}>
          {user?.subscriptionLevel === 'free' ? "Upgrade Now" : "Manage Subscription"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionTab;
