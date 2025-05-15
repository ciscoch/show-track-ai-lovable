
import { useState, useEffect, ReactNode } from "react";
import { Animal, WeightEntry, JournalEntry, Expense, User, FeedingSchedule } from "@/types/models";
import { 
  mockAnimals, 
  mockWeights, 
  mockJournals, 
  mockExpenses, 
  mockUser, 
  mockFeedingSchedules, 
  subscriptionLevels 
} from "./mockData";
import { useFeedingReminders } from "./useFeedingReminders";

interface AppProviderProps {
  children: ReactNode;
}

export const useAppProviderState = () => {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>(mockWeights);
  const [journals, setJournals] = useState<JournalEntry[]>(mockJournals);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>(mockFeedingSchedules);
  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState<boolean>(false);

  // Select the user's subscription level
  const userSubscription = subscriptionLevels[user?.subscriptionLevel || 'free'];

  // Handle feeding reminders
  useFeedingReminders({ feedingSchedules, animals });

  const addAnimal = (animal: Animal) => {
    setAnimals(prev => [...prev, animal]);
  };

  const updateAnimal = (animal: Animal) => {
    setAnimals(prev => prev.map(a => a.id === animal.id ? animal : a));
  };

  const deleteAnimal = (animalId: string) => {
    setAnimals(prev => prev.filter(a => a.id !== animalId));
  };

  const addWeightEntry = (entry: WeightEntry) => {
    setWeights(prev => [...prev, entry]);
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournals(prev => [...prev, entry]);
  };

  const addExpenseEntry = (entry: Expense) => {
    setExpenses(prev => [...prev, entry]);
  };
  
  const deleteExpenseEntry = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const addFeedingSchedule = (schedule: FeedingSchedule) => {
    setFeedingSchedules(prev => [...prev, schedule]);
  };

  const updateFeedingSchedule = (schedule: FeedingSchedule) => {
    setFeedingSchedules(prev => prev.map(s => s.id === schedule.id ? schedule : s));
  };

  const deleteFeedingSchedule = (scheduleId: string) => {
    setFeedingSchedules(prev => prev.filter(s => s.id !== scheduleId));
  };

  const completeFeedingTime = (scheduleId: string, timeId: string, locationData = null) => {
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

  const refreshData = () => {
    setLoading(true);
    // Simulating a data fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    animals,
    currentAnimal,
    weights,
    journals,
    expenses,
    feedingSchedules,
    user,
    userSubscription,
    loading,
    setCurrentAnimal,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    addWeightEntry,
    addJournalEntry,
    addExpenseEntry,
    deleteExpenseEntry,
    addFeedingSchedule,
    updateFeedingSchedule,
    deleteFeedingSchedule,
    completeFeedingTime,
    refreshData
  };
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // This component is kept as a thin wrapper around the actual implementation
  // to make testing easier
  return children;
};
