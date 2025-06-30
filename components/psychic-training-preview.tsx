import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Zap, Waves, Star, Brain, Sparkles } from 'lucide-react';

interface PsychicAbility {
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  level: number;
  maxLevel: number;
  color: string;
  exercises: string[];
}

export function PsychicTrainingPreview() {
  const [abilities, setAbilities] = useState<PsychicAbility[]>([
    {
      name: "Aura Reading",
      icon: Eye,
      description: "Perceiving energy fields around living beings",
      level: 2,
      maxLevel: 10,
      color: "from-purple-500 to-pink-500",
      exercises: ["Color meditation", "Peripheral vision training", "Energy sensing"]
    },
    {
      name: "Telekinesis",
      icon: Zap,
      description: "Moving objects with focused intention",
      level: 1,
      maxLevel: 10,
      color: "from-blue-500 to-cyan-500",
      exercises: ["Psi wheel practice", "Pendulum work", "Flame bending"]
    },
    {
      name: "Clairvoyance",
      icon: Star,
      description: "Seeing beyond physical limitations",
      level: 3,
      maxLevel: 10,
      color: "from-indigo-500 to-purple-500",
      exercises: ["Remote viewing", "Future glimpsing", "Past life reading"]
    },
    {
      name: "Telepathy",
      icon: Brain,
      description: "Mind-to-mind communication",
      level: 1,
      maxLevel: 10,
      color: "from-green-500 to-teal-500",
      exercises: ["Thought transmission", "Emotional sensing", "Dream sharing"]
    },
    {
      name: "Energy Healing",
      icon: Waves,
      description: "Channeling healing vibrations",
      level: 4,
      maxLevel: 10,
      color: "from-emerald-500 to-green-500",
      exercises: ["Chakra balancing", "Reiki channeling", "Crystal work"]
    },
    {
      name: "Astral Projection",
      icon: Sparkles,
      description: "Consciousness travel beyond the body",
      level: 2,
      maxLevel: 10,
      color: "from-violet-500 to-purple-500",
      exercises: ["OBE techniques", "Lucid dreaming", "Dimensional travel"]
    }
  ]);

  const [pulsingAbility, setPulsingAbility] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsingAbility(prev => (prev + 1) % abilities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [abilities.length]);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <Star className="w-6 h-6 text-indigo-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            VisionQuest Bot Preview
          </span>
          <Badge className="bg-purple-100 text-purple-800 border-purple-300">Coming Soon</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Develop your psychic abilities with AI-guided training and multidimensional awareness
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Psychic Abilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {abilities.map((ability, index) => {
            const Icon = ability.icon;
            const isPulsing = pulsingAbility === index;
            
            return (
              <div 
                key={ability.name} 
                className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                  isPulsing 
                    ? 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/30 scale-105' 
                    : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${ability.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {ability.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Level {ability.level}/{ability.maxLevel}
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  {ability.description}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${ability.color} transition-all duration-300`}
                    style={{ width: `${(ability.level / ability.maxLevel) * 100}%` }}
                  >
                    <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Exercise Preview */}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Next: {ability.exercises[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Training Features Preview */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">
            Advanced Training Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="text-indigo-600 dark:text-indigo-400 font-medium">Daily Exercises</div>
              <div className="text-gray-600 dark:text-gray-400">Personalized practice routines</div>
            </div>
            <div className="text-center">
              <div className="text-purple-600 dark:text-purple-400 font-medium">Progress Tracking</div>
              <div className="text-gray-600 dark:text-gray-400">Skill development analytics</div>
            </div>
            <div className="text-center">
              <div className="text-pink-600 dark:text-pink-400 font-medium">Community Circle</div>
              <div className="text-gray-600 dark:text-gray-400">Connect with other practitioners</div>
            </div>
          </div>
        </div>

        {/* Sample Training Conversation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            Sample Training Session
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>You:</strong> "I'm having trouble seeing auras clearly. They seem fuzzy."
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <p className="text-sm text-indigo-800 dark:text-indigo-200">
                <strong>VisionQuest:</strong> "That's completely normal at your level! Let's work on peripheral vision training. Try this: stare at a point just above someone's head while relaxing your eyes. The aura often appears in your peripheral vision first. Would you like me to guide you through a 5-minute exercise?"
              </p>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
              VisionQuest Bot - Magical Portal Preview
            </h3>
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
              This is a complete preview of the training system. To build the full AI bot with functional conversations and progress tracking, we'd need 4-6 weeks development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="font-medium text-green-700">✓ Preview Complete</div>
                <div className="text-gray-600">Interface, abilities, progress system</div>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="font-medium text-blue-700">→ Full Bot Development</div>
                <div className="text-gray-600">AI conversations, real progress tracking</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Join Development Waitlist - $4/month when ready
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}