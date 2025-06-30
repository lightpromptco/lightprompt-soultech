import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Heart, Activity } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  sleep: number;
  stress: number;
  notes?: string;
}

interface MoodCalendarProps {
  entries: MoodEntry[];
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

export function MoodCalendar({ entries, onDateSelect, selectedDate }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getMoodColor = (mood: string) => {
    const colors = {
      happy: "bg-green-100 border-green-300 text-green-800",
      calm: "bg-blue-100 border-blue-300 text-blue-800",
      sad: "bg-purple-100 border-purple-300 text-purple-800",
      anxious: "bg-yellow-100 border-yellow-300 text-yellow-800",
      frustrated: "bg-red-100 border-red-300 text-red-800",
      tired: "bg-gray-100 border-gray-300 text-gray-800"
    };
    return colors[mood as keyof typeof colors] || "bg-gray-50 border-gray-200";
  };

  const getEntryForDate = (date: Date) => {
    return entries.find(entry => isSameDay(new Date(entry.date), date));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Mood Calendar
        </CardTitle>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            Previous
          </Button>
          <span className="font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            Next
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map(day => {
            const entry = getEntryForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => onDateSelect(day)}
                className={`
                  relative p-2 h-12 text-sm border rounded-md transition-all hover:border-primary/50
                  ${isSelected ? 'border-primary bg-primary/10' : 'border-border'}
                  ${isTodayDate ? 'font-bold' : ''}
                  ${entry ? getMoodColor(entry.mood) : 'bg-background hover:bg-muted/50'}
                `}
              >
                <span className="relative z-10">{format(day, 'd')}</span>
                
                {entry && (
                  <div className="absolute bottom-1 left-1 right-1 flex justify-center">
                    <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                  </div>
                )}
                
                {isTodayDate && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-2">Mood Legend:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { mood: 'happy', label: 'Happy', emoji: '😊' },
              { mood: 'calm', label: 'Calm', emoji: '😌' },
              { mood: 'tired', label: 'Tired', emoji: '😴' },
              { mood: 'anxious', label: 'Anxious', emoji: '😰' },
              { mood: 'sad', label: 'Sad', emoji: '😢' },
              { mood: 'frustrated', label: 'Frustrated', emoji: '😠' }
            ].map(({ mood, label, emoji }) => (
              <Badge key={mood} variant="outline" className={`text-xs ${getMoodColor(mood)}`}>
                {emoji} {label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}