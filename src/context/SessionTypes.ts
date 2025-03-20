
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

export interface AppContextType {
  tracks: Track[];
  favorites: Track[];
  recentlyPlayed: Track[];
  stats: Stats;
  currentSession: Session;
  toggleFavorite: (trackId: string) => void;
  startSession: (track: Track, duration: number) => void;
  endSession: () => void;
  selectCategory: (category: BenefitCategory) => Track[];
  getSubCategories: (category: BenefitCategory) => string[];
  getTracksBySubCategory: (category: BenefitCategory, subCategory: string) => Track[];
}
