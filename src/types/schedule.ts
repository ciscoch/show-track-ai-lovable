
export interface ShowEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  animals: string[];
  category: "show" | "practice" | "appointment" | "other";
  notes?: string;
  reminder?: boolean;
  prepTimeline?: PrepTimeline;
}

export interface PrepTimeline {
  finalWeighIn?: Date;
  hairTrimming?: Date;
  feedAdjustment?: {
    type: "taper" | "boost";
    startDate: Date;
    notes?: string;
  };
  showmanshipPractices?: Array<{
    id: string;
    date: Date;
    completed: boolean;
  }>;
  checklistItems?: Array<{
    id: string;
    item: string;
    completed: boolean;
  }>;
  targetWeightGoal?: number;
}
