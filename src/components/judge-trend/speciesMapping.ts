
export const mapSpeciesToInsightFormat = (species: string): string => {
  const speciesMap: Record<string, string> = {
    'cattle': 'Beef Cattle',
    'cow': 'Beef Cattle',
    'beef': 'Beef Cattle',
    'steer': 'Beef Cattle',
    'heifer': 'Beef Cattle',
    'pig': 'Swine',
    'hog': 'Swine',
    'swine': 'Swine',
    'sheep': 'Sheep',
    'lamb': 'Sheep',
    'goat': 'Goats',
    'horse': 'Horses',
    'pony': 'Horses'
  };
  
  const lowerCaseSpecies = species.toLowerCase();
  for (const key in speciesMap) {
    if (lowerCaseSpecies.includes(key)) {
      return speciesMap[key];
    }
  }
  return 'Beef Cattle'; // Default if no match is found
};
