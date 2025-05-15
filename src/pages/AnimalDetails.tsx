
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimalHeader from "@/components/animal-details/AnimalHeader";
import AnimalCalendar from "@/components/animal-details/AnimalCalendar";
import OverviewTab from "@/components/animal-details/OverviewTab";
import WeightHistoryTab from "@/components/animal-details/WeightHistoryTab";
import JournalEntriesTab from "@/components/animal-details/JournalEntriesTab";
import ExpensesTab from "@/components/animal-details/ExpensesTab";
import BodyCompositionTab from "@/components/animal-details/BodyCompositionTab";
import ShowmanshipTab from "@/components/animal-details/ShowmanshipTab";

const AnimalDetails = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const navigate = useNavigate();
  const { animals, weights, journals, expenses, setCurrentAnimal } = useAppContext();
  
  const [animal, setAnimal] = useState(animals.find(a => a.id === animalId));
  const [targetWeight, setTargetWeight] = useState<number | undefined>(undefined);
  
  // Filter journals for this animal
  const animalJournals = journals
    .filter(journal => journal.animalId === animalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  useEffect(() => {
    if (!animal) {
      // Animal not found, redirect to main page
      navigate('/');
      return;
    }
    
    // Set as current animal in context
    setCurrentAnimal(animal);
    
    // Set target weight (example calculation - can be customized based on species/show requirements)
    if (animal.species === 'goat') {
      setTargetWeight(100); // Example target for goat
    } else if (animal.species === 'cattle') {
      setTargetWeight(1200); // Example target for cattle
    } else if (animal.species === 'pig') {
      setTargetWeight(280); // Example target for pig
    } else if (animal.species === 'sheep') {
      setTargetWeight(140); // Example target for sheep
    }
    
    // Cleanup function
    return () => {
      setCurrentAnimal(null);
    };
  }, [animal, animalId, navigate, setCurrentAnimal]);
  
  if (!animal) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <AnimalHeader animal={animal} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          {/* This space is intentionally left blank for future content */}
        </div>
        <AnimalCalendar />
      </div>
      
      <Tabs defaultValue="overview" className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:w-auto lg:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weights">Weights</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="composition">Body Analysis</TabsTrigger>
          <TabsTrigger value="showmanship">Showmanship</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-6">
          <OverviewTab 
            animal={animal} 
            weights={weights} 
            animalJournals={animalJournals}
            targetWeight={targetWeight}
          />
        </TabsContent>
        
        <TabsContent value="weights" className="pt-6">
          <WeightHistoryTab 
            weights={weights} 
            animalId={animal.id}
            targetWeight={targetWeight} 
          />
        </TabsContent>
        
        <TabsContent value="journal" className="pt-6">
          <JournalEntriesTab animalJournals={animalJournals} animalId={animal.id} />
        </TabsContent>
        
        <TabsContent value="expenses" className="pt-6">
          <ExpensesTab expenses={expenses} animalId={animal.id} />
        </TabsContent>
        
        <TabsContent value="composition" className="pt-6">
          <BodyCompositionTab animal={animal} />
        </TabsContent>
        
        <TabsContent value="showmanship" className="pt-6">
          <ShowmanshipTab animal={animal} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnimalDetails;
