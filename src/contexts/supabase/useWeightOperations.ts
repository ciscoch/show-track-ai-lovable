
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WeightEntry } from '../AppContextTypes';

export const useWeightOperations = (
  user: any,
  setWeightEntries: React.Dispatch<React.SetStateAction<WeightEntry[]>>,
  setError: (error: string | null) => void
) => {
  const addWeightEntry = useCallback(async (entryData: Omit<WeightEntry, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('weight_entries')
        .insert({
          ...entryData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setWeightEntries(prev => [data, ...prev]);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [user, setWeightEntries, setError]);

  const updateWeightEntry = useCallback(async (id: string, updates: Partial<WeightEntry>) => {
    try {
      const { data, error } = await supabase
        .from('weight_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setWeightEntries(prev => prev.map(entry => entry.id === id ? data : entry));
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [setWeightEntries, setError]);

  const deleteWeightEntry = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('weight_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setWeightEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [setWeightEntries, setError]);

  return {
    addWeightEntry,
    updateWeightEntry,
    deleteWeightEntry
  };
};
