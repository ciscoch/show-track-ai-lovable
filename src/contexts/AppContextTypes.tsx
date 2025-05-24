
import { User } from '@supabase/supabase-js';

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed?: string;
  breeder_name?: string;
  gender?: string;
  birth_date?: string;
  birthdate?: string; // Add for backward compatibility
  weight?: number;
  ai_score?: number;
  image?: string;
  description?: string;
  show_animal?: boolean;
  showAnimal?: boolean; // Add for backward compatibility
  purpose?: string;
  pen_number?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WeightEntry {
  id: string;
  animal_id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  animal_id: string;
  date: string;
  title: string;
  content?: string;
  tags?: string[];
  mood?: string;
}

export interface Expense {
  id: string;
  animal_id: string;
  date: string;
  description: string;
  amount: number;
  category?: string;
  tax_deductible?: boolean;
}

export interface FeedingTime {
  id: string;
  time: string;
  amount: string;
  feedType: string;
}

export interface FeedingSchedule {
  id: string;
  animal_id: string;
  name: string;
  feeding_times: FeedingTime[];
  reminder_enabled?: boolean;
  reminder_minutes_before?: number;
}

export interface Photo {
  id: string;
  animal_id: string;
  url: string;
  caption?: string;
  tags?: string[];
  created_at: string;
  title?: string;
  date?: string;
  likes?: number;
  likedByUser?: boolean;
  comments?: Comment[];
  analysisResult?: any;
}

export interface Comment {
  id: string;
  photoId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface UserSubscription {
  level: 'free' | 'pro' | 'elite';
  endDate?: string;
  isActive: boolean;
}

export interface SupabaseAppContextType {
  user: User | null;
  userProfile: any;
  userSubscription: UserSubscription;
  animals: Animal[];
  weightEntries: WeightEntry[];
  journalEntries: JournalEntry[];
  expenses: Expense[];
  feedingSchedules: FeedingSchedule[];
  loading: boolean;
  error: string | null;
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
  
  // Expense operations
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpense: (id: string, updates: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  
  // Feeding schedule operations
  addFeedingSchedule: (schedule: Omit<FeedingSchedule, 'id'>) => Promise<void>;
  updateFeedingSchedule: (id: string, updates: Partial<FeedingSchedule>) => Promise<void>;
  deleteFeedingSchedule: (id: string) => Promise<void>;
}
