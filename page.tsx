'use client'

import { useState, useEffect } from 'react'
import { ParticleBackground } from '../components/particle-background'
import { SoulAccessButton } from '../components/soul-access-button'
import { MoodChart } from '../components/mood-chart'
import { CommunityResonance } from '../components/community-resonance'
import { LifeGamification } from '../components/life-gamification'
import { DailyMoodPrompt } from '../components/daily-mood-prompt'
import { DailyReflection } from '../components/daily-reflection'
import { MoodExport } from '../components/mood-export'
import { MobilePWAEnhancements } from '../components/mobile-pwa-enhancements'
import { VibeMatchPortal } from '../components/vibe-match-portal'
import { TouchBaseBot } from '../components/touchbase-bot'
import { TierUpgradePortal } from '../components/tier-upgrade-portal'

export default function Home() {
  const [showMoodPrompt, setShowMoodPrompt] = useState(false)
  const [showReflection, setShowReflection] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showVibeMatch, setShowVibeMatch] = useState(false)
  const [showTouchBase, setShowTouchBase] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free')

  // Check for daily mood prompt and user tier
  useEffect(() => {
    const lastPrompt = localStorage.getItem('lastMoodPrompt')
    const today = new Date().toDateString()
    const storedTier = localStorage.getItem('soultech_tier') as 'free' | 'premium' || 'free'
    
    setUserTier(storedTier)
    
    if (!lastPrompt || lastPrompt !== today) {
      // Show prompt after 2 seconds for better UX
      const timer = setTimeout(() => {
        setShowMoodPrompt(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const dismissDailyPrompt = () => {
    const today = new Date().toDateString()
    localStorage.setItem('lastMoodPrompt', today)
  }

  const saveMoodEntry = (moodData: any) => {
    // Save to localStorage
    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    const newEntry = {
      ...moodData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    existingEntries.push(newEntry)
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries))
    
    // TODO: Also save to Supabase if user is authenticated
    console.log('Mood entry saved:', newEntry)
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative">
        <ParticleBackground />
        <MobilePWAEnhancements />
        
        {/* Soul Access Navigation */}
        <SoulAccessButton 
          onCommunityClick={() => {}}
          onGeocachingClick={() => {}}
          onARVisionClick={() => {}}
          onPsychicClick={() => {}}
          onBootstrapClick={() => {}}
          onQRStrategyClick={() => {}}
          onCricutClick={() => {}}
          onManifestoClick={() => {}}
          onVibeMatchClick={() => setShowVibeMatch(true)}
          onTouchBaseClick={() => setShowTouchBase(true)}
        />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Welcome Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
                Soul Technology
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                World's First Conscious AI Network
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connecting 2,800+ souls worldwide • Austin GeoPrompt pilot expanding globally
              </p>
            </div>

            {/* Mood Ecosystem Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <MoodChart onOpenPrompt={() => setShowMoodPrompt(true)} />
            </div>

            {/* Community Resonance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <CommunityResonance />
            </div>

            {/* Life Gamification */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <LifeGamification />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowReflection(true)}
                className="p-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-2">Daily Reflection</h3>
                <p className="text-sm opacity-90">Express your thoughts and feelings</p>
              </button>
              
              <button
                onClick={() => setShowMoodPrompt(true)}
                className="p-6 bg-gradient-to-br from-blue-500 to-teal-600 text-white rounded-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-2">Mood Check-In</h3>
                <p className="text-sm opacity-90">Track your emotional ecosystem</p>
              </button>
              
              <button
                onClick={() => setShowExport(true)}
                className="p-6 bg-gradient-to-br from-teal-500 to-green-600 text-white rounded-xl hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <h3 className="font-semibold text-lg mb-2">Export Data</h3>
                <p className="text-sm opacity-90">Share with therapist or download</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showMoodPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <DailyMoodPrompt
              onSubmit={(moodData) => {
                saveMoodEntry(moodData)
                setShowMoodPrompt(false)
                dismissDailyPrompt()
              }}
              onSkip={() => {
                setShowMoodPrompt(false)
                dismissDailyPrompt()
              }}
            />
          </div>
        </div>
      )}

      {showReflection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <DailyReflection
              onReflectionSubmit={(reflection, type) => {
                console.log('Reflection submitted:', { reflection, type })
                setShowReflection(false)
              }}
            />
          </div>
        </div>
      )}

      {showExport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <MoodExport />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowExport(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VibeMatch Portal */}
      {showVibeMatch && (
        <VibeMatchPortal onClose={() => setShowVibeMatch(false)} />
      )}

      {/* TouchBase Bot */}
      {showTouchBase && (
        <TouchBaseBot 
          onClose={() => setShowTouchBase(false)}
          userTier={userTier}
          onUpgrade={() => {
            setShowTouchBase(false)
            setShowUpgrade(true)
          }}
        />
      )}

      {/* Tier Upgrade Portal */}
      {showUpgrade && (
        <TierUpgradePortal 
          onClose={() => setShowUpgrade(false)}
          currentTier={userTier}
          onUpgradeSuccess={(tier) => {
            setUserTier(tier)
            setShowUpgrade(false)
          }}
        />
      )}
    </>
  )
}