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
  time?: string;
  title: string;
  content: string;
  tags: string[];
  mood: "positive" | "neutral" | "negative";
  images?: string[];
  timestamp?: string;
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

// New Friend interface
export interface Friend {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  addedAt: string;
}

// Updated Badge interface with new category types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string | null;
  category: "achievement" | "streak" | "participation" | "special" | "muscle-up" | "glow-up" | "body-boss" | "ring-debut" | "top-3" | "champion" | "feed-smart" | "showmanship-scholar" | "quiz-master";
  type: "bronze" | "silver" | "gold" | "platinum";
  year?: number; // Added year field to make badges/buckles unique by year
  imageUrl?: string; // Add imageUrl for the badge image
}

// User Profile Badges
export interface UserBadge {
  badgeId: string;
  userId: string;
  earnedAt: string;
  sharedWith: string[]; // Array of friend IDs who were notified
}

// Additional types used in the app
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string; // Optional display name
  avatarUrl?: string | null; // Optional profile photo
  aboutMe?: string; // Optional about me description
  role?: string; // Added role property
  subscriptionLevel: "free" | "pro" | "elite";
  subscriptionEndDate?: string; // Added subscriptionEndDate property
  badges?: UserBadge[]; // Added badges property
  streaks?: {
    feedLogging?: number;
    weightLogging?: number;
    expenseTracking?: number;
  };
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
  // Add locationData property
  locationData?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  } | null;
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
