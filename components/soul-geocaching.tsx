import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Trophy, Star, Users, Target, Map, Clock, Camera, Heart, Zap } from 'lucide-react';

interface SoulLocation {
  id: string;
  name: string;
  description: string;
  category: string;
  points: number;
  discovered: boolean;
  latitude: number;
  longitude: number;
  hint: string;
  rarity: 'common' | 'rare' | 'legendary';
  emotion: string;
  discoveredBy: number;
  discoveredAt?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export function SoulGeocaching() {
  const [activeTab, setActiveTab] = useState<'map' | 'leaderboard' | 'achievements' | 'profile'>('map');
  const [userStats, setUserStats] = useState({
    username: "SoulSeeker_ATX",
    totalPoints: 1250,
    locationsFound: 12,
    rank: 23,
    streak: 7,
    level: 4,
    nextLevelPoints: 1500
  });

  const [soulLocations] = useState<SoulLocation[]>([
    {
      id: "zilker-sunset",
      name: "Zilker Sunset Portal",
      description: "Where golden hour meets inner peace",
      category: "Nature Sanctuary",
      points: 150,
      discovered: true,
      latitude: 30.2638,
      longitude: -97.7681,
      hint: "Find where the kite festival dreams live",
      rarity: 'rare',
      emotion: "Peaceful",
      discoveredBy: 47,
      discoveredAt: new Date('2024-12-20')
    },
    {
      id: "sxsw-creative",
      name: "SXSW Creative Chaos Portal",
      description: "Channel the festival energy into focus",
      category: "Creative Hub",
      points: 200,
      discovered: true,
      latitude: 30.2672,
      longitude: -97.7431,
      hint: "Where music meets technology meets soul",
      rarity: 'legendary',
      emotion: "Inspired",
      discoveredBy: 23,
      discoveredAt: new Date('2024-12-18')
    },
    {
      id: "ut-campus-wisdom",
      name: "Tower of Wisdom Portal",
      description: "Academic pressure meets ancient knowing",
      category: "Learning Temple",
      points: 100,
      discovered: false,
      latitude: 30.2862,
      longitude: -97.7394,
      hint: "Beneath the tower that watches over all knowledge seekers",
      rarity: 'common',
      emotion: "Focused",
      discoveredBy: 156
    },
    {
      id: "lady-bird-flow",
      name: "Lady Bird Flow State",
      description: "Movement meditation by the water",
      category: "Movement Sanctuary",
      points: 125,
      discovered: true,
      latitude: 30.2500,
      longitude: -97.7500,
      hint: "Where runners and walkers find their rhythm",
      rarity: 'rare',
      emotion: "Energized",
      discoveredBy: 89,
      discoveredAt: new Date('2024-12-15')
    },
    {
      id: "franklin-patience",
      name: "Franklin's Patience Portal",
      description: "The art of waiting mindfully",
      category: "Mindfulness Spot",
      points: 75,
      discovered: false,
      latitude: 30.2700,
      longitude: -97.7400,
      hint: "Where lines teach us about presence",
      rarity: 'common',
      emotion: "Patient",
      discoveredBy: 234
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: "first-discovery",
      title: "First Soul Connection",
      description: "Discover your first Soul Portal",
      icon: Star,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 50,
      rarity: 'bronze'
    },
    {
      id: "nature-lover",
      title: "Nature's Child",
      description: "Find 5 Nature Sanctuary portals",
      icon: Heart,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      points: 200,
      rarity: 'silver'
    },
    {
      id: "weekend-warrior",
      title: "Weekend Soul Warrior",
      description: "Discover portals 7 days in a row",
      icon: Zap,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      points: 300,
      rarity: 'gold'
    },
    {
      id: "legendary-hunter",
      title: "Legendary Portal Hunter",
      description: "Find a legendary rarity portal",
      icon: Trophy,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 500,
      rarity: 'platinum'
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, username: "AustinMystic", points: 3420, found: 28, streak: 14 },
    { rank: 2, username: "ZilkerZen", points: 2890, found: 24, streak: 9 },
    { rank: 3, username: "SoulTechPioneer", points: 2650, found: 22, streak: 12 },
    { rank: 4, username: "CreativeFlow_ATX", points: 2340, found: 19, streak: 6 },
    { rank: 5, username: "MindfulWanderer", points: 2100, found: 18, streak: 8 },
    { rank: 23, username: "SoulSeeker_ATX", points: 1250, found: 12, streak: 7 }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'legendary': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAchievementColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'from-orange-400 to-yellow-500';
      case 'silver': return 'from-gray-400 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Map className="w-6 h-6 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Soul Geocaching Austin
          </span>
          <Badge className="bg-green-100 text-green-800">Beta</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Discover Soul Technology portals around Austin. Find QR codes, unlock emotions, level up your consciousness.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'map', label: 'Portal Map', icon: Map },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'achievements', label: 'Achievements', icon: Star },
            { id: 'profile', label: 'Profile', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portal Map Tab */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soulLocations.map((location) => (
                <div 
                  key={location.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    location.discovered 
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${location.discovered ? 'text-green-600' : 'text-gray-400'}`} />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{location.name}</h4>
                    </div>
                    <Badge className={getRarityColor(location.rarity)}>
                      {location.rarity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{location.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{location.category}</span>
                    <span>{location.points} points</span>
                  </div>
                  
                  {!location.discovered && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hint:</div>
                      <div className="text-sm italic text-blue-600 dark:text-blue-400">{location.hint}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {location.emotion}
                      </Badge>
                      <span className="text-xs text-gray-500">{location.discoveredBy} found</span>
                    </div>
                    {location.discovered && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ Discovered
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-700">3,420</div>
                <div className="text-sm text-yellow-600">Top Score</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">347</div>
                <div className="text-sm text-blue-600">Active Players</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">45</div>
                <div className="text-sm text-green-600">Total Portals</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.username === userStats.username
                      ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank <= 3 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {player.rank}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{player.username}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {player.found} portals • {player.streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">{player.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.unlocked 
                      ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'border-gray-300 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getAchievementColor(achievement.rarity)}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && (
                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{achievement.points} points</span>
                        {achievement.unlocked && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            ✓ Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                {userStats.username.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{userStats.username}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span>Level {userStats.level}</span>
                <span>•</span>
                <span>Rank #{userStats.rank}</span>
                <span>•</span>
                <span>{userStats.streak} day streak</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.locationsFound}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Portals Found</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Level Progress</h4>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Level {userStats.level}</span>
                <span>{userStats.totalPoints}/{userStats.nextLevelPoints} points</span>
              </div>
              <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3" />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {userStats.nextLevelPoints - userStats.totalPoints} points to Level {userStats.level + 1}
              </div>
            </div>
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Soul Geocaching Austin - Beta Preview
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
            This gamified portal discovery system would launch alongside the QR code placement strategy. 
            Players find real QR codes around Austin to unlock Soul Technology experiences.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Join Beta Testing List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}