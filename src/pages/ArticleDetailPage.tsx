import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, ArrowLeft, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsArticle } from '@/types';
import { useBookmarks } from '@/contexts/BookmarkContext';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      const response = await fetch('/duterteph/data/news.json');
      const data = await response.json();
      const found = data.find((a: NewsArticle) => a.id === id);
      setArticle(found || null);
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  };

  const getStatusColor = (status: NewsArticle['verificationStatus']) => {
    switch (status) {
      case 'verified': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'official-statement': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'allegation': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'disputed': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'context-required': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'not-verified': return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: NewsArticle['verificationStatus']) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleBookmark = () => {
    if (!article) return;
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id, 'article');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Article not found</p>
            <Button asChild>
              <Link to="/updates">Back to Updates</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/updates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Updates
            </Link>
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(article.verificationStatus)}`}>
                {getStatusLabel(article.verificationStatus)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked(article.id) ? 'fill-current' : ''}`}
                />
              </Button>
            </div>

            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <span>•</span>
              <span>{article.source}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                {article.category}
              </span>
            </div>
          </div>

          {/* Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{article.summary}</p>
            </CardContent>
          </Card>

          {/* Content */}
          {article.content && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  {article.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Source */}
          {article.url && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Original Source</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Read Original Source
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Related Content */}
          {(article.relatedTimeline || article.relatedDocuments || article.relatedArticles) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Related Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {article.relatedTimeline && article.relatedTimeline.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Related Timeline Events</h4>
                    <Button variant="link" asChild className="p-0">
                      <Link to="/timeline">View Timeline</Link>
                    </Button>
                  </div>
                )}
                {article.relatedDocuments && article.relatedDocuments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Related Documents</h4>
                    <Button variant="link" asChild className="p-0">
                      <Link to="/documents">View Documents</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
