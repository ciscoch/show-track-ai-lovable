
import { Animal, WeightEntry, JournalEntry, Expense, User, SubscriptionLevel, FeedingSchedule } from "@/types/models";

// Sample subscription levels
export const subscriptionLevels: Record<string, SubscriptionLevel> = {
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
export const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'goat',
    breed: 'Boer',
    birthdate: '2023-01-15',
    purchaseDate: '2023-03-10',
    gender: 'male',
    tagNumber: 'G123',
    description: 'First show animal, seems to have good muscle definition',
    notes: 'First show animal, seems to have good muscle definition',
    showAnimal: true,
    purpose: 'show',
    weight: 45,
    imageUrl: '/placeholder.svg',
    createdAt: '2023-03-10T10:30:00Z',
    updatedAt: '2023-04-15T14:22:00Z'
  },
  {
    id: '2',
    name: 'Daisy',
    species: 'cattle',
    breed: 'Angus',
    birthdate: '2022-11-20',
    purchaseDate: '2023-02-05',
    gender: 'female',
    tagNumber: 'C456',
    description: 'Good frame, needs work on muscle tone',
    notes: 'Good frame, needs work on muscle tone',
    showAnimal: true,
    purpose: 'show',
    weight: 450,
    imageUrl: '/placeholder.svg',
    createdAt: '2023-02-05T09:15:00Z',
    updatedAt: '2023-04-10T11:45:00Z'
  },
  {
    id: '3',
    name: 'Wilbur',
    species: 'pig',
    breed: 'Hampshire',
    birthdate: '2023-02-10',
    purchaseDate: '2023-04-01',
    gender: 'male',
    tagNumber: 'P789',
    description: 'Great temperament, working on weight gain',
    notes: 'Great temperament, working on weight gain',
    showAnimal: true,
    purpose: 'market',
    weight: 85,
    imageUrl: '/placeholder.svg',
    createdAt: '2023-04-01T15:45:00Z',
    updatedAt: '2023-04-18T16:30:00Z'
  }
];

export const mockWeights: WeightEntry[] = [
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

export const mockJournals: JournalEntry[] = [
  {
    id: 'j1',
    animalId: '1',
    date: '2023-03-16',
    title: 'New Environment',
    content: "Buddy is adjusting well to his new environment. He's very social and follows me around the pen.",
    tags: ['adjustment', 'behavior'],
    mood: 'positive'
  },
  {
    id: 'j2',
    animalId: '1',
    date: '2023-03-25',
    title: 'Feed Change',
    content: 'Started new feed mix today. Buddy seemed to enjoy it. Working on halter training.',
    tags: ['feed', 'training'],
    mood: 'positive'
  },
  {
    id: 'j3',
    animalId: '1',
    date: '2023-04-02',
    title: 'Show Practice',
    content: 'Had a practice session for the show. Buddy was a bit stubborn but eventually cooperated.',
    tags: ['training', 'showmanship'],
    mood: 'neutral'
  },
  {
    id: 'j4',
    animalId: '2',
    date: '2023-02-15',
    title: 'Settling In',
    content: 'Daisy is settling in well. She has a calm temperament and is easy to handle.',
    tags: ['adjustment', 'behavior'],
    mood: 'positive'
  },
  {
    id: 'j5',
    animalId: '3',
    date: '2023-04-08',
    title: 'New Feed',
    content: 'Wilbur loves his new feed. Working on getting him used to the show stick.',
    tags: ['feed', 'training'],
    mood: 'positive'
  }
];

export const mockExpenses: Expense[] = [
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

export const mockUser: User = {
  id: 'user1',
  email: 'demo@showtrackapp.com',
  firstName: 'Demo',
  lastName: 'User',
  subscriptionLevel: 'free',
  createdAt: '2023-01-01T00:00:00Z'
};

export const mockFeedingSchedules: FeedingSchedule[] = [
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
