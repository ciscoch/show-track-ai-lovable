
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Animal } from '../AppContextTypes';

export const useAnimalOperations = (
  user: any,
  setAnimals: React.Dispatch<React.SetStateAction<Animal[]>>
) => {
  const addAnimal = useCallback(async (animalData: Omit<Animal, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('animals')
      .insert({
        ...animalData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const transformedAnimal: Animal = {
        ...data,
        gender: (data.gender as "male" | "female") || undefined,
        purpose: (data.purpose as "breeding" | "show" | "market" | "pet" | "other") || undefined,
        animalId: data.id,
        birthdate: data.birth_date,
        penNumber: data.pen_number,
        imageUrl: data.image
      };
      setAnimals(prev => [transformedAnimal, ...prev]);
    }
  }, [user, setAnimals]);

  const updateAnimal = useCallback(async (id: string, updates: Partial<Animal>) => {
    const { data, error } = await supabase
      .from('animals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const transformedAnimal: Animal = {
        ...data,
        gender: (data.gender as "male" | "female") || undefined,
        purpose: (data.purpose as "breeding" | "show" | "market" | "pet" | "other") || undefined,
        animalId: data.id,
        birthdate: data.birth_date,
        penNumber: data.pen_number,
        imageUrl: data.image
      };
      setAnimals(prev => prev.map(animal => animal.id === id ? transformedAnimal : animal));
    }
  }, [setAnimals]);

  const deleteAnimal = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setAnimals(prev => prev.filter(animal => animal.id !== id));
  }, [setAnimals]);

  return {
    addAnimal,
    updateAnimal,
    deleteAnimal
  };
};
