import { useState } from "react";
import { Download, Share2, Save, Users, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatActionsProps {
  messages: Message[];
  sessionId: string;
  onSave?: () => void;
}

export function ChatActions({ messages, sessionId, onSave }: ChatActionsProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [shareSettings, setShareSettings] = useState({
    includePersonalDetails: false,
    anonymize: true,
    addTherapistNote: false,
    therapistNote: "",
    shareType: "export" as "export" | "therapist" | "friend" | "collaboration"
  });
  const { toast } = useToast();

  const saveConversation = useMutation({
    mutationFn: async (data: { title: string; isPrivate: boolean }) => {
      return apiRequest("POST", "/api/conversations/save", {
        sessionId,
        title: data.title,
        isPrivate: data.isPrivate,
        messageCount: messages.length
      });
    },
    onSuccess: () => {
      toast({
        title: "Conversation Saved",
        description: "Your conversation has been saved to your account",
      });
      setIsSaveDialogOpen(false);
      onSave?.();
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Unable to save conversation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const generateShareLink = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/conversations/share", {
        sessionId,
        settings: shareSettings
      });
    },
    onSuccess: (data: any) => {
      navigator.clipboard.writeText(data.shareUrl);
      toast({
        title: "Share Link Created",
        description: "Link copied to clipboard. Valid for 30 days.",
      });
      setIsShareDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Share Failed",
        description: "Unable to create share link. Please try again.",
        variant: "destructive",
      });
    }
  });

  const exportConversation = () => {
    const formatMessage = (msg: Message) => {
      const timestamp = new Date(msg.timestamp).toLocaleString();
      const sender = msg.isBot ? "LightPrompt Bot" : "You";
      return `[${timestamp}] ${sender}: ${msg.content}`;
    };

    const exportText = messages.map(formatMessage).join("\n\n");
    const finalText = `LightPrompt Bot Conversation Export\nSession: ${sessionId}\nExported: ${new Date().toLocaleString()}\n\n${exportText}`;

    const blob = new Blob([finalText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lightprompt-conversation-${sessionId}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Conversation Exported",
      description: "Your conversation has been downloaded as a text file",
    });
  };

  if (messages.length === 0) return null;

  return (
    <div className="flex gap-2 p-2 border-t border-slate-700 bg-slate-800/30">
      {/* Save Conversation */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Save Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-300">Conversation Title</Label>
              <Textarea
                id="title"
                placeholder="Give this conversation a meaningful title..."
                className="bg-slate-700 border-slate-600 text-white mt-1"
                defaultValue={`Conversation from ${new Date().toLocaleDateString()}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="private" defaultChecked />
              <Label htmlFor="private" className="text-slate-300">Keep private (only you can see)</Label>
            </div>
            <Button 
              onClick={() => saveConversation.mutate({ 
                title: (document.getElementById('title') as HTMLTextAreaElement)?.value || `Conversation from ${new Date().toLocaleDateString()}`,
                isPrivate: (document.getElementById('private') as HTMLInputElement)?.checked || true
              })}
              disabled={saveConversation.isPending}
              className="w-full"
            >
              {saveConversation.isPending ? "Saving..." : "Save Conversation"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Conversation */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Share Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={shareSettings.shareType === "therapist" ? "default" : "outline"}
                size="sm"
                onClick={() => setShareSettings(s => ({ ...s, shareType: "therapist" }))}
                className="gap-2"
              >
                <Heart className="h-4 w-4" />
                Therapist
              </Button>
              <Button
                variant={shareSettings.shareType === "friend" ? "default" : "outline"}
                size="sm"
                onClick={() => setShareSettings(s => ({ ...s, shareType: "friend" }))}
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Friend
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="anonymize" 
                  checked={shareSettings.anonymize}
                  onCheckedChange={(checked) => setShareSettings(s => ({ ...s, anonymize: checked }))}
                />
                <Label htmlFor="anonymize" className="text-slate-300">Remove personal details</Label>
              </div>
              
              {shareSettings.shareType === "therapist" && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="therapistNote" 
                    checked={shareSettings.addTherapistNote}
                    onCheckedChange={(checked) => setShareSettings(s => ({ ...s, addTherapistNote: checked }))}
                  />
                  <Label htmlFor="therapistNote" className="text-slate-300">Add note for therapist</Label>
                </div>
              )}

              {shareSettings.addTherapistNote && (
                <Textarea
                  placeholder="Add context or questions for your therapist..."
                  value={shareSettings.therapistNote}
                  onChange={(e) => setShareSettings(s => ({ ...s, therapistNote: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              )}
            </div>

            <Button 
              onClick={() => generateShareLink.mutate()}
              disabled={generateShareLink.isPending}
              className="w-full"
            >
              {generateShareLink.isPending ? "Creating Link..." : "Create Share Link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export as File */}
      <Button variant="ghost" size="sm" onClick={exportConversation} className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}