import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Lightbulb, Target } from 'lucide-react';

interface DailyReflectionProps {
  onReflectionSubmit: (reflection: string, type: string) => void;
}

const reflectionPrompts = [
  {
    type: 'gratitude',
    icon: Heart,
    color: 'bg-pink-100 text-pink-800 border-pink-300',
    title: 'Gratitude Practice',
    prompts: [
      "What made your heart feel full today?",
      "Who or what brought unexpected joy to your day?",
      "What small moment are you grateful for?",
      "What part of nature did you appreciate today?",
      "What strength within yourself are you thankful for?"
    ]
  },
  {
    type: 'learning',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    title: 'Growth & Learning',
    prompts: [
      "What did you learn about yourself today?",
      "How did you grow or stretch beyond your comfort zone?",
      "What challenge taught you something valuable?",
      "What pattern did you notice in your emotional ecosystem?",
      "How did you practice self-compassion today?"
    ]
  },
  {
    type: 'intention',
    icon: Target,
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    title: 'Tomorrow\'s Intention',
    prompts: [
      "How do you want to show up tomorrow?",
      "What energy do you want to cultivate?",
      "What would help your emotional ecosystem flourish?",
      "What boundary would serve your highest good?",
      "How can you honor your needs tomorrow?"
    ]
  },
  {
    type: 'celebration',
    icon: Sparkles,
    color: 'bg-green-100 text-green-800 border-green-300',
    title: 'Celebrate Yourself',
    prompts: [
      "What did you do well today, even if it felt small?",
      "How did you show kindness to yourself or others?",
      "What choice are you proud of making?",
      "What resilience did you demonstrate?",
      "How did you honor your authentic self today?"
    ]
  }
];

export function DailyReflection({ onReflectionSubmit }: DailyReflectionProps) {
  const [selectedType, setSelectedType] = useState<typeof reflectionPrompts[0] | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [reflection, setReflection] = useState('');

  const selectRandomPrompt = (type: typeof reflectionPrompts[0]) => {
    const randomPrompt = type.prompts[Math.floor(Math.random() * type.prompts.length)];
    setSelectedType(type);
    setSelectedPrompt(randomPrompt);
    setReflection('');
  };

  const handleSubmit = () => {
    if (reflection.trim() && selectedType) {
      onReflectionSubmit(reflection, selectedType.type);
      setSelectedType(null);
      setSelectedPrompt('');
      setReflection('');
    }
  };

  if (selectedType && selectedPrompt) {
    const Icon = selectedType.icon;
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20 border-purple-200 dark:border-purple-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedType.title}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-300 font-medium">
              {selectedPrompt}
            </p>
          </div>
          
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Take your time... let your thoughts flow naturally"
            className="w-full p-4 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none min-h-[120px]"
            rows={6}
          />
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSubmit}
              disabled={!reflection.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Save Reflection
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedType(null);
                setSelectedPrompt('');
                setReflection('');
              }}
              className="flex-1"
            >
              Choose Different
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20 border-purple-200 dark:border-purple-700">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Daily Soul Reflection
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Deepen your emotional ecosystem awareness with guided reflection
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reflectionPrompts.map((prompt) => {
            const Icon = prompt.icon;
            return (
              <Button
                key={prompt.type}
                variant="outline"
                onClick={() => selectRandomPrompt(prompt)}
                className={`h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform ${prompt.color} border-2`}
              >
                <Icon className="w-8 h-8" />
                <span className="font-semibold text-sm">{prompt.title}</span>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Each reflection becomes part of your emotional ecosystem journey
          </p>
        </div>
      </CardContent>
    </Card>
  );
}