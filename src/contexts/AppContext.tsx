import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Animal, WeightEntry, JournalEntry, ExpenseEntry, User, SubscriptionLevel, FeedingSchedule } from "@/types/models";
import { toast } from "@/hooks/use-toast";

type AppContextType = {
  animals: Animal[];
  currentAnimal: Animal | null;
  weights: WeightEntry[];
  journals: JournalEntry[];
  expenses: ExpenseEntry[];
  feedingSchedules: FeedingSchedule[];
  user: User | null;
  userSubscription: SubscriptionLevel;
  loading: boolean;
  setCurrentAnimal: (animal: Animal | null) => void;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animal: Animal) => void;
  deleteAnimal: (animalId: string) => void;
  addWeightEntry: (entry: WeightEntry) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  addExpenseEntry: (entry: ExpenseEntry) => void;
  addFeedingSchedule: (schedule: FeedingSchedule) => void;
  updateFeedingSchedule: (schedule: FeedingSchedule) => void;
  deleteFeedingSchedule: (scheduleId: string) => void;
  completeFeedingTime: (scheduleId: string, timeId: string) => void;
  refreshData: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample subscription levels
const subscriptionLevels: Record<string, SubscriptionLevel> = {
  free: {
    level: 'free',
    features: [
      'Basic animal profiles',
      'Manual weight tracking',
      'Simple journal',
      'Photo gallery',
      'Basic feed log'
    ]
  },
  pro: {
    level: 'pro',
    features: [
      'AI weight estimation',
      'Muscle mass analysis',
      'LIDAR integration',
      'Show readiness score',
      'Feed conversion charts',
      'Advanced journaling',
      'Tax record exports',
      'Everything in Free tier'
    ]
  },
  elite: {
    level: 'elite',
    features: [
      'Judge trend analysis',
      'Smart feed suggestions',
      'Pose guidance',
      'Personalized showmanship tips',
      'Tax summary exports',
      'Everything in Pro tier'
    ]
  }
};

// Mock data for initial development
const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'goat',
    breed: 'Boer',
    birthDate: '2023-01-15',
    purchaseDate: '2023-03-10',
    gender: 'male',
    tagNumber: 'G123',
    userId: 'user1',
    imageUrl: '/placeholder.svg',
    notes: 'First show animal, seems to have good muscle definition',
    createdAt: '2023-03-10T10:30:00Z',
    updatedAt: '2023-04-15T14:22:00Z'
  },
  {
    id: '2',
    name: 'Daisy',
    species: 'cattle',
    breed: 'Angus',
    birthDate: '2022-11-20',
    purchaseDate: '2023-02-05',
    gender: 'female',
    tagNumber: 'C456',
    userId: 'user1',
    imageUrl: '/placeholder.svg',
    notes: 'Good frame, needs work on muscle tone',
    createdAt: '2023-02-05T09:15:00Z',
    updatedAt: '2023-04-10T11:45:00Z'
  },
  {
    id: '3',
    name: 'Wilbur',
    species: 'pig',
    breed: 'Hampshire',
    birthDate: '2023-02-10',
    purchaseDate: '2023-04-01',
    gender: 'male',
    tagNumber: 'P789',
    userId: 'user1',
    imageUrl: '/placeholder.svg',
    notes: 'Great temperament, working on weight gain',
    createdAt: '2023-04-01T15:45:00Z',
    updatedAt: '2023-04-18T16:30:00Z'
  }
];

