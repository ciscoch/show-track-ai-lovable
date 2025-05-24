
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, FeedingTime } from '../AppContextTypes';

export const useDataLoader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = useCallback(async (
    user: User | null,
    setUserProfile: (profile: any) => void,
    setAnimals: (animals: Animal[]) => void,
    setWeightEntries: (entries: WeightEntry[]) => void,
    setJournalEntries: (entries: JournalEntry[]) => void,
    setExpenses: (expenses: Expense[]) => void,
    setFeedingSchedules: (schedules: FeedingSchedule[]) => void
  ) => {
    if (!user) {
      setUserProfile(null);
      setAnimals([]);
      setWeightEntries([]);
      setJournalEntries([]);
      setExpenses([]);
      setFeedingSchedules([]);
      setLoading(false);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Load user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }
      
      setUserProfile(profile);

      // Load animals
      const { data: animalsData, error: animalsError } = await supabase
        .from('animals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (animalsError) throw animalsError;
      setAnimals(animalsData || []);

      // Load weight entries
      const { data: weightData, error: weightError } = await supabase
        .from('weight_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (weightError) throw weightError;
      setWeightEntries(weightData || []);

      // Load journal entries
      const { data: journalData, error: journalError } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (journalError) throw journalError;
      setJournalEntries(journalData || []);

      // Load expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (expensesError) throw expensesError;
      setExpenses(expensesData || []);

      // Load feeding schedules with proper type casting
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('feeding_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (schedulesError) throw schedulesError;
      
      // Transform feeding_times from JSONB to proper type
      const transformedSchedules: FeedingSchedule[] = (schedulesData || []).map(schedule => ({
        ...schedule,
        feeding_times: Array.isArray(schedule.feeding_times) ? schedule.feeding_times as unknown as FeedingTime[] : []
      }));
      
      setFeedingSchedules(transformedSchedules);

    } catch (error: any) {
      console.error('Error loading user data:', error);
      setError(error.message || 'Failed to load data');
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
