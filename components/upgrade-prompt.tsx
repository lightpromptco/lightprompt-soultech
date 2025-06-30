import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, ShoppingBag, CreditCard, X } from 'lucide-react';
import { useState } from 'react';

interface UpgradePromptProps {
  trigger: 'token_limit' | 'premium_feature' | 'conversation_save';
  onClose: () => void;
  onUpgrade?: () => void;
}

export function UpgradePrompt({ trigger, onClose, onUpgrade }: UpgradePromptProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'token_limit':
        return "I'd love to give you a more detailed response! Premium access unlocks longer, deeper conversations.";
      case 'premium_feature':
        return "This feature is available with premium access. Let me show you how to unlock it!";
      case 'conversation_save':
        return "Want me to remember our conversations? Premium access includes conversation history and personalized insights.";
      default:
        return "Unlock my full potential with premium access!";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-400/30 max-w-md mx-auto">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="flex items-center gap-2 text-purple-300">
          <Crown className="h-5 w-5" />
          Unlock Premium Features
        </CardTitle>
        <CardDescription className="text-gray-300">
          {getTriggerMessage()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge className="bg-purple-600 text-purple-50 mb-3">
            Premium Benefits
          </Badge>
          <ul className="text-sm text-gray-300 space-y-1 text-left">
            <li>• Longer, more detailed responses (800 tokens)</li>
            <li>• GPT-4o advanced AI model</li>
            <li>• Conversation memory & history</li>
            <li>• Personalized product recommendations</li>
            <li>• Advanced mood & reflection tracking</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Choose your upgrade path:</p>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setShowDetails(!showDetails)}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Purchase LightPrompt Product
          </Button>

          {showDetails && (
            <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-sm">
              <p className="text-purple-300 font-medium">Premium access included with:</p>
              <ul className="text-gray-300 space-y-1">
                <li>• <strong>RootWhisper</strong> - Plant care & nature journaling</li>
                <li>• <strong>BodyMirror</strong> - Wellness tracking & energy analysis</li>
                <li>• <strong>Guardian Tag</strong> - Home protection & boundary rituals</li>
                <li>• <strong>LightPrompt:Ed</strong> - AI education & discernment course</li>
                <li>• <strong>The LightPrompt Book</strong> - Foundational guide</li>
                <li>• <strong>Seeds Oracle Deck</strong> - Reflective card system</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 border-purple-400 text-purple-300 hover:bg-purple-400/10"
                onClick={() => window.open('https://lightprompt.co/products', '_blank')}
              >
                Browse Products
              </Button>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gray-900 px-2 text-gray-400">or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-400/10"
            onClick={() => window.location.href = '/upgrade'}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Direct Upgrade - $3/month
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Cancel anytime. No commitments. Support conscious technology.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}