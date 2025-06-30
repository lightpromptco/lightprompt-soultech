'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Heart, Flame, Sparkles, MessageCircle, Lock, Zap } from 'lucide-react'

interface TouchBaseBotProps {
  onClose: () => void
  userTier: 'free' | 'premium'
  onUpgrade: () => void
}

interface Reflection {
  id: string
  type: 'desire' | 'intimacy' | 'boundaries' | 'growth'
  question: string
  userResponse: string
  botResponse: string
  timestamp: Date
  glowColor: string
}

export function TouchBaseBot({ onClose, userTier, onUpgrade }: TouchBaseBotProps) {
  const [activeTab, setActiveTab] = useState('chat')
  const [currentMessage, setCurrentMessage] = useState('')
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [currentGlow, setCurrentGlow] = useState('#ec4899') // Sexy pink default
  const [isUnlocked, setIsUnlocked] = useState(false)

  // TouchBase unlocks after 3+ emotional reflections
  useEffect(() => {
    const savedReflections = localStorage.getItem('soulReflections')
    if (savedReflections) {
      const parsed = JSON.parse(savedReflections)
      if (parsed.length >= 3) {
        setIsUnlocked(true)
      }
    }
  }, [])

  const intimacyPrompts = [
    {
      type: 'desire' as const,
      question: "What does desire feel like in your body right now?",
      followUp: "Your body holds such wisdom about what it craves. That tingling awareness you described - that's your authentic desire speaking. How might you honor that energy today?",
      glowColor: '#ef4444'
    },
    {
      type: 'intimacy' as const,
      question: "When do you feel most seen and appreciated by someone?",
      followUp: "Being truly seen is such a gift. The moments you described show your deep capacity for connection. What would it feel like to ask for that kind of presence more often?",
      glowColor: '#ec4899'
    },
    {
      type: 'boundaries' as const,
      question: "What's one boundary you've been afraid to set in your intimate relationships?",
      followUp: "Your boundaries are sacred - they're how you protect your energy and create space for authentic intimacy. That boundary you mentioned isn't selfish, it's necessary. How can you practice expressing it gently but firmly?",
      glowColor: '#8b5cf6'
    },
    {
      type: 'growth' as const,
      question: "How has your relationship with your own sexuality evolved over the past year?",
      followUp: "Your sexual evolution is beautiful and ongoing. The growth you've shared shows such courage and self-awareness. What aspect of this journey feels most exciting to explore next?",
      glowColor: '#f59e0b'
    }
  ]

  const generateBotResponse = (userInput: string, promptType: string): string => {
    const responses = {
      desire: [
        "Your desires are sacred messengers - they're showing you what your soul craves. There's such power in honoring what turns you on, both physically and emotionally.",
        "I love how you're exploring what lights you up. Desire isn't just about the physical - it's about what makes you feel most alive and connected to yourself.",
        "What you're describing sounds like your authentic self emerging. Your body knows what it wants - trust those signals, they're guiding you toward deeper pleasure and connection."
      ],
      intimacy: [
        "Real intimacy happens when we can be fully ourselves with someone. The vulnerability you're describing is actually your superpower - it creates space for deeper connection.",
        "Being seen and appreciated exactly as you are is such a fundamental need. You deserve relationships where you don't have to perform or hide parts of yourself.",
        "The intimacy you're craving sounds beautiful - that soul-level connection where you can be completely authentic. How might you create more opportunities for that kind of depth?"
      ]
    }
    
    const typeResponses = responses[promptType as keyof typeof responses] || responses.desire
    return typeResponses[Math.floor(Math.random() * typeResponses.length)]
  }

  const handleReflectionSubmit = (prompt: typeof intimacyPrompts[0]) => {
    if (!currentMessage.trim()) return
    
    const newReflection: Reflection = {
      id: Date.now().toString(),
      type: prompt.type,
      question: prompt.question,
      userResponse: currentMessage,
      botResponse: generateBotResponse(currentMessage, prompt.type),
      timestamp: new Date(),
      glowColor: prompt.glowColor
    }
    
    setReflections(prev => [...prev, newReflection])
    setCurrentGlow(prompt.glowColor)
    setCurrentMessage('')
    
    // Save to localStorage
    const allReflections = [...reflections, newReflection]
    localStorage.setItem('touchbaseReflections', JSON.stringify(allReflections))
  }

  if (userTier === 'free') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
          <CardHeader className="text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #f97316)',
                boxShadow: '0 0 30px #ec489960'
              }}
            >
              <Flame className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              TouchBase Bot
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Intimacy + Desire Reflection Tool
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-orange-400" />
                <span className="font-medium text-orange-400">Premium Feature</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                TouchBase Bot provides intelligent guidance for intimacy, desire, and conscious connection. 
                Unlock with premium access for $3-5 one-time or $3/month.
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div>• Flirty, embodied intimacy guidance</div>
                <div>• Desire & boundary reflection prompts</div>
                <div>• Sexy interface glow effects</div>
                <div>• Private, encrypted conversations</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={onUpgrade}
                className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center opacity-50">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-400">TouchBase Locked</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            <p className="text-gray-400">
              TouchBase Bot unlocks after you complete 3+ emotional reflections in your Soul Technology journey.
            </p>
            <p className="text-sm text-gray-500">
              Use the daily reflection tools to explore your inner world first.
            </p>
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Continue Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Sexy Glow Header */}
        <div 
          className="relative p-6 rounded-t-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentGlow}20, ${currentGlow}10)`,
            boxShadow: `0 0 30px ${currentGlow}40`
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentGlow}, ${currentGlow}80)`,
                    boxShadow: `0 0 20px ${currentGlow}60`
                  }}
                >
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">TouchBase Bot</h1>
                  <p className="text-sm opacity-80">Intimacy + Desire Reflection</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                ✕
              </Button>
            </div>
          </div>
          
          {/* Sexy animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-40 h-40 rounded-full opacity-20 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${currentGlow}60, transparent)`,
                top: '10%',
                right: '10%',
                animationDelay: '0s'
              }}
            />
            <div 
              className="absolute w-32 h-32 rounded-full opacity-15 animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${currentGlow}40, transparent)`,
                bottom: '10%',
                left: '15%',
                animationDelay: '2s'
              }}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="chat" className="data-[state=active]:bg-gray-700">Chat</TabsTrigger>
            <TabsTrigger value="prompts" className="data-[state=active]:bg-gray-700">Prompts</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gray-700">History</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${currentGlow}, ${currentGlow}80)`,
                      boxShadow: `0 0 20px ${currentGlow}60`
                    }}
                  >
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Open Conversation</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Ask me anything about intimacy, desire, boundaries, or connection.<br />
                    I'm here to provide intelligent, flirty, embodied guidance.
                  </p>
                  <div className="space-y-4">
                    <Input
                      placeholder="What's on your mind about intimacy or desire?"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button 
                      className="w-full"
                      style={{
                        background: `linear-gradient(135deg, ${currentGlow}, ${currentGlow}80)`,
                        boxShadow: `0 0 15px ${currentGlow}40`
                      }}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Share with TouchBase
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-4">
            <div className="grid gap-4">
              {intimacyPrompts.map((prompt, idx) => (
                <Card key={idx} className="bg-gray-800 border-gray-700 hover:border-pink-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${prompt.glowColor}, ${prompt.glowColor}80)`,
                          boxShadow: `0 0 15px ${prompt.glowColor}40`
                        }}
                      >
                        {prompt.type === 'desire' && <Flame className="w-5 h-5 text-white" />}
                        {prompt.type === 'intimacy' && <Heart className="w-5 h-5 text-white" />}
                        {prompt.type === 'boundaries' && <Lock className="w-5 h-5 text-white" />}
                        {prompt.type === 'growth' && <Sparkles className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2 capitalize">{prompt.type} Reflection</h4>
                        <p className="text-gray-300 text-sm mb-4">{prompt.question}</p>
                        <div className="space-y-3">
                          <Input
                            placeholder="Share your thoughts..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Button 
                            onClick={() => handleReflectionSubmit(prompt)}
                            disabled={!currentMessage.trim()}
                            size="sm"
                            style={{
                              background: `linear-gradient(135deg, ${prompt.glowColor}, ${prompt.glowColor}80)`,
                              boxShadow: `0 0 10px ${prompt.glowColor}30`
                            }}
                          >
                            Reflect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {reflections.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No Reflections Yet</h3>
                  <p className="text-gray-400">
                    Start with the prompts tab to begin your intimacy journey
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reflections.map((reflection) => (
                  <Card key={reflection.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: reflection.glowColor }}
                        />
                        <span className="text-sm text-gray-400 capitalize">{reflection.type}</span>
                        <span className="text-xs text-gray-500">
                          {reflection.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-300 mb-1">Question:</p>
                          <p className="text-sm text-gray-400">{reflection.question}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-300 mb-1">Your Response:</p>
                          <p className="text-sm">{reflection.userResponse}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-300 mb-1">TouchBase Response:</p>
                          <p className="text-sm text-gray-300 italic">{reflection.botResponse}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}