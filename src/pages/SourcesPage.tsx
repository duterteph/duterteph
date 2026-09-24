import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Source } from '@/types';

export default function SourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [filteredSources, setFilteredSources] = useState<Source[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    loadSources();
  }, []);

  useEffect(() => {
    filterSources();
  }, [sources, searchQuery, selectedType]);

  const loadSources = async () => {
    try {
      const response = await fetch('/duterteph/data/sources.json');
      const data = await response.json();
      setSources(data);
    } catch (error) {
      console.error('Failed to load sources:', error);
    }
  };

  const filterSources = () => {
    let filtered = sources;

    if (selectedType !== 'All') {
      filtered = filtered.filter(s => s.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(query) ||
        (s.description && s.description.toLowerCase().includes(query))
      );
    }

    setFilteredSources(filtered);
  };

  const types = ['All', 'primary', 'secondary', 'news', 'government', 'international'];

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getTypeColor = (type: Source['type']) => {
    switch (type) {
      case 'primary': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'secondary': return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      case 'news': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'government': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'international': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Sources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore the organizations and sources referenced throughout this site. All information is properly attributed.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 max-w-md">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {getTypeLabel(type)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <span className={`text-xs px-2 py-1 rounded-full w-fit mb-2 ${getTypeColor(source.type)}`}>
                    {getTypeLabel(source.type)}
                  </span>
                  <CardTitle>{source.name}</CardTitle>
                  {source.description && (
                    <CardDescription>{source.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {source.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sources match your filters.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedType('All');
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
