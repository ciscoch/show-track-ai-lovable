
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUploadButton from "@/components/ImageUploadButton";
import { readFileAsDataURL } from "@/platform/file";
import { Animal } from "@/types/models";
import { Organization } from "@/types/models";

interface AnimalFormFieldsProps {
  name: string;
  setName: (name: string) => void;
  species: "cattle" | "goat" | "sheep" | "pig";
  setSpecies: (species: "cattle" | "goat" | "sheep" | "pig") => void;
  breed: string;
  setBreed: (breed: string) => void;
  breederName: string;
  setBreederName: (breederName: string) => void;
  birthdate: string;
  setBirthdate: (birthdate: string) => void;
  purchaseDate: string;
  setPurchaseDate: (purchaseDate: string) => void;
  gender: "male" | "female";
  setGender: (gender: "male" | "female") => void;
  tagNumber: string;
  setTagNumber: (tagNumber: string) => void;
  penNumber: string;
  setPenNumber: (penNumber: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  photo: string | null;
  setPhoto: (photo: string | null) => void;
  weight: number;
  setWeight: (weight: number) => void;
  organizationId: string;
  setOrganizationId: (organizationId: string) => void;
  organizations: Organization[];
  breeders: { id: string; name: string }[];
}

const AnimalFormFields = ({
  name, setName,
  species, setSpecies,
  breed, setBreed,
  breederName, setBreederName,
  birthdate, setBirthdate,
  purchaseDate, setPurchaseDate,
  gender, setGender,
  tagNumber, setTagNumber,
  penNumber, setPenNumber,
  notes, setNotes,
  photo, setPhoto,
  weight, setWeight,
  organizationId, setOrganizationId,
  organizations,
  breeders
}: AnimalFormFieldsProps) => {
  
  const handleImageSelected = async (file: File) => {
    const dataUrl = await readFileAsDataURL(file);
    setPhoto(dataUrl);
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-md overflow-hidden border flex items-center justify-center bg-muted">
            {photo ? (
              <img src={photo} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-xs text-muted-foreground">No photo</span>
            )}
          </div>
          <ImageUploadButton onImageSelected={handleImageSelected} />
        </div>
        
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
              onValueChange={(value: "cattle" | "goat" | "sheep" | "pig") => setSpecies(value)}
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
          <div>
            <Label htmlFor="breederName">Breeder</Label>
            <Input
              id="breederName"
              list="breeder-options"
              value={breederName}
              onChange={(e) => setBreederName(e.target.value)}
              placeholder="Enter breeder name"
            />
            <datalist id="breeder-options">
              {breeders.map((b) => (
                <option key={b.id} value={b.name} />
              ))}
            </datalist>
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="gender">Gender*</Label>
            <Select 
              value={gender} 
              onValueChange={(value: "male" | "female") => setGender(value)}
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

          <div>
            <Label htmlFor="penNumber">Pen #</Label>
            <Input
              id="penNumber"
              value={penNumber}
              onChange={(e) => setPenNumber(e.target.value)}
              placeholder="Enter pen #"
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
    </div>
  );
};

export default AnimalFormFields;
