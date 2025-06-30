import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MoodTrackerProps {
  onMoodSelect: (mood: string, energy: number) => void;
}

export function MoodTracker({ onMoodSelect }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [energy, setEnergy] = useState<number>(5);

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-green-100 text-green-800" },
    { emoji: "😌", label: "Calm", color: "bg-blue-100 text-blue-800" },
    { emoji: "😴", label: "Tired", color: "bg-gray-100 text-gray-800" },
    { emoji: "😰", label: "Anxious", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😢", label: "Sad", color: "bg-purple-100 text-purple-800" },
    { emoji: "😠", label: "Frustrated", color: "bg-red-100 text-red-800" },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, energy);
      setSelectedMood("");
      setEnergy(5);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant={selectedMood === mood.label ? "default" : "outline"}
              className="h-16 flex flex-col gap-1"
              onClick={() => setSelectedMood(mood.label)}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>

        {selectedMood && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Energy Level: {energy}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <Button onClick={handleSubmit} className="w-full">
              Share with LightPromptBot
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}