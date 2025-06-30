import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMoodTracking } from '@/hooks/useMoodTracking';
import { Plus } from 'lucide-react';

interface EmotionalEcosystem {
  date: string;
  primary: string;
  secondary: string;
  depth: number;
  flow: number;
  resonance: number;
  growth: number;
  color: string;
  secondaryColor: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

interface MoodChartProps {
  onOpenPrompt?: () => void;
}

export function MoodChart({ onOpenPrompt }: MoodChartProps) {
  const { moodEntries, hasCheckedInToday } = useMoodTracking();
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert mood entries to ecosystem format
  const soulEcosystemData: EmotionalEcosystem[] = moodEntries.map((entry, index) => {
    const date = new Date(entry.date);
    const isToday = date.toDateString() === new Date().toDateString();
    return {
      date: isToday ? 'Now' : `${date.getMonth() + 1}/${date.getDate()}`,
      primary: entry.primary,
      secondary: entry.secondary,
      depth: entry.depth,
      flow: entry.flow,
      resonance: entry.resonance,
      growth: entry.growth,
      color: entry.color,
      secondaryColor: entry.secondaryColor,
      season: entry.season
    };
  });

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring': return '🌱';
      case 'summer': return '☀️';
      case 'autumn': return '🍂';
      case 'winter': return '❄️';
      default: return '🌿';
    }
  };

  const createOrganicPath = (data: EmotionalEcosystem[], dimension: keyof Pick<EmotionalEcosystem, 'depth' | 'flow' | 'resonance' | 'growth'>) => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 280;
      const y = 120 - (d[dimension] / 10) * 100;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white/95 to-teal-50/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            Soul Ecosystem Map
          </div>
          {!hasCheckedInToday && onOpenPrompt && (
            <Button
              size="sm"
              onClick={onOpenPrompt}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Check In
            </Button>
          )}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Your emotional landscape as a living, breathing ecosystem
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Ecosystem Visualization */}
        <div className="relative mb-6">
          <svg width="100%" height="140" viewBox="0 0 300 140" className="overflow-visible">
            {/* Background organic shapes */}
            <defs>
              <radialGradient id="ecosystemGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(20 184 166 / 0.1)" />
                <stop offset="100%" stopColor="rgb(139 92 246 / 0.1)" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Organic background */}
            <ellipse cx="150" cy="70" rx="140" ry="60" fill="url(#ecosystemGradient)" opacity="0.3" />
            
            {/* Multi-dimensional flow lines */}
            {soulEcosystemData.length > 1 && (
              <>
                <path 
                  d={createOrganicPath(soulEcosystemData, 'depth')} 
                  stroke="rgb(59 130 246 / 0.6)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#glow)"
                  className="animate-pulse"
                />
                <path 
                  d={createOrganicPath(soulEcosystemData, 'flow')} 
                  stroke="rgb(16 185 129 / 0.6)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#glow)"
                />
                <path 
                  d={createOrganicPath(soulEcosystemData, 'resonance')} 
                  stroke="rgb(139 92 246 / 0.6)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#glow)"
                />
              </>
            )}
            
            {/* Emotional nodes */}
            {soulEcosystemData.map((day, index) => {
              const x = (index / (soulEcosystemData.length - 1)) * 280 + 10;
              const y = 120 - (day.depth / 10) * 100 + 10;
              const isHovered = hoveredDay === index;
              
              return (
                <g key={index}>
                  {/* Node glow effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 20 : 15}
                    fill={day.color}
                    opacity="0.2"
                    className="transition-all duration-300"
                  />
                  {/* Main node */}
                  <circle
                    cx={x}
                    cy={y}
                    r={8}
                    fill={day.color}
                    stroke={day.secondaryColor}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300 hover:scale-125"
                    filter="url(#glow)"
                    onMouseEnter={() => setHoveredDay(index)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                  {/* Season indicator */}
                  <text x={x} y={y - 25} textAnchor="middle" className="text-xs">
                    {getSeasonIcon(day.season)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Current state display */}
        {hoveredDay !== null && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-teal-200 dark:border-teal-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {soulEcosystemData[hoveredDay].date}
              </span>
              <span className="text-sm px-2 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600">
                {getSeasonIcon(soulEcosystemData[hoveredDay].season)} {soulEcosystemData[hoveredDay].season}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                <div className="font-medium text-sm text-gray-700 dark:text-gray-200">Primary</div>
                <div className="font-bold text-gray-900 dark:text-white" style={{ color: soulEcosystemData[hoveredDay].color }}>
                  {soulEcosystemData[hoveredDay].primary}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-sm text-gray-700 dark:text-gray-200">Secondary</div>
                <div className="font-bold text-gray-900 dark:text-white" style={{ color: soulEcosystemData[hoveredDay].secondaryColor }}>
                  {soulEcosystemData[hoveredDay].secondary}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dimensional breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {['depth', 'flow', 'resonance', 'growth'].map((dimension) => {
            const colors = {
              depth: 'from-blue-500 to-indigo-600',
              flow: 'from-green-500 to-emerald-600', 
              resonance: 'from-purple-500 to-violet-600',
              growth: 'from-orange-500 to-amber-600'
            };
            
            const currentValue = soulEcosystemData.length > 0 ? 
              soulEcosystemData[soulEcosystemData.length - 1][dimension as keyof EmotionalEcosystem] as number : 
              5;
            
            return (
              <div key={dimension} className="text-center">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 capitalize">
                  {dimension}
                </div>
                <div className={`h-2 bg-gradient-to-r ${colors[dimension as keyof typeof colors]} rounded-full mx-auto relative overflow-hidden`} style={{ width: `${currentValue * 8}%` }}>
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
                <div className="text-xs font-bold mt-1 text-gray-700 dark:text-gray-200">
                  {currentValue}/10
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 text-center">
          <p className="text-xs text-gray-700 dark:text-gray-200 mb-2 font-medium">
            Living ecosystem • Updated {currentTime.toLocaleTimeString()}
          </p>
          {soulEcosystemData.length === 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              Start your first check-in to see your emotional ecosystem flourish
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}