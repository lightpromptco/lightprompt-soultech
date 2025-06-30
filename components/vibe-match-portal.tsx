'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Heart, Sparkles, Users, Briefcase, Moon, Sun, Zap, Globe, Lock, Eye, EyeOff } from 'lucide-react'

interface VibeProfile {
  id: string
  name: string
  age: number
  currentVibe: string
  vibeIntensity: number
  astroSun?: string
  astroMoon?: string
  astroRising?: string
  intentions: string[]
  businessMode: boolean
  soulEcosystemData: {
    depth: number
    flow: number
    resonance: number
    growth: number
    dominantColor: string
    season: string
  }
  prismPointRevealed: boolean
  imageUrl?: string
  voiceNote?: string
  resonanceScore?: number
}

interface VibeMatchPortalProps {
  onClose: () => void
}

export function VibeMatchPortal({ onClose }: VibeMatchPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [currentVibe, setCurrentVibe] = useState('')
  const [vibeIntensity, setVibeIntensity] = useState(5)
  const [userProfile, setUserProfile] = useState<Partial<VibeProfile>>({})
  const [matches, setMatches] = useState<VibeProfile[]>([])
  const [activeTab, setActiveTab] = useState('setup')
  const [showPassword, setShowPassword] = useState(false)
  
  // Smart Toggle States
  const [astrologyMatching, setAstrologyMatching] = useState(false)
  const [businessMode, setBusinessMode] = useState(false)
  const [friendshipMode, setFriendshipMode] = useState(false)
  const [romanticMode, setRomanticMode] = useState(false)
  const [kinkMode, setKinkMode] = useState(false)
  
  // Siri-style glow color based on current vibe
  const [glowColor, setGlowColor] = useState('#6366f1')

  const vibeColors = {
    'peaceful': '#10b981',
    'excited': '#f59e0b',
    'contemplative': '#8b5cf6',
    'passionate': '#ef4444',
    'creative': '#ec4899',
    'grounded': '#92400e',
    'transcendent': '#6366f1',
    'playful': '#f97316'
  }

  const portalPassword = 'L!GH+PR0MP+'

  useEffect(() => {
    if (currentVibe && vibeColors[currentVibe as keyof typeof vibeColors]) {
      setGlowColor(vibeColors[currentVibe as keyof typeof vibeColors])
    }
  }, [currentVibe])

  const handleAuthentication = () => {
    if (password === portalPassword) {
      setIsAuthenticated(true)
      setActiveTab('setup')
    } else {
      alert('Invalid portal password. This is an invitation-only resonance space.')
    }
  }

  const generateMockMatches = (): VibeProfile[] => {
    return [
      {
        id: '1',
        name: 'Aurora',
        age: 28,
        currentVibe: 'contemplative',
        vibeIntensity: 7,
        astroSun: 'Pisces',
        astroMoon: 'Scorpio',
        astroRising: 'Cancer',
        intentions: ['friendship', 'growth'],
        businessMode: false,
        soulEcosystemData: {
          depth: 8,
          flow: 6,
          resonance: 9,
          growth: 7,
          dominantColor: '#8b5cf6',
          season: 'autumn'
        },
        prismPointRevealed: false
      },
      {
        id: '2',
        name: 'River',
        age: 32,
        currentVibe: 'grounded',
        vibeIntensity: 6,
        intentions: ['business', 'collaboration'],
        businessMode: true,
        soulEcosystemData: {
          depth: 7,
          flow: 8,
          resonance: 7,
          growth: 8,
          dominantColor: '#92400e',
          season: 'summer'
        },
        prismPointRevealed: false
      },
      {
        id: '3',
        name: 'Phoenix',
        age: 26,
        currentVibe: 'passionate',
        vibeIntensity: 9,
        astroSun: 'Aries',
        astroMoon: 'Leo',
        astroRising: 'Sagittarius',
        intentions: ['romantic', 'adventure'],
        businessMode: false,
        soulEcosystemData: {
          depth: 9,
          flow: 9,
          resonance: 8,
          growth: 9,
          dominantColor: '#ef4444',
          season: 'spring'
        },
        prismPointRevealed: false
      }
    ]
  }

  const calculateResonanceScore = (profile1: Partial<VibeProfile>, profile2: VibeProfile): number => {
    let score = 0
    
    // Vibe intensity compatibility (closer = better)
    const intensityDiff = Math.abs((profile1.vibeIntensity || 5) - profile2.vibeIntensity)
    score += Math.max(0, 10 - intensityDiff)
    
    // Soul ecosystem resonance
    if (profile1.soulEcosystemData && profile2.soulEcosystemData) {
      const resonanceDiff = Math.abs(profile1.soulEcosystemData.resonance - profile2.soulEcosystemData.resonance)
      score += Math.max(0, 10 - resonanceDiff)
    }
    
    // Intention alignment
    const commonIntentions = (profile1.intentions || []).filter(intent => 
      profile2.intentions.includes(intent)
    ).length
    score += commonIntentions * 15
    
    return Math.min(100, score)
  }

  const findMatches = () => {
    const potentialMatches = generateMockMatches()
    const matchesWithScores = potentialMatches.map(match => ({
      ...match,
      resonanceScore: calculateResonanceScore(userProfile, match)
    })).filter(match => match.resonanceScore && match.resonanceScore > 30)
    
    setMatches(matchesWithScores.sort((a, b) => (b.resonanceScore || 0) - (a.resonanceScore || 0)))
    setActiveTab('matches')
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VibeMatch Portal
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Soul-aligned connection space
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Portal Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter invitation code..."
                  className="bg-gray-800 border-gray-600 text-white pr-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleAuthentication}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Lock className="w-4 h-4 mr-2" />
                Enter Portal
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                This isn't dating. This is soul tech.<br />
                Meeting in the field — fully, clearly, in truth.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Siri-style Glow Header */}
        <div 
          className="relative p-6 rounded-t-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}10)`,
            boxShadow: `0 0 30px ${glowColor}40`
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${glowColor}, ${glowColor}80)`,
                    boxShadow: `0 0 20px ${glowColor}60`
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">VibeMatch</h1>
                  <p className="text-sm opacity-80">PrismPoint Resonance Portal</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                ✕
              </Button>
            </div>
          </div>
          
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-32 h-32 rounded-full opacity-20 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${glowColor}60, transparent)`,
                top: '10%',
                left: '80%',
                animationDelay: '0s'
              }}
            />
            <div 
              className="absolute w-24 h-24 rounded-full opacity-15 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${glowColor}40, transparent)`,
                top: '60%',
                left: '10%',
                animationDelay: '1s'
              }}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="setup" className="data-[state=active]:bg-gray-700">Setup</TabsTrigger>
            <TabsTrigger value="toggles" className="data-[state=active]:bg-gray-700">Preferences</TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-gray-700">Matches</TabsTrigger>
            <TabsTrigger value="vibelog" className="data-[state=active]:bg-gray-700">VibeLog</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" style={{ color: glowColor }} />
                  Current Vibe Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>What's your current vibe?</Label>
                  <select 
                    value={currentVibe}
                    onChange={(e) => setCurrentVibe(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">Select your energy...</option>
                    <option value="peaceful">Peaceful & Serene</option>
                    <option value="excited">Excited & Energetic</option>
                    <option value="contemplative">Contemplative & Deep</option>
                    <option value="passionate">Passionate & Intense</option>
                    <option value="creative">Creative & Inspired</option>
                    <option value="grounded">Grounded & Centered</option>
                    <option value="transcendent">Transcendent & Mystical</option>
                    <option value="playful">Playful & Joyful</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Vibe Intensity (1-10)</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={vibeIntensity}
                      onChange={(e) => setVibeIntensity(Number(e.target.value))}
                      className="flex-1"
                      style={{
                        accentColor: glowColor
                      }}
                    />
                    <span className="w-8 text-center font-bold">{vibeIntensity}</span>
                  </div>
                </div>

                <Button 
                  onClick={findMatches}
                  disabled={!currentVibe}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Find Resonance Matches
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="toggles" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Smart Resonance Filters</CardTitle>
                <p className="text-sm text-gray-400">
                  Customize your connection journey with filters that actually matter
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-purple-400" />
                    <div>
                      <Label className="text-base">Astrology Matching</Label>
                      <p className="text-sm text-gray-400">Sun/Moon/Rising or just vibe only</p>
                    </div>
                  </div>
                  <Switch 
                    checked={astrologyMatching}
                    onCheckedChange={setAstrologyMatching}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <div>
                      <Label className="text-base">Business Mode</Label>
                      <p className="text-sm text-gray-400">Soul-aligned partnerships & collaborators</p>
                    </div>
                  </div>
                  <Switch 
                    checked={businessMode}
                    onCheckedChange={setBusinessMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <Label className="text-base">Friendship Intentions</Label>
                      <p className="text-sm text-gray-400">Platonic resonance seekers</p>
                    </div>
                  </div>
                  <Switch 
                    checked={friendshipMode}
                    onCheckedChange={setFriendshipMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <div>
                      <Label className="text-base">Romantic Readiness</Label>
                      <p className="text-sm text-gray-400">Open to romantic evolution</p>
                    </div>
                  </div>
                  <Switch 
                    checked={romanticMode}
                    onCheckedChange={setRomanticMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <div>
                      <Label className="text-base">Kink & Connection</Label>
                      <p className="text-sm text-gray-400">Consensual exploration with safety</p>
                    </div>
                  </div>
                  <Switch 
                    checked={kinkMode}
                    onCheckedChange={setKinkMode}
                  />
                </div>

                <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Privacy Protected</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    All toggles are private, encrypted, and never sold or externally profiled.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            {matches.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No Matches Yet</h3>
                  <p className="text-gray-400 mb-4">
                    Complete your vibe setup to find resonance connections
                  </p>
                  <Button 
                    onClick={() => setActiveTab('setup')}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Set Up Your Vibe
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Resonance Matches</h3>
                {matches.map((match) => (
                  <Card key={match.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{match.name}</h4>
                          <p className="text-sm text-gray-400">Age {match.age} • {match.currentVibe}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-400">
                            {match.resonanceScore || 0}% match
                          </div>
                          <div className="text-xs text-gray-400">resonance score</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Depth</div>
                          <div className="font-semibold">{match.soulEcosystemData.depth}/10</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Flow</div>
                          <div className="font-semibold">{match.soulEcosystemData.flow}/10</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Resonance</div>
                          <div className="font-semibold">{match.soulEcosystemData.resonance}/10</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Growth</div>
                          <div className="font-semibold">{match.soulEcosystemData.growth}/10</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {match.intentions.map((intention, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                          >
                            {intention}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-purple-500 hover:bg-purple-600"
                        >
                          Connect Energetically
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          View Soul Trail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="vibelog" className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  VibeLog - Daily Micro-Reflections
                </CardTitle>
                <p className="text-sm text-gray-400">
                  Track your energy patterns over time
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Coming Soon</h4>
                  <p className="text-gray-400 text-sm">
                    Daily micro-reflections and vibe tracking will unlock deeper<br />
                    resonance matching and soul ecosystem insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}