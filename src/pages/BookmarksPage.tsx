import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, FileText, Calendar, File, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookmarks } from '@/contexts/BookmarkContext';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const [bookmarkItems, setBookmarkItems] = useState<any[]>([]);

  useEffect(() => {
    loadBookmarkItems();
  }, [bookmarks]);

  const loadBookmarkItems = async () => {
    try {
      const items = await Promise.all(
        bookmarks.map(async (bookmark) => {
          let data;
          let path;

          switch (bookmark.type) {
            case 'article':
              const news = await fetch('/duterteph/data/news.json').then(r => r.json());
              data = news.find((item: any) => item.id === bookmark.id);
              path = `/updates/${bookmark.id}`;
              break;
            case 'timeline':
              const timeline = await fetch('/duterteph/data/timeline.json').then(r => r.json());
              data = timeline.find((item: any) => item.id === bookmark.id);
              path = '/timeline';
              break;
            case 'document':
              const docs = await fetch('/duterteph/data/documents.json').then(r => r.json());
              data = docs.find((item: any) => item.id === bookmark.id);
              path = '/documents';
              break;
            case 'claim':
              const claims = await fetch('/duterteph/data/claims.json').then(r => r.json());
              data = claims.find((item: any) => item.id === bookmark.id);
              path = '/claims';
              break;
          }

          return { ...bookmark, data, path };
        })
      );

      setBookmarkItems(items.filter(item => item.data));
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-5 w-5" />;
      case 'timeline': return <Calendar className="h-5 w-5" />;
      case 'document': return <File className="h-5 w-5" />;
      case 'claim': return <AlertCircle className="h-5 w-5" />;
      default: return <Bookmark className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Bookmarks</h1>
              <p className="text-lg text-muted-foreground">
                Your saved items ({bookmarks.length})
              </p>
            </div>
            {bookmarks.length > 0 && (
              <Button
                variant="outline"
                onClick={clearBookmarks}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {bookmarkItems.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No bookmarks yet</p>
            <p className="text-sm text-muted-foreground mb-6">
              Click the bookmark icon on articles, timeline events, documents, or claims to save them here.
            </p>
            <Button asChild>
              <Link to="/">Explore Content</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-primary">
                        {getIcon(item.type)}
                        <span className="text-xs font-medium">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeBookmark(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">
                      {item.data.title || item.data.claim || item.data.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {item.data.summary || item.data.description || item.data.context}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={item.path}>View</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
