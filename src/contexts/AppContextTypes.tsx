
import { Animal, WeightEntry, JournalEntry, Expense, User, SubscriptionLevel, FeedingSchedule } from "@/types/models";
import { ReactNode } from "react";

// Photo type for the gallery
export interface Photo {
  id: string;
  animalId: string;
  url: string;
  date: string;
  tags?: string[];
  caption?: string;
  title?: string;
  likes?: number;
  comments?: Comment[];
  likedByUser?: boolean;
}

export interface Comment {
  id: string;
  photoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

// Context type definition
export type AppContextType = {
  animals: Animal[];
  currentAnimal: Animal | null;
  weights: WeightEntry[];
  journals: JournalEntry[];
  expenses: Expense[];
  feedingSchedules: FeedingSchedule[];
  user: User | null;
  userSubscription: SubscriptionLevel;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCurrentAnimal: (animal: Animal | null) => void;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animal: Animal) => void;
  deleteAnimal: (animalId: string) => void;
  addWeightEntry: (entry: WeightEntry) => void;
  updateWeightEntry: (entry: WeightEntry) => void;
  deleteWeightEntry: (entryId: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  addExpenseEntry: (entry: Expense) => void;
  deleteExpenseEntry: (id: string) => void;
  addFeedingSchedule: (schedule: FeedingSchedule) => void;
  updateFeedingSchedule: (schedule: FeedingSchedule) => void;
  deleteFeedingSchedule: (scheduleId: string) => void;
  completeFeedingTime: (scheduleId: string, timeId: string, locationData?: {latitude: number; longitude: number; timestamp: string} | null) => void;
  refreshData: () => void;
};
