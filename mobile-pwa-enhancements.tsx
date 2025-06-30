import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Vibrate, Sparkles, Zap } from 'lucide-react';

export function MobilePWAEnhancements() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
  };

  const addMobileInteractions = () => {
    // Add touch gestures for mobile
    const cards = document.querySelectorAll('.mood-card, .soul-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', () => {
        triggerHapticFeedback();
        card.classList.add('scale-95', 'transition-transform', 'duration-150');
      });
      
      card.addEventListener('touchend', () => {
        setTimeout(() => {
          card.classList.remove('scale-95');
        }, 150);
      });
    });
  };

  useEffect(() => {
    addMobileInteractions();
  }, []);

  return (
    <>
      {/* Install Prompt */}
      {showInstallPrompt && (
        <Card className="fixed bottom-20 left-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 md:hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6" />
              <div className="flex-1">
                <h3 className="font-semibold">Install Soul Technology</h3>
                <p className="text-sm text-white/90">Add to home screen for the full experience</p>
              </div>
              <Button 
                onClick={handleInstall}
                size="sm"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Install
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile-specific interactive elements */}
      <div className="md:hidden">
        {/* Floating Action Button for quick mood check */}
        <Button
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg z-40"
          onClick={() => {
            triggerHapticFeedback();
            // Open mood tracker
          }}
        >
          <Sparkles className="w-6 h-6" />
        </Button>

        {/* Swipe indicators */}
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
            />
          ))}
        </div>
      </div>
    </>
  );
}