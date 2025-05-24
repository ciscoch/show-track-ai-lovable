
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useSupabaseApp } from '@/contexts/SupabaseAppContext';
import { useToast } from '@/hooks/use-toast';

const AddAnimal = () => {
  const navigate = useNavigate();
  const { addAnimal } = useSupabaseApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    breeder_name: '',
    gender: '',
    birth_date: '',
    weight: '',
    description: '',
    purpose: '',
    pen_number: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Animal name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await addAnimal({
        name: formData.name,
        species: formData.species,
        breed: formData.breed || undefined,
        breeder_name: formData.breeder_name || undefined,
        gender: formData.gender || undefined,
        birth_date: formData.birth_date || undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        description: formData.description || undefined,
        purpose: formData.purpose || undefined,
        pen_number: formData.pen_number || undefined,
        show_animal: true
      });

      toast({
        title: "Success",
        description: "Animal added successfully!",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add animal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Add New Animal</h1>
          <p className="text-gray-600 mt-2">Enter your animal's information to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Animal Information</CardTitle>
            <CardDescription>
              Fill in the details about your show animal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Animal Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter animal name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="species">Species</Label>
                  <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cattle">Cattle</SelectItem>
                      <SelectItem value="pig">Pig</SelectItem>
                      <SelectItem value="sheep">Sheep</SelectItem>
                      <SelectItem value="goat">Goat</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
                  <Label htmlFor="weight">Current Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <Label htmlFor="breeder_name">Breeder Name</Label>
                  <Input
                    id="breeder_name"
                    value={formData.breeder_name}
                    onChange={(e) => handleInputChange('breeder_name', e.target.value)}
                    placeholder="Enter breeder name"
                  />
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
              </div>

              <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="show">Show</SelectItem>
                    <SelectItem value="breeding">Breeding</SelectItem>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description or notes about this animal"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Adding..." : "Add Animal"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddAnimal;
