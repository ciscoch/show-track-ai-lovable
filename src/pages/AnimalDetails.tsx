
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AnimalHeader from "@/components/animal-details/AnimalHeader";
import OverviewTab from "@/components/animal-details/OverviewTab";
import WeightHistoryTab from "@/components/animal-details/WeightHistoryTab";
import JournalEntriesTab from "@/components/animal-details/JournalEntriesTab";
import ExpensesTab from "@/components/animal-details/ExpensesTab";
import BodyCompositionTab from "@/components/animal-details/BodyCompositionTab";
import ShowmanshipTab from "@/components/animal-details/ShowmanshipTab";
import AnimalCalendar from "@/components/animal-details/AnimalCalendar";
import { useParams } from "react-router-dom";
import { Animal, WeightEntry, JournalEntry, Expense } from "@/types/models";

// Mock data
const mockAnimal: Animal = {
  id: "1",
  name: "Buddy",
  species: "Pig",
  breed: "Hampshire",
  dateOfBirth: "2023-01-15",
  weight: 230,
  penNumber: "A12",
  tagNumber: "T123",
  notes: "Friendly and good appetite",
  image: "/placeholder.svg"
};

const mockWeights: WeightEntry[] = [
  { id: "w1", animalId: "1", weight: 180, date: "2023-08-01" },
  { id: "w2", animalId: "1", weight: 195, date: "2023-08-15" },
  { id: "w3", animalId: "1", weight: 210, date: "2023-09-01" },
  { id: "w4", animalId: "1", weight: 230, date: "2023-09-15" }
];

const mockJournals: JournalEntry[] = [
  { id: "j1", animalId: "1", date: "2023-09-01", title: "Diet Change", content: "Switched to premium feed." },
  { id: "j2", animalId: "1", date: "2023-09-10", title: "Behavior Note", content: "More active than usual." }
];

const mockExpenses: Expense[] = [
  { id: "e1", animalId: "1", date: "2023-08-05", category: "Feed", amount: 75.50, description: "Premium feed" },
  { id: "e2", animalId: "1", date: "2023-09-01", category: "Health", amount: 120, description: "Vet checkup" }
];

const targetWeight = 250;

const AnimalDetails = () => {
  const { animalId } = useParams();
  const animal = mockAnimal; // In a real app, would fetch based on animalId
  const weights = mockWeights;
  const animalJournals = mockJournals;
  const expenses = mockExpenses;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
      {/* Animal Profile Header */}
      <AnimalHeader animal={animal} />

      {/* Tabs moved up right below the header */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:w-auto lg:inline-flex mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weights">Weights</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="composition">Body Analysis</TabsTrigger>
          <TabsTrigger value="showmanship">Showmanship</TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="overview">
          <OverviewTab 
            animal={animal} 
            weights={weights} 
            animalJournals={animalJournals}
            targetWeight={targetWeight}
          />
        </TabsContent>

        <TabsContent value="weights">
          <WeightHistoryTab 
            weights={weights} 
            animalId={animal.id}
            targetWeight={targetWeight} 
          />
        </TabsContent>

        <TabsContent value="journal">
          <JournalEntriesTab animalJournals={animalJournals} animalId={animal.id} />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesTab expenses={expenses} animalId={animal.id} />
        </TabsContent>

        <TabsContent value="composition">
          <BodyCompositionTab animal={animal} />
        </TabsContent>

        <TabsContent value="showmanship">
          <ShowmanshipTab animal={animal} />
        </TabsContent>
      </Tabs>

      {/* Moved calendar below content to reduce vertical whitespace */}
      <div className="flex justify-end pt-4">
        <AnimalCalendar />
      </div>
    </div>
  );
};

export default AnimalDetails;
