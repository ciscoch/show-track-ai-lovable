import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { SupabaseAppContextType, Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, UserSubscription, FeedingTime } from './AppContextTypes';

const SupabaseAppContext = createContext<SupabaseAppContextType | undefined>(undefined);

export const useSupabaseApp = () => {
  const context = useContext(SupabaseAppContext);
  if (context === undefined) {
    throw new Error('useSupabaseApp must be used within a SupabaseAppProvider');
  }
  return context;
};

export const SupabaseAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userSubscription: UserSubscription = {
    level: userProfile?.subscription_level || 'free',
    endDate: userProfile?.subscription_end_date,
    isActive: true
  };

  // Load user data when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      // Clear data when user logs out
      setUserProfile(null);
      setAnimals([]);
      setWeightEntries([]);
      setJournalEntries([]);
      setExpenses([]);
      setFeedingSchedules([]);
      setLoading(false);
      setError(null);
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
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
        feeding_times: Array.isArray(schedule.feeding_times) ? schedule.feeding_times as FeedingTime[] : []
      }));
      
      setFeedingSchedules(transformedSchedules);

    } catch (error: any) {
      console.error('Error loading user data:', error);
      setError(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Animal operations
  const addAnimal = async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
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
      setAnimals(prev => [data, ...prev]);
    }
  };

  const updateAnimal = async (id: string, updates: Partial<Animal>) => {
    const { data, error } = await supabase
      .from('animals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setAnimals(prev => prev.map(animal => animal.id === id ? data : animal));
    }
  };

  const deleteAnimal = async (id: string) => {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setAnimals(prev => prev.filter(animal => animal.id !== id));
  };

  // Weight entry operations
  const addWeightEntry = async (entryData: Omit<WeightEntry, 'id'>) => {
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
  };

  const updateWeightEntry = async (id: string, updates: Partial<WeightEntry>) => {
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
  };

  const deleteWeightEntry = async (id: string) => {
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
  };

  // Journal entry operations
  const addJournalEntry = async (entryData: Omit<JournalEntry, 'id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          ...entryData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setJournalEntries(prev => [data, ...prev]);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const updateJournalEntry = async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setJournalEntries(prev => prev.map(entry => entry.id === id ? data : entry));
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const deleteJournalEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJournalEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Expense operations
  const addExpense = async (expenseData: Omit<Expense, 'id'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        ...expenseData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setExpenses(prev => [data, ...prev]);
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setExpenses(prev => prev.map(expense => expense.id === id ? data : expense));
    }
  };

  const deleteExpense = async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Feeding schedule operations
  const addFeedingSchedule = async (scheduleData: Omit<FeedingSchedule, 'id'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('feeding_schedules')
      .insert({
        user_id: user.id,
        animal_id: scheduleData.animal_id,
        name: scheduleData.name,
        feeding_times: scheduleData.feeding_times as any,
        reminder_enabled: scheduleData.reminder_enabled,
        reminder_minutes_before: scheduleData.reminder_minutes_before
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setFeedingSchedules(prev => [data, ...prev]);
    }
  };

  const updateFeedingSchedule = async (id: string, updates: Partial<FeedingSchedule>) => {
    const updateData: any = { ...updates };
    if (updates.feeding_times) {
      updateData.feeding_times = updates.feeding_times as any;
    }

    const { data, error } = await supabase
      .from('feeding_schedules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setFeedingSchedules(prev => prev.map(schedule => schedule.id === id ? data : schedule));
    }
  };

  const deleteFeedingSchedule = async (id: string) => {
    const { error } = await supabase
      .from('feeding_schedules')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setFeedingSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const setUser = (newUser: User | null) => {
    // This function is kept for compatibility but auth is handled by AuthContext
  };

  const value: SupabaseAppContextType = {
    user,
    userProfile,
    userSubscription,
    animals,
    weightEntries,
    journalEntries,
    expenses,
    feedingSchedules,
    loading,
    error,
    setUser,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    addWeightEntry,
    updateWeightEntry,
    deleteWeightEntry,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    addExpense,
    updateExpense,
    deleteExpense,
    addFeedingSchedule,
    updateFeedingSchedule,
    deleteFeedingSchedule,
  };

  return (
    <SupabaseAppContext.Provider value={value}>
      {children}
    </SupabaseAppContext.Provider>
  );
};
