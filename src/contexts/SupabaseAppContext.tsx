import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, User } from '@/types/models';
import { useToast } from '@/hooks/use-toast';

interface SupabaseAppContextType {
  animals: Animal[];
  currentAnimal: Animal | null;
  weights: WeightEntry[];
  journals: JournalEntry[];
  expenses: Expense[];
  feedingSchedules: FeedingSchedule[];
  user: User | null;
  loading: boolean;
  
  // Animal methods
  addAnimal: (animal: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (animalId: string) => Promise<void>;
  setCurrentAnimal: (animal: Animal | null) => void;
  
  // Weight methods
  addWeightEntry: (entry: Omit<WeightEntry, 'id' | 'createdAt'>) => Promise<void>;
  updateWeightEntry: (entry: WeightEntry) => Promise<void>;
  deleteWeightEntry: (entryId: string) => Promise<void>;
  
  // Journal methods
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => Promise<void>;
  
  // Expense methods
  addExpenseEntry: (entry: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
  deleteExpenseEntry: (expenseId: string) => Promise<void>;
  
  // Feeding schedule methods
  addFeedingSchedule: (schedule: Omit<FeedingSchedule, 'id' | 'createdAt'>) => Promise<void>;
  updateFeedingSchedule: (schedule: FeedingSchedule) => Promise<void>;
  deleteFeedingSchedule: (scheduleId: string) => Promise<void>;
  completeFeedingTime: (scheduleId: string, timeId: string, locationData?: any) => Promise<void>;
  
  refreshData: () => Promise<void>;
}

const SupabaseAppContext = createContext<SupabaseAppContextType | undefined>(undefined);

export const useSupabaseApp = () => {
  const context = useContext(SupabaseAppContext);
  if (context === undefined) {
    throw new Error('useSupabaseApp must be used within a SupabaseAppProvider');
  }
  return context;
};

export const SupabaseAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser, session } = useAuth();
  const { toast } = useToast();
  
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user profile and data when authenticated
  useEffect(() => {
    if (authUser && session) {
      loadUserData();
    } else {
      // Clear data when user logs out
      setAnimals([]);
      setWeights([]);
      setJournals([]);
      setExpenses([]);
      setFeedingSchedules([]);
      setUser(null);
    }
  }, [authUser, session]);

  const loadUserData = async () => {
    if (!authUser) return;
    
    setLoading(true);
    try {
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (profile) {
        setUser({
          id: profile.user_id,
          email: profile.email || authUser.email || '',
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          subscriptionLevel: (profile.subscription_level as 'free' | 'pro' | 'elite') || 'free',
          createdAt: profile.created_at,
          avatarUrl: profile.avatar_url,
          aboutMe: profile.about_me,
        });
      }

      // Load animals
      const { data: animalsData } = await supabase
        .from('animals')
        .select('*')
        .eq('user_id', authUser.id);

      if (animalsData) {
        setAnimals(animalsData.map(animal => ({
          id: animal.id,
          name: animal.name,
          species: animal.species || '',
          breed: animal.breed || '',
          breederName: animal.breeder_name,
          gender: animal.gender as 'male' | 'female',
          birthdate: animal.birth_date || '',
          description: animal.description || '',
          image: animal.image,
          showAnimal: animal.show_animal || false,
          purpose: animal.purpose as any || 'other',
          weight: animal.weight || 0,
          aiScore: animal.ai_score,
          penNumber: animal.pen_number,
          createdAt: animal.created_at,
          updatedAt: animal.updated_at,
        })));
      }

      // Load other data (weights, journals, expenses, feeding schedules)
      await Promise.all([
        loadWeights(),
        loadJournals(),
        loadExpenses(),
        loadFeedingSchedules(),
      ]);

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error loading data",
        description: "There was a problem loading your data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadWeights = async () => {
    if (!authUser) return;
    const { data } = await supabase
      .from('weight_entries')
      .select('*')
      .eq('user_id', authUser.id);
    
    if (data) {
      setWeights(data.map(w => ({
        id: w.id,
        animalId: w.animal_id,
        date: w.date,
        weight: Number(w.weight),
        notes: w.notes,
      })));
    }
  };

  const loadJournals = async () => {
    if (!authUser) return;
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', authUser.id);
    
    if (data) {
      setJournals(data.map(j => ({
        id: j.id,
        animalId: j.animal_id,
        date: j.date,
        title: j.title,
        content: j.content || '',
        tags: j.tags || [],
        mood: j.mood as 'positive' | 'neutral' | 'negative',
      })));
    }
  };

  const loadExpenses = async () => {
    if (!authUser) return;
    const { data } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', authUser.id);
    
    if (data) {
      setExpenses(data.map(e => ({
        id: e.id,
        animalId: e.animal_id,
        date: e.date,
        amount: Number(e.amount),
        category: e.category as any,
        description: e.description,
        taxDeductible: e.tax_deductible || false,
      })));
    }
  };

  const loadFeedingSchedules = async () => {
    if (!authUser) return;
    const { data } = await supabase
      .from('feeding_schedules')
      .select('*')
      .eq('user_id', authUser.id);
    
    if (data) {
      setFeedingSchedules(data.map(f => ({
        id: f.id,
        animalId: f.animal_id,
        name: f.name,
        feedingTimes: f.feeding_times as any,
        reminderEnabled: f.reminder_enabled || false,
        reminderMinutesBefore: f.reminder_minutes_before || 15,
        createdAt: f.created_at,
      })));
    }
  };

  // Animal methods
  const addAnimal = async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!authUser) return;
    
