import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gamepad2, Target, Zap, Trophy, Heart, Brain, Shield, Star, Sword, Crown } from 'lucide-react';

interface LifeQuest {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'epic' | 'legendary';
  difficulty: 1 | 2 | 3 | 4 | 5;
  xp: number;
  status: 'active' | 'completed' | 'failed' | 'locked';
  progress: number;
  maxProgress: number;
  timeLeft?: string;
  rewards: string[];
  triggerType: 'challenge' | 'growth' | 'healing' | 'adventure';
}

interface PlayerStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  health: number;
  energy: number;
  wisdom: number;
  resilience: number;
  activeQuests: number;
  completedQuests: number;
  title: string;
}

export function LifeGamification() {
  const [activeTab, setActiveTab] = useState<'quests' | 'stats' | 'achievements'>('quests');
  
  const [playerStats] = useState<PlayerStats>({
    level: 23,
    xp: 2840,
    nextLevelXp: 3000,
    health: 85,
    energy: 70,
    wisdom: 78,
    resilience: 92,
    activeQuests: 6,
    completedQuests: 147,
    title: "Soul Seeker"
  });

  const [quests] = useState<LifeQuest[]>([
    {
      id: "morning-ritual",
      title: "Sacred Morning Ritual",
      description: "Complete your morning routine mindfully for 7 days",
      category: 'weekly',
      difficulty: 2,
      xp: 150,
      status: 'active',
      progress: 5,
      maxProgress: 7,
      timeLeft: "2 days",
      rewards: ["Energy +10", "Wisdom +5", "Morning Warrior Badge"],
      triggerType: 'growth'
    },
    {
      id: "anxiety-boss",
      title: "Defeat the Anxiety Boss",
      description: "Use breathing techniques when anxiety hits instead of avoiding",
      category: 'daily',
      difficulty: 3,
      xp: 75,
      status: 'active',
      progress: 2,
      maxProgress: 3,
      timeLeft: "Today",
      rewards: ["Resilience +15", "Calm Mind Potion"],
      triggerType: 'challenge'
    },
    {
      id: "difficult-conversation",
      title: "The Difficult Conversation Quest",
      description: "Have that hard conversation you've been avoiding",
      category: 'epic',
      difficulty: 4,
      xp: 300,
      status: 'active',
      progress: 0,
      maxProgress: 1,
      rewards: ["Communication Mastery", "Courage +20", "Relationship XP"],
      triggerType: 'growth'
    },
    {
      id: "creative-flow",
      title: "Enter the Creative Flow State",
      description: "Spend 2 hours in pure creative expression without distractions",
      category: 'weekly',
      difficulty: 2,
      xp: 100,
      status: 'completed',
      progress: 2,
      maxProgress: 2,
      rewards: ["Creativity +10", "Flow State Badge", "Inspiration Boost"],
      triggerType: 'adventure'
    },
    {
      id: "self-compassion",
      title: "Practice Self-Compassion",
      description: "Treat yourself with kindness after making a mistake",
      category: 'daily',
      difficulty: 3,
      xp: 80,
      status: 'active',
      progress: 1,
      maxProgress: 1,
      timeLeft: "Today",
      rewards: ["Self-Love +15", "Inner Peace Potion"],
      triggerType: 'healing'
    },
    {
      id: "fear-dragon",
      title: "Slay the Fear Dragon",
      description: "Do something that scares you but moves you toward your dreams",
      category: 'legendary',
      difficulty: 5,
      xp: 500,
      status: 'locked',
      progress: 0,
      maxProgress: 1,
      rewards: ["Fearless Badge", "Courage +30", "Dream Manifestation Boost"],
      triggerType: 'challenge'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'challenge': return Sword;
      case 'growth': return Star;
      case 'healing': return Heart;
      case 'adventure': return Crown;
      default: return Target;
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < difficulty ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Gamepad2 className="w-6 h-6 text-purple-600" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Life Gamification System
          </span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Turn life's challenges into epic quests. Every trigger is a boss fight, every growth moment is XP gained.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Player Level Header */}
        <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {playerStats.level}
              </div>
              <div>
                <h3 className="font-bold text-purple-800 dark:text-purple-300">Level {playerStats.level} {playerStats.title}</h3>
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  {playerStats.xp}/{playerStats.nextLevelXp} XP to next level
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-700">{playerStats.xp}</div>
              <div className="text-xs text-purple-600">Total XP</div>
            </div>
          </div>
          <Progress value={(playerStats.xp / playerStats.nextLevelXp) * 100} className="h-3" />
        </div>

        {/* Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'quests', label: 'Active Quests', icon: Target },
            { id: 'stats', label: 'Character Stats', icon: Zap },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Quests Tab */}
        {activeTab === 'quests' && (
          <div className="space-y-4">
            {quests.map((quest) => {
              const TriggerIcon = getTriggerIcon(quest.triggerType);
              
              return (
                <div 
                  key={quest.id}
                  className={`p-4 rounded-lg border-2 ${
                    quest.status === 'completed' ? 'border-green-300 bg-green-50 dark:bg-green-900/20' :
                    quest.status === 'locked' ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 opacity-60' :
                    'border-purple-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <TriggerIcon className={`w-5 h-5 mt-1 ${
                        quest.status === 'completed' ? 'text-green-600' :
                        quest.status === 'locked' ? 'text-gray-400' :
                        'text-purple-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{quest.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{quest.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getCategoryColor(quest.category)}>
                        {quest.category}
                      </Badge>
                      <div className="text-sm font-semibold text-purple-600 mt-1">{quest.xp} XP</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Difficulty:</span>
                    <div className="flex gap-1">{getDifficultyStars(quest.difficulty)}</div>
                    {quest.timeLeft && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-orange-600">{quest.timeLeft}</span>
                      </>
                    )}
                  </div>
                  
                  {quest.status !== 'locked' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{quest.progress}/{quest.maxProgress}</span>
                      </div>
                      <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {quest.rewards.map((reward, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Character Stats Tab */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Core Attributes</h3>
              
              {[
                { name: 'Health', value: playerStats.health, max: 100, color: 'text-red-600', icon: Heart },
                { name: 'Energy', value: playerStats.energy, max: 100, color: 'text-yellow-600', icon: Zap },
                { name: 'Wisdom', value: playerStats.wisdom, max: 100, color: 'text-blue-600', icon: Brain },
                { name: 'Resilience', value: playerStats.resilience, max: 100, color: 'text-green-600', icon: Shield }
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.name} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="font-medium text-gray-900 dark:text-white">{stat.name}</span>
                      </div>
                      <span className={`font-bold ${stat.color}`}>{stat.value}/{stat.max}</span>
                    </div>
                    <Progress value={stat.value} className="h-2" />
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Quest Summary</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{playerStats.activeQuests}</div>
                  <div className="text-sm text-blue-600">Active Quests</div>
                </div>
                <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{playerStats.completedQuests}</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Recent Achievements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-purple-700 dark:text-purple-400">Mindfulness Master</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="text-purple-700 dark:text-purple-400">Creative Flow Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-purple-700 dark:text-purple-400">Self-Love Champion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Philosophy Section */}
        <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg">
          <h3 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">Life as a Conscious Game</h3>
          <p className="text-sm text-pink-700 dark:text-pink-400 mb-3">
            Every challenge is a quest. Every trigger is a boss fight teaching you something. Every moment of growth earns XP toward becoming your highest self.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div className="text-center p-2 bg-white/50 rounded">
              <Sword className="w-4 h-4 text-red-500 mx-auto mb-1" />
              <div className="font-medium">Challenges = Boss Fights</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded">
              <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
              <div className="font-medium">Growth = Experience Points</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded">
              <Crown className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <div className="font-medium">Wisdom = Level Up</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}