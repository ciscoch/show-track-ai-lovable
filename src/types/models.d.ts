declare module "@/types/models" {
  // Keep all existing types but add locationData to FeedingTime
  
  interface Animal {
    id: string;
    name: string;
    species: string;
    breed: string;
    gender: 'male' | 'female';
    birthdate: string;
    tagNumber?: string;
    purchaseDate?: string;
    image?: string;
    imageUrl?: string;
    notes?: string;
  }

  interface WeightEntry {
    id: string;
    animalId: string;
    date: string;
    weight: number;
    notes?: string;
  }

  interface JournalEntry {
    id: string;
    date: string;
    title: string;
    content: string;
    animalIds?: string[];
  }

  interface Expense {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    animalIds?: string[];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    subscriptionLevel: 'free' | 'basic' | 'premium';
  }

  interface SubscriptionLevel {
    name: string;
    price: number;
    description: string;
    features: string[];
  }

  interface FeedingSchedule {
    id: string;
    animalId: string;
    name: string;
    feedingTimes: FeedingTime[];
    reminderEnabled: boolean;
    reminderMinutesBefore: number;
    createdAt: string;
  }
  
  interface FeedingTime {
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
}