    const { data, error } = await supabase
      .from('animals')
      .insert({
        user_id: authUser.id,
        name: animalData.name,
        species: animalData.species,
        breed: animalData.breed,
        breeder_name: animalData.breederName,
        gender: animalData.gender,
        birth_date: animalData.birthdate,
        description: animalData.description,
        image: animalData.image,
        show_animal: animalData.showAnimal,
        purpose: animalData.purpose,
        weight: animalData.weight,
        pen_number: animalData.penNumber,
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const newAnimal: Animal = {
        id: data.id,
        name: data.name,
        species: data.species || '',
        breed: data.breed || '',
        breederName: data.breeder_name,
        gender: data.gender as 'male' | 'female',
        birthdate: data.birth_date || '',
        description: data.description || '',
        image: data.image,
        showAnimal: data.show_animal || false,
        purpose: data.purpose as any || 'other',
        weight: data.weight || 0,
        aiScore: data.ai_score,
        penNumber: data.pen_number,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
      setAnimals(prev => [...prev, newAnimal]);
    }
  };

  const updateAnimal = async (animal: Animal) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('animals')
      .update({
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        breeder_name: animal.breederName,
        gender: animal.gender,
        birth_date: animal.birthdate,
        description: animal.description,
        image: animal.image,
        show_animal: animal.showAnimal,
        purpose: animal.purpose,
        weight: animal.weight,
        pen_number: animal.penNumber,
      })
      .eq('id', animal.id)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setAnimals(prev => prev.map(a => a.id === animal.id ? animal : a));
  };

