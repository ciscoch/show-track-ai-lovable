import { Animal, WeightEntry, JournalEntry, Expense, User, SubscriptionLevel, FeedingSchedule, FeedingTime } from "@/types/models";

// Mock data for animals
export const mockAnimals: Animal[] = [
  { id: "1", name: "Blue Ribbon", species: "cattle", breed: "Angus", breederName: "Farm A", gender: "male", birthdate: "2020-05-15", weight: 1200, aiScore: 92, image: "/placeholder.svg", description: "Champion Angus bull", showAnimal: true, purpose: "show", penNumber: "A1" },
  { id: "2", name: "Champion", species: "goat", breed: "Boer", breederName: "Farm B", gender: "female", birthdate: "2021-03-20", weight: 150, aiScore: 88, image: "/placeholder.svg", description: "Prize-winning Boer goat", showAnimal: true, purpose: "breeding", penNumber: "B2" },
  { id: "3", name: "Star", species: "sheep", breed: "Dorset", breederName: "Farm C", gender: "female", birthdate: "2022-01-10", weight: 180, aiScore: 75, image: "/placeholder.svg", description: "Excellent Dorset ewe", showAnimal: true, purpose: "market", penNumber: "C3" },
];

// Mock data for weight entries
export const mockWeights: WeightEntry[] = [
  { id: "1", animalId: "1", date: "2023-01-01", weight: 1100, notes: "Initial weight" },
  { id: "2", animalId: "1", date: "2023-03-01", weight: 1150, notes: "After first feeding cycle" },
  { id: "3", animalId: "1", date: "2023-05-01", weight: 1200, notes: "Before show" },
  { id: "4", animalId: "2", date: "2023-01-01", weight: 130, notes: "Initial weight" },
  { id: "5", animalId: "2", date: "2023-03-01", weight: 140, notes: "After first feeding cycle" },
  { id: "6", animalId: "2", date: "2023-05-01", weight: 150, notes: "Before show" },
  { id: "7", animalId: "3", date: "2023-01-01", weight: 160, notes: "Initial weight" },
  { id: "8", animalId: "3", date: "2023-03-01", weight: 170, notes: "After first feeding cycle" },
  { id: "9", animalId: "3", date: "2023-05-01", weight: 180, notes: "Before show" },
];

// Mock data for journal entries
export const mockJournals: JournalEntry[] = [
  { id: "1", animalId: "1", date: "2023-05-10", title: "New Feeding Routine", content: "Started new feeding routine today.", tags: [], mood: "positive" },
  { id: "2", animalId: "2", date: "2023-05-10", title: "Champion Progress", content: "Champion is looking great!", tags: [], mood: "positive" },
  { id: "3", animalId: "3", date: "2023-05-10", title: "Show Preparation", content: "Star is ready for the show.", tags: [], mood: "neutral" },
];

// Mock data for expenses
export const mockExpenses: Expense[] = [
  { id: "1", animalId: "1", date: "2023-05-05", description: "Feed", amount: 50, category: "feed", taxDeductible: true },
  { id: "2", animalId: "2", date: "2023-05-05", description: "Vet", amount: 100, category: "medicine", taxDeductible: true },
  { id: "3", animalId: "3", date: "2023-05-05", description: "Supplements", amount: 25, category: "supplies", taxDeductible: false },
];

// Mock data for feeding schedules
export const mockFeedingSchedules: FeedingSchedule[] = [
  {
    id: "1",
    animalId: "1",
    name: "Morning Feed",
    feedingTimes: [
      { id: "1", startTime: "07:00", endTime: "08:00", completed: false, lastCompleted: null, locationData: null },
    ],
    reminderEnabled: true,
    reminderMinutesBefore: 15,
    createdAt: "2023-01-01"
  },
  {
    id: "2",
    animalId: "1",
    name: "Evening Feed",
    feedingTimes: [
      { id: "2", startTime: "19:00", endTime: "20:00", completed: false, lastCompleted: null, locationData: null },
    ],
    reminderEnabled: true,
    reminderMinutesBefore: 15,
    createdAt: "2023-01-01"
  },
  {
    id: "3",
    animalId: "2",
    name: "Daily Feed",
    feedingTimes: [
      { id: "3", startTime: "08:00", endTime: "09:00", completed: false, lastCompleted: null, locationData: null },
    ],
    reminderEnabled: true,
    reminderMinutesBefore: 15,
    createdAt: "2023-01-01"
  },
];

// Mock data for user
export const mockUser: User = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  avatarUrl: "/placeholder.svg",
  aboutMe: "I love showing livestock and exploring new fairs!",
  role: "user",
  subscriptionLevel: "elite", // Make sure this is set to "elite"
  subscriptionEndDate: "2025-12-31",
  badges: [],
  streaks: {
    feedLogging: 5,
    weightLogging: 3,
    expenseTracking: 7
  },
  createdAt: "2022-01-01"
};

// Mock subscription levels
export const subscriptionLevels: {
  [key: string]: {
    level: "free" | "pro" | "elite";
    features: string[];
    price?: number;
  }
} = {
  free: {
    level: "free",
    features: [
      "Track animal weights",
      "Basic record keeping",
      "Animal profiles"
    ],
    price: 0
  },
  pro: {
    level: "pro",
    features: [
      "All Free features",
      "Advanced weight tracking",
      "Expense tracking",
      "Show scheduling"
    ],
    price: 9.99
  },
  elite: {
    level: "elite",
    features: [
      "All Pro features",
      "AI weight estimation",
      "Judge trend analysis",
      "Premium support"
    ],
    price: 19.99
  }
};
