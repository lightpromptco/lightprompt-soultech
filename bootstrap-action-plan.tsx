import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign, Users, Zap, Calendar, Target } from 'lucide-react';

export function BootstrapActionPlan() {
  const phases = [
    {
      phase: "Launch Now",
      timeline: "This Week",
      investment: "$0",
      revenue: "Email List Building",
      actions: [
        "Deploy current platform live",
        "Set up email capture for all waitlists", 
        "Create simple landing pages",
        "Start TikTok/Instagram content",
        "Record intro videos for each bot"
      ],
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Validate Demand", 
      timeline: "Weeks 2-4",
      investment: "$0",
      revenue: "$440 Target",
      actions: [
        "VisionQuest Mini-Course: $44 (guided videos + PDF guides)",
        "Private Facebook group for practitioners",
        "Weekly live Q&A calls on Zoom",
        "Soul Ecosystem coaching sessions: $44 each",
        "Affiliate revenue from book recommendations"
      ],
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "Simple AI-Like Experience",
      timeline: "Month 2", 
      investment: "$20-50/month",
      revenue: "$400/month Target",
      actions: [
        "Typeform branching questionnaires (feels like AI)",
        "Automated email sequences based on responses",
        "ManyChat simple chatbot for basic interactions",
        "Community membership: $4/month",
        "Scale successful mini-courses"
      ],
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      phase: "Real AI Development",
      timeline: "Month 3+",
      investment: "Revenue from Phase 2-3",
      revenue: "Scale proven concepts",
      actions: [
        "Build actual AI bot for highest-performing preview",
        "Start with simplest implementation first",
        "Reinvest all revenue into development", 
        "Only develop bots with proven demand",
        "Partner with developers for revenue share"
      ],
      icon: DollarSign,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Bootstrap Launch Plan - Start Small, Scale Smart
          </span>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Launch your Soul Technology ecosystem immediately with zero budget, then scale based on demand
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          
          return (
            <div key={phase.phase} className="relative">
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
              )}
              
              <div className="flex gap-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${phase.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Phase {index + 1}: {phase.phase}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {phase.timeline}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Investment</div>
                      <div className="font-semibold text-green-600">{phase.investment}</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Revenue Target</div>
                      <div className="font-semibold text-blue-600">{phase.revenue}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {phase.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Immediate Action */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            This Week's Action Plan
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="font-medium text-yellow-700 dark:text-yellow-400">Day 1-2: Deploy & Setup</div>
              <div className="text-yellow-600 dark:text-yellow-500">Get platform live, email capture ready</div>
            </div>
            <div>
              <div className="font-medium text-orange-700 dark:text-orange-400">Day 3-4: Content Creation</div>
              <div className="text-orange-600 dark:text-orange-500">Record intro videos, create social content</div>
            </div>
            <div>
              <div className="font-medium text-red-700 dark:text-red-400">Day 5-6: Marketing Launch</div>
              <div className="text-red-600 dark:text-red-500">Start posting, share with networks</div>
            </div>
            <div>
              <div className="font-medium text-purple-700 dark:text-purple-400">Day 7: Optimize</div>
              <div className="text-purple-600 dark:text-purple-500">Review metrics, adjust strategy</div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Success Milestones</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
            <div>
              <div className="text-lg font-bold text-green-600">100</div>
              <div className="text-gray-600 dark:text-gray-400">Email signups</div>
              <div className="text-xs text-gray-500">Week 1</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">10</div>
              <div className="text-gray-600 dark:text-gray-400">Paying customers</div>
              <div className="text-xs text-gray-500">Week 4</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">50</div>
              <div className="text-gray-600 dark:text-gray-400">Monthly subscribers</div>
              <div className="text-xs text-gray-500">Month 2</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">$2K</div>
              <div className="text-gray-600 dark:text-gray-400">Monthly revenue</div>
              <div className="text-xs text-gray-500">Month 3</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}