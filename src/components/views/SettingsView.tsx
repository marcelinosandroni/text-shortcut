import { useStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

export default function SettingsView() {
  const { settings, updateSettings } = useStore();

  const ToggleSetting = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <Label className="text-sm font-medium cursor-pointer">{label}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>System integration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleSetting label="Start with Windows" desc="Launch QuickFill automatically when you log in" value={settings.startWithWindows} onChange={v => updateSettings({ startWithWindows: v })} />
          <ToggleSetting label="Show in System Tray" desc="Display QuickFill icon in the notification area" value={settings.showInTray} onChange={v => updateSettings({ showInTray: v })} />
          <ToggleSetting label="Minimize to Tray" desc="Keep running in background when window is closed" value={settings.minimizeToTray} onChange={v => updateSettings({ minimizeToTray: v })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expansion</CardTitle>
          <CardDescription>How text expansion behaves</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleSetting label="Show notification on expansion" desc="Display a toast when a snippet is expanded" value={settings.showNotification} onChange={v => updateSettings({ showNotification: v })} />
          <ToggleSetting label="Play sound on expansion" desc="Play a subtle sound effect when text is expanded" value={settings.playSound} onChange={v => updateSettings({ playSound: v })} />
          <ToggleSetting label="Case-sensitive matching" desc="Require exact case match for abbreviations" value={settings.caseSensitive} onChange={v => updateSettings({ caseSensitive: v })} />
          <ToggleSetting label="Match whole words only" desc="Only expand when abbreviation is a complete word" value={settings.matchWholeWords} onChange={v => updateSettings({ matchWholeWords: v })} />
          
          <div className="mt-6">
            <Label className="text-sm font-medium">Trigger Characters</Label>
            <p className="text-xs text-muted-foreground mb-3">Characters that trigger expansion after typing an abbreviation</p>
            <div className="flex flex-wrap gap-2">
              {[
                { char: ' ', label: 'Space' },
                { char: '\t', label: 'Tab' },
                { char: '\n', label: 'Enter' },
                { char: '.', label: 'Period' },
                { char: ',', label: 'Comma' },
                { char: ';', label: 'Semicolon' },
              ].map(t => (
                <Button
                  key={t.char}
                  variant={settings.triggerChars.includes(t.char) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const chars = settings.triggerChars.includes(t.char)
                      ? settings.triggerChars.filter(c => c !== t.char)
                      : [...settings.triggerChars, t.char];
                    updateSettings({ triggerChars: chars });
                  }}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hotkeys</CardTitle>
          <CardDescription>Global keyboard shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Quick Access Popup', value: settings.popupHotkey },
            { label: 'Pause/Resume', value: settings.pauseHotkey },
            { label: 'Create from Selection', value: settings.createFromSelectionHotkey },
          ].map(h => (
            <div key={h.label} className="flex items-center justify-between py-2">
              <Label>{h.label}</Label>
              <kbd className="px-3 py-1.5 bg-muted border border-border rounded text-xs text-foreground font-mono">
                {h.value}
              </kbd>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Privacy and protection settings</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleSetting label="Never expand in password fields" desc="Automatically detect and skip password inputs" value={settings.neverExpandInPasswords} onChange={v => updateSettings({ neverExpandInPasswords: v })} />
          <ToggleSetting label="Encrypt database" desc="Use SQLCipher to encrypt stored snippets" value={settings.encryptDatabase} onChange={v => updateSettings({ encryptDatabase: v })} />
        </CardContent>
      </Card>
    </div>
  );
}
