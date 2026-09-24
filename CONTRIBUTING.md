# Contributing Guidelines

Thank you for your interest in improving this project.

## Reporting Issues

If you find factual errors, broken links, or other issues:

1. Check if an issue already exists
2. Open a new issue with:
   - Clear description of the problem
   - Link to the affected page
   - Source or evidence (if reporting factual error)
   - Suggested correction

## Editorial Standards

All contributions must follow these standards:

### Sourcing

- Every factual claim must have a verifiable source
- Primary sources preferred (ICC, government, courts)
- Secondary sources acceptable when properly attributed
- News sources must be from established outlets

### Attribution

Include for every claim:
- Source name
- Publication/statement date
- Link to original source (if available)
- Source type (primary/secondary)

### Neutrality

- No political advocacy or persuasion
- No endorsements or recommendations
- Present facts without editorializing
- Distinguish clearly between fact and allegation

### Verification Status

Use appropriate status labels:
- `verified` - Confirmed by primary sources
- `official-statement` - From official source, not independently verified
- `allegation` - Claimed but not proven
- `disputed` - Conflicting accounts
- `context-required` - Additional context needed
- `not-verified` - Cannot independently confirm

## Data Format

### Timeline Events (`public/data/timeline.json`)

```json
{
  "id": "unique-id",
  "date": "YYYY-MM-DD",
  "title": "Event title",
  "description": "Event description",
  "category": "ICC|Philippine Government|Sara Duterte|Legal Proceedings|Public Statements|International Developments",
  "sources": ["source-id-1", "source-id-2"],
  "relatedDocuments": ["doc-id"],
  "relatedNews": ["news-id"]
}
```

### News Articles (`public/data/news.json`)

```json
{
  "id": "unique-id",
  "title": "Article title",
  "date": "YYYY-MM-DD",
  "source": "Source name",
  "category": "ICC|Philippine Government|Sara Duterte|Legal|International",
  "summary": "Brief summary",
  "content": "Full content",
  "url": "https://original-source.com",
  "verificationStatus": "verified|official-statement|allegation|disputed|context-required|not-verified",
  "relatedTimeline": ["event-id"],
  "relatedDocuments": ["doc-id"]
}
```

### Documents (`public/data/documents.json`)

```json
{
  "id": "unique-id",
  "title": "Document title",
  "organization": "ICC|UN|Philippine Government|etc",
  "date": "YYYY-MM-DD",
  "type": "Treaty|Decision|Statement|Report|etc",
  "sourceType": "primary|secondary",
  "url": "https://source.com/document.pdf",
  "summary": "Brief description"
}
```

## Submitting Changes

### For Data Updates

1. Fork the repository
2. Edit the appropriate JSON file in `public/data/`
3. Ensure proper formatting (use JSON validator)
4. Verify all sources are accessible
5. Submit pull request with:
   - Description of what was added/changed
   - Links to sources
   - Verification status

### For Code Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally (`npm run dev`, `npm run build`)
5. Submit pull request

## What Will NOT Be Accepted

- Fabricated information
- Unsourced claims
- Political advocacy or persuasion
- Partisan language
- Personal attacks
- Conspiracy theories
- Misleading legal characterizations
- Content without proper attribution

## Review Process

All contributions will be reviewed for:
- Factual accuracy
- Proper sourcing
- Neutrality
- Verification status
- Editorial consistency

## Questions?

Open an issue for discussion before making significant changes.

## License Note

By contributing, you agree that your contributions will be used for this informational project and properly attributed where appropriate.
