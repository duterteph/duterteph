import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Calendar, File, AlertCircle, BookOpen } from 'lucide-react';
import Fuse from 'fuse.js';
import { Input } from './ui/input';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'timeline' | 'news' | 'document' | 'claim' | 'source';
  date?: string;
  source?: string;
  excerpt?: string;
  path: string;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allItems, setAllItems] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    try {
      const [timeline, news, documents, claims, sources] = await Promise.all([
        fetch('/duterteph/data/timeline.json').then(r => r.json()),
        fetch('/duterteph/data/news.json').then(r => r.json()),
        fetch('/duterteph/data/documents.json').then(r => r.json()),
        fetch('/duterteph/data/claims.json').then(r => r.json()),
        fetch('/duterteph/data/sources.json').then(r => r.json()),
      ]);

      const items: SearchResult[] = [
        ...timeline.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: 'timeline' as const,
          date: item.date,
          excerpt: item.description,
          path: '/timeline',
        })),
        ...news.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: 'news' as const,
          date: item.date,
          source: item.source,
          excerpt: item.summary,
          path: `/updates/${item.id}`,
        })),
        ...documents.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: 'document' as const,
          date: item.date,
          source: item.organization,
          excerpt: item.summary,
          path: '/documents',
        })),
        ...claims.map((item: any) => ({
          id: item.id,
          title: item.claim,
          type: 'claim' as const,
          date: item.date,
          excerpt: item.context,
          path: '/claims',
        })),
        ...sources.map((item: any) => ({
          id: item.id,
          title: item.name,
          type: 'source' as const,
          excerpt: item.description,
          path: '/sources',
        })),
      ];

      setAllItems(items);
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(allItems, {
      keys: ['title', 'excerpt', 'source'],
      threshold: 0.3,
      includeScore: true,
    });

    const searchResults = fuse.search(query).slice(0, 10);
    setResults(searchResults.map(r => r.item));
  }, [query, allItems]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onOpenChange(false);
    setQuery('');
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'timeline':
        return <Calendar className="h-4 w-4" />;
      case 'news':
        return <FileText className="h-4 w-4" />;
      case 'document':
        return <File className="h-4 w-4" />;
      case 'claim':
        return <AlertCircle className="h-4 w-4" />;
      case 'source':
        return <BookOpen className="h-4 w-4" />;
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background shadow-lg">
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search timeline, news, documents, claims..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <kbd className="hidden sm:inline-block pointer-events-none select-none rounded border bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 && query && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
          {results.length === 0 && !query && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Start typing to search
            </div>
          )}
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="w-full text-left rounded-md p-3 hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-muted-foreground">{getIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{result.title}</div>
                  {result.excerpt && (
                    <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {result.excerpt}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="capitalize">{result.type}</span>
                    {result.date && <span>• {new Date(result.date).toLocaleDateString()}</span>}
                    {result.source && <span>• {result.source}</span>}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t p-2 text-xs text-muted-foreground flex items-center justify-between">
          <div>
            <kbd className="inline-block pointer-events-none select-none rounded border bg-muted px-2 py-1 font-mono">
              ↑↓
            </kbd>
            <span className="ml-2">Navigate</span>
          </div>
          <div>
            <kbd className="inline-block pointer-events-none select-none rounded border bg-muted px-2 py-1 font-mono">
              Enter
            </kbd>
            <span className="ml-2">Select</span>
          </div>
        </div>
      </div>
    </>
  );
}
