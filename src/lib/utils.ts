
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getColorBySpecies(species: string) {
  switch (species) {
    case 'cattle':
      return 'bg-western-turquoise-500';
    case 'goat':
      return 'bg-livestock-green-500';
    case 'sheep':
      return 'bg-purple-500';
    case 'pig':
      return 'bg-barn-red-500';
    default:
      return 'bg-rodeo-leather-500';
  }
}

export function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const now = new Date();
  
  // Calculate difference in milliseconds
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  
  // Calculate months
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  
  if (diffMonths < 1) {
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return `${years} year${years !== 1 ? 's' : ''} ${months ? `${months} month${months !== 1 ? 's' : ''}` : ''}`;
  }
}

// New rodeo-themed utility functions
export function getRodeoRankColor(rank: number) {
  if (rank === 1) return 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900';
  if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
  if (rank === 3) return 'bg-gradient-to-r from-rodeo-leather-300 to-rodeo-leather-400 text-rodeo-leather-800';
  return 'bg-desert-sand-100 text-desert-sand-800';
}

export function getWesternThemeClass(theme: 'leather' | 'turquoise' | 'sand' = 'leather') {
  switch (theme) {
    case 'leather':
      return 'bg-rodeo-leather-100 border-rodeo-leather-300 text-rodeo-leather-900';
    case 'turquoise':
      return 'bg-western-turquoise-100 border-western-turquoise-300 text-western-turquoise-900';
    case 'sand':
      return 'bg-desert-sand-100 border-desert-sand-300 text-desert-sand-900';
    default:
      return 'bg-rodeo-leather-100 border-rodeo-leather-300 text-rodeo-leather-900';
  }
}

export function getBuckleStyle(type: string) {
  switch (type) {
    case 'champion':
      return 'bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 border-2 border-yellow-600';
    case 'reserve':
      return 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 border-2 border-gray-500';
    case 'showmanship':
      return 'bg-gradient-to-r from-western-turquoise-300 via-western-turquoise-200 to-western-turquoise-300 border-2 border-western-turquoise-600';
    default:
      return 'bg-gradient-to-r from-rodeo-leather-300 via-rodeo-leather-200 to-rodeo-leather-300 border-2 border-rodeo-leather-600';
  }
}
