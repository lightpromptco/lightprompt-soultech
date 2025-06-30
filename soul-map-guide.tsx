import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SoulMapGuide() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-teal-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-teal-200 dark:border-teal-700">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Understanding Your Soul Ecosystem Map
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          The world's first emotional tracking system that treats your feelings as a living landscape
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* What Makes It Unique */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            What Makes This Different?
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-teal-200 dark:border-teal-600">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Traditional mood trackers just ask "How do you feel? 😊😐😢" - that's boring and limited!
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Your Soul Ecosystem Map treats emotions like a living, breathing environment with seasons, 
              depth, flow patterns, and growth cycles. Just like nature!
            </p>
          </div>
        </div>

        {/* The Four Dimensions */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            The Four Ecosystem Dimensions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Depth</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                How profound or surface-level are your emotions? Deep reflection vs. light feelings.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">
                1-3: Surface emotions, 4-7: Moderate depth, 8-10: Profound feelings
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-green-800 dark:text-green-300">Flow</h4>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                How easily are emotions moving through you? Stuck vs. flowing freely.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 italic">
                1-3: Blocked/stuck, 4-7: Some movement, 8-10: Free flowing
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-300">Resonance</h4>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                How aligned do you feel with yourself and your environment? Inner harmony level.
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 italic">
                1-3: Disconnected, 4-7: Some alignment, 8-10: Deep harmony
              </p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-300">Growth</h4>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                What potential for expansion do you feel? Learning, healing, evolving energy.
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 italic">
                1-3: Stagnant, 4-7: Some growth, 8-10: Rapid expansion
              </p>
            </div>
          </div>
        </div>

        {/* Seasonal Cycles */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            Emotional Seasons
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl mb-1">🌱</div>
              <div className="font-semibold text-green-700 dark:text-green-300">Spring</div>
              <div className="text-xs text-green-600 dark:text-green-400">New beginnings, hope</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl mb-1">☀️</div>
              <div className="font-semibold text-yellow-700 dark:text-yellow-300">Summer</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">Peak energy, joy</div>
            </div>
            <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="text-2xl mb-1">🍂</div>
              <div className="font-semibold text-amber-700 dark:text-amber-300">Autumn</div>
              <div className="text-xs text-amber-600 dark:text-amber-400">Reflection, letting go</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl mb-1">❄️</div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">Winter</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Rest, transformation</div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            How to Use Your Map
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-teal-100 text-teal-800 text-xs">1</Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Daily Check-ins:</strong> Click "Check In" to add today's emotional ecosystem state
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-teal-100 text-teal-800 text-xs">2</Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Hover to Explore:</strong> Move your mouse over any day's dot to see details
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-teal-100 text-teal-800 text-xs">3</Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Watch Patterns:</strong> The flowing lines show how your dimensions change over time
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-teal-100 text-teal-800 text-xs">4</Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Seasonal Awareness:</strong> Notice if you're in a growth phase, reflection time, or transformation
              </p>
            </div>
          </div>
        </div>

        {/* The Science */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            Why This Works
          </h3>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
              <strong>Ecosystem Thinking:</strong> Your emotions aren't isolated events - they're part of a living system with patterns, cycles, and interconnections.
            </p>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Multi-dimensional Awareness:</strong> Instead of reducing feelings to "good" or "bad," you track the rich complexity of your inner landscape.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}