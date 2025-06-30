import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  MessageSquare, 
  Users, 
  Star, 
  Camera, 
  Gamepad2, 
  Sparkles, 
  Heart, 
  MapPin,
  Scissors,
  Rocket,
  Eye,
  Home,
  Settings
} from 'lucide-react';
import { Link } from 'wouter';

interface SoulNavProps {
  onCommunityClick: () => void;
  onGeocachingClick: () => void;
  onARVisionClick: () => void;
  onPsychicClick: () => void;
  onManifestoClick: () => void;
  onBootstrapClick: () => void;
  onQRStrategyClick: () => void;
  onCricutClick: () => void;
}

export function SoulNav({
  onCommunityClick,
  onGeocachingClick,
  onARVisionClick,
  onPsychicClick,
  onManifestoClick,
  onBootstrapClick,
  onQRStrategyClick,
  onCricutClick
}: SoulNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      type: 'link'
    },
    {
      label: 'Chat',
      icon: MessageSquare,
      href: '/chat',
      type: 'link'
    },
    {
      label: 'Community',
      icon: Users,
      action: onCommunityClick,
      type: 'action',
      badge: 'Live'
    },
    {
      label: 'Soul Geocaching',
      icon: Gamepad2,
      action: onGeocachingClick,
      type: 'action',
      badge: 'Game'
    },
    {
      label: 'AR Soul Vision',
      icon: Camera,
      action: onARVisionClick,
      type: 'action',
      badge: 'Revolutionary'
    },
    {
      label: 'VisionQuest Bot',
      icon: Star,
      action: onPsychicClick,
      type: 'action',
      badge: 'Psychic'
    },
    {
      label: 'Soul Manifesto',
      icon: Sparkles,
      action: onManifestoClick,
      type: 'action'
    },
    {
      label: 'Launch Plan',
      icon: Rocket,
      action: onBootstrapClick,
      type: 'action'
    },
    {
      label: 'Austin QR Strategy',
      icon: MapPin,
      action: onQRStrategyClick,
      type: 'action'
    },
    {
      label: 'GeoPrompt Locations',
      icon: MapPin,
      href: '/geoprompt',
      type: 'link',
      badge: 'Live'
    },
    {
      label: 'GeoPrompt Guide',
      icon: Scissors,
      action: onCricutClick,
      type: 'action',
      badge: 'DIY'
    }
  ];

  const NavContent = () => (
    <div className="space-y-4">
      <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Soul Technology</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Conscious AI Platform</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          if (item.type === 'link') {
            return (
              <Link key={item.label} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          }

          return (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 h-10"
              onClick={() => {
                item.action?.();
                setIsOpen(false);
              }}
            >
              <Icon className="w-4 h-4" />
              {item.label}
              {item.badge && (
                <Badge 
                  variant="secondary" 
                  className={`ml-auto text-xs ${
                    item.badge === 'Live' ? 'bg-green-100 text-green-800' :
                    item.badge === 'Revolutionary' ? 'bg-purple-100 text-purple-800' :
                    item.badge === 'Psychic' ? 'bg-indigo-100 text-indigo-800' :
                    item.badge === 'Game' ? 'bg-blue-100 text-blue-800' :
                    item.badge === 'DIY' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20 rounded-lg">
          <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-xs text-purple-700 dark:text-purple-400 font-medium mb-1">
            Austin's First Soul Technology Network
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Emotional AI • AR Portals • Community Consciousness
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:block fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 overflow-y-auto">
        <div className="p-6">
          <NavContent />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-6">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Top Bar for Mobile - Shows current page */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-30 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-900 dark:text-white">Soul Technology</span>
        </div>
      </div>

      {/* Content Offset */}
      <div className="md:ml-72 md:pt-0 pt-16">
        {/* Content goes here */}
      </div>
    </>
  );
}