import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Activity, 
  Moon, 
  Droplets, 
  Thermometer,
  Clock,
  Zap,
  Calendar,
  Plus
} from "lucide-react";

interface HealthEntry {
  date: string;
  sleepHours: number;
  sleepQuality: string;
  mood: string;
  energy: number;
  stress: number;
  cycleDay?: number;
  cyclePhase?: string;
  symptoms?: string[];
  notes?: string;
  heartRate?: number;
  steps?: number;
  waterIntake?: number;
}

interface HealthMetricsProps {
  onSave: (entry: HealthEntry) => void;
  existingEntry?: HealthEntry;
  selectedDate: Date;
}

export function HealthMetrics({ onSave, existingEntry, selectedDate }: HealthMetricsProps) {
  const [entry, setEntry] = useState<Partial<HealthEntry>>(
    existingEntry || {
      date: selectedDate.toISOString().split('T')[0],
      sleepHours: 8,
      sleepQuality: 'good',
      mood: 'calm',
      energy: 5,
      stress: 3,
      waterIntake: 8
    }
  );

  const cyclePhases = [
    { value: 'menstrual', label: 'Menstrual (Days 1-5)', color: 'bg-red-100 text-red-800' },
    { value: 'follicular', label: 'Follicular (Days 6-14)', color: 'bg-green-100 text-green-800' },
    { value: 'ovulation', label: 'Ovulation (Days 15-17)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'luteal', label: 'Luteal (Days 18-28)', color: 'bg-purple-100 text-purple-800' }
  ];

  const commonSymptoms = [
    'Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood swings', 
    'Breast tenderness', 'Back pain', 'Acne', 'Cravings', 'Nausea'
  ];

  const handleSymptomToggle = (symptom: string) => {
    const current = entry.symptoms || [];
    const updated = current.includes(symptom)
      ? current.filter(s => s !== symptom)
      : [...current, symptom];
    setEntry({ ...entry, symptoms: updated });
  };

  const handleSave = () => {
    onSave(entry as HealthEntry);
  };

  return (
    <div className="space-y-6">
      {/* Sleep Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Sleep & Rest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hours of Sleep</Label>
              <Input
                type="number"
                min="0"
                max="12"
                step="0.5"
                value={entry.sleepHours}
                onChange={(e) => setEntry({ ...entry, sleepHours: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label>Sleep Quality</Label>
              <Select value={entry.sleepQuality} onValueChange={(value) => setEntry({ ...entry, sleepQuality: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poor">Poor - Restless/Interrupted</SelectItem>
                  <SelectItem value="fair">Fair - Some interruptions</SelectItem>
                  <SelectItem value="good">Good - Mostly restful</SelectItem>
                  <SelectItem value="excellent">Excellent - Deep, uninterrupted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy & Mood */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Energy & Mood
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Energy Level: {entry.energy}/10</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={entry.energy}
              onChange={(e) => setEntry({ ...entry, energy: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Exhausted</span>
              <span>Energized</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Stress Level: {entry.stress}/10</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={entry.stress}
              onChange={(e) => setEntry({ ...entry, stress: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Calm</span>
              <span>Very Stressed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Period Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Cycle Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cycle Day (optional)</Label>
              <Input
                type="number"
                min="1"
                max="35"
                value={entry.cycleDay || ''}
                onChange={(e) => setEntry({ ...entry, cycleDay: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Day of cycle"
              />
            </div>
            <div>
              <Label>Cycle Phase</Label>
              <Select value={entry.cyclePhase} onValueChange={(value) => setEntry({ ...entry, cyclePhase: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  {cyclePhases.map(phase => (
                    <SelectItem key={phase.value} value={phase.value}>
                      {phase.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Symptoms</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map(symptom => (
                <Button
                  key={symptom}
                  variant={entry.symptoms?.includes(symptom) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSymptomToggle(symptom)}
                  className="text-xs justify-start h-8"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Integration Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Fitness Data Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Heart Rate (resting)</Label>
              <Input
                type="number"
                value={entry.heartRate || ''}
                onChange={(e) => setEntry({ ...entry, heartRate: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="BPM from Apple Watch/Fitbit"
              />
            </div>
            <div>
              <Label>Steps</Label>
              <Input
                type="number"
                value={entry.steps || ''}
                onChange={(e) => setEntry({ ...entry, steps: e.target.value ? parseInt(e.target.value) : undefined })}
                placeholder="Daily step count"
              />
            </div>
          </div>

          <div>
            <Label>Water Intake (glasses)</Label>
            <Input
              type="number"
              min="0"
              max="20"
              value={entry.waterIntake}
              onChange={(e) => setEntry({ ...entry, waterIntake: parseInt(e.target.value) })}
            />
          </div>

          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <p className="font-medium mb-2">🔗 Connect Your Devices:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Apple Watch: Health app → Share data → Export to CSV</li>
              <li>• Fitbit: Fitbit app → Data Export → Download personal data</li>
              <li>• Manual entry: Add daily metrics here for tracking</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes & Observations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={entry.notes || ''}
            onChange={(e) => setEntry({ ...entry, notes: e.target.value })}
            placeholder="How are you feeling today? Any observations about your body, mind, or emotions..."
            className="min-h-[80px]"
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Save Health Entry
      </Button>
    </div>
  );
}