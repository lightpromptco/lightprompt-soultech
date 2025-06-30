import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Play, 
  Pause,
  RotateCcw
} from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface VoiceControlsProps {
  onVoiceInput: (text: string) => void;
  lastBotMessage?: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function VoiceControls({ onVoiceInput, lastBotMessage, isEnabled, onToggle }: VoiceControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [autoRead, setAutoRead] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speechRate, setSpeechRate] = useState([0.9]);
  const [speechPitch, setSpeechPitch] = useState([1]);
  const [speechVolume, setSpeechVolume] = useState([0.8]);

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: speechRecognitionSupported,
    error: speechError,
    start: startListening,
    stop: stopListening,
    reset: resetTranscript
  } = useSpeechRecognition({
    continuous: false,
    interimResults: true
  });

  const {
    voices,
    speaking,
    isSupported: speechSynthesisSupported,
    speak,
    stop: stopSpeaking
  } = useSpeechSynthesis();

  // Auto-submit when speech recognition completes
  useEffect(() => {
    if (transcript && !isListening) {
      onVoiceInput(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, onVoiceInput, resetTranscript]);

  // Auto-read bot responses
  useEffect(() => {
    if (autoRead && lastBotMessage && isEnabled && speechSynthesisSupported && lastBotMessage.trim()) {
      // Add a small delay to ensure the message is fully rendered
      const timer = setTimeout(() => {
        const voice = voices.find(v => v.name === selectedVoice) || null;
        speak(lastBotMessage, {
          voice,
          rate: speechRate[0],
          pitch: speechPitch[0],
          volume: speechVolume[0]
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [lastBotMessage, autoRead, isEnabled, selectedVoice, speechRate, speechPitch, speechVolume, voices, speak, speechSynthesisSupported]);

  if (!speechRecognitionSupported && !speechSynthesisSupported) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Voice features are not supported in your browser. 
            Try using Chrome, Edge, or Safari for the best experience.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice Navigation
          </CardTitle>
          <div className="flex items-center gap-2">
            <Switch
              checked={isEnabled}
              onCheckedChange={onToggle}
              aria-label="Toggle voice navigation"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Voice settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isEnabled && (
          <>
            {/* Voice Input Controls */}
            {speechRecognitionSupported && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Voice Input</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    disabled={speaking}
                    className="flex-1"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Speaking
                      </>
                    )}
                  </Button>
                  
                  {transcript && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetTranscript}
                      aria-label="Clear transcript"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {(isListening || interimTranscript) && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      {isListening && "Listening..."}
                      {interimTranscript && (
                        <span className="text-muted-foreground italic">
                          {interimTranscript}
                        </span>
                      )}
                    </p>
                  </div>
                )}
                
                {speechError && (
                  <Badge variant="destructive" className="text-xs">
                    Error: {speechError}
                  </Badge>
                )}
              </div>
            )}

            {/* Voice Output Controls */}
            {speechSynthesisSupported && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Voice Output</Label>
                  {speaking && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={stopSpeaking}
                    >
                      <VolumeX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-read"
                    checked={autoRead}
                    onCheckedChange={setAutoRead}
                  />
                  <Label htmlFor="auto-read" className="text-sm">
                    Auto-read bot responses
                  </Label>
                </div>
              </div>
            )}

            {/* Voice Settings */}
            {showSettings && speechSynthesisSupported && (
              <div className="space-y-4 border-t pt-4">
                <Label className="text-sm font-medium">Voice Settings</Label>
                
                {voices.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs">Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-xs">Speed: {speechRate[0]}</Label>
                  <Slider
                    value={speechRate}
                    onValueChange={setSpeechRate}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Pitch: {speechPitch[0]}</Label>
                  <Slider
                    value={speechPitch}
                    onValueChange={setSpeechPitch}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Volume: {speechVolume[0]}</Label>
                  <Slider
                    value={speechVolume}
                    onValueChange={setSpeechVolume}
                    min={0.1}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Voice Commands Help */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Voice Commands:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>"Clear conversation" - Clears the chat</li>
                <li>"Stop reading" - Stops voice output</li>
                <li>"Settings" - Opens navigation menu</li>
                <li>"Upgrade" - Goes to upgrade page</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}