import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodCalendar } from "./mood-calendar";
import { HealthMetrics } from "./health-metrics";
import { BreathworkRoutine } from "./breathwork-routine";
import { WorkspaceIntegration } from "../integrations/workspace-integration";
import { 
  Calendar, 
  Activity, 
  Wind, 
  TrendingUp, 
  Heart,
  Moon,
  Zap,
  Crown,
  Building2
} from "lucide-react";
import { format } from "date-fns";

interface WellnessDashboardProps {
  userTier?: string;
  onUpgrade?: () => void;
}

export function WellnessDashboard({ userTier = 'basic', onUpgrade }: WellnessDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState<any[]>([]);
  const [healthEntries, setHealthEntries] = useState<any[]>([]);
  const [breathworkSessions, setBreathworkSessions] = useState<any[]>([]);
  const [developerMode, setDeveloperMode] = useState(false);

  // Check for developer override (for testing)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev') === 'true' || localStorage.getItem('devMode') === 'true') {
      setDeveloperMode(true);
    }
  }, []);

  // Mock data for demonstration
  useEffect(() => {
    // This would come from your API
    setMoodEntries([
      {
        date: new Date().toISOString().split('T')[0],
        mood: 'happy',
        energy: 7,
        stress: 3,
        notes: 'Great day today!'
      }
    ]);
    
    // Add some sample health data for testing
    setHealthEntries([
      {
        date: new Date().toISOString().split('T')[0],
        sleepHours: 7.5,
        sleepQuality: 'good',
        mood: 'happy',
        energy: 7,
        stress: 3,
        cycleDay: 15,
        cyclePhase: 'ovulation',
        symptoms: ['Energy boost', 'Positive mood'],
        heartRate: 65,
        steps: 8500,
        waterIntake: 8,
        notes: 'Feeling great today! Had a productive morning and good energy throughout.'
      }
    ]);
  }, []);

  const isPremium = userTier === 'premium' || developerMode;

  const handleSaveHealthEntry = (entry: any) => {
    setHealthEntries(prev => {
      const filtered = prev.filter(e => e.date !== entry.date);
      return [...filtered, entry];
    });
    
    // Here you would save to your API
    console.log('Saving health entry:', entry);
  };

  const handleBreathworkComplete = (technique: string, duration: number) => {
    const session = {
      date: new Date().toISOString(),
      technique,
      duration,
      completed: true
    };
    
    setBreathworkSessions(prev => [...prev, session]);
    
    // Here you would save to your API
    console.log('Breathwork session completed:', session);
  };

  const getSelectedDateEntry = () => {
    return healthEntries.find(entry => 
      entry.date === selectedDate.toISOString().split('T')[0]
    );
  };

  if (!isPremium) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            Premium Wellness Tracker
          </CardTitle>
          <p className="text-muted-foreground">
            Unlock comprehensive health tracking, period monitoring, and guided breathwork
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="opacity-75">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium">Mood Calendar</h3>
                <p className="text-sm text-muted-foreground">Track daily moods and patterns</p>
              </CardContent>
            </Card>
            
            <Card className="opacity-75">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium">Health Metrics</h3>
                <p className="text-sm text-muted-foreground">Period tracking & fitness integration</p>
              </CardContent>
            </Card>
            
            <Card className="opacity-75">
              <CardContent className="p-4 text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium">Breathwork</h3>
                <p className="text-sm text-muted-foreground">Guided breathing techniques</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Premium Features Include:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>• Complete mood and energy tracking calendar</li>
              <li>• Period cycle monitoring with symptom tracking</li>
              <li>• Apple Watch & Fitbit integration instructions</li>
              <li>• Guided breathwork routines (4-7-8, Box Breathing, etc.)</li>
              <li>• Health insights and pattern recognition</li>
              <li>• Export data for healthcare providers</li>
            </ul>
            <div className="space-y-3">
              <Button onClick={onUpgrade} className="gap-2 w-full">
                <Crown className="w-4 h-4" />
                Upgrade to Premium
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  localStorage.setItem('devMode', 'true');
                  setDeveloperMode(true);
                }}
                className="w-full text-xs"
              >
                👩‍💻 Developer Preview (Testing Only)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          Wellness Dashboard
          {developerMode && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
              Developer Mode
            </Badge>
          )}
        </h2>
        <p className="text-muted-foreground">
          Track your mood, health metrics, and practice breathwork
        </p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="w-4 h-4" />
            Mood Calendar
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Activity className="w-4 h-4" />
            Health Metrics
          </TabsTrigger>
          <TabsTrigger value="breathwork" className="gap-2">
            <Wind className="w-4 h-4" />
            Breathwork
          </TabsTrigger>
          <TabsTrigger value="workspace" className="gap-2">
            <Building2 className="w-4 h-4" />
            Workspace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MoodCalendar
                entries={moodEntries}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {format(selectedDate, 'MMM d, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getSelectedDateEntry() ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Energy: {getSelectedDateEntry()?.energy}/10</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        <span className="text-sm">Sleep: {getSelectedDateEntry()?.sleepHours}h</span>
                      </div>
                      {getSelectedDateEntry()?.notes && (
                        <p className="text-sm text-muted-foreground">
                          {getSelectedDateEntry()?.notes}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No data for this date. Click "Health Metrics" to add an entry.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Recent Breathwork
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {breathworkSessions.length > 0 ? (
                    <div className="space-y-2">
                      {breathworkSessions.slice(-3).map((session, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{session.technique}</span>
                          <Badge variant="secondary">
                            {Math.floor(session.duration / 60)}m
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No breathwork sessions yet. Try the breathing exercises!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="health">
          <HealthMetrics
            onSave={handleSaveHealthEntry}
            existingEntry={getSelectedDateEntry()}
            selectedDate={selectedDate}
          />
        </TabsContent>

        <TabsContent value="breathwork">
          <BreathworkRoutine onComplete={handleBreathworkComplete} />
        </TabsContent>

        <TabsContent value="workspace">
          <WorkspaceIntegration 
            userTier={userTier}
            currentMood={getSelectedDateEntry()?.mood}
            energyLevel={getSelectedDateEntry()?.energy}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}