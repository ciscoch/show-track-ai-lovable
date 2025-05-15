
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
      return 'bg-blue-500';
    case 'goat':
      return 'bg-livestock-green-500';
    case 'sheep':
      return 'bg-purple-500';
    case 'pig':
      return 'bg-barn-red-500';
    default:
      return 'bg-gray-500';
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