const mockWeights: WeightEntry[] = [
  { id: 'w1', animalId: '1', date: '2023-03-15', weight: 45, notes: 'Initial weight' },
  { id: 'w2', animalId: '1', date: '2023-03-22', weight: 48, notes: 'Good progress' },
  { id: 'w3', animalId: '1', date: '2023-03-29', weight: 52, notes: 'Increased feed' },
  { id: 'w4', animalId: '1', date: '2023-04-05', weight: 55, notes: 'On track' },
  { id: 'w5', animalId: '1', date: '2023-04-12', weight: 58, notes: 'Good muscle development' },
  { id: 'w6', animalId: '2', date: '2023-02-10', weight: 450, notes: 'Initial weight' },
  { id: 'w7', animalId: '2', date: '2023-02-24', weight: 470, notes: 'Adjusted feed' },
  { id: 'w8', animalId: '2', date: '2023-03-10', weight: 495, notes: 'Good progress' },
  { id: 'w9', animalId: '2', date: '2023-03-24', weight: 515, notes: 'On track' },
  { id: 'w10', animalId: '2', date: '2023-04-07', weight: 540, notes: 'Looking good' },
  { id: 'w11', animalId: '3', date: '2023-04-05', weight: 85, notes: 'Initial weight' },
  { id: 'w12', animalId: '3', date: '2023-04-12', weight: 92, notes: 'Good feed conversion' },
  { id: 'w13', animalId: '3', date: '2023-04-19', weight: 100, notes: 'On track for show' }
];

const mockJournals: JournalEntry[] = [
  {
    id: 'j1',
    animalId: '1',
    date: '2023-03-16',
    content: "Buddy is adjusting well to his new environment. He's very social and follows me around the pen.",
    tags: ['adjustment', 'behavior'],
    mood: 'good'
  },
  {
    id: 'j2',
    animalId: '1',
    date: '2023-03-25',
    content: 'Started new feed mix today. Buddy seemed to enjoy it. Working on halter training.',
    tags: ['feed', 'training'],
    mood: 'good'
  },
  {
    id: 'j3',
    animalId: '1',
    date: '2023-04-02',
    content: 'Had a practice session for the show. Buddy was a bit stubborn but eventually cooperated.',
    tags: ['training', 'showmanship'],
    mood: 'neutral'
  },
  {
    id: 'j4',
    animalId: '2',
    date: '2023-02-15',
    content: 'Daisy is settling in well. She has a calm temperament and is easy to handle.',
    tags: ['adjustment', 'behavior'],
    mood: 'good'
  },
  {
    id: 'j5',
    animalId: '3',
    date: '2023-04-08',
    content: 'Wilbur loves his new feed. Working on getting him used to the show stick.',
    tags: ['feed', 'training'],
    mood: 'good'
  }
];

const mockExpenses: ExpenseEntry[] = [
  {
    id: 'e1',
    animalId: '1',
    date: '2023-03-10',
    amount: 300,
    category: 'supplies',
    description: 'Initial purchase and supplies',
    taxDeductible: true
  },
  {
    id: 'e2',
    animalId: '1',
    date: '2023-03-15',
    amount: 75,
    category: 'feed',
    description: 'Monthly feed supply',
    taxDeductible: true
  },
  {
    id: 'e3',
    animalId: '1',
    date: '2023-04-10',
    amount: 80,
    category: 'feed',
    description: 'Premium feed mix',
    taxDeductible: true
  },
  {
    id: 'e4',
    animalId: '2',
    date: '2023-02-05',
    amount: 1200,
    category: 'supplies',
    description: 'Heifer purchase',
    taxDeductible: true
  },
  {
    id: 'e5',
    animalId: '3',
    date: '2023-04-01',
    amount: 250,
    category: 'supplies',
    description: 'Pig purchase and initial supplies',
    taxDeductible: true
  }
];

const mockUser: User = {
  id: 'user1',
  email: 'demo@showtrackapp.com',
  firstName: 'Demo',
  lastName: 'User',
  subscriptionLevel: 'free',
  createdAt: '2023-01-01T00:00:00Z'
};

