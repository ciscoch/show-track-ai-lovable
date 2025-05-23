
import { Animal } from "@/types/models";

export interface AnalysisResult {
  weight?: number;
  message?: string;
}

export interface PhotoAnalysisProps {
  animal: Animal;
  isPremium: boolean;
}

export interface LidarScanProps {
  animal: Animal;
  isPremium: boolean;
}

export interface TimelineViewProps {
  animal: Animal;
  isPremium: boolean;
}
