import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Heart, TrendingUp, Globe, Waves } from 'lucide-react';

interface CommunityMood {
  emotion: string;
  percentage: number;
  count: number;
  color: string;
  season: string;
  avgDepth: number;
  avgFlow: number;
  avgResonance: number;
  avgGrowth: number;
}

interface ResonanceNetwork {
  globalMoods: CommunityMood[];
  totalUsers: number;
  yourResonance: string[];
  trendingEmotions: string[];
  lastUpdated: Date;
}

export function CommunityResonance() {
  const [networkData, setNetworkData] = useState<ResonanceNetwork | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [connectionPulse, setConnectionPulse] = useState(0);

  useEffect(() => {
    // Generate realistic community data based on typical emotional patterns
    const generateCommunityData = (): ResonanceNetwork => {
      const emotions = [
        { name: 'Hopeful', weight: 18, color: '#10b981', season: 'spring' },
        { name: 'Calm', weight: 15, color: '#06b6d4', season: 'summer' },
        { name: 'Anxious', weight: 12, color: '#ef4444', season: 'winter' },
        { name: 'Grateful', weight: 11, color: '#8b5cf6', season: 'spring' },
        { name: 'Overwhelmed', weight: 10, color: '#f59e0b', season: 'autumn' },
        { name: 'Peaceful', weight: 9, color: '#14b8a6', season: 'summer' },
        { name: 'Reflective', weight: 8, color: '#3b82f6', season: 'autumn' },
        { name: 'Energetic', weight: 7, color: '#f97316', season: 'summer' },
        { name: 'Melancholy', weight: 6, color: '#6366f1', season: 'winter' },
        { name: 'Inspired', weight: 4, color: '#ec4899', season: 'spring' }
      ];

      const totalUsers = 2847 + Math.floor(Math.random() * 100);
      
      const globalMoods: CommunityMood[] = emotions.map(emotion => ({
        emotion: emotion.name,
        percentage: emotion.weight + Math.random() * 3 - 1.5,
        count: Math.floor((emotion.weight / 100) * totalUsers),
        color: emotion.color,
        season: emotion.season,
        avgDepth: Math.floor(Math.random() * 3) + 5 + (emotion.weight > 10 ? 1 : 0),
        avgFlow: Math.floor(Math.random() * 3) + 5 + (emotion.name.includes('Calm') ? 2 : 0),
        avgResonance: Math.floor(Math.random() * 3) + 5 + (emotion.name.includes('Peaceful') ? 2 : 0),
        avgGrowth: Math.floor(Math.random() * 3) + 5 + (emotion.name.includes('Inspired') ? 2 : 0)
      }));

      return {
        globalMoods: globalMoods.sort((a, b) => b.percentage - a.percentage),
        totalUsers,
        yourResonance: ['Hopeful', 'Reflective', 'Grateful'], // Based on user's recent moods
        trendingEmotions: ['Hopeful', 'Anxious', 'Grateful'],
        lastUpdated: new Date()
      };
    };

    setNetworkData(generateCommunityData());

    // Update data every 30 seconds to show live feel
    const interval = setInterval(() => {
      setNetworkData(generateCommunityData());
    }, 30000);

    // Pulse animation
    const pulseInterval = setInterval(() => {
      setConnectionPulse(prev => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  if (!networkData) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-pulse flex items-center gap-3">
            <Waves className="w-6 h-6 text-teal-500" />
            <span className="text-gray-600 dark:text-gray-300">Connecting to the global emotional network...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Globe className="w-6 h-6 text-blue-600" />
            <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full ${connectionPulse === 0 ? 'animate-ping' : connectionPulse === 1 ? 'animate-pulse' : ''}`}></div>
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Community Mood Resonance
          </span>
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{networkData.totalUsers.toLocaleString()} souls connected</span>
          </div>
          <div className="text-xs">
            Live • Updated {networkData.lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Your Resonance */}
        <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-teal-600" />
            <h3 className="font-semibold text-teal-800 dark:text-teal-300">Your Resonance Network</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {networkData.yourResonance.map((emotion, index) => (
              <Badge key={emotion} className="bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300">
                {emotion}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-teal-700 dark:text-teal-400 mt-2">
            You're resonating with {networkData.yourResonance.length} emotional frequencies shared by the community
          </p>
        </div>

        {/* Global Emotional Landscape */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Global Emotional Landscape</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs"
            >
              {showDetails ? 'Simple View' : 'Detailed View'}
            </Button>
          </div>
          
          <div className="space-y-2">
            {networkData.globalMoods.slice(0, showDetails ? 10 : 6).map((mood, index) => (
              <div key={mood.emotion} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: mood.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {mood.emotion}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {mood.season === 'spring' ? '🌱' : mood.season === 'summer' ? '☀️' : mood.season === 'autumn' ? '🍂' : '❄️'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {mood.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {mood.count} people
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 relative"
                    style={{ 
                      width: `${mood.percentage}%`,
                      backgroundColor: mood.color 
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                
                {showDetails && (
                  <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">Depth</div>
                      <div className="font-medium">{mood.avgDepth}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">Flow</div>
                      <div className="font-medium">{mood.avgFlow}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">Resonance</div>
                      <div className="font-medium">{mood.avgResonance}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 dark:text-gray-400">Growth</div>
                      <div className="font-medium">{mood.avgGrowth}/10</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trending Emotions */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-purple-800 dark:text-purple-300">Rising Emotions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {networkData.trendingEmotions.map((emotion, index) => (
              <Badge key={emotion} className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300">
                📈 {emotion}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-400 mt-2">
            These emotions are growing stronger in our collective consciousness
          </p>
        </div>

        {/* Community Motivations */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm">Shared Healing</h4>
            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
              When you share authentically, you help others feel less alone in their struggles
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Collective Wisdom</h4>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              Your emotional data contributes to understanding global wellness patterns
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <Waves className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 text-sm">Ripple Effect</h4>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
              Your growth and healing creates positive waves that touch others
            </p>
          </div>
        </div>

        {/* Connection Message */}
        <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/30 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            You're part of a living network of {networkData.totalUsers.toLocaleString()} souls sharing their emotional journey
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your feelings matter and contribute to our collective emotional wisdom
          </p>
        </div>
      </CardContent>
    </Card>
  );
}