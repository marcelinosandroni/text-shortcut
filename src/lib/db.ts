import { openDB, IDBPDatabase } from 'idb';
import { Snippet, Category, Settings, ExpansionEvent } from '../store/types';

let dbInstance: IDBPDatabase | null = null;

export async function getDB() {
  if (dbInstance) return dbInstance;
  
  dbInstance = await openDB('quickfill-db', 1, {
    upgrade(db) {
      const snippetStore = db.createObjectStore('snippets', { keyPath: 'id' });
      snippetStore.createIndex('by-category', 'categoryId');
      snippetStore.createIndex('by-enabled', 'isEnabled');
      
      db.createObjectStore('categories', { keyPath: 'id' });
      db.createObjectStore('settings', { keyPath: 'id' });
      
      const historyStore = db.createObjectStore('history', { keyPath: 'id' });
      historyStore.createIndex('by-timestamp', 'timestamp');
    },
  });
  
  return dbInstance;
}

export async function getAllSnippets(): Promise<Snippet[]> {
  const db = await getDB();
  return db.getAll('snippets');
}

export async function addSnippet(snippet: Snippet): Promise<void> {
  const db = await getDB();
  await db.put('snippets', snippet);
}

export async function updateSnippet(snippet: Snippet): Promise<void> {
  const db = await getDB();
  await db.put('snippets', snippet);
}

export async function deleteSnippet(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('snippets', id);
}

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDB();
  return db.getAll('categories');
}

export async function addCategory(category: Category): Promise<void> {
  const db = await getDB();
  await db.put('categories', category);
}

export async function updateCategory(category: Category): Promise<void> {
  const db = await getDB();
  await db.put('categories', category);
}

export async function deleteCategory(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('categories', id);
}

export async function getSettings(): Promise<Settings | null> {
  const db = await getDB();
  const result = await db.get('settings', 'main');
  if (!result) return null;
  const { id, ...settings } = result;
  return settings;
}

export async function saveSettings(settings: Settings): Promise<void> {
  const db = await getDB();
  await db.put('settings', { ...settings, id: 'main' });
}

export async function getHistory(limit = 50): Promise<ExpansionEvent[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('history', 'by-timestamp');
  return all.reverse().slice(0, limit);
}

export async function addHistoryEvent(event: ExpansionEvent): Promise<void> {
  const db = await getDB();
  await db.put('history', event);
}
