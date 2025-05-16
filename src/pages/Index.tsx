
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import AnimalsList from "@/components/AnimalsList";
import EmptyAnimalsState from "@/components/EmptyAnimalsState";
import SubscriptionPlansSection from "@/components/SubscriptionPlansSection";
import MainNavigationMenu from "@/components/NavigationMenu";
import QuickAccessSection from "@/components/QuickAccessSection";
import WelcomeMessage from "@/components/WelcomeMessage";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

const Index = () => {
  const { animals, user, userSubscription } = useAppContext();
  const navigate = useNavigate();

  const handleAnimalClick = (animalId: string) => {
    // Navigate to the animal details page with the overview tab selected
    navigate(`/animal/${animalId}`);
  };

  const handleAddAnimal = () => {
    navigate('/add-animal');
  };

  const handleUpgradeSubscription = (tier: string) => {
    navigate('/subscription');
  };

  const handleLoginClick = () => {
    navigate('/login');
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
      <PageHeader user={user} />
      
      {/* Login button prominently displayed at the top for non-logged-in users */}
      {!user && (
        <div className="flex justify-center my-4">
          <Button 
            variant="default" 
            onClick={handleLoginClick}
            className="flex items-center gap-2 text-lg"
            size="lg"
          >
            <LogInIcon className="h-5 w-5" />
            Login to Show Track
          </Button>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold italic text-primary">
          "Measure More. Guess Less. Win Bigger."
        </h2>
      </div>
      
      <MainNavigationMenu />

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="animals">My Animals</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="animals" className="pt-6">
          {animals.length > 0 ? (
            <AnimalsList 
              animals={animals}
              user={user}
              onAnimalClick={handleAnimalClick}
              onAddAnimal={handleAddAnimal}
            />
          ) : (
            <EmptyAnimalsState 
              user={user}
              onAddAnimal={handleAddAnimal}
            />
          )}
        </TabsContent>
        
        <TabsContent value="subscription" className="pt-6">
          <SubscriptionPlansSection
            subscriptionPlans={subscriptionPlans}
            currentTier={user?.subscriptionLevel || 'free'}
            onUpgrade={handleUpgradeSubscription}
          />
        </TabsContent>
      </Tabs>
      
      <QuickAccessSection />
    </div>
  );
};

export default Index;
