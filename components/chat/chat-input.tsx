import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSendMessage, isLoading, placeholder = "Type your message..." }, ref) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
    }
  }, [message]);

  const charCount = message.length;
  const isOverLimit = charCount > 500;
  const isNearLimit = charCount > 450;

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[48px] max-h-32 px-4 py-3 pr-12 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder:text-gray-500 resize-none focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          rows={1}
          disabled={isLoading}
          maxLength={500}
        />
        <div className={`absolute right-3 bottom-3 text-xs transition-colors ${
          isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-400'
        }`}>
          {charCount}/500
        </div>
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || isLoading || isOverLimit}
        className="w-12 h-12 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <Send className="w-4 h-4 text-primary-foreground" />
      </Button>
    </form>
  );
});
