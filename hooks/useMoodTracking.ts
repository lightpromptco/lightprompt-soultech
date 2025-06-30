import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface MoodEntry {
  id: string;
  date: string;
  primary: string;
  secondary: string;
  depth: number;
  flow: number;
  resonance: number;
  growth: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  color: string;
  secondaryColor: string;
  reflection?: string;
  userId?: string;
}

export function useMoodTracking() {
  const { user, isAuthenticated } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [showDailyPrompt, setShowDailyPrompt] = useState(false);

  // Check if user has checked in today
  useEffect(() => {
    const today = new Date().toDateString();
    const todayEntry = moodEntries.find(entry => 
      new Date(entry.date).toDateString() === today
    );
    setHasCheckedInToday(!!todayEntry);

    // Show prompt if authenticated and hasn't checked in today
    if (isAuthenticated && !todayEntry && moodEntries.length > 0) {
      // Show prompt after a delay to not overwhelm new users
      const timer = setTimeout(() => setShowDailyPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [moodEntries, isAuthenticated]);

  // Load mood entries
  useEffect(() => {
    loadMoodEntries();
  }, [user]);

  const loadMoodEntries = async () => {
    try {
      const storageKey = isAuthenticated && user ? `mood_entries_${user.id}` : 'mood_entries_guest';
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setMoodEntries(JSON.parse(stored));
      } else {
        // Initialize with sample data for demo
        initializeSampleData();
      }
    } catch (error) {
      console.error('Failed to load mood entries:', error);
      initializeSampleData();
    }
  };

  const initializeSampleData = () => {
    const sampleData: MoodEntry[] = [
      {
        id: '1',
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Grounded',
        secondary: 'Flowing',
        depth: 7,
        flow: 8,
        resonance: 6,
        growth: 5,
        color: '#10b981',
        secondaryColor: '#06b6d4',
        season: 'summer'
      },
      {
        id: '2',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Radiant',
        secondary: 'Creative',
        depth: 9,
        flow: 9,
        resonance: 8,
        growth: 9,
        color: '#f59e0b',
        secondaryColor: '#8b5cf6',
        season: 'summer'
      },
      {
        id: '3',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Reflective',
        secondary: 'Deep',
        depth: 8,
        flow: 4,
        resonance: 9,
        growth: 7,
        color: '#3b82f6',
        secondaryColor: '#6366f1',
        season: 'autumn'
      },
      {
        id: '4',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Transforming',
        secondary: 'Releasing',
        depth: 5,
        flow: 3,
        resonance: 4,
        growth: 8,
        color: '#ef4444',
        secondaryColor: '#f97316',
        season: 'winter'
      },
      {
        id: '5',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Harmonious',
        secondary: 'Balanced',
        depth: 8,
        flow: 7,
        resonance: 9,
        growth: 6,
        color: '#10b981',
        secondaryColor: '#14b8a6',
        season: 'spring'
      },
      {
        id: '6',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        primary: 'Luminous',
        secondary: 'Expanding',
        depth: 9,
        flow: 8,
        resonance: 7,
        growth: 9,
        color: '#8b5cf6',
        secondaryColor: '#ec4899',
        season: 'spring'
      }
    ];
    setMoodEntries(sampleData);
  };

  const saveMoodEntry = async (newEntry: Omit<MoodEntry, 'id' | 'date' | 'userId'>) => {
    const entry: MoodEntry = {
      ...newEntry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      userId: user?.id
    };

    const updatedEntries = [...moodEntries, entry];
    setMoodEntries(updatedEntries);

    // Save to localStorage
    try {
      const storageKey = isAuthenticated && user ? `mood_entries_${user.id}` : 'mood_entries_guest';
      localStorage.setItem(storageKey, JSON.stringify(updatedEntries));
      
      // Always save to server (handles both authenticated and guest users)
      try {
        const response = await fetch('/api/mood-entries', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': user ? `Bearer ${localStorage.getItem('auth_token')}` : ''
          },
          body: JSON.stringify({
            primary: entry.primary,
            secondary: entry.secondary,
            depth: entry.depth,
            flow: entry.flow,
            resonance: entry.resonance,
            growth: entry.growth,
            season: entry.season,
            color: entry.color,
            secondaryColor: entry.secondaryColor,
            reflection: entry.reflection
          })
        });
        
        if (!response.ok) {
          console.warn('Failed to save to server, keeping local copy');
        }
      } catch (error) {
        console.warn('Server save failed, mood saved locally:', error);
      }
    } catch (error) {
      console.error('Failed to save mood entry:', error);
    }

    setShowDailyPrompt(false);
    setHasCheckedInToday(true);
  };

  const getRecentEntries = (days: number = 7) => {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return moodEntries
      .filter(entry => new Date(entry.date) >= cutoff)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getCurrentMood = () => {
    const today = new Date().toDateString();
    return moodEntries.find(entry => 
      new Date(entry.date).toDateString() === today
    );
  };

  return {
    moodEntries: getRecentEntries(),
    allEntries: moodEntries,
    hasCheckedInToday,
    showDailyPrompt,
    currentMood: getCurrentMood(),
    saveMoodEntry,
    dismissDailyPrompt: () => setShowDailyPrompt(false),
    triggerDailyPrompt: () => setShowDailyPrompt(true)
  };
}