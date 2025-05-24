
import { useState, useEffect, ReactNode } from "react";
import { getItem, setItem, removeItem } from "@/platform/storage";
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

export const useAppProviderState = () => {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>(mockWeights);
  const [journals, setJournals] = useState<JournalEntry[]>(mockJournals);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>(mockFeedingSchedules);
  const [user, setUser] = useState<User | null>(() => {
    const stored = getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored) as User;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Make sure we're using the user's actual subscription level from the user object
  // This ensures the UI consistently shows the correct plan
  const userSubscription = user?.subscriptionLevel 
    ? subscriptionLevels[user.subscriptionLevel] 
    : subscriptionLevels['free'];

  // Handle feeding reminders
  useFeedingReminders({ feedingSchedules, animals, user });

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

  const updateWeightEntry = (entry: WeightEntry) => {
    setWeights(prev => prev.map(w => w.id === entry.id ? entry : w));
  };

  const deleteWeightEntry = (entryId: string) => {
    setWeights(prev => prev.filter(w => w.id !== entryId));
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

  useEffect(() => {
    if (user) {
      setItem('user', JSON.stringify(user));
    } else {
      removeItem('user');
    }
  }, [user]);

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
    setUser,
    setCurrentAnimal,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    addWeightEntry,
    updateWeightEntry,
    deleteWeightEntry,
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
