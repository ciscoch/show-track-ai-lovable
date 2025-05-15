import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeftIcon, CheckIcon, XIcon, ZapIcon, LineChartIcon, Camera, BarChart3Icon, BookOpenCheckIcon } from "lucide-react";
import SubscriptionFeatureCard from "@/components/SubscriptionFeatureCard";

const Subscription = () => {
  const { user, userSubscription } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const proTierHighlightedFeatures = [
    "AI weight estimation",
    "Muscle mass analysis",
    "LIDAR body scanning", 
    "Show readiness score",
    "Feed conversion charts",
    "Timeline visualization",
    "Tax record exports"
  ];

  const eliteTierHighlightedFeatures = [
    "Judge trend analysis",
    "Smart feed suggestions",
    "Pose guidance",
    "Personalized showmanship tips"
  ];
  
  const subscriptionPlans = [
    {
      id: 'free',
      title: "Free",
      price: 0,
      description: "Basic features for getting started",
      features: [
        "Basic animal profiles",
        "Manual weight tracking",
        "Simple journal",
        "Photo gallery",
        "Basic feed log"
      ]
    },
    {
      id: 'pro',
      title: "Pro",
      price: 9.99,
      description: "Advanced features for serious exhibitors",
      features: [
        "AI weight estimation",
        "Muscle mass analysis",
        "LIDAR body scanning",
        "Show readiness score",
        "Feed conversion charts",
        "Timeline visualization",
        "Tax record exports",
        "Advanced journaling",
        "Everything in Free tier"
      ]
    },
    {
      id: 'elite',
      title: "Elite",
      price: 19.99,
      description: "Premium features for champions",
      features: [
        "Judge trend analysis",
        "Smart feed suggestions",
        "Pose guidance",
        "Personalized showmanship tips",
        "Tax summary exports",
        "Everything in Pro tier"
      ]
    }
  ];
  
  const handleUpgradeClick = (planId: string) => {
    setLoading(true);
    
    // Simulate API call to upgrade
    setTimeout(() => {
      toast({
        title: "Coming Soon",
        description: "Subscription functionality will be available soon. This is a demo.",
      });
      setLoading(false);
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6 flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Home</span>
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Subscription</h1>
          <p className="text-muted-foreground">Manage your plan and billing</p>
        </div>
        
        <Badge className={`py-1 px-3 ${
          user?.subscriptionLevel === 'elite' 
            ? 'bg-primary' 
            : user?.subscriptionLevel === 'pro' 
              ? 'bg-accent' 
              : 'bg-gray-600'
        }`}>
          Current: {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)} Plan
        </Badge>
      </div>
      
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <SubscriptionFeatureCard
                key={plan.id}
                title={plan.title}
                price={plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}`}
                description={plan.description}
                features={plan.features}
                tier={plan.id as 'free' | 'pro' | 'elite'}
                isCurrentPlan={user?.subscriptionLevel === plan.id}
                onSelect={() => handleUpgradeClick(plan.id)}
                buttonText={user?.subscriptionLevel === 'free'
                  ? `Upgrade to ${plan.title}`
                  : user?.subscriptionLevel === 'pro' && plan.id === 'elite'
                    ? 'Upgrade to Elite'
                    : user?.subscriptionLevel === 'elite' && plan.id !== 'elite'
                      ? 'Downgrade to ' + plan.title
                      : 'Select Plan'}
                highlightedFeatures={plan.id === 'pro' ? proTierHighlightedFeatures : plan.id === 'elite' ? eliteTierHighlightedFeatures : []}
              />
            ))}
          </div>
          
          <div className="mt-8 bg-muted/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Premium Features Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium mb-2">Free Plan</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Basic animal records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Manual weight tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Basic notes and journal</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2 flex items-center">
                  <ZapIcon className="h-4 w-4 mr-2 text-accent" />
                  Pro-only Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Camera className="h-4 w-4 mt-0.5 text-accent" />
                      <span>AI weight estimation from photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Camera className="h-4 w-4 mt-0.5 text-accent" />
                      <span>Muscle mass analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Camera className="h-4 w-4 mt-0.5 text-accent" />
                      <span>LIDAR body scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BarChart3Icon className="h-4 w-4 mt-0.5 text-accent" />
                      <span>Show readiness score</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <LineChartIcon className="h-4 w-4 mt-0.5 text-accent" />
                      <span>Feed conversion charts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LineChartIcon className="h-4 w-4 mt-0.5 text-accent" />
                      <span>Timeline visualization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BookOpenCheckIcon className="h-4 w-4 mt-0.5 text-accent" />
                      <span>Tax record exports</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Elite-only Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Judge trend analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Smart feed recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                    <span>Personalized show tips</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 text-center">
                <p className="text-muted-foreground mb-4">
                  This is a demo application. Billing functionality is not implemented.
                </p>
                <Button disabled>Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Subscription;
