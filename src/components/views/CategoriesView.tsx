import { useState } from 'react';
import { useStore } from '../../store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Pencil, Trash2, Plus } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
const ICONS = ['📁', '👤', '💼', '📍', '📧', '💻', '🏠', '📱', '🎯', '⭐', '🔧', '📋'];

export default function CategoriesView() {
  const { categories, snippets, addCategory, updateCategory, deleteCategory } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#3B82F6');
  const [newIcon, setNewIcon] = useState('📁');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addCategory({ name: newName.trim(), color: newColor, icon: newIcon, sortOrder: categories.length });
    setNewName(''); setNewColor('#3B82F6'); setNewIcon('📁');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Category name..."
            />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-1 flex-wrap">
              {ICONS.map(icon => (
                <Button
                  key={icon}
                  variant={newIcon === icon ? 'default' : 'outline'}
                  size="icon"
                  className="w-9 h-9"
                  onClick={() => setNewIcon(icon)}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setNewColor(color)}
                  className={`w-8 h-8 rounded-md transition-transform ${newColor === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {categories.map(cat => {
          const count = snippets.filter(s => s.categoryId === cat.id).length;
          const isEditing = editingId === cat.id;
          return (
            <Card key={cat.id}>
              <div className="p-4 flex items-center gap-4">
                <span className="text-xl">{cat.icon}</span>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-3">
                    <Input
                      defaultValue={cat.name}
                      onBlur={e => { updateCategory({ ...cat, name: e.target.value }); setEditingId(null); }}
                      onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                      className="flex-1"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      {COLORS.map(c => (
                        <button
                          key={c}
                          onClick={() => updateCategory({ ...cat, color: c })}
                          className={`w-5 h-5 rounded-full ${cat.color === c ? 'ring-1 ring-primary' : ''}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <h4 className="text-sm font-medium" style={{ color: cat.color }}>{cat.name}</h4>
                    <p className="text-xs text-muted-foreground">{count} snippet{count !== 1 ? 's' : ''}</p>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingId(isEditing ? null : cat.id)}
                >
                  {isEditing ? '✓' : <Pencil className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { if (confirm('Delete this category?')) deleteCategory(cat.id); }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
