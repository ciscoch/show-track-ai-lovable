
export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: "male" | "female";
  birthdate: string;
  description: string;
  image?: string;
  showAnimal: boolean;
  purpose: "breeding" | "show" | "market" | "pet" | "other";
  weight: number;
  
  // Additional fields used in existing components
  tagNumber?: string;
  purchaseDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}

export interface Expense {
  id: string;
  animalId: string;
  date: string;
  amount: number;
  category: "feed" | "medicine" | "supplies" | "entry" | "travel" | "other";
  description: string;
  taxDeductible: boolean;
  receiptImageUrl?: string | null;
}

export interface JournalEntry {
  id: string;
  animalId: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  mood: "positive" | "neutral" | "negative";
  images?: string[];
}

export interface WeightEntry {
  id: string;
  animalId: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface SubscriptionTier {
  level: "free" | "pro" | "elite";
  expiresAt: string;
  features?: string[];
}

export interface Reminder {
  id: string;
  animalId: string;
  title: string;
  time: string;
  days: string[];
  enabled: boolean;
}

// Additional types used in the app
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionLevel: "free" | "pro" | "elite";
  subscriptionEndDate?: string; // Added subscriptionEndDate property
  createdAt: string;
}

export interface SubscriptionLevel {
  level: "free" | "pro" | "elite";
  features: string[];
}

export interface FeedingTime {
  id: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  lastCompleted: string | null;
}

export interface FeedingSchedule {
  id: string;
  animalId: string;
  name: string;
  feedingTimes: FeedingTime[];
  reminderEnabled: boolean;
  reminderMinutesBefore: number;
  createdAt: string;
}

// Alias for backward compatibility
export type ExpenseEntry = Expense;
