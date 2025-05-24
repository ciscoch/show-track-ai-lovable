
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";
import { useBreeders } from "@/hooks/useBreeders";
import AnimalFormFields from "@/components/animal-form/AnimalFormFields";

const AddAnimal = () => {
  const navigate = useNavigate();
  const { animalId } = useParams<{ animalId: string }>();
  const { animals, addAnimal, updateAnimal } = useAppContext();
  const isEditing = !!animalId;
  
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<"cattle" | "goat" | "sheep" | "pig">("goat");
  const [breed, setBreed] = useState("");
  const [breederName, setBreederName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tagNumber, setTagNumber] = useState("");
  const [penNumber, setPenNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [organizationId, setOrganizationId] = useState("");
  const { organizations } = useOrganizations();
  const { breeders, addBreeder } = useBreeders();
  
  // Load existing animal data if editing
  useEffect(() => {
    if (isEditing) {
      const existingAnimal = animals.find(a => a.id === animalId);
      if (existingAnimal) {
        setName(existingAnimal.name);
        setSpecies(existingAnimal.species as "cattle" | "goat" | "sheep" | "pig");
        setBreed(existingAnimal.breed);
        setBreederName(existingAnimal.breederName || "");
        setBirthdate(existingAnimal.birthdate);
        setPurchaseDate(existingAnimal.purchaseDate || "");
        setGender(existingAnimal.gender);
        setTagNumber(existingAnimal.tagNumber || "");
        setPenNumber(existingAnimal.penNumber || "");
        setNotes(existingAnimal.notes || "");
        setPhoto(existingAnimal.imageUrl || null);
        setWeight(existingAnimal.weight || 0);
        setOrganizationId(existingAnimal.organization?.id || "");
      } else {
        // If animal not found, redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [animalId, animals, isEditing, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save breeder name for future use if provided
    if (breederName) {
      addBreeder(breederName);
    }

    const animalData = {
      name,
      species,
      breed,
      breederName: breederName || undefined,
      birthdate,
      purchaseDate: purchaseDate || undefined,
      gender,
      tagNumber: tagNumber || undefined,
      penNumber: penNumber || undefined,
      showAnimal: true,
      purpose: "show" as const,
      description: notes || "",
      weight: weight || 0,
      imageUrl: photo || undefined,
      organization: organizationId
        ? organizations.find((o) => o.id === organizationId)
        : undefined,
      notes: notes || undefined
    };
    
    if (isEditing) {
      // Update existing animal
      updateAnimal({
        ...animalData,
        id: animalId!,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new animal
      addAnimal({
        ...animalData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    // Navigate back to animal details or dashboard
    navigate(isEditing ? `/animal/${animalId}` : '/dashboard');
  };
  
  const handleBack = () => {
    navigate(isEditing ? `/animal/${animalId}` : '/dashboard');
  };
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6 flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back {isEditing ? `to ${name}` : 'to Animals'}</span>
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Animal' : 'Add New Animal'}</CardTitle>
          <CardDescription>
            {isEditing ? 'Update information for this animal' : 'Register a new livestock show animal to your account'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <AnimalFormFields
              name={name}
              setName={setName}
              species={species}
              setSpecies={setSpecies}
              breed={breed}
              setBreed={setBreed}
              breederName={breederName}
              setBreederName={setBreederName}
              birthdate={birthdate}
              setBirthdate={setBirthdate}
              purchaseDate={purchaseDate}
              setPurchaseDate={setPurchaseDate}
              gender={gender}
              setGender={setGender}
              tagNumber={tagNumber}
              setTagNumber={setTagNumber}
              penNumber={penNumber}
              setPenNumber={setPenNumber}
              notes={notes}
              setNotes={setNotes}
              photo={photo}
              setPhoto={setPhoto}
              weight={weight}
              setWeight={setWeight}
              organizationId={organizationId}
              setOrganizationId={setOrganizationId}
              organizations={organizations}
              breeders={breeders}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add Animal'}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddAnimal;
