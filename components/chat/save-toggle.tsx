import { useState, useEffect } from "react";
import { Save, Archive } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

interface SaveToggleProps {
  sessionId: string;
  onToggle?: (isSaving: boolean) => void;
}

export function SaveToggle({ sessionId, onToggle }: SaveToggleProps) {
  const [autoSave, setAutoSave] = useState(false);
  const { toast } = useToast();

  // Get current save status
  const { data: saveStatus } = useQuery({
    queryKey: ["/api/conversations/save-status", sessionId],
    retry: false,
  });

  // Update auto-save preference
  const updateSavePreference = useMutation({
    mutationFn: async (enabled: boolean) => {
      return apiRequest("PATCH", "/api/conversations/auto-save", {
        sessionId,
        enabled
      });
    },
    onSuccess: (_, enabled) => {
      setAutoSave(enabled);
      onToggle?.(enabled);
      toast({
        title: enabled ? "Auto-save Enabled" : "Auto-save Disabled", 
        description: enabled 
          ? "Your conversations will be automatically saved" 
          : "Conversations will not be saved automatically",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Unable to change save preference",
        variant: "destructive",
      });
    }
  });

  // Manual save current conversation
  const saveNow = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/conversations/save", {
        sessionId,
        title: `Conversation from ${new Date().toLocaleDateString()}`,
        isPrivate: true
      });
    },
    onSuccess: () => {
      toast({
        title: "Conversation Saved",
        description: "Current conversation has been saved to your account",
      });
    },
    onError: () => {
      toast({
        title: "Save Failed", 
        description: "Unable to save conversation",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (saveStatus?.autoSaveEnabled !== undefined) {
      setAutoSave(saveStatus.autoSaveEnabled);
    }
  }, [saveStatus]);

  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/50 border-b border-slate-700">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-save"
            checked={autoSave}
            onCheckedChange={(checked) => updateSavePreference.mutate(checked)}
            disabled={updateSavePreference.isPending}
          />
          <Label htmlFor="auto-save" className="text-slate-300 text-sm">
            Auto-save conversations
          </Label>
        </div>
        
        {saveStatus?.isSaved && (
          <div className="flex items-center space-x-1 text-green-400 text-xs">
            <Archive className="h-3 w-3" />
            <span>Saved</span>
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => saveNow.mutate()}
        disabled={saveNow.isPending || autoSave}
        className="gap-2 text-slate-300 hover:text-white"
      >
        <Save className="h-4 w-4" />
        {saveNow.isPending ? "Saving..." : "Save Now"}
      </Button>
    </div>
  );
}