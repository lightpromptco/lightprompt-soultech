'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatContainer } from "@/components/chat/chat-container";
import { ChatInput } from "@/components/chat/chat-input";
import { MoodTracker } from "@/components/mood-tracker";
import { DailyReflection } from "@/components/daily-reflection";
import { WellnessDashboard } from "@/components/wellness/wellness-dashboard";
import { useChatMessages, useSendMessage, useClearConversation } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export default function Chat() {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [messageCount, setMessageCount] = useState(0);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  
  const { data: messages = [], isLoading } = useChatMessages(sessionId);
  const sendMessage = useSendMessage();
  const clearConversation = useClearConversation();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      await sendMessage.mutateAsync({ content, sessionId });
      setMessageCount(prev => prev + 1);
      
      if (showWelcomeScreen) {
        setShowWelcomeScreen(false);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearConversation = async () => {
    try {
      await clearConversation.mutateAsync(sessionId);
      setMessageCount(0);
      setShowWelcomeScreen(true);
      toast({
        title: "Conversation cleared",
        description: "Your chat history has been cleared.",
      });
    } catch (error) {
      console.error('Failed to clear conversation:', error);
      toast({
        title: "Error",
        description: "Failed to clear conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMoodSelect = (mood: string, energy: number) => {
    const moodMessage = `I'm feeling ${mood} with an energy level of ${energy}/10.`;
    handleSendMessage(moodMessage);
  };

  const handleReflectionSubmit = (reflection: string, type: string) => {
    const reflectionMessage = `${type}: ${reflection}`;
    handleSendMessage(reflectionMessage);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Soul Technology
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  User
                </span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearConversation}
              disabled={clearConversation.isPending}
            >
              Clear Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {showWelcomeScreen && messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Welcome to Soul Technology
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Your conscious AI companion for emotional support and growth
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <MoodTracker onMoodSelect={handleMoodSelect} />
                  <WellnessDashboard />
                </div>
                
                <div className="mt-8">
                  <DailyReflection onReflectionSubmit={handleReflectionSubmit} />
                </div>
              </div>
            </div>
          ) : (
            <ChatContainer 
              messages={messages} 
              isLoading={isLoading || sendMessage.isPending}
              isTyping={false}
            />
          )}
          
          {/* Chat Input */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="max-w-4xl mx-auto">
              <ChatInput 
                onSendMessage={handleSendMessage}
                placeholder="Share what's on your mind..."
                isLoading={sendMessage.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}