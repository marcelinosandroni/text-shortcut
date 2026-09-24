import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export default function DemoView() {
  const { snippets, settings, recordExpansion, isPaused } = useStore();
  const [inputText, setInputText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupFilter, setPopupFilter] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const enabledSnippets = snippets.filter(s => s.isEnabled);

  const checkExpansion = (text: string, triggerChar: string) => {
    if (isPaused) return null;
    if (!settings.triggerChars.includes(triggerChar)) return null;

    const beforeTrigger = text.slice(0, -1);
    for (const snippet of enabledSnippets) {
      const abbr = snippet.abbreviation;
      const match = settings.caseSensitive
        ? beforeTrigger.endsWith(abbr)
        : beforeTrigger.toLowerCase().endsWith(abbr.toLowerCase());
      
      if (match) {
        if (settings.matchWholeWords) {
          const charBefore = beforeTrigger.charAt(beforeTrigger.length - abbr.length - 1);
          if (charBefore && /\w/.test(charBefore)) continue;
        }
        return snippet;
      }
    }
    return null;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const triggerChars = settings.triggerChars;
    const key = e.key;
    
    if (triggerChars.includes(key) || key === ' ' || key === 'Tab' || key === 'Enter') {
      // Adiciona o caractere trigger ao texto atual para verificar
      const textWithTrigger = inputText + key;
      const snippet = checkExpansion(textWithTrigger, key);
      
      if (snippet) {
        e.preventDefault();
        const abbr = snippet.abbreviation;
        // Remove a abreviação (não inclui o trigger) e adiciona a expansão + trigger
        const newText = inputText.slice(0, -abbr.length) + snippet.expansionText + key;
        setInputText(newText);
        recordExpansion(snippet.id);
      }
    }
  };

  const handlePopupSelect = (snippet: typeof enabledSnippets[0]) => {
    const newText = inputText + snippet.expansionText;
    setInputText(newText);
    recordExpansion(snippet.id);
    setShowPopup(false);
    setPopupFilter('');
    textareaRef.current?.focus();
  };

  const filteredPopupSnippets = enabledSnippets.filter(s =>
    !popupFilter || 
    s.abbreviation.toLowerCase().includes(popupFilter.toLowerCase()) ||
    s.expansionText.toLowerCase().includes(popupFilter.toLowerCase())
  );

  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        setShowPopup(prev => !prev);
        setPopupFilter('');
      }
      if (e.key === 'Escape') setShowPopup(false);
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Live Text Expansion Demo</CardTitle>
          <CardDescription>
            Type in the text area below and experience how QuickFill works!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-muted rounded text-foreground">
              Try: <code className="text-primary font-mono">mnm</code> + Space
            </span>
            <span className="px-2 py-1 bg-muted rounded text-foreground">
              <code className="text-primary font-mono">myemail</code> + Space
            </span>
            <span className="px-2 py-1 bg-muted rounded text-foreground">
              <kbd className="text-primary">Ctrl+Space</kbd> for popup
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-2 relative">
          <Label>Type here (snippets will expand automatically)</Label>
          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing an abbreviation like 'mnm' then press Space..."
            className="h-64 font-mono resize-none"
          />
          {isPaused && (
            <div className="absolute inset-0 top-9 bg-background/80 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-yellow-500 text-lg">⏸ Paused</p>
                <p className="text-xs text-muted-foreground">Resume from sidebar to enable expansion</p>
              </div>
            </div>
          )}

          {showPopup && (
            <div className="absolute top-9 left-0 right-0 bg-card border border-border rounded-md shadow-lg z-10 overflow-hidden">
              <div className="p-3 border-b">
                <Input
                  value={popupFilter}
                  onChange={e => setPopupFilter(e.target.value)}
                  placeholder="Filter snippets..."
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredPopupSnippets.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handlePopupSelect(s)}
                    className="w-full text-left px-4 py-2.5 hover:bg-accent transition-colors flex items-center gap-3 border-b last:border-0"
                  >
                    <code className="text-xs text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">{s.abbreviation}</code>
                    <span className="text-sm text-foreground truncate">{s.expansionText.slice(0, 40)}</span>
                  </button>
                ))}
                {filteredPopupSnippets.length === 0 && (
                  <p className="p-4 text-center text-muted-foreground text-sm">No matching snippets</p>
                )}
              </div>
              <div className="p-2 border-t text-xs text-muted-foreground text-center">
                Click to insert • Esc to close
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Active Snippets ({enabledSnippets.length})</Label>
          <Card className="h-64 overflow-y-auto">
            <CardContent className="p-4 space-y-2">
              {enabledSnippets.map(s => (
                <div key={s.id} className="flex items-center gap-2 text-sm">
                  <code className="text-xs text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">{s.abbreviation}</code>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-foreground truncate">{s.expansionText.slice(0, 40)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
