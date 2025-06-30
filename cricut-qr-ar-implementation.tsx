import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scissors, Camera, QrCode, MapPin, Smartphone, DollarSign, Zap, Target } from 'lucide-react';

export function CricutQRARImplementation() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Cricut QR Code Creation",
      icon: Scissors,
      cost: "$20-40",
      description: "Design and cut weather-resistant QR code stickers using your Cricut machine",
      details: [
        "Use vinyl or waterproof sticker material",
        "Design QR codes linking to chat.lightprompt.co/austin/[location]",
        "Include small Soul Technology branding",
        "Create 50-100 codes for initial Austin deployment",
        "Test QR code readability at different sizes"
      ]
    },
    {
      id: 2,
      title: "Smart Landing Pages",
      icon: Smartphone,
      cost: "$0",
      description: "Create location-specific web pages that detect if user has AR capabilities",
      details: [
        "Landing page checks for camera permissions",
        "Detects if device supports WebXR or AR features",
        "Fallback to regular chatbot if no AR support",
        "Prompts user to 'Open Camera' for AR experience",
        "Tracks which locations get most scans"
      ]
    },
    {
      id: 3,
      title: "Low-Cost AR Integration",
      icon: Camera,
      cost: "$100-200",
      description: "Implement browser-based AR using free/low-cost tools",
      details: [
        "Use 8th Wall Web AR (free tier: 50 users/month)",
        "Or A-Frame + AR.js (completely free)",
        "Simple emotional energy overlay effects",
        "Location-based content delivery",
        "Works on any smartphone browser"
      ]
    },
    {
      id: 4,
      title: "Content & Experience",
      icon: Target,
      cost: "$0",
      description: "Create AR content that enhances the Soul Technology experience",
      details: [
        "Simple floating text with emotional prompts",
        "Color overlays indicating location energy",
        "3D Soul Technology logo appearing in AR",
        "Progress tracking for 'portal discoveries'",
        "Share feature for social media"
      ]
    }
  ];

  const arPlatforms = [
    {
      name: "8th Wall Web AR",
      cost: "Free (50 users/month)",
      pros: ["Easy implementation", "Works on most phones", "Good documentation"],
      cons: ["Limited free tier", "$99/month after limit"],
      bestFor: "Quick MVP testing"
    },
    {
      name: "A-Frame + AR.js",
      cost: "Completely Free",
      pros: ["No usage limits", "Open source", "Customizable"],
      cons: ["More technical setup", "Basic AR features"],
      bestFor: "Long-term solution"
    },
    {
      name: "WebXR (Native)",
      cost: "Free",
      pros: ["No third-party dependency", "Best performance"],
      cons: ["Limited device support", "Complex implementation"],
      bestFor: "Future-proofing"
    }
  ];

  const locations = [
    {
      name: "Zilker Park",
      qrCode: "chat.lightprompt.co/austin/zilker",
      arContent: "Floating 'Find Your Grounding' message with green energy overlay",
      placement: "Near the main entrance, community bulletin area"
    },
    {
      name: "South by Southwest Area",
      qrCode: "chat.lightprompt.co/austin/sxsw",
      arContent: "Purple creative energy swirls with 'Channel the Chaos' prompt",
      placement: "Official venue bulletin boards during festival season"
    },
    {
      name: "UT Campus",
      qrCode: "chat.lightprompt.co/austin/campus",
      arContent: "Blue wisdom aura with study tips and stress relief prompts",
      placement: "Student center, library community boards"
    },
    {
      name: "Coffee Shops",
      qrCode: "chat.lightprompt.co/austin/coffee",
      arContent: "Warm orange glow with mindfulness brewing metaphors",
      placement: "Radio Coffee, Merit Coffee, local cafe community boards"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Scissors className="w-6 h-6 text-green-600" />
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            GeoPrompt Implementation Guide
          </span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Complete guide to creating GeoPrompt experiences - location-based emotional support through Cricut QR codes + AR
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Implementation Steps */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Implementation Steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                  activeStep === step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Step {step.id}: {step.title}
              </button>
            ))}
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className={`${activeStep === step.id ? 'block' : 'hidden'}`}>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                        <Badge className="bg-green-100 text-green-800">{step.cost}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* AR Platform Comparison */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">AR Platform Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {arPlatforms.map((platform, index) => (
              <div key={platform.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h4>
                  <Badge variant="outline" className="text-xs">{platform.cost}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-green-700 dark:text-green-400 mb-1">Pros:</div>
                    <ul className="space-y-1">
                      {platform.pros.map((pro, i) => (
                        <li key={i} className="text-green-600 dark:text-green-500">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="font-medium text-red-700 dark:text-red-400 mb-1">Cons:</div>
                    <ul className="space-y-1">
                      {platform.cons.map((con, i) => (
                        <li key={i} className="text-red-600 dark:text-red-500">• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Best for: </span>
                    <span className="text-blue-600 dark:text-blue-400">{platform.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Austin Location Strategy */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Austin QR + AR Locations</h3>
          <div className="space-y-3">
            {locations.map((location, index) => (
              <div key={location.name} className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">{location.name}</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">QR Link: </span>
                        <span className="text-blue-600 dark:text-blue-500">{location.qrCode}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">AR Content: </span>
                        <span className="text-blue-600 dark:text-blue-500">{location.arContent}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">Placement: </span>
                        <span className="text-blue-600 dark:text-blue-500">{location.placement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation Flow */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">User Experience Flow</h3>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <QrCode className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-purple-700">1. Scan QR Code</div>
              <div className="text-purple-600">User finds Cricut-made sticker</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Smartphone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-blue-700">2. Smart Detection</div>
              <div className="text-blue-600">Page checks AR capabilities</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Camera className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-700">3. Open Camera</div>
              <div className="text-green-600">"Open Camera for AR" prompt</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="font-medium text-orange-700">4. AR Experience</div>
              <div className="text-orange-600">Location-based content appears</div>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Total Budget Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$20-40</div>
              <div className="text-sm text-green-700">Cricut Materials</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-blue-700">Landing Pages</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$0-100</div>
              <div className="text-sm text-purple-700">AR Platform</div>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$20-140</div>
              <div className="text-sm text-orange-700">Total Cost</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center p-4 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
            Ready to Launch Austin's First GeoPrompt Network?
          </h3>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Start with 10-15 GeoPrompt locations around Austin. Test the AR experience with A-Frame (free), 
            then scale based on user engagement and feedback.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Start GeoPrompt Creation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}