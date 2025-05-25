
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule } from '../AppContextTypes';

export const useDataLoader = () => {
  const loading = false;
  const error = null;
  const setError = (err: string | null) => console.log('Error:', err);

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

    try {
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profile) setUserProfile(profile);

      // Load animals
      const { data: animalsData } = await supabase
        .from('animals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (animalsData) {
        // Transform database fields to match context types
        const transformedAnimals = animalsData.map(animal => ({
          ...animal,
          birth_date: animal.birth_date,
          pen_number: animal.pen_number,
          user_id: animal.user_id,
          created_at: animal.created_at,
          updated_at: animal.updated_at,
          breeder_name: animal.breeder_name,
          photo_url: animal.image
        }));
        setAnimals(transformedAnimals);
      }

      // Load weight entries
      const { data: weightData } = await supabase
        .from('weight_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (weightData) {
        const transformedWeights = weightData.map(entry => ({
          ...entry,
          animal_id: entry.animal_id,
          created_at: entry.created_at
        }));
        setWeightEntries(transformedWeights);
      }

      // Load journal entries
      const { data: journalData } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (journalData) {
        const transformedJournals = journalData.map(entry => ({
          ...entry,
          animal_id: entry.animal_id,
          tags: Array.isArray(entry.tags) ? entry.tags.join(',') : entry.tags || '',
          created_at: entry.created_at
        }));
        setJournalEntries(transformedJournals);
      }

      // Load expenses
      const { data: expenseData } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (expenseData) {
        const transformedExpenses = expenseData.map(expense => ({
          ...expense,
          animal_id: expense.animal_id,
          tax_deductible: expense.tax_deductible,
          created_at: expense.created_at
        }));
        setExpenses(transformedExpenses);
      }

      // Load feeding schedules
      const { data: feedingData } = await supabase
        .from('feeding_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (feedingData) {
        const transformedFeeding = feedingData.map(schedule => ({
          ...schedule,
          animal_id: schedule.animal_id,
          feeding_times: schedule.feeding_times as any,
          reminder_enabled: schedule.reminder_enabled,
          reminder_minutes_before: schedule.reminder_minutes_before,
          created_at: schedule.created_at
        }));
        setFeedingSchedules(transformedFeeding);
      }

    } catch (error: any) {
      console.error('Error loading user data:', error);
      setError(error.message);
    }
  }, []);

  return {
    loading,
    error,
    setError,
    loadUserData
  };
};
