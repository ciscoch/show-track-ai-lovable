export interface WeightAnalysis {
  weight?: number;
  message?: string;
}

export async function analyzeAnimalPhoto(file: File): Promise<WeightAnalysis> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://hf.space/embed/cwcharles81/showtrack-ai/api/predict/', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }

  return await response.json();
}
