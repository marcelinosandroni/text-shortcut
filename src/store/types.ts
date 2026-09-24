export interface Snippet {
  id: string;
  abbreviation: string;
  expansionText: string;
  description: string;
  categoryId: string;
  isEnabled: boolean;
  immediateExpand: boolean;
  hotkeyBinding: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  sortOrder: number;
  createdAt: string;
}

export interface Settings {
  startWithWindows: boolean;
  showInTray: boolean;
  minimizeToTray: boolean;
  theme: 'dark' | 'light' | 'system';
  triggerChars: string[];
  showNotification: boolean;
  playSound: boolean;
  caseSensitive: boolean;
  matchWholeWords: boolean;
  popupHotkey: string;
  pauseHotkey: string;
  createFromSelectionHotkey: string;
  neverExpandInPasswords: boolean;
  encryptDatabase: boolean;
  appRulesMode: 'blocklist' | 'allowlist';
}

export interface ExpansionEvent {
  id: string;
  snippetId: string;
  abbreviation: string;
  expansionText: string;
  timestamp: string;
  appName?: string;
}

export type ViewMode = 'snippets' | 'categories' | 'settings' | 'demo' | 'import-export';
