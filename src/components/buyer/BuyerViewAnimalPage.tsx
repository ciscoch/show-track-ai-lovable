
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BuyerLayout from "@/components/buyer/BuyerLayout";
import WeightChart from "@/components/WeightChart";

const BuyerViewAnimalPage = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  // Mock animal data based on ID
  const animalData = {
    id: animalId || "1",
    name: animalId === "2" ? "Champion" : animalId === "3" ? "Star" : "Blue Ribbon",
    species: animalId === "2" ? "Goat" : animalId === "3" ? "Pig" : "Cattle",
    breed: animalId === "2" ? "Boer" : animalId === "3" ? "Hampshire" : "Angus",
    birthdate: "2023-11-15",
    weight: animalId === "2" ? 95 : animalId === "3" ? 220 : 1250,
    owner: "John Smith",
    gender: "Male",
    description: "Show animal with excellent confirmation and muscling.",
    showPreparationStatus: "On track"
  };
  
  // Mock weight data
  const mockWeights = [
    {
      id: "w1",
      animalId: animalId || "1",
      date: "2025-04-01",
      weight: animalId === "2" ? 85 : animalId === "3" ? 190 : 1180
    },
    {
      id: "w2",
      animalId: animalId || "1",
      date: "2025-04-15",
      weight: animalId === "2" ? 88 : animalId === "3" ? 200 : 1200
    },
    {
      id: "w3",
      animalId: animalId || "1",
      date: "2025-05-01",
      weight: animalId === "2" ? 92 : animalId === "3" ? 210 : 1230
    },
    {
      id: "w4",
      animalId: animalId || "1",
      date: "2025-05-15",
      weight: animalId === "2" ? 95 : animalId === "3" ? 220 : 1250
    }
  ];
  
  // Mock journal entries
  const mockJournalEntries = [
    {
      id: "j1",
      title: "Feed adjustment",
      content: "Increased protein content in feed to promote muscle development.",
      date: "2025-05-14",
      tags: ["Feed", "Nutrition"]
    },
    {
      id: "j2",
      title: "Training session",
      content: "Spent 45 minutes on halter training and showmanship practice.",
      date: "2025-05-10",
      tags: ["Training", "Behavior"]
    },
    {
      id: "j3",
      title: "Health check",
      content: "Veterinarian visit - all looks good. Vaccines updated.",
      date: "2025-05-05",
      tags: ["Health", "Veterinary"]
    }
  ];
  
  return (
    <BuyerLayout title={animalData.name}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{animalData.name}</CardTitle>
                <CardDescription>{animalData.breed} {animalData.species}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt={animalData.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Weight:</span>
                    <span className="font-medium">{animalData.weight} lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Birth Date:</span>
                    <span className="font-medium">{animalData.birthdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium">{animalData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{animalData.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-600">{animalData.showPreparationStatus}</span>
                  </div>
                </div>
                
                <p className="text-sm">{animalData.description}</p>
              </CardContent>
            </Card>
            
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weight">Weight History</TabsTrigger>
                <TabsTrigger value="journal">Journal Entries</TabsTrigger>
                <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weight" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Progress</CardTitle>
                    <CardDescription>
                      Track {animalData.name}'s weight gain over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <WeightChart 
                        weights={mockWeights} 
                        animalId={animalId || "1"}
                        height={300}
                      />
                    </div>
                    
                    <div className="space-y-2 mt-6">
                      <h4 className="font-medium">Weight Log</h4>
                      <div className="space-y-2">
                        {mockWeights.map((entry) => (
                          <div 
                            key={entry.id} 
                            className="flex justify-between py-2 border-b last:border-b-0"
                          >
                            <span>{entry.date}</span>
                            <span className="font-medium">{entry.weight} lbs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="journal" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Journal Entries</CardTitle>
                    <CardDescription>
                      Recent journal entries for {animalData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockJournalEntries.map((entry) => (
                        <div key={entry.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{entry.title}</h3>
                            <span className="text-sm text-muted-foreground">{entry.date}</span>
                          </div>
                          <p className="my-2">{entry.content}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                    <CardDescription>
                      Photos of {animalData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div 
                          key={index} 
                          className="aspect-square relative rounded-md overflow-hidden border"
                        >
                          <img 
                            src="/placeholder.svg" 
                            alt={`${animalData.name} - photo ${index}`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default BuyerViewAnimalPage;
