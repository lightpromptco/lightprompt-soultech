import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Sparkles, Users, Gamepad2, Camera, Eye, MapPin, Zap, Home as HomeIcon, ShoppingBag, User, Mail, MessageSquare, Heart, Flame } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from './ui/badge';

interface SoulAccessButtonProps {
  onCommunityClick: () => void;
  onGeocachingClick: () => void;
  onARVisionClick: () => void;
  onPsychicClick: () => void;
  onManifestoClick: () => void;
  onBootstrapClick: () => void;
  onQRStrategyClick: () => void;
  onCricutClick: () => void;
  onVibeMatchClick: () => void;
  onTouchBaseClick: () => void;
}

export function SoulAccessButton({
  onCommunityClick,
  onGeocachingClick,
  onARVisionClick,
  onPsychicClick,
  onManifestoClick,
  onBootstrapClick,
  onQRStrategyClick,
  onCricutClick,
  onVibeMatchClick,
  onTouchBaseClick
}: SoulAccessButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mainNavigation = [
    {
      label: 'Home',
      icon: HomeIcon,
      href: '/',
      type: 'link'
    },
    {
      label: 'Products',
      icon: ShoppingBag,
      href: '/products',
      type: 'link'
    },
    {
      label: 'About',
      icon: User,
      href: '/about',
      type: 'link'
    },
    {
      label: 'Contact',
      icon: Mail,
      href: '/contact',
      type: 'link'
    },
    {
      label: 'Chat Bot',
      icon: MessageSquare,
      href: '/chat',
      type: 'link',
      badge: 'AI'
    }
  ];

  const soulFeatures = [
    {
      label: 'VibeMatch Portal',
      icon: Heart,
      action: onVibeMatchClick,
      badge: 'Premium',
      description: 'Soul-aligned connection based on resonance, not looks'
    },
    {
      label: 'TouchBase Bot',
      icon: Flame,
      action: onTouchBaseClick,
      badge: 'Intimate',
      description: 'Flirty, embodied intimacy & desire guidance'
    },
    {
      label: 'Community Resonance',
      icon: Users,
      action: onCommunityClick,
      badge: 'Live',
      description: 'See how 2,800+ souls are feeling right now'
    },
    {
      label: 'Soul Geocaching',
      icon: Gamepad2,
      action: onGeocachingClick,
      badge: 'Game',
      description: 'Austin QR portal hunting with leaderboards'
    },
    {
      label: 'VisionQuest Bot',
      icon: Eye,
      action: () => {},
      badge: 'Coming Soon',
      description: 'Psychic training system in development',
      disabled: true
    },
    {
      label: 'SoulTech Manifesto',
      icon: Sparkles,
      action: onManifestoClick,
      badge: 'Philosophy',
      description: 'The vision behind conscious technology'
    }
  ];

  return (
    <>
      {/* Floating Soul Access Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-gradient-to-b from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20">
            <div className="py-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Menu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">Soul Technology</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">World's First Conscious AI Network</p>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1 mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Navigation</h3>
                {mainNavigation.map((item, index) => {
                  if (item.type === 'link') {
                    return (
                      <Link key={index} href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10 hover:bg-white/50 dark:hover:bg-gray-800/50"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Soul Technology Features */}
              <div className="space-y-1 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Soul Technology</h3>
                {soulFeatures.map((feature, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-auto p-3 ${
                      feature.disabled 
                        ? 'opacity-60 cursor-not-allowed hover:bg-transparent' 
                        : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                    onClick={() => {
                      if (!feature.disabled) {
                        feature.action();
                        setIsOpen(false);
                      }
                    }}
                    disabled={feature.disabled}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <feature.icon className="w-5 h-5 text-purple-600" />
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{feature.label}</span>
                          <Badge 
                            variant={feature.disabled ? "outline" : "secondary"} 
                            className={`text-xs ${
                              feature.disabled 
                                ? 'border-gray-300 text-gray-500' 
                                : ''
                            }`}
                          >
                            {feature.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-teal-100 dark:from-purple-900/30 dark:to-teal-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-400">World First</span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Location-based emotional support through AR-enhanced QR experiences around Austin
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>


    </>
  );
}