
import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, FeedingTime } from '../AppContextTypes';

export const useDataLoader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async (
    user: any,
    setUserProfile: (profile: any) => void,
    setAnimals: (animals: Animal[]) => void,
    setWeightEntries: (entries: WeightEntry[]) => void,
    setJournalEntries: (entries: JournalEntry[]) => void,
    setExpenses: (expenses: Expense[]) => void,
    setFeedingSchedules: (schedules: FeedingSchedule[]) => void
  ) => {
    if (!user) {
      setAnimals([]);
      setWeightEntries([]);
      setJournalEntries([]);
      setExpenses([]);
      setFeedingSchedules([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profile) {
        setUserProfile(profile);
      }

      // Load animals
      const { data: animals, error: animalsError } = await supabase
        .from('animals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (animalsError) throw animalsError;
      
      if (animals) {
        const transformedAnimals: Animal[] = animals.map(animal => ({
          ...animal,
          gender: (animal.gender as "male" | "female") || undefined,
          purpose: (animal.purpose as "breeding" | "show" | "market" | "pet" | "other") || undefined,
          animalId: animal.id,
          birthdate: animal.birth_date,
          penNumber: animal.pen_number,
          imageUrl: animal.image
        }));
        setAnimals(transformedAnimals);
      }

      // Load weight entries
      const { data: weightEntries, error: weightError } = await supabase
        .from('weight_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (weightError) throw weightError;
      if (weightEntries) {
        setWeightEntries(weightEntries);
      }

      // Load journal entries
      const { data: journalEntries, error: journalError } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (journalError) throw journalError;
      if (journalEntries) {
        const processedEntries = journalEntries.map(entry => ({
          ...entry,
          tags: Array.isArray(entry.tags) ? entry.tags.join(',') : entry.tags
        }));
        setJournalEntries(processedEntries);
      }

      // Load expenses
      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (expensesError) throw expensesError;
      if (expenses) {
        setExpenses(expenses);
      }

      // Load feeding schedules
      const { data: feedingSchedules, error: feedingError } = await supabase
        .from('feeding_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (feedingError) throw feedingError;
      if (feedingSchedules) {
        const transformedSchedules: FeedingSchedule[] = feedingSchedules.map(schedule => ({
          ...schedule,
          feeding_times: Array.isArray(schedule.feeding_times) ? schedule.feeding_times as FeedingTime[] : []
        }));
        setFeedingSchedules(transformedSchedules);
      }

    } catch (err: any) {
      setError(err.message);
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    setError,
    loadUserData
  };
};
