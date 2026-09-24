import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchQuery, selectedType]);

  const loadDocuments = async () => {
    try {
      const response = await fetch('/duterteph/data/documents.json');
      const data = await response.json();
      setDocuments(data.sort((a: Document, b: Document) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    if (selectedType !== 'All') {
      filtered = filtered.filter(d => d.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.organization.toLowerCase().includes(query)
      );
    }

    setFilteredDocuments(filtered);
  };

  const types = ['All', ...Array.from(new Set(documents.map(d => d.type)))];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Documents</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Access official documents, treaties, decisions, and statements with full source attribution.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 max-w-md">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
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
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.sourceType === 'primary'
                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                    }`}>
                      {doc.sourceType === 'primary' ? 'Primary Source' : 'Secondary Source'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(doc.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>{doc.organization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {doc.summary && (
                      <p className="text-sm text-muted-foreground">{doc.summary}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {doc.type}
                      </span>
                    </div>
                    {doc.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Open Document
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No documents match your filters.</p>
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
