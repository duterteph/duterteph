import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen, Search as SearchIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LegalTerm } from '@/types';

const iccStages = [
  {
    id: 'allegation',
    title: 'Allegation',
    description: 'Claims that crimes may have been committed',
    content: 'An allegation is a claim or assertion that certain acts occurred. Allegations are not evidence and do not constitute proof. They are the starting point for investigation, not a finding of fact.',
    note: 'An allegation does NOT mean that a crime has been proven or that any individual is guilty.',
  },
  {
    id: 'investigation',
    title: 'Investigation',
    description: 'Gathering and examining information and evidence',
    content: 'An investigation is the process of gathering information and evidence to determine whether crimes within ICC jurisdiction were committed. The ICC Prosecutor conducts investigations independently and impartially.',
    note: 'Authorization to investigate does NOT mean that charges will be filed, or that any individual has been found guilty.',
  },
  {
    id: 'proceedings',
    title: 'Proceedings',
    description: 'Formal legal process before the Court',
    content: 'ICC proceedings involve various stages including preliminary examinations, investigations, pre-trial proceedings, trial, and appeals. Each stage has specific legal requirements and procedures.',
    note: 'Being subject to proceedings does NOT equal a conviction.',
  },
  {
    id: 'warrant',
    title: 'Warrant of Arrest',
    description: 'Judicial order to secure appearance before Court',
    content: 'A warrant of arrest is issued by the Pre-Trial Chamber when there are reasonable grounds to believe a person committed crimes within ICC jurisdiction. Its purpose is to secure the person\'s appearance before the Court.',
    note: 'A warrant is NOT a conviction. It is a procedural step to bring an accused before the Court.',
  },
  {
    id: 'charges',
    title: 'Charges',
    description: 'Formal accusations that must be proven',
    content: 'Charges are formal accusations brought by the Prosecutor and confirmed by the Pre-Trial Chamber. They represent allegations that must be proven beyond reasonable doubt at trial.',
    note: 'Charges are accusations, NOT proof of guilt. The accused is presumed innocent.',
  },
  {
    id: 'trial',
    title: 'Trial',
    description: 'Evidence presented and tested before judges',
    content: 'A trial is the judicial process where the Prosecutor must prove guilt beyond reasonable doubt. The accused has the right to a fair and public hearing, to present evidence, and to challenge the prosecution\'s case.',
    note: 'Only at trial is evidence fully tested. The burden of proof is on the Prosecutor.',
  },
  {
    id: 'judgment',
    title: 'Judgment',
    description: 'Judicial decision on guilt or innocence',
    content: 'The judgment is the final decision by the Trial Chamber on whether the accused is guilty or not guilty. It can only be reached after a full trial where all evidence has been examined.',
    note: 'A judgment of guilt requires proof beyond reasonable doubt. An acquittal means not guilty.',
  },
];

export default function ICCExplainedPage() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [legalTerms, setLegalTerms] = useState<LegalTerm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTerms, setFilteredTerms] = useState<LegalTerm[]>([]);

  useEffect(() => {
    loadLegalTerms();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredTerms(
        legalTerms.filter(term =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredTerms(legalTerms);
    }
  }, [searchQuery, legalTerms]);

  const loadLegalTerms = async () => {
    try {
      const response = await fetch('/duterteph/data/legal-terms.json');
      const data = await response.json();
      setLegalTerms(data);
      setFilteredTerms(data);
    } catch (error) {
      console.error('Failed to load legal terms:', error);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 max-w-3xl"
        >
          <h1 className="text-4xl font-bold mb-4">Understanding the ICC</h1>
          <p className="text-lg text-muted-foreground">
            Learn how the International Criminal Court works, what different stages mean, and key legal terminology.
          </p>
        </motion.div>

        {/* ICC Process Stages */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">ICC Process Stages</h2>
          <p className="text-muted-foreground mb-8">
            Click each stage to understand what it means and what it does NOT mean.
          </p>

          <div className="space-y-3">
            {iccStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStage === stage.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{stage.title}</CardTitle>
                        <CardDescription>{stage.description}</CardDescription>
                      </div>
                      {selectedStage === stage.id ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>

                  <AnimatePresence>
                    {selectedStage === stage.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">What it means:</h4>
                            <p className="text-muted-foreground">{stage.content}</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-md border-l-4 border-primary">
                            <p className="text-sm font-medium">{stage.note}</p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Legal Glossary */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Legal Terminology</h2>
          <p className="text-muted-foreground mb-6">
            Search and explore key legal terms used in ICC proceedings.
          </p>

          <div className="mb-6">
            <div className="flex items-center gap-2 max-w-md">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search legal terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg">{term.term}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{term.definition}</p>
                    {term.context && (
                      <p className="text-sm text-muted-foreground border-l-2 pl-3">
                        {term.context}
                      </p>
                    )}
                    {term.source && (
                      <p className="text-xs text-muted-foreground">
                        Source: {term.source}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No terms match your search.</p>
              <Button
                variant="link"
                onClick={() => setSearchQuery('')}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
