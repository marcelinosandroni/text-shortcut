import { useStore } from '../store';
import { ViewMode } from '../store/types';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { FileText, FolderOpen, Zap, Download, Settings, Pause, Play } from 'lucide-react';
import SnippetsView from './views/SnippetsView';
import CategoriesView from './views/CategoriesView';
import SettingsView from './views/SettingsView';
import DemoView from './views/DemoView';
import ImportExportView from './views/ImportExportView';

const NAV_ITEMS: { id: ViewMode; icon: any; label: string }[] = [
  { id: 'snippets', icon: FileText, label: 'Snippets' },
  { id: 'categories', icon: FolderOpen, label: 'Categories' },
  { id: 'demo', icon: Zap, label: 'Live Demo' },
  { id: 'import-export', icon: Download, label: 'Import/Export' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  const { currentView, setCurrentView, isPaused, togglePaused, snippets } = useStore();
  const enabledCount = snippets.filter(s => s.isEnabled).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r flex flex-col z-20">
        <div className="p-5 border-b h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              QF
            </div>
            <div>
              <h1 className="font-semibold text-sm text-foreground">QuickFill</h1>
              <p className="text-xs text-muted-foreground">Text Expansion</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                isPaused ? "bg-yellow-500" : "bg-green-500"
              )}></span>
              <span className="text-xs text-muted-foreground">
                {isPaused ? 'Paused' : 'Active'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePaused}
              className="h-7 px-2 text-xs"
            >
              {isPaused ? <Play className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {enabledCount} active snippet{enabledCount !== 1 ? 's' : ''}
          </p>
        </div>

        <nav className="flex-1 py-2 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors text-sm",
                  isActive
                    ? "bg-accent text-accent-foreground border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <p className="text-xs text-muted-foreground">v1.0.0 • shadcn/ui</p>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b h-16 flex items-center px-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {NAV_ITEMS.find(n => n.id === currentView)?.label}
            </h2>
            <p className="text-xs text-muted-foreground">
              {currentView === 'snippets' && 'Manage your text expansion shortcuts'}
              {currentView === 'categories' && 'Organize snippets into groups'}
              {currentView === 'demo' && 'Test text expansion in real-time'}
              {currentView === 'import-export' && 'Backup and restore your snippets'}
              {currentView === 'settings' && 'Configure QuickFill behavior'}
            </p>
          </div>
        </header>

        <div className="p-6">
          {currentView === 'snippets' && <SnippetsView />}
          {currentView === 'categories' && <CategoriesView />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'demo' && <DemoView />}
          {currentView === 'import-export' && <ImportExportView />}
        </div>
      </main>
    </div>
  );
}
