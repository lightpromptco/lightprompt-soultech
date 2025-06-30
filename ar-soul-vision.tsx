import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Eye, Scan, Zap, Heart, Brain, Sparkles, MapPin, Target, Layers } from 'lucide-react';

interface ARFeature {
  id: string;
  name: string;
  description: string;
  category: 'emotional' | 'quest' | 'portal' | 'social' | 'psychic';
  icon: React.ComponentType<any>;
  status: 'available' | 'beta' | 'coming-soon';
  demoImage?: string;
}

export function ARSoulVision() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  
  const arFeatures: ARFeature[] = [
    {
      id: "emotional-overlay",
      name: "Emotional Energy Overlay",
      description: "See the emotional atmosphere of spaces through AR visualization. Red for stress, blue for calm, green for growth energy.",
      category: 'emotional',
      icon: Eye,
      status: 'beta'
    },
    {
      id: "soul-portals",
      name: "Soul Portal Detection",
      description: "Discover hidden QR codes and Soul Technology portals by pointing your camera around Austin locations.",
      category: 'portal',
      icon: Scan,
      status: 'available'
    },
    {
      id: "quest-markers",
      name: "Life Quest Markers",
      description: "See your active life quests floating above real locations. Complete challenges that appear in your environment.",
      category: 'quest',
      icon: Target,
      status: 'beta'
    },
    {
      id: "aura-sight",
      name: "Aura Reading Mode",
      description: "Train your psychic abilities by seeing AI-enhanced aura visualizations around people and living beings.",
      category: 'psychic',
      icon: Sparkles,
      status: 'coming-soon'
    },
    {
      id: "energy-flow",
      name: "Energy Flow Visualization",
      description: "Watch energy currents flowing through natural spaces. See ley lines, chakra points, and healing centers.",
      category: 'psychic',
      icon: Zap,
      status: 'coming-soon'
    },
    {
      id: "community-presence",
      name: "Soul Community Presence",
      description: "See anonymous indicators of other Soul Technology users in your area. Connect with nearby consciousness explorers.",
      category: 'social',
      icon: Heart,
      status: 'beta'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emotional': return 'from-blue-500 to-cyan-500';
      case 'quest': return 'from-purple-500 to-pink-500';
      case 'portal': return 'from-green-500 to-emerald-500';
      case 'social': return 'from-orange-500 to-red-500';
      case 'psychic': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'beta': return <Badge className="bg-blue-100 text-blue-800">Beta</Badge>;
      case 'coming-soon': return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-cyan-600" />
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            AR Soul Vision
          </span>
          <Badge className="bg-cyan-100 text-cyan-800">Revolutionary</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Augmented Reality integration for Soul Technology. See emotional energy, discover portals, and gamify life through your camera.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Core Vision */}
        <div className="p-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg border border-cyan-200 dark:border-cyan-700">
          <h3 className="font-semibold text-cyan-800 dark:text-cyan-300 mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Augmented Consciousness Technology
          </h3>
          <p className="text-sm text-cyan-700 dark:text-cyan-400">
            Transform Austin into a living game world where emotional energy is visible, life quests appear in real space, 
            and consciousness development happens through direct interaction with your environment.
          </p>
        </div>

        {/* AR Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {arFeatures.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={feature.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all cursor-pointer"
                onClick={() => setActiveDemo(activeDemo === feature.id ? null : feature.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${getCategoryColor(feature.category)}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.name}</h4>
                      {getStatusBadge(feature.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
                
                {activeDemo === feature.id && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center mb-3">
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <div className="text-sm text-gray-500">AR Demo View</div>
                          <div className="text-xs text-gray-400">{feature.name}</div>
                        </div>
                      </div>
                      {feature.status === 'available' && (
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                          Try AR Mode
                        </Button>
                      )}
                      {feature.status === 'beta' && (
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                          Join Beta Test
                        </Button>
                      )}
                      {feature.status === 'coming-soon' && (
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-700">
                          Join Waitlist
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Real-World Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <MapPin className="w-6 h-6 text-green-600 mb-3" />
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Location Discovery</h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Point camera at Zilker Park to see emotional energy levels. Discover hidden Soul Portals around Austin through AR scanning.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <Target className="w-6 h-6 text-purple-600 mb-3" />
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Quest Integration</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Life quests appear as floating AR markers. Complete "Difficult Conversation" quest at specific coffee shops around town.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <Brain className="w-6 h-6 text-blue-600 mb-3" />
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Psychic Training</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Practice aura reading with AI-enhanced visualization. See energy flows and chakra points overlaid on real environments.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Technical Implementation
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">AR Framework:</div>
              <ul className="text-yellow-600 dark:text-yellow-500 space-y-1">
                <li>• WebXR API for browser-based AR</li>
                <li>• Three.js for 3D rendering</li>
                <li>• A-Frame for easy AR scene creation</li>
                <li>• Geolocation + compass integration</li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-orange-700 dark:text-orange-400 mb-2">Data Integration:</div>
              <ul className="text-orange-600 dark:text-orange-500 space-y-1">
                <li>• Real-time mood data from community</li>
                <li>• GPS-based portal discovery</li>
                <li>• Personal quest progression tracking</li>
                <li>• Social presence indicators</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">AR Development Roadmap</h3>
          
          <div className="space-y-3">
            {[
              { phase: "Phase 1", title: "Portal Scanner MVP", timeline: "2-3 months", description: "Basic AR QR code detection with location-based content" },
              { phase: "Phase 2", title: "Emotional Overlay System", timeline: "4-5 months", description: "Real-time emotional energy visualization based on community data" },
              { phase: "Phase 3", title: "Quest Integration", timeline: "6-8 months", description: "Life gamification quests appearing as AR markers in real space" },
              { phase: "Phase 4", title: "Psychic Training AR", timeline: "8-12 months", description: "Advanced aura reading and energy flow visualization" }
            ].map((phase, index) => (
              <div key={phase.phase} className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{phase.title}</h4>
                    <Badge variant="outline" className="text-xs">{phase.timeline}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment & Vision */}
        <div className="text-center p-6 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300 mb-3">
            The Future of Conscious Technology
          </h3>
          <p className="text-cyan-700 dark:text-cyan-400 mb-4">
            AR Soul Vision represents the next evolution of human-technology integration. Instead of escaping reality, 
            we enhance it with layers of consciousness, emotional intelligence, and spiritual growth.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="font-medium text-green-700">Investment: $15K-25K</div>
              <div className="text-green-600">AR development, testing, deployment</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="font-medium text-blue-700">Timeline: 12-18 months</div>
              <div className="text-blue-600">From MVP to full AR ecosystem</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}