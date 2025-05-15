
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WeightChart from "@/components/WeightChart";
import JournalEntry from "@/components/JournalEntry";
import ExpensesTable from "@/components/ExpensesTable";
import BodyCompositionCard from "@/components/BodyCompositionCard";
import ShowTipsCard from "@/components/ShowTipsCard";
import JudgeAnalysisCard from "@/components/JudgeAnalysisCard";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAge } from "@/lib/utils";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";

const AnimalDetails = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const navigate = useNavigate();
  const { animals, weights, journals, expenses, setCurrentAnimal } = useAppContext();
  
  const [animal, setAnimal] = useState(animals.find(a => a.id === animalId));
  const [targetWeight, setTargetWeight] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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
  
  const handleAddWeight = () => {
    navigate(`/animal/${animalId}/add-weight`);
  };
  
  const handleAddJournalEntry = () => {
    navigate(`/animal/${animalId}/add-journal`);
  };
  
  const handleAddExpense = () => {
    navigate(`/animal/${animalId}/add-expense`);
  };
  
  const handleEditAnimal = () => {
    navigate(`/animal/${animalId}/edit`);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6 flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Animals</span>
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-4">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
              <img 
                src={animal.imageUrl || animal.image || '/placeholder.svg'} 
                alt={animal.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{animal.name}</h1>
                <Badge>
                  {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditAnimal}
                  className="h-8 w-8"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-muted-foreground">{animal.breed}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{calculateAge(animal.birthdate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{animal.gender === 'male' ? 'Male' : 'Female'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tag/ID</p>
                  <p className="font-medium">{animal.tagNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchased</p>
                  <p className="font-medium">{animal.purchaseDate ? new Date(animal.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {animal.notes && (
            <div className="mt-4 p-4 bg-muted/20 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <p>{animal.notes}</p>
            </div>
          )}
        </div>
        
        <Card className="w-full md:w-auto md:min-w-[280px]">
          <CardHeader className="pb-3">
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Track important dates</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter className="flex justify-between pt-3">
            <Button variant="outline" size="sm">View Schedule</Button>
            <Button size="sm">Add Event</Button>
          </CardFooter>
        </Card>
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
        
        <TabsContent value="overview" className="pt-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeightChart 
              weights={weights} 
              animalId={animal.id}
              targetWeight={targetWeight}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
                <CardDescription>Your latest observations</CardDescription>
              </CardHeader>
              <CardContent>
                {animalJournals.length > 0 ? (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto">
                    {animalJournals.slice(0, 2).map(journal => (
                      <div key={journal.id} className="p-3 border rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            {new Date(journal.date).toLocaleDateString()}
                          </span>
                          {journal.mood && (
                            <span title={`Mood: ${journal.mood}`}>
                              {journal.mood === 'positive' ? '😊' : 
                               journal.mood === 'neutral' ? '😐' : '😟'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm line-clamp-3">{journal.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No journal entries yet.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleAddJournalEntry}
                >
                  Add Journal Entry
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BodyCompositionCard animal={animal} />
            <ShowTipsCard animal={animal} />
          </div>
        </TabsContent>
        
        <TabsContent value="weights" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Weight History</h2>
            <Button onClick={handleAddWeight}>Add Weight</Button>
          </div>
          
          <WeightChart 
            weights={weights} 
            animalId={animal.id}
            targetWeight={targetWeight}
            showFullHistory={true}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Weight Log</CardTitle>
              <CardDescription>Detailed weight records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {weights
                  .filter(entry => entry.animalId === animal.id)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(entry => (
                    <div 
                      key={entry.id} 
                      className="flex justify-between py-3 border-b"
                    >
                      <div>
                        <div className="font-medium">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        {entry.notes && (
                          <div className="text-sm text-muted-foreground">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                      <div className="font-bold">{entry.weight} lbs</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="journal" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Journal Entries</h2>
            <Button onClick={handleAddJournalEntry}>Add Entry</Button>
          </div>
          
          <div className="space-y-6">
            {animalJournals.length > 0 ? (
              animalJournals.map(entry => (
                <JournalEntry key={entry.id} entry={entry} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No journal entries yet. Start tracking your observations.
                  </p>
                  <Button onClick={handleAddJournalEntry}>Create First Entry</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Expenses</h2>
            <Button onClick={handleAddExpense}>Add Expense</Button>
          </div>
          
          <ExpensesTable expenses={expenses} animalId={animal.id} />
        </TabsContent>
        
        <TabsContent value="composition" className="pt-6 space-y-6">
          <h2 className="text-2xl font-bold">Body Composition Analysis</h2>
          <BodyCompositionCard animal={animal} />
        </TabsContent>
        
        <TabsContent value="showmanship" className="pt-6 space-y-6">
          <h2 className="text-2xl font-bold">Showmanship Resources</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <ShowTipsCard animal={animal} />
            <JudgeAnalysisCard animal={animal} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnimalDetails;
