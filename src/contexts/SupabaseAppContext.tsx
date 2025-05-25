
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from './AuthContext';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, UserSubscription } from './AppContextTypes';
import { SupabaseAppContextType } from './supabase/types';
import { useDataLoader } from './supabase/useDataLoader';
import { useAnimalOperations } from './supabase/useAnimalOperations';
import { useWeightOperations } from './supabase/useWeightOperations';
import { useJournalOperations } from './supabase/useJournalOperations';
import { useExpenseOperations } from './supabase/useExpenseOperations';
import { useFeedingOperations } from './supabase/useFeedingOperations';

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

  const userSubscription: UserSubscription = {
    level: userProfile?.subscription_level || 'pro',
    isActive: true
  };

  // Use custom hooks for operations
  const { loading, error, setError, loadUserData } = useDataLoader();
  
  const animalOps = useAnimalOperations(user, setAnimals);
  const weightOps = useWeightOperations(user, setWeightEntries, setError);
  const journalOps = useJournalOperations(user, setJournalEntries, setError);
  const expenseOps = useExpenseOperations(user, setExpenses);
  const feedingOps = useFeedingOperations(user, setFeedingSchedules);

  // Load user data when user changes
  useEffect(() => {
    loadUserData(
      user,
      setUserProfile,
      setAnimals,
      setWeightEntries,
      setJournalEntries,
      setExpenses,
      setFeedingSchedules
    );
  }, [user, loadUserData]);

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
    ...animalOps,
    ...weightOps,
    ...journalOps,
    // Map expense operations to match interface
    addExpenseEntry: expenseOps.addExpense,
    updateExpenseEntry: expenseOps.updateExpense,
    deleteExpenseEntry: expenseOps.deleteExpense,
    ...feedingOps,
  };

  return (
    <SupabaseAppContext.Provider value={value}>
      {children}
    </SupabaseAppContext.Provider>
  );
};
