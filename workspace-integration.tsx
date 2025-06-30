import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Lightbulb, 
  Waves, 
  Users, 
  Building2, 
  Leaf,
  Brain,
  Heart,
  Shield,
  Settings,
  Zap
} from "lucide-react";

interface WorkspaceIntegrationProps {
  userTier: string;
  currentMood?: string;
  energyLevel?: number;
}

export function WorkspaceIntegration({ userTier, currentMood, energyLevel }: WorkspaceIntegrationProps) {
  const [integrations, setIntegrations] = useState({
    smartLighting: false,
    soundscapes: false,
    airQuality: false,
    temperature: false,
    notifications: false
  });

  // Check for developer mode
  const isDeveloperMode = localStorage.getItem('devMode') === 'true';
  const isPremium = userTier === 'premium' || isDeveloperMode;

  const environmentalSettings = {
    calm: {
      lighting: "Soft blue-white, 40% brightness",
      sound: "Ocean waves, 25dB",
      temperature: "72°F (22°C)",
      color: "bg-blue-100 text-blue-800"
    },
    focused: {
      lighting: "Cool white, 80% brightness",
      sound: "Brown noise, 30dB",
      temperature: "70°F (21°C)",
      color: "bg-green-100 text-green-800"
    },
    creative: {
      lighting: "Warm amber, 60% brightness",
      sound: "Nature sounds, 20dB",
      temperature: "74°F (23°C)",
      color: "bg-yellow-100 text-yellow-800"
    },
    stressed: {
      lighting: "Warm pink, 30% brightness",
      sound: "Meditation bells, 15dB",
      temperature: "75°F (24°C)",
      color: "bg-purple-100 text-purple-800"
    }
  };

  const getCurrentSettings = () => {
    const mood = currentMood?.toLowerCase() || 'calm';
    return environmentalSettings[mood as keyof typeof environmentalSettings] || environmentalSettings.calm;
  };

  const handleToggleIntegration = (key: string) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  if (!isPremium) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Workspace Integration Preview
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect your mood to your environment with SoulTech workspace integration
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="opacity-60">
              <CardContent className="p-4 text-center">
                <Lightbulb className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium text-sm">Smart Lighting</h3>
                <p className="text-xs text-muted-foreground">Mood-responsive illumination</p>
              </CardContent>
            </Card>
            
            <Card className="opacity-60">
              <CardContent className="p-4 text-center">
                <Waves className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium text-sm">Soundscapes</h3>
                <p className="text-xs text-muted-foreground">Adaptive audio environments</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              GuardianTag Workspace Features
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 mb-3">
              <li>• Real-time mood-to-environment synchronization</li>
              <li>• Philips Hue & smart home integration</li>
              <li>• Biometric feedback for optimal workspace conditions</li>
              <li>• Team wellness dashboards for managers</li>
              <li>• Meditation chamber automation</li>
            </ul>
            <Button size="sm" className="w-full">
              Upgrade for Workspace Integration
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentSettings = getCurrentSettings();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          SoulTech Workspace Integration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your emotional state is shaping your environment in real-time
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Current Environment Status */}
        <Card className={`border-2 ${currentSettings.color}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Active Environment: {currentMood || 'Calm'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Lightbulb className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">Lighting</p>
                <p className="text-xs text-muted-foreground">{currentSettings.lighting}</p>
              </div>
              <div className="text-center">
                <Waves className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">Sound</p>
                <p className="text-xs text-muted-foreground">{currentSettings.sound}</p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">Temperature</p>
                <p className="text-xs text-muted-foreground">{currentSettings.temperature}</p>
              </div>
              <div className="text-center">
                <Brain className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">Energy Level</p>
                <p className="text-xs text-muted-foreground">{energyLevel || 5}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Device Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <Label htmlFor="smart-lighting">Smart Lighting (Philips Hue)</Label>
                </div>
                <Switch
                  id="smart-lighting"
                  checked={integrations.smartLighting}
                  onCheckedChange={() => handleToggleIntegration('smartLighting')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4" />
                  <Label htmlFor="soundscapes">Adaptive Soundscapes</Label>
                </div>
                <Switch
                  id="soundscapes"
                  checked={integrations.soundscapes}
                  onCheckedChange={() => handleToggleIntegration('soundscapes')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  <Label htmlFor="air-quality">Air Quality Monitoring</Label>
                </div>
                <Switch
                  id="air-quality"
                  checked={integrations.airQuality}
                  onCheckedChange={() => handleToggleIntegration('airQuality')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Integration Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="font-medium">Quick Setup Guide:</p>
                <ol className="text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Download Philips Hue app & connect lights</li>
                  <li>Enable "Developer Mode" in Hue settings</li>
                  <li>Connect your smart thermostat (Nest/Ecobee)</li>
                  <li>Pair your meditation cushion sensors</li>
                  <li>Test mood-to-environment sync</li>
                </ol>
              </div>
              
              <Button className="w-full" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Open Integration Wizard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Future Vision */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              SoulTech Vision: Healing Spaces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your workspace integration is part of a larger vision for conscious technology 
              that heals both people and planet.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-white/50">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <p className="text-xs font-medium">Team Wellness</p>
                <p className="text-xs text-muted-foreground">Collective mood insights</p>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-white/50">
                <Brain className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                <p className="text-xs font-medium">Therapy Assistance</p>
                <p className="text-xs text-muted-foreground">Professional-grade monitoring</p>
              </div>
            </div>
            
            <div className="text-center">
              <Badge variant="outline" className="bg-white/70">
                Expanding to schools, hospitals, and healing centers
              </Badge>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}