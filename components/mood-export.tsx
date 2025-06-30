import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, FileText, Image } from 'lucide-react';
import { useMoodTracking } from '@/hooks/useMoodTracking';

export function MoodExport() {
  const { allEntries } = useMoodTracking();

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(allEntries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `soul-ecosystem-map-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    const headers = ['Date', 'Primary Emotion', 'Secondary Emotion', 'Season', 'Depth', 'Flow', 'Resonance', 'Growth', 'Reflection'];
    const csvContent = [
      headers.join(','),
      ...allEntries.map(entry => [
        new Date(entry.date).toLocaleDateString(),
        entry.primary,
        entry.secondary,
        entry.season,
        entry.depth,
        entry.flow,
        entry.resonance,
        entry.growth,
        `"${(entry.reflection || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `soul-ecosystem-map-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    const textContent = `Soul Ecosystem Map Export
Generated: ${new Date().toLocaleDateString()}
Total Entries: ${allEntries.length}

${allEntries.map(entry => `
Date: ${new Date(entry.date).toLocaleDateString()}
Primary Emotion: ${entry.primary} (${entry.season})
Secondary Emotion: ${entry.secondary}
Dimensions:
  • Depth: ${entry.depth}/10
  • Flow: ${entry.flow}/10
  • Resonance: ${entry.resonance}/10
  • Growth: ${entry.growth}/10
${entry.reflection ? `Reflection: ${entry.reflection}` : ''}
${'─'.repeat(50)}`).join('\n')}

Thank you for using LightPromptBot's Soul Ecosystem Map!
Your emotional journey is a beautiful landscape of growth and awareness.
`;

    const dataBlob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `soul-ecosystem-journey-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareToTherapist = () => {
    const shareableText = `My Soul Ecosystem Map Summary
Period: ${allEntries.length > 0 ? new Date(allEntries[0].date).toLocaleDateString() : 'N/A'} to ${new Date().toLocaleDateString()}
Total Check-ins: ${allEntries.length}

Recent Emotional Patterns:
${allEntries.slice(-7).map(entry => `• ${new Date(entry.date).toLocaleDateString()}: ${entry.primary} + ${entry.secondary} (${entry.season} season)`).join('\n')}

Dimensional Averages (last 7 days):
• Depth: ${Math.round(allEntries.slice(-7).reduce((sum, e) => sum + e.depth, 0) / Math.min(7, allEntries.length))}/10
• Flow: ${Math.round(allEntries.slice(-7).reduce((sum, e) => sum + e.flow, 0) / Math.min(7, allEntries.length))}/10
• Resonance: ${Math.round(allEntries.slice(-7).reduce((sum, e) => sum + e.resonance, 0) / Math.min(7, allEntries.length))}/10
• Growth: ${Math.round(allEntries.slice(-7).reduce((sum, e) => sum + e.growth, 0) / Math.min(7, allEntries.length))}/10

Created with LightPromptBot's Soul Ecosystem Map
`;

    if (navigator.share) {
      navigator.share({
        title: 'Soul Ecosystem Map Summary',
        text: shareableText
      });
    } else {
      navigator.clipboard.writeText(shareableText);
      alert('Summary copied to clipboard! You can paste it in an email or message to your therapist.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20 border-purple-200 dark:border-purple-700">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
          Export Your Journey
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Share your emotional ecosystem with therapists, or keep personal records
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Button
          onClick={exportAsText}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          size="sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          Readable Report (.txt)
        </Button>
        
        <Button
          onClick={exportAsCSV}
          variant="outline"
          className="w-full border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Data Export (.csv)
        </Button>
        
        <Button
          onClick={exportAsJSON}
          variant="outline"
          className="w-full border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Raw Data (.json)
        </Button>
        
        <Button
          onClick={shareToTherapist}
          variant="outline"
          className="w-full border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          size="sm"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Summary
        </Button>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
          {allEntries.length} entries • Last updated {allEntries.length > 0 ? new Date(allEntries[allEntries.length - 1]?.date).toLocaleDateString() : 'never'}
        </div>
      </CardContent>
    </Card>
  );
}