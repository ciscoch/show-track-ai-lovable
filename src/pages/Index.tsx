import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import AnimalCard from "@/components/AnimalCard";
import SubscriptionFeatureCard from "@/components/SubscriptionFeatureCard";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { GalleryVerticalIcon, WeightIcon, BookIcon, ChartBarIcon, AlarmClockIcon } from "lucide-react";

const Index = () => {
  const { animals, user, userSubscription } = useAppContext();
  const navigate = useNavigate();

  const handleAnimalClick = (animalId: string) => {
    navigate(`/animal/${animalId}`);
  };

  const handleAddAnimal = () => {
    navigate('/add-animal');
  };

  const handleUpgradeSubscription = (tier: string) => {
    navigate('/subscription');
  };

  const subscriptionPlans = [
    {
      title: "Free",
      price: "Free",
      description: "Basic features for getting started",
      tier: "free" as const,
      features: [
        "Basic animal profiles",
        "Manual weight tracking",
        "Simple journal entries",
        "Photo gallery",
        "Basic feed log"
      ]
    },
    {
      title: "Pro",
      price: "$9.99",
      description: "Advanced features for serious exhibitors",
      tier: "pro" as const,
      features: [
        "AI weight estimation",
        "Muscle mass analysis",
        "LIDAR integration",
        "Show readiness score",
        "Feed conversion charts",
        "Advanced journaling",
        "Tax record exports",
        "Everything in Free tier"
      ]
    },
    {
      title: "Elite",
      price: "$19.99",
      description: "Premium features for champions",
      tier: "elite" as const,
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

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">ShowTrack AI</h1>
          <p className="text-muted-foreground">Your livestock show management assistant</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className={`py-1 px-3 text-xs ${
            user?.subscriptionLevel === 'elite' 
              ? 'bg-primary' 
              : user?.subscriptionLevel === 'pro' 
                ? 'bg-accent' 
                : 'bg-gray-600'
          }`}>
            {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)} Plan
          </Badge>
          
          <Button variant="outline" onClick={() => navigate('/subscription')}>
            Manage Subscription
          </Button>
        </div>
      </div>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="animals">My Animals</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="animals" className="pt-6">
          {animals.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Animals</h2>
                <Button onClick={handleAddAnimal}>Add Animal</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map(animal => (
                  <AnimalCard 
                    key={animal.id} 
                    animal={animal} 
                    onClick={() => handleAnimalClick(animal.id)} 
                  />
                ))}
                
                <Card 
                  className="h-full border-dashed border-2 hover:border-primary cursor-pointer flex flex-col justify-center items-center"
                  onClick={handleAddAnimal}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="rounded-full bg-muted w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">+</span>
                    </div>
                    <h3 className="font-medium text-lg mb-2">Add New Animal</h3>
                    <p className="text-muted-foreground">
                      Register a new show animal to track
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-12 space-y-8">
                <h2 className="text-2xl font-bold">Quick Access</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/weights')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <WeightIcon className="h-5 w-5 text-primary" />
                        <span>Weight Tracking</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Monitor weight progress for all your animals
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/journal')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <BookIcon className="h-5 w-5 text-primary" />
                        <span>Journal</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Log daily observations and training notes
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/expenses')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-primary" />
                        <span>Expenses</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Track costs and generate tax reports
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/gallery')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <GalleryVerticalIcon className="h-5 w-5 text-primary" />
                        <span>Photo Gallery</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        View progress photos of your animals
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-primary cursor-pointer" onClick={() => navigate('/feed-reminders')}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <AlarmClockIcon className="h-5 w-5 text-primary" />
                        <span>Feed Reminders</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Set up feeding schedule reminders for your animals
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="rounded-full bg-muted w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🐄</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">No Animals Yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Add your first animal to start tracking weights, body composition, and show preparation.
              </p>
              <Button onClick={handleAddAnimal}>Add Your First Animal</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="subscription" className="pt-6">
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
                isCurrentPlan={user?.subscriptionLevel === plan.tier}
                onSelect={() => handleUpgradeSubscription(plan.tier)}
                buttonText={plan.tier === 'free' ? "Current Tier" : "Upgrade"}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
