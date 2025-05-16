
export interface ShowEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  animals: string[];
  category: "show" | "practice" | "appointment" | "other";
  notes?: string;
  reminder?: boolean;
}
