# Deployment Guide

Complete guide to deploying this site to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- Node.js 18+ installed

## Initial Setup

### 1. Create GitHub Repository

1. Go to GitHub and create a new repository
2. Name it `duterteph` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Update Configuration

If you named your repository something other than `duterteph`, update:

**vite.config.ts:**
```typescript
base: '/your-repo-name/',
```

**index.html:**
```html
<link rel="icon" type="image/svg+xml" href="/your-repo-name/vite.svg" />
```

**All data fetch URLs in components** (use find and replace):
- Find: `/duterteph/`
- Replace: `/your-repo-name/`

### 3. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Interactive ICC website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/duterteph.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will run automatically on the next push

### 5. First Deployment

The initial deployment happens automatically when you push to `main`.

Check deployment status:
1. Go to **Actions** tab
2. Look for "Deploy to GitHub Pages" workflow
3. Wait for green checkmark (usually 2-3 minutes)

Your site will be live at:
```
https://YOUR-USERNAME.github.io/duterteph/
```

## Updating Content

### Manual Updates

1. Edit JSON files in `public/data/`
2. Commit and push:

```bash
git add public/data/
git commit -m "Update: [describe changes]"
git push
```

GitHub Actions automatically rebuilds and deploys (2-3 minutes).

### Automated Updates (n8n)

See `n8n/README.md` for workflow setup.

## GitHub Personal Access Token

For n8n GitHub integration:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select scopes:
   - `repo` (all)
4. Copy token immediately (shown only once)
5. Add to n8n credentials

## Verifying Deployment

After deployment:

1. Visit your site URL
2. Test all pages:
   - Home
   - Timeline (with filtering)
   - ICC Explained (interactive stages)
   - Updates (grid/list view)
   - Documents
   - Sources
   - Claims
3. Test search (Cmd/Ctrl+K)
4. Test bookmarks (save and view)
5. Test dark mode toggle
6. Test mobile responsiveness

## Common Issues

### Issue: 404 on page refresh

**Cause:** GitHub Pages doesn't support client-side routing by default.

**Solution:** Already handled - we use HashRouter (`#/` in URLs)

### Issue: Assets not loading

**Cause:** Incorrect base path in Vite config.

**Solution:** Verify `base: '/duterteph/'` matches your repo name

### Issue: Data not loading

**Cause:** Incorrect data URLs or CORS issues.

**Solution:** 
- Check console for 404 errors
- Verify all fetch URLs use correct base path
- Check that JSON files are in `public/data/`

### Issue: Deployment fails

**Cause:** Build errors or configuration issues.

**Solution:**
1. Check Actions tab for error details
2. Test build locally: `npm run build`
3. Fix any TypeScript errors
4. Commit and push fixes

## Performance Optimization

Already implemented:
- Static site generation
- Code splitting
- Asset optimization
- Lazy loading where appropriate

## SEO Optimization

Update in `index.html`:
- Title
- Meta descriptions
- Open Graph tags

Create `public/sitemap.xml` with your actual URLs.

## Custom Domain (Optional)

1. Buy domain from registrar
2. Add `CNAME` file to `public/`:
   ```
   yourdomain.com
   ```
3. Configure DNS at your registrar:
   - Type: `CNAME`
   - Name: `www` or `@`
   - Value: `YOUR-USERNAME.github.io`
4. Enable HTTPS in GitHub Pages settings

## Monitoring

### GitHub Actions
- Check Actions tab for deployment status
- Set up notifications for failed workflows

### Analytics (Optional)
If you add analytics later, update:
- `PRIVACY.md`
- Privacy page
- Methodology page

## Backup

The git repository is your backup. To create additional backup:

```bash
git clone --mirror https://github.com/YOUR-USERNAME/duterteph.git
```

## Rollback

If you need to revert a deployment:

```bash
git revert HEAD
git push
```

Or reset to specific commit:

```bash
git reset --hard COMMIT_HASH
git push --force
```

⚠️ **Warning:** `--force` should be used carefully

## Security

- Never commit API keys or tokens
- Review all PRs carefully before merging
- Keep dependencies updated: `npm audit`
- Use environment variables for sensitive data (n8n)

## Maintenance

### Regular Tasks

- Update dependencies: `npm update`
- Check for broken external links
- Verify sources are still accessible
- Review and update content accuracy

### Monthly Review

- Check GitHub Actions for failed runs
- Review any open issues
- Update stale information
- Verify all external links

## Support

- **GitHub Issues:** Report bugs or request features
- **GitHub Discussions:** Ask questions
- **GitHub Wiki:** Additional documentation (if created)

## License

This is an informational project. Source code is provided as-is for educational purposes.
