
import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeftIcon, CheckIcon, XIcon } from "lucide-react";

const Subscription = () => {
  const { user, userSubscription } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const subscriptionPlans = [
    {
      id: 'free',
      title: "Free",
      price: 0,
      description: "Basic features for getting started",
      features: [
        { name: "Basic animal profiles", included: true },
        { name: "Manual weight tracking", included: true },
        { name: "Simple journal", included: true },
        { name: "Photo gallery", included: true },
        { name: "Basic feed log", included: true },
        { name: "AI weight estimation", included: false },
        { name: "Muscle mass analysis", included: false },
        { name: "Judge trend analysis", included: false },
        { name: "Smart feed suggestions", included: false },
      ]
    },
    {
      id: 'pro',
      title: "Pro",
      price: 9.99,
      description: "Advanced features for serious exhibitors",
      features: [
        { name: "Basic animal profiles", included: true },
        { name: "Manual weight tracking", included: true },
        { name: "Simple journal", included: true },
        { name: "Photo gallery", included: true },
        { name: "Basic feed log", included: true },
        { name: "AI weight estimation", included: true },
        { name: "Muscle mass analysis", included: true },
        { name: "LIDAR integration", included: true },
        { name: "Feed conversion charts", included: true },
        { name: "Tax record exports", included: true },
        { name: "Judge trend analysis", included: false },
        { name: "Smart feed suggestions", included: false },
      ]
    },
    {
      id: 'elite',
      title: "Elite",
      price: 19.99,
      description: "Premium features for champions",
      features: [
        { name: "Basic animal profiles", included: true },
        { name: "Manual weight tracking", included: true },
        { name: "Simple journal", included: true },
        { name: "Photo gallery", included: true },
        { name: "Basic feed log", included: true },
        { name: "AI weight estimation", included: true },
        { name: "Muscle mass analysis", included: true },
        { name: "LIDAR integration", included: true },
        { name: "Feed conversion charts", included: true },
        { name: "Tax record exports", included: true },
        { name: "Judge trend analysis", included: true },
        { name: "Smart feed suggestions", included: true },
        { name: "Pose guidance", included: true },
        { name: "Personalized showmanship tips", included: true },
        { name: "Tax summary exports", included: true },
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
              <Card key={plan.id} className={`h-full ${user?.subscriptionLevel === plan.id ? 'border-primary border-2' : ''}`}>
                {user?.subscriptionLevel === plan.id && (
                  <div className="absolute top-0 right-4 transform translate-y-[-50%]">
                    <Badge className="bg-primary">Current Plan</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {plan.title}
                    <Badge className={
                      plan.id === 'elite' 
                        ? 'bg-primary' 
                        : plan.id === 'pro' 
                          ? 'bg-accent' 
                          : 'bg-gray-600'
                    }>
                      {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}
                    </Badge>
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    ${plan.price === 0 ? '0' : plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {plan.price > 0 ? '/month' : ''}
                    </span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <CheckIcon className="h-4 w-4 mt-0.5 text-primary" />
                        ) : (
                          <XIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.id === 'elite' 
                        ? 'bg-primary hover:bg-primary/90' 
                        : plan.id === 'pro' 
                          ? 'bg-accent hover:bg-accent/90' 
                          : ''
                    }`}
                    disabled={user?.subscriptionLevel === plan.id || loading}
                    onClick={() => handleUpgradeClick(plan.id)}
                  >
                    {user?.subscriptionLevel === plan.id
                      ? 'Current Plan'
                      : loading
                        ? 'Processing...'
                        : user?.subscriptionLevel === 'free'
                          ? `Upgrade to ${plan.title}`
                          : user?.subscriptionLevel === 'pro' && plan.id === 'elite'
                            ? 'Upgrade to Elite'
                            : user?.subscriptionLevel === 'elite' && plan.id !== 'elite'
                              ? 'Downgrade to ' + plan.title
                              : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 bg-muted/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Premium Features Comparison</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              
              <div>
                <h4 className="font-medium mb-2">Pro-only Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-accent" />
                    <span>AI weight estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-accent" />
                    <span>Muscle mass analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="h-4 w-4 mt-0.5 text-accent" />
                    <span>LIDAR body scanning</span>
                  </li>
                </ul>
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
              
              <div>
                <h4 className="font-medium mb-2">Coming Soon</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 mt-0.5 flex items-center justify-center">⏳</span>
                    <span>Show calendar integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 mt-0.5 flex items-center justify-center">⏳</span>
                    <span>Community forums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 mt-0.5 flex items-center justify-center">⏳</span>
                    <span>Nutrition prediction AI</span>
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
