
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import AnimalFormFields from "@/components/animal-form/AnimalFormFields";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useOrganizations } from "@/hooks/useOrganizations";
import { useBreeders } from "@/hooks/useBreeders";

const EditAnimal = () => {
  const { animalId } = useParams();
  const { user, animals, updateAnimal } = useSupabaseApp();
  const { organizations } = useOrganizations();
  const { breeders } = useBreeders();

  // Find the animal to edit
  const animal = animals.find(a => a.id === animalId);

  // Form state
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<"cattle" | "goat" | "sheep" | "pig">("cattle");
  const [breed, setBreed] = useState("");
  const [breederName, setBreederName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tagNumber, setTagNumber] = useState("");
  const [penNumber, setPenNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [weight, setWeight] = useState(0);
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize form with animal data
  useEffect(() => {
    if (animal) {
      setName(animal.name || "");
      setSpecies((animal.species as "cattle" | "goat" | "sheep" | "pig") || "cattle");
      setBreed(animal.breed || "");
      setBreederName(animal.breeder_name || "");
      setBirthdate(animal.birth_date || "");
      setPurchaseDate(animal.purchaseDate || "");
      setGender((animal.gender as "male" | "female") || "male");
      setTagNumber(animal.tagNumber || "");
      setPenNumber(animal.pen_number || "");
      setNotes(animal.notes || "");
      setPhoto(animal.image || null);
      setWeight(animal.weight || 0);
      setOrganizationId(typeof animal.organization === 'string' ? animal.organization : "");
    }
  }, [animal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalId) return;

    setLoading(true);
    try {
      await updateAnimal(animalId, {
        name,
        species,
        breed,
        breeder_name: breederName,
        birth_date: birthdate,
        purchaseDate,
        gender,
        tagNumber,
        pen_number: penNumber,
        notes,
        image: photo,
        weight,
        organization: organizationId
      });

      toast({
        title: "Success",
        description: "Animal updated successfully",
      });
    } catch (error) {
      console.error("Error updating animal:", error);
      toast({
        title: "Error",
        description: "Failed to update animal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const transformedUser = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : null;

  if (!animal) {
    return (
      <MainLayout title="Edit Animal" user={transformedUser}>
        <div>Animal not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Edit Animal" user={transformedUser}>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Animal"}
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default EditAnimal;
