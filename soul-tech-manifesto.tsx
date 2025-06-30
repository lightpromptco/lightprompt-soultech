import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Lightbulb, Globe, Leaf, Users, Sparkles } from 'lucide-react';

export function SoulTechManifesto() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20 border-purple-200 dark:border-purple-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
          Soul Technology Manifesto
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300 italic">
          Technology that serves the soul, not enslaves it
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Core Principles */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Human-First Design</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>Technology should enhance human connection, not replace it. Every feature we build asks: "Does this serve human flourishing?"</p>
              <p>We design for emotional intelligence, not addiction. Our algorithms promote wellbeing, not endless scrolling.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conscious Creation</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>We build technology with awareness of its impact on minds, hearts, and the planet. Every line of code is written with intention.</p>
              <p>Our tools amplify wisdom, not noise. They create space for reflection, not reactivity.</p>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Our Sacred Promise</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Community Over Profit</h4>
              <p className="text-blue-700 dark:text-blue-400">We prioritize human connection and collective healing over extraction and exploitation.</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Planetary Healing</h4>
              <p className="text-green-700 dark:text-green-400">Technology that heals both individual souls and our collective relationship with Earth.</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Wisdom Amplification</h4>
              <p className="text-purple-700 dark:text-purple-400">AI that enhances human wisdom rather than replacing human judgment and intuition.</p>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">The Soul Tech Vision</h3>
          </div>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              We envision a world where technology serves as a bridge to deeper self-understanding, meaningful relationships, and harmonious living with nature.
            </p>
            <p>
              Where AI helps us become more human, not less. Where digital tools amplify our capacity for love, wisdom, and healing rather than fragmenting our attention and depleting our souls.
            </p>
            <p>
              This is not just software - it's a movement toward conscious technology that honors the sacred in every human being.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-teal-100 dark:from-purple-900/30 dark:to-teal-900/30 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Join the Soul Technology Revolution
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Every user, every conversation, every moment of authentic sharing contributes to a more conscious digital world.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">Conscious Creator</Badge>
            <Badge className="bg-teal-100 text-teal-800 border-teal-300">Soul Technologist</Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">Digital Healer</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}