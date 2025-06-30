import { Heart } from "lucide-react";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.isBot;
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  if (isBot) {
    return (
      <div className="flex justify-start animate-slide-up">
        <div className="bg-secondary/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs sm:max-w-md">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Heart className="w-3 h-3 text-primary-foreground" />
            </div>
            <div>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <div className="text-xs text-muted-foreground mt-3 flex items-center space-x-2">
                <span>{timestamp}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                <span className="text-green-500">GPT-4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end animate-slide-up">
      <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-md px-4 py-3 max-w-xs sm:max-w-md">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className="text-xs text-muted-foreground mt-2 text-right">
          {timestamp}
        </div>
      </div>
    </div>
  );
}
