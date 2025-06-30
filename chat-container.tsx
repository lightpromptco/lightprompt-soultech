import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { MessageCircle } from "lucide-react";
import type { Message } from "@shared/schema";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
}

export function ChatContainer({ messages, isLoading, isTyping }: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-6 chat-scrollbar"
    >
      {showWelcome && (
        <div className="animate-fade-in">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-xl font-semibold mb-2 text-foreground">Welcome to your safe space</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I'm here to listen and support you. Share how you're feeling today, and I'll respond with care and understanding.
            </p>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
        </div>
      )}
    </div>
  );
}
