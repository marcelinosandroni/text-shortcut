import { useState, useRef } from 'react';
import { useStore } from '../../store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Upload, FileJson, FileSpreadsheet } from 'lucide-react';

export default function ImportExportView() {
  const { exportSnippets, importSnippets, snippets } = useStore();
  const [importResult, setImportResult] = useState<{ added: number; skipped: number } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (format: 'json' | 'csv') => {
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = exportSnippets();
      filename = `quickfill-snippets-${new Date().toISOString().slice(0, 10)}.json`;
      mimeType = 'application/json';
    } else {
      const rows = [['Abbreviation', 'Expansion Text', 'Description', 'Category', 'Enabled']];
      snippets.forEach(s => {
        rows.push([s.abbreviation, s.expansionText, s.description, s.categoryId, String(s.isEnabled)]);
      });
      content = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
      filename = `quickfill-snippets-${new Date().toISOString().slice(0, 10)}.csv`;
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportResult(null);
    setImportError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        let imported: any[];

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (!Array.isArray(parsed)) throw new Error('JSON must be an array');
          imported = parsed.map((s: any) => ({
            abbreviation: String(s.abbreviation || ''),
            expansionText: String(s.expansionText || ''),
            description: String(s.description || ''),
            categoryId: String(s.categoryId || ''),
            isEnabled: s.isEnabled !== false,
          }));
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n').filter(l => l.trim());
          if (lines.length < 2) throw new Error('CSV must have header and data');
          imported = lines.slice(1).map(line => {
            const cols = line.match(/("([^"]*(?:""[^"]*)*)"|[^,]*)/g)?.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"')) || [];
            return {
              abbreviation: cols[0] || '',
              expansionText: cols[1] || '',
              description: cols[2] || '',
              categoryId: cols[3] || '',
              isEnabled: cols[4] !== 'false',
            };
          });
        } else {
          throw new Error('Unsupported format. Use .json or .csv');
        }

        const valid = imported.filter(s => s.abbreviation && s.expansionText);
        if (valid.length === 0) throw new Error('No valid snippets found');
        
        const result = importSnippets(valid);
        setImportResult(result);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Failed to parse file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Snippets
          </CardTitle>
          <CardDescription>Download your snippets as a backup file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button onClick={() => handleExport('json')}>
              <FileJson className="w-4 h-4 mr-2" />
              Export as JSON
            </Button>
            <Button onClick={() => handleExport('csv')} variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Currently {snippets.length} snippets will be exported.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import Snippets
          </CardTitle>
          <CardDescription>Import snippets from a JSON or CSV file. Duplicates will be skipped.</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <label htmlFor="import-file">
            <Button asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Choose File to Import
              </span>
            </Button>
          </label>

          {importResult && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-sm text-green-500">
                ✓ Import complete: <strong>{importResult.added}</strong> added, <strong>{importResult.skipped}</strong> skipped
              </p>
            </div>
          )}
          {importError && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">✗ Error: {importError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Format Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">JSON Format</p>
              <pre className="text-xs text-muted-foreground bg-muted rounded-md p-3 overflow-x-auto">{`[
  {
    "abbreviation": "mnm",
    "expansionText": "Full Name",
    "description": "My name",
    "categoryId": "personal",
    "isEnabled": true
  }
]`}</pre>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">CSV Format</p>
              <pre className="text-xs text-muted-foreground bg-muted rounded-md p-3 overflow-x-auto">{`"Abbreviation","Expansion Text","Description","Category","Enabled"
"mnm","Full Name","My name","personal","true"`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
