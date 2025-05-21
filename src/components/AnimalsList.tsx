
import { useState } from "react";
import { Animal, User } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimalCard from "@/components/AnimalCard";
import WelcomeMessage from "./WelcomeMessage";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type AnimalsListProps = {
  animals: Animal[];
  user: User | null;
  onAnimalClick: (animalId: string) => void;
  onAddAnimal: () => void;
};

const AnimalsList = ({ animals, user, onAnimalClick, onAddAnimal }: AnimalsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");

  // Get unique species for filter dropdown
  const uniqueSpecies = [...new Set(animals.map(animal => animal.species))];
  
  // Filter animals based on search term and species filter
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.tagNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.penNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = speciesFilter === "all" || animal.species === speciesFilter;
    
    return matchesSearch && matchesSpecies;
  });

  return (
    <>
      <WelcomeMessage user={user} />
    
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Animals</h2>
        <Button onClick={onAddAnimal}>Add Animal</Button>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, breed, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select 
            value={speciesFilter} 
            onValueChange={setSpeciesFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Animals</SelectItem>
              {uniqueSpecies.map(species => (
                <SelectItem key={species} value={species}>
                  {species.charAt(0).toUpperCase() + species.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredAnimals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map(animal => (
            <AnimalCard 
              key={animal.id} 
              animal={animal} 
              onClick={(animal) => onAnimalClick(animal.id)} 
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
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h3 className="font-medium text-lg mb-2">No Animals Found</h3>
          <p className="text-muted-foreground mb-4">
            No animals match your current search filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSpeciesFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
};

export default AnimalsList;
