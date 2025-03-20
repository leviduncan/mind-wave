
import { useState, useEffect } from 'react';
import { Track, Stats, Session, BenefitCategory } from './SessionTypes';

// Sample data
export const sampleTracks: Track[] = [
  {
    id: "1",
    name: "Gamma Focus",
    frequency: "40 Hz",
    description: "Gamma waves for enhanced focus and attention",
    category: "Focus",
    subCategory: "Deep Work",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Beta Concentration",
    frequency: "20 Hz",
    description: "Beta waves for active concentration and problem solving",
    category: "Focus",
    subCategory: "Study",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Alpha Calm",
    frequency: "10 Hz",
    description: "Alpha waves for relaxed alertness and creativity",
    category: "Relaxation",
    subCategory: "Light Relaxation",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Theta Meditation",
    frequency: "6 Hz",
    description: "Theta waves for deep meditation and intuition",
    category: "Relaxation",
    subCategory: "Deep Meditation",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Delta Sleep",
    frequency: "2 Hz",
    description: "Delta waves for deep sleep and healing",
    category: "Sleep",
    subCategory: "Deep Sleep",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Creative Alpha",
    frequency: "8 Hz",
    description: "Alpha waves for enhanced creativity and flow states",
    category: "Creativity",
    subCategory: "Flow State",
    isFavorite: false,
  },
  {
    id: "7",
    name: "Energy Boost",
    frequency: "15 Hz",
    description: "Beta waves for increased energy and alertness",
    category: "Energy",
    subCategory: "Morning Boost",
    isFavorite: false,
  },
  {
    id: "8",
    name: "Focus Flow",
    frequency: "12 Hz",
    description: "Alpha-Beta boundary for focused creativity",
    category: "Focus",
    subCategory: "Creative Focus",
    isFavorite: true,
  },
];

// Initial stats
const initialStats: Stats = {
  streak: 5,
  lastVisit: new Date(),
  minutesListened: 320,
  sessionsCompleted: 42,
  topCategories: [
    { category: "Focus", count: 25 },
    { category: "Relaxation", count: 15 },
    { category: "Sleep", count: 8 },
    { category: "Creativity", count: 5 },
    { category: "Energy", count: 3 },
  ],
};

// Initial session
const initialSession: Session = {
  track: null,
  duration: 0,
  startTime: null,
  isActive: false,
};

export function useAppState() {
  const [tracks, setTracks] = useState<Track[]>(sampleTracks);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [currentSession, setCurrentSession] = useState<Session>(initialSession);

  // Update streak on app load
  useEffect(() => {
    const today = new Date();
    const lastVisit = stats.lastVisit;
    
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const isYesterday = 
        today.getDate() - lastVisitDate.getDate() === 1 && 
        today.getMonth() === lastVisitDate.getMonth() && 
        today.getFullYear() === lastVisitDate.getFullYear();
      
      if (!isYesterday && today.getDate() !== lastVisitDate.getDate()) {
        // Reset streak if last visit wasn't yesterday or today
        setStats(prev => ({ ...prev, streak: 1 }));
      } else if (today.getDate() !== lastVisitDate.getDate()) {
        // Increment streak if last visit was yesterday
        setStats(prev => ({ ...prev, streak: prev.streak + 1 }));
      }
    }
    
    // Update last visit to today
    setStats(prev => ({ ...prev, lastVisit: today }));
  }, []);

  const toggleFavorite = (trackId: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, isFavorite: !track.isFavorite } : track
    ));
  };

  const startSession = (track: Track, duration: number) => {
    setCurrentSession({
      track,
      duration,
      startTime: new Date(),
      isActive: true,
    });
  };

  const endSession = () => {
    if (currentSession.isActive && currentSession.startTime && currentSession.track) {
      const now = new Date();
      const sessionDuration = Math.floor((now.getTime() - currentSession.startTime.getTime()) / 60000); // minutes
      
      // Update stats
      setStats(prev => ({
        ...prev,
        minutesListened: prev.minutesListened + sessionDuration,
        sessionsCompleted: prev.sessionsCompleted + 1,
        topCategories: prev.topCategories.map(tc => 
          tc.category === currentSession.track?.category 
            ? { ...tc, count: tc.count + 1 } 
            : tc
        ).sort((a, b) => b.count - a.count),
      }));
    }
    
    setCurrentSession({
      track: null,
      duration: 0,
      startTime: null,
      isActive: false,
    });
  };

  const selectCategory = (category: BenefitCategory) => {
    return tracks.filter(track => track.category === category);
  };

  const getSubCategories = (category: BenefitCategory) => {
    const categoryTracks = tracks.filter(track => track.category === category);
    return [...new Set(categoryTracks.map(track => track.subCategory))];
  };

  const getTracksBySubCategory = (category: BenefitCategory, subCategory: string) => {
    return tracks.filter(track => track.category === category && track.subCategory === subCategory);
  };

  const favorites = tracks.filter(track => track.isFavorite);
  
  // Get recently played tracks (in a real app, this would be tracked properly)
  const recentlyPlayed = [...tracks]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return {
    tracks,
    favorites,
    recentlyPlayed,
    stats,
    currentSession,
    toggleFavorite,
    startSession,
    endSession,
    selectCategory,
    getSubCategories,
    getTracksBySubCategory,
  };
}
