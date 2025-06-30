import { useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onSendMessage?: () => void;
  onClearChat?: () => void;
  onToggleVoice?: () => void;
  onFocusInput?: () => void;
  onOpenSettings?: () => void;
  onOpenUpgrade?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const {
    onSendMessage,
    onClearChat,
    onToggleVoice,
    onFocusInput,
    onOpenSettings,
    onOpenUpgrade,
    enabled = true
  } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't interfere with typing in inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // Only handle specific shortcuts in inputs
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Enter':
            event.preventDefault();
            onSendMessage?.();
            break;
          case 'k':
            event.preventDefault();
            onClearChat?.();
            break;
        }
      }
      return;
    }

    // Global keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '/':
          event.preventDefault();
          onFocusInput?.();
          break;
        case 'k':
          event.preventDefault();
          onClearChat?.();
          break;
        case 'm':
          event.preventDefault();
          onToggleVoice?.();
          break;
        case ',':
          event.preventDefault();
          onOpenSettings?.();
          break;
        case 'u':
          event.preventDefault();
          onOpenUpgrade?.();
          break;
      }
    } else {
      // Non-modifier shortcuts
      switch (event.key) {
        case '/':
          // Focus input unless already focused
          if (document.activeElement?.tagName !== 'TEXTAREA' && 
              document.activeElement?.tagName !== 'INPUT') {
            event.preventDefault();
            onFocusInput?.();
          }
          break;
        case 'Escape':
          // Blur current element
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          break;
      }
    }
  }, [enabled, onSendMessage, onClearChat, onToggleVoice, onFocusInput, onOpenSettings, onOpenUpgrade]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enabled, handleKeyDown]);

  return {
    shortcuts: {
      'Ctrl/Cmd + /': 'Focus message input',
      'Ctrl/Cmd + K': 'Clear conversation',
      'Ctrl/Cmd + M': 'Toggle voice mode',
      'Ctrl/Cmd + ,': 'Open settings',
      'Ctrl/Cmd + U': 'Open upgrade page',
      'Ctrl/Cmd + Enter': 'Send message (in input)',
      '/': 'Focus input (when not typing)',
      'Escape': 'Blur current element'
    }
  };
}