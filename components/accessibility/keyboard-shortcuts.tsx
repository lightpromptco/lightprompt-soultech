import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Keyboard, HelpCircle } from "lucide-react";

interface KeyboardShortcutsProps {
  shortcuts: Record<string, string>;
}

export function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label="View keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
          <span className="hidden sm:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-3">
            {Object.entries(shortcuts).map(([key, description]) => (
              <div key={key} className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground flex-1">
                  {description}
                </span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {key}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <HelpCircle className="w-3 h-3" />
              <span>Use Ctrl on Windows/Linux or Cmd on Mac</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}