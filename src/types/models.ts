
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
}

export interface Reminder {
  id: string;
  animalId: string;
  title: string;
  time: string;
  days: string[];
  enabled: boolean;
}
