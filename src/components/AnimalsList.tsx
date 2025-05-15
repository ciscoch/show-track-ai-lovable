
import { Animal, User } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimalCard from "@/components/AnimalCard";
import WelcomeMessage from "./WelcomeMessage";
import QuickAccessSection from "./QuickAccessSection";

type AnimalsListProps = {
  animals: Animal[];
  user: User | null;
  onAnimalClick: (animalId: string) => void;
  onAddAnimal: () => void;
};

const AnimalsList = ({ animals, user, onAnimalClick, onAddAnimal }: AnimalsListProps) => {
  return (
    <>
      <WelcomeMessage user={user} />
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Animals</h2>
        <Button onClick={onAddAnimal}>Add Animal</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map(animal => (
          <AnimalCard 
            key={animal.id} 
            animal={animal} 
            onClick={() => onAnimalClick(animal.id)} 
          />
        ))}
        
        <Card 
          className="h-full border-dashed border-2 hover:border-primary cursor-pointer flex flex-col justify-center items-center"
          onClick={onAddAnimal}
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
      
      <QuickAccessSection />
    </>
  );
};

export default AnimalsList;
