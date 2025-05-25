
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";

const AddAnimal = () => {
  const navigate = useNavigate();
  const { addAnimal } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    gender: '' as 'male' | 'female' | '',
    birth_date: '',
    purpose: '' as 'breeding' | 'show' | 'market' | 'pet' | 'other' | '',
    pen_number: '',
    notes: '',
    breeder_name: '',
    weight: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.gender) {
        toast({
          title: "Error",
          description: "Please select a gender",
          variant: "destructive",
        });
        return;
      }

      if (!formData.purpose) {
        toast({
          title: "Error",
          description: "Please select a purpose",
          variant: "destructive",
        });
        return;
      }

      await addAnimal({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        gender: formData.gender as 'male' | 'female',
        birth_date: formData.birth_date,
        purpose: formData.purpose as 'breeding' | 'show' | 'market' | 'pet' | 'other',
        pen_number: formData.pen_number,
        notes: formData.notes,
        breeder_name: formData.breeder_name,
        weight: formData.weight,
        user_id: '', // This will be set by the context
      });

      toast({
        title: "Success",
        description: "Animal added successfully",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding animal:', error);
      toast({
        title: "Error",
        description: "Failed to add animal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <MainLayout title="Add New Animal">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Animal Information</CardTitle>
          <CardDescription>
            Add a new animal to your tracking system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter animal name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="species">Species *</Label>
                <Input
                  id="species"
                  value={formData.species}
                  onChange={(e) => handleInputChange('species', e.target.value)}
                  placeholder="e.g., Cattle, Pig, Sheep"
                  required
                />
              </div>

              <div>
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  placeholder="Enter breed"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="birth_date">Birth Date</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange('birth_date', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose *</Label>
                <Select value={formData.purpose} onValueChange={(value: 'breeding' | 'show' | 'market' | 'pet' | 'other') => handleInputChange('purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breeding">Breeding</SelectItem>
                    <SelectItem value="show">Show</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="pet">Pet</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pen_number">Pen Number</Label>
                <Input
                  id="pen_number"
                  value={formData.pen_number}
                  onChange={(e) => handleInputChange('pen_number', e.target.value)}
                  placeholder="Enter pen number"
                />
              </div>

              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  placeholder="Enter weight"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="breeder_name">Breeder Name</Label>
                <Input
                  id="breeder_name"
                  value={formData.breeder_name}
                  onChange={(e) => handleInputChange('breeder_name', e.target.value)}
                  placeholder="Enter breeder name"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter any additional notes"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Animal'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AddAnimal;
