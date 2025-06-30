'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Zap, Crown, Heart, Flame, Sparkles, Check, Lock, Gift, CreditCard } from 'lucide-react'

interface TierUpgradePortalProps {
  onClose: () => void
  onUpgradeSuccess: (tier: 'premium') => void
  currentTier: 'free' | 'premium'
}

export function TierUpgradePortal({ onClose, onUpgradeSuccess, currentTier }: TierUpgradePortalProps) {
  const [selectedOption, setSelectedOption] = useState<'subscription' | 'product' | 'code'>('product')
  const [portalCode, setPortalCode] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const portalCodes = [
    'L!GH+PR0MP+', // Main portal password
    'SOULTECH2025', // Developer access
    'VIBEMATCH', // VibeMatch access
    'TOUCHBASE' // TouchBase access
  ]

  const handleCodeSubmit = () => {
    if (portalCodes.includes(portalCode.toUpperCase())) {
      setIsProcessing(true)
      setTimeout(() => {
        localStorage.setItem('soultech_tier', 'premium')
        localStorage.setItem('upgrade_method', 'code')
        onUpgradeSuccess('premium')
        setIsProcessing(false)
      }, 1500)
    } else {
      alert('Invalid portal code. Try a LightPrompt product code or subscription.')
    }
  }

  const handleProductPurchase = (productType: string) => {
    setIsProcessing(true)
    // Simulate product purchase flow
    setTimeout(() => {
      localStorage.setItem('soultech_tier', 'premium')
      localStorage.setItem('upgrade_method', 'product')
      localStorage.setItem('product_purchased', productType)
      onUpgradeSuccess('premium')
      setIsProcessing(false)
    }, 2000)
  }

  const handleSubscription = () => {
    setIsProcessing(true)
    // Simulate subscription flow
    setTimeout(() => {
      localStorage.setItem('soultech_tier', 'premium')
      localStorage.setItem('upgrade_method', 'subscription')
      onUpgradeSuccess('premium')
      setIsProcessing(false)
    }, 2000)
  }

  const features = [
    {
      icon: Heart,
      title: 'VibeMatch Portal',
      description: 'Soul-aligned connection based on resonance',
      color: '#ec4899'
    },
    {
      icon: Flame,
      title: 'TouchBase Bot',
      description: 'Intelligent intimacy & desire guidance',
      color: '#f59e0b'
    },
    {
      icon: Sparkles,
      title: 'GPT-4 AI Support',
      description: 'Advanced emotional intelligence responses',
      color: '#8b5cf6'
    },
    {
      icon: Crown,
      title: 'All Future SoulMirror Bots',
      description: 'RootWhisper, BodyMirror, SoulPaw & more',
      color: '#6366f1'
    }
  ]

  if (currentTier === 'premium') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700 text-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Premium Active
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                All Features Unlocked
              </Badge>
              <p className="text-gray-400 text-sm">
                You have access to all Soul Technology features including VibeMatch, TouchBase Bot, and advanced AI support.
              </p>
            </div>
            
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Continue to Features
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="relative p-6 rounded-t-2xl overflow-hidden bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Upgrade to Premium</h1>
                  <p className="text-sm opacity-80">Unlock Soul Technology's full potential</p>
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
        </div>

        <div className="p-6">
          {/* Premium Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Premium Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <Card key={idx} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                          boxShadow: `0 0 15px ${feature.color}40`
                        }}
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{feature.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Tabs value={selectedOption} onValueChange={(value) => setSelectedOption(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="product" className="data-[state=active]:bg-gray-700">
                Product Bundle
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-gray-700">
                Subscription
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-gray-700">
                Portal Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-400" />
                    One-Time Product Purchase
                  </CardTitle>
                  <p className="text-sm text-gray-400">
                    Get permanent premium access with any LightPrompt physical product
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Soul Technology Bracelet</h4>
                          <p className="text-sm text-gray-400">Premium access + physical reminder</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">$5</div>
                          <Button 
                            size="sm" 
                            onClick={() => handleProductPurchase('bracelet')}
                            disabled={isProcessing}
                            className="bg-purple-500 hover:bg-purple-600"
                          >
                            {isProcessing ? 'Processing...' : 'Get Access'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">LightPrompt Oracle Card</h4>
                          <p className="text-sm text-gray-400">Premium access + guidance card</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">$3</div>
                          <Button 
                            size="sm" 
                            onClick={() => handleProductPurchase('card')}
                            disabled={isProcessing}
                            className="bg-purple-500 hover:bg-purple-600"
                          >
                            {isProcessing ? 'Processing...' : 'Get Access'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">LightPrompt:Ed Course Bundle</h4>
                          <p className="text-sm text-gray-400">Premium access + AI education</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">$88</div>
                          <Button 
                            size="sm" 
                            onClick={() => handleProductPurchase('course')}
                            disabled={isProcessing}
                            className="bg-purple-500 hover:bg-purple-600"
                          >
                            {isProcessing ? 'Processing...' : 'Get Access'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Preferred Method - One-Time Payment
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    Monthly Subscription
                  </CardTitle>
                  <p className="text-sm text-gray-400">
                    Ongoing access to all premium features
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-gray-700 rounded-lg border border-gray-600 text-center">
                    <div className="text-3xl font-bold mb-2">$3</div>
                    <div className="text-sm text-gray-400 mb-4">per month</div>
                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>All premium features</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Cancel anytime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Future bot access</span>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSubscription}
                      disabled={isProcessing}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {isProcessing ? 'Processing...' : 'Start Subscription'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5 text-orange-400" />
                    Portal Access Code
                  </CardTitle>
                  <p className="text-sm text-gray-400">
                    Enter your product code or portal password
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Enter portal code..."
                      value={portalCode}
                      onChange={(e) => setPortalCode(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button 
                      onClick={handleCodeSubmit}
                      disabled={!portalCode.trim() || isProcessing}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      {isProcessing ? 'Verifying...' : 'Unlock Premium'}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Codes are included with LightPrompt products<br />
                      or provided through special access portals
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}