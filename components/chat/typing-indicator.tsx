import { Heart } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-secondary/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-3 h-3 text-primary-foreground" />
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
