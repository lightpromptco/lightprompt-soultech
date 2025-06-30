import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyMoodPromptProps {
  onSubmit: (moodData: MoodEntry) => void;
  onSkip: () => void;
}

interface MoodEntry {
  primary: string;
  secondary: string;
  depth: number;
  flow: number;
  resonance: number;
  growth: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  color: string;
  secondaryColor: string;
  reflection: string;
}

const moodOptions = {
  primary: [
    { name: 'Grounded', color: '#10b981', season: 'summer' },
    { name: 'Radiant', color: '#f59e0b', season: 'summer' },
    { name: 'Reflective', color: '#3b82f6', season: 'autumn' },
    { name: 'Transforming', color: '#ef4444', season: 'winter' },
    { name: 'Harmonious', color: '#10b981', season: 'spring' },
    { name: 'Luminous', color: '#8b5cf6', season: 'spring' },
    { name: 'Awakening', color: '#14b8a6', season: 'summer' },
    { name: 'Flowing', color: '#06b6d4', season: 'summer' },
    { name: 'Centered', color: '#65a30d', season: 'spring' },
    { name: 'Expanding', color: '#dc2626', season: 'winter' },
  ],
  secondary: [
    { name: 'Creative', color: '#8b5cf6' },
    { name: 'Deep', color: '#6366f1' },
    { name: 'Releasing', color: '#f97316' },
    { name: 'Balanced', color: '#14b8a6' },
    { name: 'Grateful', color: '#06b6d4' },
    { name: 'Curious', color: '#a855f7' },
    { name: 'Peaceful', color: '#059669' },
    { name: 'Energetic', color: '#ea580c' },
  ]
};

export function DailyMoodPrompt({ onSubmit, onSkip }: DailyMoodPromptProps) {
  const [selectedPrimary, setSelectedPrimary] = useState<typeof moodOptions.primary[0] | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<typeof moodOptions.secondary[0] | null>(null);
  const [dimensions, setDimensions] = useState({
    depth: 5,
    flow: 5,
    resonance: 5,
    growth: 5
  });
  const [reflection, setReflection] = useState('');
  const { toast } = useToast();

  const handleDimensionChange = (dimension: keyof typeof dimensions, value: number) => {
    setDimensions(prev => ({ ...prev, [dimension]: value }));
  };

  const handleSubmit = () => {
    if (!selectedPrimary || !selectedSecondary) {
      toast({
        title: "Please select your moods",
        description: "Choose both a primary and secondary emotion",
        variant: "destructive"
      });
      return;
    }

    const moodEntry: MoodEntry = {
      primary: selectedPrimary.name,
      secondary: selectedSecondary.name,
      depth: dimensions.depth,
      flow: dimensions.flow,
      resonance: dimensions.resonance,
      growth: dimensions.growth,
      season: selectedPrimary.season,
      color: selectedPrimary.color,
      secondaryColor: selectedSecondary.color,
      reflection
    };

    onSubmit(moodEntry);
    toast({
      title: "Soul ecosystem updated",
      description: "Your emotional landscape has been recorded"
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-gray-800 border-teal-200 dark:border-teal-800">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Today's Soul Check-In
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          How is your emotional ecosystem flowing today?
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Primary Emotion */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Primary Emotion</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {moodOptions.primary.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedPrimary?.name === mood.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPrimary(mood)}
                className={`h-auto py-2 ${selectedPrimary?.name === mood.name ? '' : 'hover:border-teal-300'}`}
                style={selectedPrimary?.name === mood.name ? { backgroundColor: mood.color, borderColor: mood.color } : {}}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">{mood.name}</div>
                  <div className="text-xs opacity-75">{mood.season === 'spring' ? '🌱' : mood.season === 'summer' ? '☀️' : mood.season === 'autumn' ? '🍂' : '❄️'}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Secondary Emotion */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Secondary Emotion</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {moodOptions.secondary.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedSecondary?.name === mood.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSecondary(mood)}
                className={selectedSecondary?.name === mood.name ? '' : 'hover:border-purple-300'}
                style={selectedSecondary?.name === mood.name ? { backgroundColor: mood.color, borderColor: mood.color } : {}}
              >
                {mood.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Dimensional Sliders */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Ecosystem Dimensions</h3>
          <TooltipProvider>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(dimensions).map(([dimension, value]) => {
                const tooltips = {
                  depth: "How profound or surface-level are your emotions? Deep reflection vs. light feelings.",
                  flow: "How easily are emotions moving through you? Stuck vs. flowing freely.",
                  resonance: "How aligned do you feel with yourself and your environment? Inner harmony level.",
                  growth: "What potential for expansion do you feel? Learning, healing, evolving energy."
                };
                
                return (
                  <div key={dimension} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <label className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                          {dimension}
                        </label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">{tooltips[dimension as keyof typeof tooltips]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{value}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={value}
                      onChange={(e) => handleDimensionChange(dimension as keyof typeof dimensions, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        </div>

        {/* Optional Reflection */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Today's Reflection (Optional)</h3>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What shaped your emotional landscape today?"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            rows={3}
          />
        </div>

        {/* Preview */}
        {selectedPrimary && selectedSecondary && (
          <div className="p-4 bg-gradient-to-r from-teal-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-teal-200 dark:border-teal-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedPrimary.color }}></div>
                <span className="font-medium text-gray-900 dark:text-white">{selectedPrimary.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedSecondary.color }}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedSecondary.name}</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Ecosystem balanced at depth {dimensions.depth}, flow {dimensions.flow}, resonance {dimensions.resonance}, growth {dimensions.growth}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button onClick={handleSubmit} className="flex-1 bg-teal-600 hover:bg-teal-700">
            Update My Ecosystem
          </Button>
          <Button variant="outline" onClick={onSkip} className="flex-1">
            Skip Today
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}