const mockFeedingSchedules: FeedingSchedule[] = [
  {
    id: 'fs1',
    animalId: '1',
    name: 'Morning and Evening',
    feedingTimes: [
      {
        id: 'ft1',
        startTime: '06:00',
        endTime: '08:00',
        completed: false,
        lastCompleted: null
      },
      {
        id: 'ft2',
        startTime: '16:00',
        endTime: '18:00',
        completed: false,
        lastCompleted: null
      }
    ],
    reminderEnabled: true,
    reminderMinutesBefore: 30,
    createdAt: '2023-04-01T15:45:00Z',
  },
  {
    id: 'fs2',
    animalId: '2',
    name: 'Three Times Daily',
    feedingTimes: [
      {
        id: 'ft3',
        startTime: '07:00',
        endTime: '08:00',
        completed: false,
        lastCompleted: null
      },
      {
        id: 'ft4',
        startTime: '12:00',
        endTime: '13:00',
        completed: false,
        lastCompleted: null
      },
      {
        id: 'ft5',
        startTime: '17:00',
        endTime: '18:00',
        completed: false,
        lastCompleted: null
      }
    ],
    reminderEnabled: true,
    reminderMinutesBefore: 30,
    createdAt: '2023-04-01T15:45:00Z',
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>(mockWeights);
  const [journals, setJournals] = useState<JournalEntry[]>(mockJournals);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(mockExpenses);
  const [feedingSchedules, setFeedingSchedules] = useState<FeedingSchedule[]>(mockFeedingSchedules);
  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState<boolean>(false);

  // Select the user's subscription level
  const userSubscription = subscriptionLevels[user?.subscriptionLevel || 'free'];

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

  const addExpenseEntry = (entry: ExpenseEntry) => {
    setExpenses(prev => [...prev, entry]);
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

  const completeFeedingTime = (scheduleId: string, timeId: string) => {
    setFeedingSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          feedingTimes: schedule.feedingTimes.map(time => {
            if (time.id === timeId) {
              return {
                ...time,
                completed: true,
                lastCompleted: new Date().toISOString()
              };
            }
            return time;
          })
        };
      }
      return schedule;
    }));
  };

  // Check for feeding reminders
  useEffect(() => {
    const checkFeedingReminders = () => {
      const now = new Date();
      
      feedingSchedules.forEach(schedule => {
        if (!schedule.reminderEnabled) return;
        
        schedule.feedingTimes.forEach(time => {
          if (time.completed) return;
          
          // Reset completion status at midnight
          if (time.lastCompleted) {
            const lastCompletedDate = new Date(time.lastCompleted).toDateString();
            const today = now.toDateString();
            
            if (lastCompletedDate === today) return; // Already completed today
          }
          
          // Parse end time
          const [endHour, endMinute] = time.endTime.split(':').map(Number);
          const endTimeDate = new Date();
          endTimeDate.setHours(endHour, endMinute, 0, 0);
          
          // Calculate reminder time
          const reminderTime = new Date(endTimeDate);
          reminderTime.setMinutes(reminderTime.getMinutes() - (schedule.reminderMinutesBefore || 30));
          
          // If current time is past the reminder time but before end time, show reminder
          if (now >= reminderTime && now <= endTimeDate) {
            const animalName = animals.find(a => a.id === schedule.animalId)?.name || "your animal";
            
            // Only show reminder if we haven't already shown one in the last 15 minutes
            const storageKey = `reminder-shown-${schedule.id}-${time.id}`;
            const lastReminderShown = localStorage.getItem(storageKey);
            
            if (!lastReminderShown || (Date.now() - parseInt(lastReminderShown)) > 15 * 60 * 1000) {
              toast({
                title: "Feeding Reminder",
                description: `Time to feed ${animalName}! Feeding window ends at ${formatTime(time.endTime)}.`,
                duration: 10000, // Show for 10 seconds
              });
              
              // Store the time we showed this reminder
              localStorage.setItem(storageKey, Date.now().toString());
            }
          }
        });
      });
    };
    
    // Helper function to format time for display
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    };
    
    // Check immediately and then every minute
    checkFeedingReminders();
    const interval = setInterval(checkFeedingReminders, 60000);
    
    return () => clearInterval(interval);
  }, [feedingSchedules, animals]);

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

  return (
    <AppContext.Provider
      value={{
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
        addFeedingSchedule,
        updateFeedingSchedule,
        deleteFeedingSchedule,
        completeFeedingTime,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
