
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  birth_date?: string;
  pen_number?: string;
  organization?: string;
  notes?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  breeder_id?: string;
  photo_url?: string;
  target_weight?: number;
  current_weight?: number;
  // Additional fields from models.ts for compatibility
  gender?: "male" | "female";
  birthdate?: string;
  description?: string;
  showAnimal?: boolean;
  purpose?: "breeding" | "show" | "market" | "pet" | "other";
  weight?: number;
  aiScore?: number;
  tagNumber?: string;
  penNumber?: string;
  purchaseDate?: string;
  imageUrl?: string;
  image?: string;
  breeder_name?: string;
}

export interface WeightEntry {
  id: string;
  animal_id: string;
  weight: number;
  date: string;
  notes?: string;
  created_at?: string;
  // Compatibility with models.ts
  animalId?: string;
}

export interface JournalEntry {
  id: string;
  animal_id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags?: string; // Changed from string[] to string to match database
  photos?: string[];
  created_at?: string;
  updated_at?: string;
  // Compatibility with models.ts
  animalId?: string;
}

export interface Expense {
  id: string;
  animal_id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  tax_deductible?: boolean;
  created_at?: string;
  // Compatibility with models.ts
  animalId?: string;
  taxDeductible?: boolean;
}

export interface Comment {
  id: string;
  photoId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  animal_id: string;
  url: string;
  filename: string;
  caption?: string;
  created_at?: string;
  ai_analysis?: string;
  // Additional fields for UI features
  title?: string;
  date?: string;
  tags?: string[];
  likes?: number;
  comments?: Comment[];
  likedByUser?: boolean;
  analysisResult?: string;
  // Compatibility with models.ts
  animalId?: string;
}

export interface FeedingTime {
  id: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  lastCompleted: string | null;
  locationData?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  } | null;
}

export interface FeedingSchedule {
  id: string;
  animal_id: string;
  feeding_times: FeedingTime[];
  name?: string;
  reminder_enabled: boolean;
  reminder_minutes_before: number;
  created_at?: string;
  // Compatibility with models.ts
  animalId?: string;
  feedingTimes?: FeedingTime[];
  reminderEnabled?: boolean;
  reminderMinutesBefore?: number;
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscriptionLevel?: string;
  createdAt?: string;
}

export interface UserSubscription {
  level: 'basic' | 'pro' | 'elite';
  isActive: boolean;
}

export interface SupabaseAppContextType {
  // Data
  animals: Animal[];
  weightEntries: WeightEntry[];
  journalEntries: JournalEntry[];
  expenses: Expense[];
  photos: Photo[];
  feedingSchedules: FeedingSchedule[];
  user: SupabaseUser | null;
  userSubscription: UserSubscription;
  
  // Loading states
  isLoading: boolean;
  
  // Animal operations
  addAnimal: (animal: Omit<Animal, 'id'>) => Promise<void>;
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
  
  // Expense operations - Fixed method name
  addExpenseEntry: (expense: Omit<Expense, 'id'>) => Promise<void>;
  updateExpenseEntry: (id: string, updates: Partial<Expense>) => Promise<void>;
  deleteExpenseEntry: (id: string) => Promise<void>;
  
  // Photo operations
  addPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  updatePhoto: (id: string, updates: Partial<Photo>) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
  
  // Feeding operations
  addFeedingSchedule: (schedule: Omit<FeedingSchedule, 'id'>) => Promise<void>;
  updateFeedingSchedule: (id: string, updates: Partial<FeedingSchedule>) => Promise<void>;
  deleteFeedingSchedule: (id: string) => Promise<void>;
  completeFeedingTime: (scheduleId: string, timeIndex: number) => Promise<void>;
  
  // Utility
  refreshData: () => Promise<void>;
}
