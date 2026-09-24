import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Claim } from '@/types';

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);

  useEffect(() => {
    loadClaims();
  }, []);

  useEffect(() => {
    filterClaims();
  }, [claims, searchQuery, selectedStatus]);

  const loadClaims = async () => {
    try {
      const response = await fetch('/duterteph/data/claims.json');
      const data = await response.json();
      setClaims(data.sort((a: Claim, b: Claim) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    } catch (error) {
      console.error('Failed to load claims:', error);
    }
  };

  const filterClaims = () => {
    let filtered = claims;

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.claim.toLowerCase().includes(query) ||
        (c.context && c.context.toLowerCase().includes(query))
      );
    }

    setFilteredClaims(filtered);
  };

  const statuses = ['All', 'verified', 'official-statement', 'allegation', 'disputed', 'context-required', 'not-verified'];

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getStatusColor = (status: Claim['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'official-statement': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'allegation': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'disputed': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'context-required': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'not-verified': return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
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
          <h1 className="text-4xl font-bold mb-4">Claims Explorer</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Examine claims with their verification status, available evidence, context, and uncertainties.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 max-w-md">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {getStatusLabel(status)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredClaims.map((claim, index) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                  expandedClaim === claim.id ? 'ring-2 ring-primary' : ''
                } ${getStatusColor(claim.status)}`}
                onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-semibold">
                          {getStatusLabel(claim.status)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • {new Date(claim.date).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{claim.claim}</CardTitle>
                      {claim.claimant && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Claimant: {claim.claimant}
                        </p>
                      )}
                    </div>
                    {expandedClaim === claim.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>

                {expandedClaim === claim.id && (
                  <CardContent className="space-y-4 border-t pt-4">
                    {claim.evidence && (
                      <div>
                        <h4 className="font-semibold mb-2">Available Evidence</h4>
                        <p className="text-muted-foreground">{claim.evidence}</p>
                      </div>
                    )}
                    {claim.context && (
                      <div>
                        <h4 className="font-semibold mb-2">Context</h4>
                        <p className="text-muted-foreground">{claim.context}</p>
                      </div>
                    )}
                    {claim.uncertainties && (
                      <div>
                        <h4 className="font-semibold mb-2">Uncertainties</h4>
                        <p className="text-muted-foreground">{claim.uncertainties}</p>
                      </div>
                    )}
                    {claim.sources && claim.sources.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Sources</h4>
                        <div className="space-y-1">
                          {claim.sources.map((sourceId, idx) => (
                            <div key={idx} className="text-sm text-muted-foreground">
                              • {sourceId}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No claims match your filters.</p>
            <Button
              variant="link"
              onClick={() => {
                setSelectedStatus('All');
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
