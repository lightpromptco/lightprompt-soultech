import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, QrCode, Heart, Music, GraduationCap, TreePine, Coffee, DollarSign } from 'lucide-react';

export function AustinQRStrategy() {
  const locations = [
    {
      name: "Zilker Park",
      icon: TreePine,
      message: "Feeling overwhelmed by city life? Let's find your grounding here in nature...",
      audience: "Nature seekers, families, festival-goers",
      timing: "ACL season, weekends, sunset hours",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "SXSW Venues", 
      icon: Music,
      message: "Austin's creative energy is intense right now. Let's find your center in the chaos...",
      audience: "Artists, tech workers, music lovers",
      timing: "March festival season",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "UT Campus",
      icon: GraduationCap,
      message: "College brings unique pressures. You're not alone in this journey...",
      audience: "Students, faculty, young adults", 
      timing: "Semester starts, finals, graduation",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Coffee Shops",
      icon: Coffee,
      message: "Caffeine buzz or anxiety? Let's untangle those feelings...",
      audience: "Remote workers, students, creatives",
      timing: "Morning rush, afternoon slumps",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const metrics = [
    { label: "Cost", value: "$100", description: "Weather-resistant stickers for 500 QR codes" },
    { label: "Reach", value: "1000+", description: "People per month across Austin locations" },
    { label: "Conversion", value: "5-10%", description: "QR scan to email signup rate" },
    { label: "ROI", value: "1-2 months", description: "Payback period for investment" }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <QrCode className="w-6 h-6 text-orange-600" />
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Austin QR Code Soul Technology Strategy
          </span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Guerrilla marketing through location-based emotional support around Austin, Texas
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Core Concept */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Revolutionary Concept
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Place QR codes around Austin that connect to LightPrompt Bot with location-specific emotional support. 
            People discover your Soul Technology through meaningful interactions with their environment.
          </p>
        </div>

        {/* Strategic Locations */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">High-Impact Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location, index) => {
              const Icon = location.icon;
              
              return (
                <div key={location.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${location.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{location.name}</h4>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded italic text-gray-700 dark:text-gray-300">
                      "{location.message}"
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Audience: </span>
                      <span className="text-gray-700 dark:text-gray-300">{location.audience}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Optimal timing: </span>
                      <span className="text-gray-700 dark:text-gray-300">{location.timing}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Implementation Strategy */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Phase 1: Pilot</h4>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
              <li>• 50-100 QR codes</li>
              <li>• 10-15 strategic locations</li>
              <li>• Test messaging & design</li>
              <li>• Measure engagement</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Phase 2: Scale</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• 200-500 QR codes</li>
              <li>• All major neighborhoods</li>
              <li>• Business partnerships</li>
              <li>• Austin community features</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Phase 3: Expand</h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
              <li>• Replicate in other cities</li>
              <li>• City-specific adaptations</li>
              <li>• "Soul Technology Cities"</li>
              <li>• National network</li>
            </ul>
          </div>
        </div>

        {/* ROI Metrics */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Investment & Returns</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">{metric.value}</div>
                <div className="font-medium text-gray-900 dark:text-white">{metric.label}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Execution Notes */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Execution Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-yellow-700 dark:text-yellow-400">Legal Placement:</div>
              <div className="text-yellow-600 dark:text-yellow-500">Public bulletin boards, coffee shop community boards, campus posting areas, business partnerships</div>
            </div>
            <div>
              <div className="font-medium text-orange-700 dark:text-orange-400">Materials Needed:</div>
              <div className="text-orange-600 dark:text-orange-500">Weather-resistant stickers, simple design, custom landing pages, analytics tracking</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-6 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-3">
            Ready to Launch Austin's First Soul Technology Network?
          </h3>
          <p className="text-orange-700 dark:text-orange-400 mb-4">
            This innovative approach creates authentic local connections while building your community organically through meaningful place-based interactions.
          </p>
          <Badge className="bg-orange-100 text-orange-800 border-orange-300">
            Total Investment: Under $100 • Potential Monthly Revenue: $200-800
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}