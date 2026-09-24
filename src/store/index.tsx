import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Snippet, Category, Settings, ExpansionEvent, ViewMode } from './types';
import * as db from '../lib/db';

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'personal', name: 'Personal', color: '#3B82F6', icon: '👤', sortOrder: 0, createdAt: now() },
  { id: 'work', name: 'Work', color: '#10B981', icon: '💼', sortOrder: 1, createdAt: now() },
  { id: 'addresses', name: 'Addresses', color: '#F59E0B', icon: '📍', sortOrder: 2, createdAt: now() },
  { id: 'emails', name: 'Emails', color: '#8B5CF6', icon: '📧', sortOrder: 3, createdAt: now() },
];

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: generateId(), abbreviation: 'mnm', expansionText: 'Marcelino Sandroni',
    description: 'My full name', categoryId: 'personal', isEnabled: true,
    immediateExpand: false, hotkeyBinding: '', usageCount: 0, createdAt: now(), updatedAt: now(),
  },
  {
    id: generateId(), abbreviation: 'myemail', expansionText: 'marcelino.sandroni@gmail.com',
    description: 'My email address', categoryId: 'personal', isEnabled: true,
    immediateExpand: false, hotkeyBinding: '', usageCount: 0, createdAt: now(), updatedAt: now(),
  },
  {
    id: generateId(), abbreviation: 'myphone', expansionText: '+1 (555) 123-4567',
    description: 'My phone number', categoryId: 'personal', isEnabled: true,
    immediateExpand: false, hotkeyBinding: '', usageCount: 0, createdAt: now(), updatedAt: now(),
  },
];

const DEFAULT_SETTINGS: Settings = {
  startWithWindows: true,
  showInTray: true,
  minimizeToTray: true,
  theme: 'dark',
  triggerChars: [' ', '\t', '\n', '.', ',', ';'],
  showNotification: true,
  playSound: false,
  caseSensitive: false,
  matchWholeWords: true,
  popupHotkey: 'Ctrl+Space',
  pauseHotkey: 'Ctrl+Shift+P',
  createFromSelectionHotkey: 'Ctrl+Shift+N',
  neverExpandInPasswords: true,
  encryptDatabase: false,
  appRulesMode: 'blocklist',
};

interface StoreContextType {
  snippets: Snippet[];
  categories: Category[];
  settings: Settings;
  expansionHistory: ExpansionEvent[];
  currentView: ViewMode;
  searchQuery: string;
  selectedCategoryId: string;
  isPaused: boolean;
  editingSnippet: Snippet | null;
  setCurrentView: (v: ViewMode) => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategoryId: (id: string) => void;
  togglePaused: () => void;
  addSnippet: (s: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => void;
  updateSnippet: (s: Snippet) => void;
  deleteSnippet: (id: string) => void;
  toggleSnippetEnabled: (id: string) => void;
  addCategory: (c: Omit<Category, 'id' | 'createdAt'>) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  updateSettings: (s: Partial<Settings>) => void;
  setEditingSnippet: (s: Snippet | null) => void;
  recordExpansion: (snippetId: string) => void;
  exportSnippets: () => string;
  importSnippets: (snippets: any[]) => { added: number; skipped: number };
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [snippets, setSnippets] = useState<Snippet[]>(DEFAULT_SNIPPETS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [expansionHistory, setExpansionHistory] = useState<ExpansionEvent[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('snippets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [dbSnippets, dbCategories, dbSettings, dbHistory] = await Promise.all([
          db.getAllSnippets(),
          db.getAllCategories(),
          db.getSettings(),
          db.getHistory(),
        ]);
        
        if (dbSnippets.length > 0) setSnippets(dbSnippets);
        if (dbCategories.length > 0) setCategories(dbCategories);
        if (dbSettings) setSettings(dbSettings);
        if (dbHistory.length > 0) setExpansionHistory(dbHistory);
      } catch (error) {
        console.error('Failed to load from IndexedDB:', error);
      }
      setIsLoaded(true);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    snippets.forEach(snippet => db.addSnippet(snippet));
  }, [snippets, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    categories.forEach(category => db.addCategory(category));
  }, [categories, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    db.saveSettings(settings);
  }, [settings, isLoaded]);

  const addSnippet = (s: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => {
    const newSnippet: Snippet = { ...s, id: generateId(), usageCount: 0, createdAt: now(), updatedAt: now() };
    setSnippets(prev => [...prev, newSnippet]);
  };

  const updateSnippet = (s: Snippet) => {
    setSnippets(prev => prev.map(p => p.id === s.id ? { ...s, updatedAt: now() } : p));
  };

  const deleteSnippet = (id: string) => {
    setSnippets(prev => prev.filter(p => p.id !== id));
  };

  const toggleSnippetEnabled = (id: string) => {
    setSnippets(prev => prev.map(p => p.id === id ? { ...p, isEnabled: !p.isEnabled, updatedAt: now() } : p));
  };

  const addCategory = (c: Omit<Category, 'id' | 'createdAt'>) => {
    const newCat: Category = { ...c, id: generateId(), createdAt: now() };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (c: Category) => {
    setCategories(prev => prev.map(p => p.id === c.id ? c : p));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(p => p.id !== id));
    setSnippets(prev => prev.map(p => p.categoryId === id ? { ...p, categoryId: '' } : p));
  };

  const updateSettings = (s: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...s }));
  };

  const togglePaused = () => setIsPaused(p => !p);

  const recordExpansion = (snippetId: string) => {
    const snippet = snippets.find(s => s.id === snippetId);
    if (!snippet) return;
    setSnippets(prev => prev.map(p => p.id === snippetId ? { ...p, usageCount: p.usageCount + 1 } : p));
    const event: ExpansionEvent = {
      id: generateId(), snippetId, abbreviation: snippet.abbreviation,
      expansionText: snippet.expansionText, timestamp: now(),
    };
    setExpansionHistory(prev => [event, ...prev].slice(0, 50));
  };

  const exportSnippets = () => {
    return JSON.stringify(snippets.map(s => ({
      abbreviation: s.abbreviation, expansionText: s.expansionText,
      description: s.description, categoryId: s.categoryId, isEnabled: s.isEnabled,
    })), null, 2);
  };

  const importSnippets = (imported: any[]) => {
    let added = 0, skipped = 0;
    const existingAbbrs = new Set(snippets.map(s => s.abbreviation.toLowerCase()));
    const newSnippets: Snippet[] = [];
    for (const s of imported) {
      if (existingAbbrs.has(s.abbreviation.toLowerCase())) { skipped++; continue; }
      newSnippets.push({ ...s, id: generateId(), createdAt: now(), updatedAt: now(), immediateExpand: false, hotkeyBinding: '', usageCount: 0 });
      existingAbbrs.add(s.abbreviation.toLowerCase());
      added++;
    }
    setSnippets(prev => [...prev, ...newSnippets]);
    return { added, skipped };
  };

  return (
    <StoreContext.Provider value={{
      snippets, categories, settings, expansionHistory, currentView, searchQuery,
      selectedCategoryId, isPaused, editingSnippet,
      setCurrentView, setSearchQuery, setSelectedCategoryId, togglePaused,
      addSnippet, updateSnippet, deleteSnippet, toggleSnippetEnabled,
      addCategory, updateCategory, deleteCategory, updateSettings,
      setEditingSnippet, recordExpansion, exportSnippets, importSnippets,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