  const deleteAnimal = async (animalId: string) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', animalId)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setAnimals(prev => prev.filter(a => a.id !== animalId));
  };

  // Weight methods
  const addWeightEntry = async (entryData: Omit<WeightEntry, 'id' | 'createdAt'>) => {
    if (!authUser) return;
    
    const { data, error } = await supabase
      .from('weight_entries')
      .insert({
        user_id: authUser.id,
        animal_id: entryData.animalId,
        date: entryData.date,
        weight: entryData.weight,
        notes: entryData.notes,
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const newEntry: WeightEntry = {
        id: data.id,
        animalId: data.animal_id,
        date: data.date,
        weight: Number(data.weight),
        notes: data.notes,
      };
      setWeights(prev => [...prev, newEntry]);
    }
  };

  const updateWeightEntry = async (entry: WeightEntry) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('weight_entries')
      .update({
        date: entry.date,
        weight: entry.weight,
        notes: entry.notes,
      })
      .eq('id', entry.id)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setWeights(prev => prev.map(w => w.id === entry.id ? entry : w));
  };

  const deleteWeightEntry = async (entryId: string) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('weight_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setWeights(prev => prev.filter(w => w.id !== entryId));
  };

  // Journal methods
  const addJournalEntry = async (entryData: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    if (!authUser) return;
    
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: authUser.id,
        animal_id: entryData.animalId,
        date: entryData.date,
        title: entryData.title,
        content: entryData.content,
        tags: entryData.tags,
        mood: entryData.mood,
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const newEntry: JournalEntry = {
        id: data.id,
        animalId: data.animal_id,
        date: data.date,
        title: data.title,
        content: data.content || '',
        tags: data.tags || [],
        mood: data.mood as 'positive' | 'neutral' | 'negative',
      };
      setJournals(prev => [...prev, newEntry]);
    }
  };

  // Expense methods
  const addExpenseEntry = async (entryData: Omit<Expense, 'id' | 'createdAt'>) => {
    if (!authUser) return;
    
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: authUser.id,
        animal_id: entryData.animalId,
        date: entryData.date,
        amount: entryData.amount,
        category: entryData.category,
        description: entryData.description,
        tax_deductible: entryData.taxDeductible,
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const newEntry: Expense = {
        id: data.id,
        animalId: data.animal_id,
        date: data.date,
        amount: Number(data.amount),
        category: data.category as any,
        description: data.description,
        taxDeductible: data.tax_deductible || false,
      };
      setExpenses(prev => [...prev, newEntry]);
    }
  };

  const deleteExpenseEntry = async (expenseId: string) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseId)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setExpenses(prev => prev.filter(e => e.id !== expenseId));
  };

  // Feeding schedule methods (simplified implementation)
  const addFeedingSchedule = async (scheduleData: Omit<FeedingSchedule, 'id' | 'createdAt'>) => {
    if (!authUser) return;
    
    const { data, error } = await supabase
      .from('feeding_schedules')
      .insert({
        user_id: authUser.id,
        animal_id: scheduleData.animalId,
        name: scheduleData.name,
        feeding_times: scheduleData.feedingTimes,
        reminder_enabled: scheduleData.reminderEnabled,
        reminder_minutes_before: scheduleData.reminderMinutesBefore,
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      const newSchedule: FeedingSchedule = {
        id: data.id,
        animalId: data.animal_id,
        name: data.name,
        feedingTimes: data.feeding_times as any,
        reminderEnabled: data.reminder_enabled || false,
        reminderMinutesBefore: data.reminder_minutes_before || 15,
        createdAt: data.created_at,
      };
      setFeedingSchedules(prev => [...prev, newSchedule]);
    }
  };

  const updateFeedingSchedule = async (schedule: FeedingSchedule) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('feeding_schedules')
      .update({
        name: schedule.name,
        feeding_times: schedule.feedingTimes,
        reminder_enabled: schedule.reminderEnabled,
        reminder_minutes_before: schedule.reminderMinutesBefore,
      })
      .eq('id', schedule.id)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setFeedingSchedules(prev => prev.map(s => s.id === schedule.id ? schedule : s));
  };

  const deleteFeedingSchedule = async (scheduleId: string) => {
    if (!authUser) return;
    
    const { error } = await supabase
      .from('feeding_schedules')
      .delete()
      .eq('id', scheduleId)
      .eq('user_id', authUser.id);

    if (error) throw error;
    setFeedingSchedules(prev => prev.filter(s => s.id !== scheduleId));
  };

  const completeFeedingTime = async (scheduleId: string, timeId: string, locationData?: any) => {
    // This would need custom logic to update the JSONB feeding_times field
    // For now, keeping it simple and just updating locally
    setFeedingSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          feedingTimes: schedule.feedingTimes.map(time => {
            if (time.id === timeId) {
              return {
                ...time,
                completed: true,
                lastCompleted: new Date().toISOString(),
                locationData: locationData || time.locationData
              };
            }
            return time;
          })
        };
      }
      return schedule;
    }));
  };

  const refreshData = async () => {
    await loadUserData();
  };

  // Create a subscription level object for compatibility
  const userSubscription = user ? {
    level: user.subscriptionLevel,
    features: user.subscriptionLevel === 'elite' 
      ? ['All features', 'Premium support', 'Advanced analytics']
      : user.subscriptionLevel === 'pro'
        ? ['Basic features', 'Standard support']
        : ['Limited features']
  } : null;

  const value = {
    animals,
    currentAnimal,
    weights,
    journals,
    expenses,
    feedingSchedules,
    user,
    loading,
    userSubscription,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    setCurrentAnimal,
    addWeightEntry,
    updateWeightEntry,
    deleteWeightEntry,
    addJournalEntry,
    addExpenseEntry,
    deleteExpenseEntry,
    addFeedingSchedule,
    updateFeedingSchedule,
    deleteFeedingSchedule,
    completeFeedingTime,
    refreshData,
  };

  return (
    <SupabaseAppContext.Provider value={value}>
      {children}
    </SupabaseAppContext.Provider>
  );
};
