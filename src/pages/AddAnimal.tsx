
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";

const AddAnimal = () => {
  const navigate = useNavigate();
  const { addAnimal } = useAppContext();
  
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<"cattle" | "goat" | "sheep" | "pig">("goat");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState(""); // Changed from birthDate to match Animal interface
  const [purchaseDate, setPurchaseDate] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tagNumber, setTagNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState<number>(0); // Added weight field
  const [organizationId, setOrganizationId] = useState("");
  const { organizations } = useOrganizations();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new animal object
    const newAnimal = {
      id: generateId(),
      name,
      species,
      breed,
      birthdate, // Changed from birthDate to match Animal interface
      purchaseDate: purchaseDate || undefined,
      gender,
      tagNumber: tagNumber || undefined,
      showAnimal: true, // Default value for showAnimal
      purpose: "show" as const, // Default value for purpose
      description: notes || "", // Use notes as description
      weight: weight || 0, // Added weight field
      organization: organizationId
        ? organizations.find((o) => o.id === organizationId)
        : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes || undefined
    };
    
    // Add to context
    addAnimal(newAnimal);
    
    // Navigate back to animal list
    navigate('/dashboard');
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  // Helper function to get breeds based on selected species
  const getBreedOptions = () => {
    switch (species) {
      case 'cattle':
        return ['Angus', 'Hereford', 'Shorthorn', 'Simmental', 'Charolais', 'Limousin', 'Maine-Anjou', 'Brahman', 'Other'];
      case 'goat':
        return ['Boer', 'Kiko', 'Spanish', 'Myotonic', 'Nubian', 'Alpine', 'LaMancha', 'Other'];
      case 'sheep':
        return ['Suffolk', 'Hampshire', 'Dorset', 'Southdown', 'Shropshire', 'Oxford', 'Dorper', 'Katahdin', 'Other'];
      case 'pig':
        return ['Yorkshire', 'Duroc', 'Hampshire', 'Berkshire', 'Spotted', 'Chester White', 'Poland China', 'Landrace', 'Other'];
      default:
        return ['Other'];
    }
  };
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6 flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Animals</span>
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Animal</CardTitle>
          <CardDescription>
            Register a new livestock show animal to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Animal Name*</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="species">Species*</Label>
                  <Select 
                    value={species} 
                    onValueChange={(value) => setSpecies(value as any)}
                  >
                    <SelectTrigger id="species">
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cattle">Cattle</SelectItem>
                      <SelectItem value="goat">Goat</SelectItem>
                      <SelectItem value="sheep">Sheep</SelectItem>
                      <SelectItem value="pig">Pig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="breed">Breed*</Label>
                  <Select 
                    value={breed} 
                    onValueChange={setBreed}
                  >
                    <SelectTrigger id="breed">
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent>
                      {getBreedOptions().map((breedOption) => (
                        <SelectItem key={breedOption} value={breedOption}>
                          {breedOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <p className="text-sm text-muted-foreground mb-1">
                  Type the first letter to quickly navigate the list
                </p>
                <Select
                  value={organizationId}
                  onValueChange={setOrganizationId}
                >
                  <SelectTrigger id="organization">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthdate">Birth Date*</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="gender">Gender*</Label>
                  <Select 
                    value={gender} 
                    onValueChange={(value) => setGender(value as any)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tagNumber">Tag/ID Number</Label>
                  <Input
                    id="tagNumber"
                    value={tagNumber}
                    onChange={(e) => setTagNumber(e.target.value)}
                    placeholder="Enter tag #"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight (lbs)*</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight.toString()}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="Enter weight"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes about this animal"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button type="submit">Add Animal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddAnimal;
