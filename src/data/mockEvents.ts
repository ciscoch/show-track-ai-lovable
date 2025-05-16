
import { ShowEvent } from "@/types/schedule";

export const mockEvents: ShowEvent[] = [
  {
    id: "e1",
    title: "County Fair",
    date: new Date(new Date().setDate(new Date().getDate() + 15)),
    location: "County Fairgrounds",
    animals: ["1", "2"],
    category: "show",
    notes: "Main ring at 10am. Check-in by 8am.",
    reminder: true,
  },
  {
    id: "e2",
    title: "Practice Session",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    location: "Smith's Farm",
    animals: ["1", "3"],
    category: "practice",
    notes: "Focus on showmanship techniques",
  },
  {
    id: "e3",
    title: "Vet Appointment",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    location: "Dr. Wilson's Office",
    animals: ["2"],
    category: "appointment",
    notes: "Annual checkup and vaccinations",
    reminder: true,
  },
  {
    id: "e4",
    title: "State Fair",
    date: new Date(new Date().setDate(new Date().getDate() + 45)),
    location: "State Fairgrounds",
    animals: ["1", "2", "3"],
    category: "show",
    notes: "Arrival day June 15, show on June 16.",
    reminder: true,
  }
];
