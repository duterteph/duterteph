export interface Source {
  id: string;
  name: string;
  type: 'primary' | 'secondary' | 'news' | 'government' | 'international';
  url?: string;
  description?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  sources: string[];
  relatedDocuments?: string[];
  relatedNews?: string[];
}

export interface Document {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  sourceType: 'primary' | 'secondary';
  url?: string;
  summary?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  source: string;
  category: string;
  summary: string;
  content?: string;
  url?: string;
  verificationStatus: 'verified' | 'official-statement' | 'allegation' | 'disputed' | 'context-required' | 'not-verified';
  relatedTimeline?: string[];
  relatedDocuments?: string[];
  relatedArticles?: string[];
}

export interface Statement {
  id: string;
  date: string;
  speaker: string;
  statement: string;
  context?: string;
  source: string;
  type: 'direct-quote' | 'paraphrase';
}

export interface Claim {
  id: string;
  claim: string;
  date: string;
  status: 'verified' | 'official-statement' | 'allegation' | 'disputed' | 'context-required' | 'not-verified';
  claimant?: string;
  evidence?: string;
  context?: string;
  uncertainties?: string;
  sources: string[];
}

export interface LegalTerm {
  id: string;
  term: string;
  definition: string;
  context?: string;
  source?: string;
}
