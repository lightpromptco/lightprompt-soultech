import { useState } from "react";
import { Crown, Sparkles, Users, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface GuestUpgradePromptProps {
  trigger: 'conversation_limit' | 'save_feature' | 'premium_response';
  onClose: () => void;
}

export function GuestUpgradePrompt({ trigger, onClose }: GuestUpgradePromptProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const content = {
    conversation_limit: {
      title: "Continue Your Journey",
      description: "You've had a great start! Create a free account to save your conversations and unlock more features.",
      benefits: ["Save conversation history", "Unlimited messages", "Personality customization", "Product recommendations"]
    },
    save_feature: {
      title: "Save This Conversation",
      description: "Want to keep this meaningful conversation? Create a free account to save and share it.",
      benefits: ["Auto-save conversations", "Export and share", "Access from any device", "Secure cloud storage"]
    },
    premium_response: {
      title: "Unlock Premium Insights",
      description: "Get deeper guidance and detailed product recommendations with our premium features.",
      benefits: ["Advanced AI responses", "Detailed product guidance", "Priority support", "Exclusive features"]
    }
  };

  const currentContent = content[trigger];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <CardTitle className="text-white">{currentContent.title}</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            {currentContent.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentContent.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Link href="/auth">
              <Button className="w-full gap-2" onClick={handleClose}>
                <Users className="h-4 w-4" />
                Create Free Account
              </Button>
            </Link>
            
            {trigger === 'premium_response' && (
              <Link href="/upgrade">
                <Button variant="outline" className="w-full gap-2" onClick={handleClose}>
                  <Crown className="h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
            
            <Button 
              variant="ghost" 
              className="w-full text-slate-400 hover:text-white" 
              onClick={handleClose}
            >
              Continue as Guest
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              {trigger === 'premium_response' ? '$4/month' : 'Always Free'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}