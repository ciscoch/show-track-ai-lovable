
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import WelcomeMessage from "@/components/WelcomeMessage";
import QuickAccessSection from "@/components/QuickAccessSection";
import PhotoGallery from "@/components/PhotoGallery";
import { Animal, User } from "@/types/models";

const Index = () => {
  const { user, animals } = useSupabaseApp();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Transform data to match expected types
  const transformedAnimals: Animal[] = animals.map(animal => ({
    ...animal,
    gender: (animal.gender || "male") as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || animal.birthdate || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: (animal.purpose || "other") as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number || animal.penNumber,
    breederName: animal.breeder_name || animal.breeder_name,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || animal.created_at || new Date().toISOString(),
    // Fix organization handling - ensure it's always an object or undefined
    organization: typeof animal.organization === 'string' 
      ? { id: animal.organization, name: animal.organization }
      : undefined
  }));

  const transformedUser: User = {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  };

  const userName = transformedUser.firstName || transformedUser.lastName 
    ? `${transformedUser.firstName} ${transformedUser.lastName}`.trim()
    : user.email?.split('@')[0] || 'User';
  
  const isNewUser = transformedAnimals.length === 0;

  return (
    <MainLayout title="Dashboard" user={transformedUser}>
      <div className="space-y-8">
        <WelcomeMessage 
          user={transformedUser}
        />
        
        <QuickAccessSection />
        
        <PhotoGallery photos={[]} />
      </div>
    </MainLayout>
  );
};

export default Index;
