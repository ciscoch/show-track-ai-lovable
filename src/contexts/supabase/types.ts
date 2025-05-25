
import { User } from '@supabase/supabase-js';
import { Animal, WeightEntry, JournalEntry, Expense, FeedingSchedule, UserSubscription, Photo } from '../AppContextTypes';

export interface SupabaseContextState {
  user: User | null;
  userProfile: any;
  userSubscription: UserSubscription;
  animals: Animal[];
  weightEntries: WeightEntry[];
  journalEntries: JournalEntry[];
  expenses: Expense[];
  photos: Photo[];
  feedingSchedules: FeedingSchedule[];
  loading: boolean;
  error: string | null;
}

export interface SupabaseContextActions {
  setUser: (user: User | null) => void;
  
  // Animal operations
  addAnimal: (animal: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateAnimal: (id: string, updates: Partial<Animal>) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
  
  // Weight operations
  addWeightEntry: (entry: Omit<WeightEntry, 'id'>) => Promise<void>;
  updateWeightEntry: (id: string, updates: Partial<WeightEntry>) => Promise<void>;
  deleteWeightEntry: (id: string) => Promise<void>;
  
  // Journal operations
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => Promise<void>;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  
  // Expense operations - Fixed to match context interface
  addExpenseEntry: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpenseEntry: (id: string, updates: Partial<Expense>) => Promise<void>;
  deleteExpenseEntry: (id: string) => Promise<void>;
  
  // Photo operations
  addPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  updatePhoto: (id: string, updates: Partial<Photo>) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  
  // Feeding schedule operations
  addFeedingSchedule: (schedule: Omit<FeedingSchedule, 'id'>) => Promise<void>;
  updateFeedingSchedule: (id: string, updates: Partial<FeedingSchedule>) => Promise<void>;
  deleteFeedingSchedule: (id: string) => Promise<void>;
  completeFeedingTime: (scheduleId: string, timeIndex: number) => Promise<void>;
  
  // Utility
  refreshData: () => Promise<void>;
}

export type SupabaseAppContextType = SupabaseContextState & SupabaseContextActions;
