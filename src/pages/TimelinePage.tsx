import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TimelineEvent as TimelineEventType } from '@/types';

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEventType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, searchQuery]);

  const loadEvents = async () => {
    try {
      const response = await fetch('/duterteph/data/timeline.json');
      const data = await response.json();
      setEvents(data.sort((a: TimelineEventType, b: TimelineEventType) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (error) {
      console.error('Failed to load timeline:', error);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  };

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  const groupByYear = (events: TimelineEventType[]) => {
    const groups: { [year: string]: TimelineEventType[] } = {};
    events.forEach(event => {
      const year = new Date(event.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(event);
    });
    return groups;
  };

  const yearGroups = groupByYear(filteredEvents);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Interactive Timeline</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore documented events related to Sara Duterte, the ICC, and the Philippines. All events are sourced and dated.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
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

        {/* Timeline */}
        <div className="space-y-12">
          {Object.entries(yearGroups).map(([year, yearEvents]) => (
            <motion.div
              key={year}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 sticky top-20 bg-background/95 backdrop-blur py-2 z-10">
                {year}
              </h2>
              <div className="relative border-l-2 border-muted pl-8 space-y-8">
                {yearEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        expandedEvent === event.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</span>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                                {event.category}
                              </span>
                            </div>
                            <CardTitle>{event.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{event.description}</p>

                        {expandedEvent === event.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 pt-4 border-t"
                          >
                            {event.sources && event.sources.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">Sources</h4>
                                <div className="space-y-1">
                                  {event.sources.map((sourceId, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-muted-foreground">{sourceId}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events match your filters.</p>
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
