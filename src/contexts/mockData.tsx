import { Animal, WeightEntry, JournalEntry, Expense, User, SubscriptionLevel, FeedingSchedule } from "@/types/models";

// Mock data for animals
export const mockAnimals: Animal[] = [
  { id: "1", name: "Blue Ribbon", species: "cattle", breed: "Angus", dob: "2020-05-15", weight: 1200, image: "/placeholder.svg" },
  { id: "2", name: "Champion", species: "goat", breed: "Boer", dob: "2021-03-20", weight: 150, image: "/placeholder.svg" },
  { id: "3", name: "Star", species: "sheep", breed: "Dorset", dob: "2022-01-10", weight: 180, image: "/placeholder.svg" },
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
  { id: "1", animalId: "1", date: "2023-05-10", entry: "Started new feeding routine today." },
  { id: "2", animalId: "2", date: "2023-05-10", entry: "Champion is looking great!" },
  { id: "3", animalId: "3", date: "2023-05-10", entry: "Star is ready for the show." },
];

// Mock data for expenses
export const mockExpenses: Expense[] = [
  { id: "1", animalId: "1", date: "2023-05-05", description: "Feed", amount: 50 },
  { id: "2", animalId: "2", date: "2023-05-05", description: "Vet", amount: 100 },
  { id: "3", animalId: "3", date: "2023-05-05", description: "Supplements", amount: 25 },
];

// Mock data for feeding schedules
export const mockFeedingSchedules: FeedingSchedule[] = [
  {
    id: "1",
    animalId: "1",
    name: "Morning Feed",
    time: "07:00",
    food: "High-energy grain mix",
    amount: "5 lbs",
    notes: "Ensure fresh water is available.",
    feedingTimes: [
      { id: "1", time: "07:00", completed: false, lastCompleted: null, locationData: null },
    ]
  },
  {
    id: "2",
    animalId: "1",
    name: "Evening Feed",
    time: "19:00",
    food: "Hay and mineral supplements",
    amount: "10 lbs hay, supplements as directed",
    notes: "Check weight and adjust feed as necessary.",
    feedingTimes: [
      { id: "2", time: "19:00", completed: false, lastCompleted: null, locationData: null },
    ]
  },
  {
    id: "3",
    animalId: "2",
    name: "Daily Feed",
    time: "08:00",
    food: "Goat feed pellets",
    amount: "2 lbs",
    notes: "Monitor for bloating.",
    feedingTimes: [
      { id: "3", time: "08:00", completed: false, lastCompleted: null, locationData: null },
    ]
  },
];

// Mock data for user
export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  profileImage: "/placeholder.svg",
  phone: "555-123-4567",
  subscriptionLevel: "elite", // Make sure this is set to "elite"
  subscriptionEndDate: "2025-12-31",
  notifications: {
    email: true,
    push: true,
    sms: false
  },
};

// Mock subscription levels
export const subscriptionLevels: { [key: string]: SubscriptionLevel } = {
  free: {
    level: "free",
    price: 0,
    features: ["Basic animal tracking", "Limited journal entries"],
  },
  pro: {
    level: "pro",
    price: 10,
    features: ["Advanced weight tracking", "Unlimited journal entries", "Gallery access"],
  },
  elite: {
    level: "elite",
    price: 20,
    features: ["AI-powered analysis", "Priority support", "All pro features"],
  },
};
