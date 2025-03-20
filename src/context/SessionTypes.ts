
export type BenefitCategory = "Focus" | "Relaxation" | "Creativity" | "Energy" | "Sleep";

export interface Track {
  id: string;
  name: string;
  frequency: string;
  description: string;
  category: BenefitCategory;
  subCategory: string;
  isFavorite: boolean;
}

export interface Session {
  track: Track | null;
  duration: number;
  startTime: Date | null;
  isActive: boolean;
}

export interface Stats {
  streak: number;
  lastVisit: Date | null;
  minutesListened: number;
  sessionsCompleted: number;
  topCategories: { category: BenefitCategory; count: number }[];
}
