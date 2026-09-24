# Understanding Sara Duterte & the ICC

An interactive, documentary-style website providing sourced information about Sara Duterte, the International Criminal Court (ICC), and related developments.

🔗 **Live Site:** [https://duterteph.github.io/duterteph/](https://duterteph.github.io/duterteph/)

## Features

- **Interactive Timeline** - Explore documented events with filtering, search, and detailed sources
- **ICC Process Explorer** - Understand how the International Criminal Court works
- **Legal Glossary** - Interactive glossary of key legal terms
- **Document Library** - Access official documents with full attribution
- **News Updates** - Sourced news with verification status
- **Claims Explorer** - Examine claims with context and uncertainties
- **Source Directory** - Transparent attribution for all information
- **Global Search** - Search across all content (Cmd/Ctrl+K)
- **Bookmarks** - Save items locally for later reference
- **Dark Mode** - Light, dark, and system themes

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Fuse.js** - Client-side search
- **React Router** - Navigation
- **GitHub Pages** - Hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173/duterteph/](http://localhost:5173/duterteph/)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
duterteph/
├── public/
│   └── data/              # JSON data files
│       ├── timeline.json
│       ├── news.json
│       ├── documents.json
│       ├── claims.json
│       ├── sources.json
│       ├── statements.json
│       └── legal-terms.json
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── types/             # TypeScript types
│   ├── lib/               # Utilities
│   └── App.tsx
├── n8n/
│   └── workflows/         # n8n automation workflows
└── .github/
    └── workflows/         # GitHub Actions
```

## Data Management

### Manual Updates

Edit JSON files in `public/data/` and commit changes. GitHub Actions will automatically rebuild and deploy the site.

### Automated Updates (n8n)

The `n8n/workflows/` directory contains automation workflows for:

- **News monitoring** - RSS feeds, deduplication, AI summarization
- **Human approval** - Every article reviewed before publication
- **GitHub integration** - Automatic commits to update data

**Important:** n8n runs separately from GitHub Pages. Set up n8n on your own infrastructure.

## Deployment

### GitHub Pages Setup

1. Fork this repository
2. Go to Settings → Pages
3. Source: GitHub Actions
4. Push to `main` branch to trigger deployment

### Update Repository Name

If your repository isn't named `duterteph`, update the base path in:
- `vite.config.ts` - Change `base: '/duterteph/'`
- `index.html` - Update asset paths

## Content Guidelines

### All Content Must Be:

- **Sourced** - Every claim attributed to a verifiable source
- **Dated** - All events and statements include dates
- **Neutral** - No political persuasion or endorsements
- **Accurate** - Verified against primary sources where possible
- **Transparent** - Uncertainty clearly identified

### Verification Status

- `verified` - Confirmed by primary sources
- `official-statement` - From official source, not independently verified
- `allegation` - Claimed but not proven
- `disputed` - Conflicting accounts exist
- `context-required` - Additional information needed
- `not-verified` - Cannot be independently confirmed

## Editorial Standards

- No fabricated information
- Clear distinction between fact and allegation
- Attribution for all claims
- Transparency about uncertainty
- No political advocacy

## Privacy

- No user accounts
- No server-side tracking
- No cookies
- Local storage only (bookmarks, theme)
- Client-side search

## Contributing

This is a personal project. For corrections or suggestions, please open an issue.

## License

Content is provided for informational purposes. All sourced material remains property of original publishers.

## Disclaimer

This site is not affiliated with Sara Duterte, the Office of the Vice President, the International Criminal Court, or the Philippine government. It is an independent informational project.

## Legal Notice

This website presents documented information and does not make legal determinations. Only courts can determine guilt or innocence.

---

Built with React, TypeScript, and Vite. Deployed on GitHub Pages.
