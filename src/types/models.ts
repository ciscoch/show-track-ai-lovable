
export interface Animal {
  id: string;
  name: string;
  species: 'cattle' | 'goat' | 'sheep' | 'pig';
  breed: string;
  birthDate: string;
  purchaseDate?: string;
  gender: 'male' | 'female';
  tagNumber?: string;
  showId?: string;
  userId: string;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeightEntry {
  id: string;
  animalId: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  animalId: string;
  date: string;
  content: string;
  tags?: string[];
  imageUrls?: string[];
  mood?: 'good' | 'neutral' | 'concerning';
}

export interface ExpenseEntry {
  id: string;
  animalId: string;
  date: string;
  amount: number;
  category: 'feed' | 'medicine' | 'supplies' | 'entry' | 'travel' | 'other';
  description: string;
  receiptUrl?: string;
  taxDeductible: boolean;
}

export interface BodyComposition {
  id: string;
  animalId: string;
  date: string;
  imageUrl: string;
  muscleScore?: number;
  fatScore?: number;
  estimatedWeight?: number;
  aiProcessed: boolean;
  bodyMapUrl?: string;
}

export interface SubscriptionLevel {
  level: 'free' | 'pro' | 'elite';
  features: string[];
}

export interface FeedRecommendation {
  id: string;
  animalId: string;
  species: 'cattle' | 'goat' | 'sheep' | 'pig';
  weightMin: number;
  weightMax: number;
  goal: 'growth' | 'maintenance' | 'finishing';
  feedType: string;
  amount: string;
  frequency: string;
  notes?: string;
}

export interface ShowTip {
  id: string;
  species: 'cattle' | 'goat' | 'sheep' | 'pig';
  category: 'showmanship' | 'preparation' | 'presentation' | 'handling' | 'grooming';
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface JudgeTrend {
  id: string;
  judgeName: string;
  species: 'cattle' | 'goat' | 'sheep' | 'pig';
  preferredTraits: string[];
  avoidTraits: string[];
  recentShows: string[];
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscriptionLevel: 'free' | 'pro' | 'elite';
  subscriptionEndDate?: string;
  createdAt: string;
}
