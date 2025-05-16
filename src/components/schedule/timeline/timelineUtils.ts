
import { Animal } from "@/types/models";
import { addDays } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import { PrepTimeline } from "@/types/schedule";

/**
 * Generate default target weights for animals based on their species
 */
export const generateDefaultTargetWeights = (animals: Animal[], eventAnimalIds: string[]): {[key: string]: number} => {
  const weights: {[key: string]: number} = {};
  
  eventAnimalIds.forEach(animalId => {
    const animal = animals.find(a => a.id === animalId);
    if (animal) {
      // Set default target based on species
      switch(animal.species) {
        case 'goat': weights[animalId] = 100; break;
        case 'cattle': weights[animalId] = 1200; break;
        case 'pig': weights[animalId] = 280; break;
        case 'sheep': weights[animalId] = 140; break;
        default: weights[animalId] = 0;
      }
    }
  });
  
  return weights;
};

/**
 * Create a default timeline for an event
 */
export const createDefaultTimeline = (eventDate: Date): PrepTimeline => {
  return {
    finalWeighIn: addDays(eventDate, -1),
    hairTrimming: addDays(eventDate, -2),
    feedAdjustment: {
      type: "taper",
      startDate: addDays(eventDate, -7),
      notes: "Reduce feed gradually"
    },
    showmanshipPractices: [
      {
        id: uuidv4(),
        date: addDays(eventDate, -14),
        completed: false
      },
      {
        id: uuidv4(),
        date: addDays(eventDate, -7),
        completed: false
      }
    ],
    checklistItems: [
      { id: uuidv4(), item: "Show box", completed: false },
      { id: uuidv4(), item: "Trailer cleaned", completed: false },
      { id: uuidv4(), item: "Health papers", completed: false },
      { id: uuidv4(), item: "Registration papers", completed: false },
      { id: uuidv4(), item: "Feed for show", completed: false }
    ]
  };
};
