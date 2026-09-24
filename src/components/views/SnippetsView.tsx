import { useState } from 'react';
import { useStore } from '../../store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';

export default function SnippetsView() {
  const { snippets, categories, searchQuery, setSearchQuery, selectedCategoryId, setSelectedCategoryId, toggleSnippetEnabled, deleteSnippet, setEditingSnippet } = useStore();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredSnippets = snippets.filter(s => {
    const matchesSearch = !searchQuery || 
      s.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.expansionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryId === 'all' || s.categoryId === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Uncategorized';
  const getCategoryColor = (id: string) => categories.find(c => c.id === id)?.color || '#6B7280';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search snippets..."
            className="pl-9"
          />
        </div>
        <Button onClick={() => setEditingSnippet({} as any)}>
          <Plus className="w-4 h-4 mr-2" />
          New Snippet
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={selectedCategoryId === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategoryId('all')}
        >
          All ({snippets.length})
        </Button>
        {categories.map(cat => {
          const count = snippets.filter(s => s.categoryId === cat.id).length;
          return (
            <Button
              key={cat.id}
              variant={selectedCategoryId === cat.id ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategoryId(cat.id)}
              className="gap-1.5"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="text-muted-foreground">({count})</span>
            </Button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filteredSnippets.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm text-muted-foreground mb-4">No snippets found. Create your first one!</p>
            <Button onClick={() => setEditingSnippet({} as any)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Snippet
            </Button>
          </Card>
        ) : (
          filteredSnippets.map(snippet => (
            <Card key={snippet.id} className={snippet.isEnabled ? '' : 'opacity-50'}>
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
                      {snippet.abbreviation}
                    </code>
                    <span className="text-muted-foreground text-xs">→</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: getCategoryColor(snippet.categoryId) + '20', color: getCategoryColor(snippet.categoryId) }}
                    >
                      {getCategoryName(snippet.categoryId)}
                    </span>
                    {snippet.usageCount > 0 && (
                      <span className="text-xs text-muted-foreground">({snippet.usageCount}×)</span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-foreground truncate">
                    {snippet.expansionText.replace(/\n/g, ' ↵ ')}
                  </p>
                  {snippet.description && (
                    <p className="text-xs text-muted-foreground">{snippet.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Switch
                    checked={snippet.isEnabled}
                    onCheckedChange={() => toggleSnippetEnabled(snippet.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingSnippet(snippet)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  {confirmDelete === snippet.id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => { deleteSnippet(snippet.id); setConfirmDelete(null); }}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setConfirmDelete(snippet.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>Showing {filteredSnippets.length} of {snippets.length} snippets</span>
        <span>{snippets.reduce((a, s) => a + s.usageCount, 0)} total expansions</span>
      </div>
    </div>
  );
}
