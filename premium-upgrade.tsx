import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Crown, Sparkles, Brain, Target, BookOpen, TrendingUp } from 'lucide-react';

interface PremiumUpgradeProps {
  currentTier: string;
  onUpgrade?: () => void;
}

export function PremiumUpgrade({ currentTier, onUpgrade }: PremiumUpgradeProps) {
  const [portalPassword, setPortalPassword] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const upgradeMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest('/api/auth/upgrade-premium', {
        method: 'POST',
        body: { portalPassword: password }
      });
      return response;
    },
    onSuccess: (data) => {
      // Update the auth token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      toast({
        title: "Premium Access Unlocked!",
        description: "You now have access to GPT-4o and advanced features.",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      onUpgrade?.();
      setPortalPassword('');
    },
    onError: (error: any) => {
      toast({
        title: "Invalid Portal Password",
        description: "Please check your portal password and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalPassword.trim()) {
      upgradeMutation.mutate(portalPassword);
    }
  };

  if (currentTier === 'premium') {
    return (
      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-yellow-600" />
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Premium Active
            </Badge>
          </div>
          <CardTitle className="text-yellow-800">LightPrompt Premium</CardTitle>
          <CardDescription>
            You have full access to GPT-4o and all advanced features
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-yellow-600" />
              <span>GPT-4o Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-yellow-600" />
              <span>Advanced Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-yellow-600" />
              <span>Detailed Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
              <span>Progress Tracking</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <Badge variant="outline">Basic Plan</Badge>
        </div>
        <CardTitle>Upgrade to Premium</CardTitle>
        <CardDescription>
          Unlock GPT-4o, advanced reflections, and detailed product insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current: GPT-3.5 Turbo</span>
            <span className="font-medium text-blue-600">Upgrade: GPT-4o</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Basic features</span>
            <span className="font-medium text-blue-600">Advanced analysis</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Limited insights</span>
            <span className="font-medium text-blue-600">Detailed tracking</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="portal-password" className="block text-sm font-medium mb-1">
              Portal Password
            </label>
            <Input
              id="portal-password"
              type="password"
              placeholder="Enter portal password"
              value={portalPassword}
              onChange={(e) => setPortalPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={upgradeMutation.isPending || !portalPassword.trim()}
          >
            {upgradeMutation.isPending ? 'Upgrading...' : 'Unlock Premium'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}