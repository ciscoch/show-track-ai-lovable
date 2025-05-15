
import { Badge } from "@/types/models";

// Mock data - in a real app, this would come from an API
export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first users to join Stock Show Manager",
    icon: "award",
    earnedAt: "2025-01-15",
    category: "special",
    type: "gold",
    year: 2025
  },
  // Weight Tracking Badges
  {
    id: "2",
    name: "Weight Tracking Streak - 7 Days",
    description: "Logged animal weights for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-10",
    category: "streak",
    type: "bronze",
    year: 2025
  },
  {
    id: "6",
    name: "Weight Tracking Streak - 14 Days",
    description: "Logged animal weights for 14 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-17",
    category: "streak",
    type: "silver",
    year: 2025
  },
  {
    id: "7",
    name: "Weight Tracking Streak - 30 Days",
    description: "Logged animal weights for 30 consecutive days",
    icon: "trophy",
    earnedAt: null,
    category: "streak",
    type: "gold",
    year: 2025
  },
  // Feed Logging Badges
  {
    id: "3",
    name: "Feed Logging Streak - 7 Days",
    description: "Recorded feeding schedules for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-25",
    category: "streak",
    type: "bronze",
    year: 2025
  },
  {
    id: "8",
    name: "Feed Logging Streak - 14 Days",
    description: "Recorded feeding schedules for 14 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-05",
    category: "streak",
    type: "silver",
    year: 2025
  },
  {
    id: "9",
    name: "Feed Logging Streak - 30 Days",
    description: "Recorded feeding schedules for 30 consecutive days",
    icon: "trophy",
    earnedAt: null,
    category: "streak",
    type: "gold",
    year: 2025
  },
  {
    id: "4",
    name: "Master Tracker",
    description: "Logged expenses at least once per week for 30 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-31",
    category: "streak",
    type: "gold",
    year: 2025
  },
  {
    id: "5",
    name: "Show Champion",
    description: "Won first place at a livestock show",
    icon: "award",
    earnedAt: null,
    category: "achievement",
    type: "platinum",
    year: 2025
  },
  // New Buckle Categories
  {
    id: "10",
    name: "Muscle-Up Buckle",
    description: "Gain 15+ lbs muscle mass (AI detected)",
    icon: "dumbbell",
    earnedAt: "2025-04-10",
    category: "muscle-up",
    type: "gold",
    year: 2025
  },
  {
    id: "11",
    name: "Glow-Up Buckle",
    description: "Upload 12 progress photos over 3+ months",
    icon: "camera",
    earnedAt: "2025-03-25",
    category: "glow-up",
    type: "silver",
    year: 2025
  },
  {
    id: "12",
    name: "Body Boss Buckle",
    description: "Reach \"Show Ready\" AI score of 95%+",
    icon: "medal",
    earnedAt: null,
    category: "body-boss",
    type: "platinum",
    year: 2025
  },
  // New Show Achievement Buckles
  {
    id: "13",
    name: "Ring Debut Buckle",
    description: "Log your first show",
    icon: "star",
    earnedAt: "2025-04-15",
    category: "ring-debut",
    type: "bronze",
    year: 2025
  },
  {
    id: "14",
    name: "Top 3 Finisher Buckle",
    description: "Win 1st–3rd in class or breed",
    icon: "medal",
    earnedAt: "2025-04-20",
    category: "top-3",
    type: "silver",
    year: 2025
  },
  {
    id: "15",
    name: "Champion Buckle",
    description: "Verified Grand/Reserve win (upload proof or partner verification)",
    icon: "trophy",
    earnedAt: null,
    category: "champion",
    type: "platinum",
    year: 2025
  },
  // New Education and Skill Buckles
  {
    id: "16",
    name: "Feed Smart Buckle",
    description: "Complete 5 feed plan challenges",
    icon: "book",
    earnedAt: "2025-04-25",
    category: "feed-smart",
    type: "silver",
    year: 2025
  },
  {
    id: "17",
    name: "Showmanship Scholar",
    description: "Watch 10 showmanship tip videos",
    icon: "file-text",
    earnedAt: "2025-05-01",
    category: "showmanship-scholar",
    type: "gold",
    year: 2025
  },
  {
    id: "18",
    name: "Quiz Master Buckle",
    description: "Score 100% on 3 livestock judging quizzes",
    icon: "file-check",
    earnedAt: null,
    category: "quiz-master",
    type: "bronze",
    year: 2025
  }
];
