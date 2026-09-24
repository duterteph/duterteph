import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid3x3, List, Calendar as CalendarIcon, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NewsArticle } from '@/types';
import { useBookmarks } from '@/contexts/BookmarkContext';

type ViewMode = 'grid' | 'list';

export default function UpdatesPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchQuery, selectedCategory]);

  const loadArticles = async () => {
    try {
      const response = await fetch('/duterteph/data/news.json');
      const data = await response.json();
      setArticles(data.sort((a: NewsArticle, b: NewsArticle) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (error) {
      console.error('Failed to load news:', error);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  };

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

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

  const handleBookmark = (e: React.MouseEvent, article: NewsArticle) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookmarked(article.id)) {
      removeBookmark(article.id);
    } else {
      addBookmark(article.id, 'article');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Latest Updates</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse sourced news and developments. All updates include verification status and source attribution.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/updates/${article.id}`}>
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(article.verificationStatus)}`}>
                        {getStatusLabel(article.verificationStatus)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleBookmark(e, article)}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isBookmarked(article.id) ? 'fill-current' : ''}`}
                        />
                      </Button>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-3">
                      {article.summary}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Source: {article.source}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No updates match your filters.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
