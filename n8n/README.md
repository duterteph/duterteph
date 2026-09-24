# n8n Workflows

This directory contains n8n workflow templates for automating news monitoring and updates.

## Setup

### Prerequisites

- n8n instance (self-hosted or n8n Cloud)
- GitHub personal access token with repo write access
- (Optional) AI service API key for summarization

### Installation

1. Import `news-monitor.json` into your n8n instance
2. Configure environment variables:
   - `GITHUB_OWNER` - Your GitHub username
   - `GITHUB_REPO` - Repository name (e.g., "duterteph")
   - `GITHUB_TOKEN` - Personal access token
3. Set up OAuth for GitHub node
4. Configure the AI node with your preferred provider

### Workflows

#### news-monitor.json

Automated news monitoring workflow:

1. **Schedule** - Runs every 6 hours
2. **Fetch RSS** - Retrieves articles from Google News RSS
3. **Filter** - Removes duplicates and irrelevant content
4. **AI Summary** - Generates concise summaries
5. **Relevance Check** - Ensures content matches topic
6. **Human Approval** - Presents form for manual review
7. **GitHub Update** - Updates `public/data/news.json` on approval
8. **Auto Deploy** - GitHub Actions rebuilds site automatically

### Human Approval

**Critical:** Every article must be manually approved before publication.

The approval form includes:
- Article title (editable)
- AI-generated summary (editable)
- Source attribution
- Verification status selection
- Approve/reject decision

### Customization

Modify the workflow to:
- Add more RSS sources
- Change monitoring frequency
- Adjust AI prompts
- Add Telegram/Slack notifications
- Include additional verification steps

### GitHub Integration

The workflow uses GitHub API to:
1. Read current `news.json`
2. Append new approved article
3. Commit with message "Update news data"
4. Trigger GitHub Actions deployment

### Security

- Never commit API keys to the repository
- Use n8n credentials system for sensitive data
- Review all articles before approval
- Verify sources are legitimate

### Testing

Test the workflow with:
1. Manual trigger in n8n
2. Review approval form
3. Check GitHub commit
4. Verify site updates

### Monitoring

Monitor workflow health:
- Check n8n execution logs
- Review failed approvals
- Monitor GitHub Actions status
- Verify site deployment

## Support

For n8n documentation: https://docs.n8n.io
