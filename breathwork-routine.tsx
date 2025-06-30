import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Wind,
  Heart,
  Brain,
  Moon,
  Zap,
  Timer
} from "lucide-react";

interface BreathworkTechnique {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    pause?: number;
  };
  cycles: number;
  icon: any;
  color: string;
}

interface BreathworkRoutineProps {
  onComplete: (technique: string, duration: number) => void;
}

export function BreathworkRoutine({ onComplete }: BreathworkRoutineProps) {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathworkTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const techniques: BreathworkTechnique[] = [
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      description: 'Calming technique for sleep and anxiety relief',
      benefits: ['Reduces anxiety', 'Promotes sleep', 'Lowers stress'],
      pattern: { inhale: 4, hold: 7, exhale: 8 },
      cycles: 4,
      icon: Moon,
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Military technique for focus and calm',
      benefits: ['Improves focus', 'Reduces stress', 'Enhances performance'],
      pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
      cycles: 6,
      icon: Brain,
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      id: 'energizing',
      name: 'Energizing Breath',
      description: 'Quick technique to boost energy and alertness',
      benefits: ['Increases energy', 'Improves alertness', 'Boosts mood'],
      pattern: { inhale: 3, hold: 1, exhale: 2 },
      cycles: 8,
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    {
      id: 'coherent',
      name: 'Coherent Breathing',
      description: 'Heart rhythm coherence for emotional balance',
      benefits: ['Heart rhythm coherence', 'Emotional balance', 'HRV improvement'],
      pattern: { inhale: 5, hold: 0, exhale: 5 },
      cycles: 10,
      icon: Heart,
      color: 'bg-red-100 text-red-800 border-red-200'
    }
  ];

  const calculateTotalDuration = (technique: BreathworkTechnique) => {
    const { inhale, hold, exhale, pause = 0 } = technique.pattern;
    const cycleTime = inhale + hold + exhale + pause;
    return cycleTime * technique.cycles;
  };

  const startBreathwork = (technique: BreathworkTechnique) => {
    setSelectedTechnique(technique);
    const duration = calculateTotalDuration(technique);
    setTotalTime(duration);
    setTimeRemaining(technique.pattern.inhale);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setIsActive(true);
  };

  const pauseBreathwork = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeBreathwork = () => {
    setIsActive(true);
  };

  const resetBreathwork = () => {
    setIsActive(false);
    setSelectedTechnique(null);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setTimeRemaining(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && selectedTechnique && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next phase
            const { inhale, hold, exhale, pause = 0 } = selectedTechnique.pattern;
            
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold');
              return hold;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return exhale;
            } else if (currentPhase === 'exhale') {
              if (pause > 0) {
                setCurrentPhase('pause');
                return pause;
              } else {
                // Next cycle
                if (currentCycle < selectedTechnique.cycles) {
                  setCurrentCycle(c => c + 1);
                  setCurrentPhase('inhale');
                  return inhale;
                } else {
                  // Complete
                  setIsActive(false);
                  onComplete(selectedTechnique.name, calculateTotalDuration(selectedTechnique));
                  return 0;
                }
              }
            } else if (currentPhase === 'pause') {
              if (currentCycle < selectedTechnique.cycles) {
                setCurrentCycle(c => c + 1);
                setCurrentPhase('inhale');
                return inhale;
              } else {
                // Complete
                setIsActive(false);
                onComplete(selectedTechnique.name, calculateTotalDuration(selectedTechnique));
                return 0;
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, selectedTechnique, currentPhase, currentCycle, timeRemaining, onComplete]);

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Breathe out slowly...';
      case 'pause': return 'Pause and relax...';
      default: return '';
    }
  };

  const getProgress = () => {
    if (!selectedTechnique) return 0;
    const totalDuration = calculateTotalDuration(selectedTechnique);
    const elapsed = totalDuration - timeRemaining;
    return (elapsed / totalDuration) * 100;
  };

  if (!selectedTechnique) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Breathwork Routines
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose a breathing technique to improve your wellbeing
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {techniques.map(technique => {
              const Icon = technique.icon;
              const duration = calculateTotalDuration(technique);
              
              return (
                <Card 
                  key={technique.id}
                  className={`cursor-pointer transition-all hover:shadow-md border-2 ${technique.color}`}
                  onClick={() => startBreathwork(technique)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 mt-1 text-current" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{technique.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Timer className="w-3 h-3 mr-1" />
                            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {technique.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {technique.benefits.map(benefit => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Pattern: {technique.pattern.inhale}s inhale → {technique.pattern.hold}s hold → {technique.pattern.exhale}s exhale
                          {technique.pattern.pause ? ` → ${technique.pattern.pause}s pause` : ''}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="w-5 h-5" />
          {selectedTechnique.name}
        </CardTitle>
        <Progress value={getProgress()} className="w-full" />
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Cycle {currentCycle} of {selectedTechnique.cycles}
          </div>
          <div className="text-4xl font-bold text-primary">
            {timeRemaining}
          </div>
          <div className="text-lg font-medium">
            {getPhaseInstruction()}
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {!isActive ? (
            <Button onClick={resumeBreathwork} className="gap-2">
              <Play className="w-4 h-4" />
              {timeRemaining === 0 ? 'Start' : 'Resume'}
            </Button>
          ) : (
            <Button onClick={pauseBreathwork} variant="outline" className="gap-2">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}
          
          <Button onClick={resetBreathwork} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Focus on your breath and let your body relax with each cycle
        </div>
      </CardContent>
    </Card>
  );
}