# Quick Start Guide

Get your site live in 10 minutes.

## Step 1: Verify Local Build (2 minutes)

```bash
cd duterteph
npm install
npm run build
npm run preview
```

Open http://localhost:4173/duterteph/ and verify the site works.

## Step 2: Create GitHub Repository (2 minutes)

1. Go to https://github.com/new
2. Repository name: `duterteph`
3. **Keep it public** (required for free GitHub Pages)
4. **Do NOT** initialize with README
5. Click "Create repository"

## Step 3: Push to GitHub (2 minutes)

```bash
git init
git add .
git commit -m "Initial commit: Interactive ICC documentation site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/duterteph.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 4: Enable GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. That's it! No other configuration needed.

## Step 5: Wait for Deployment (2 minutes)

1. Go to **Actions** tab in your repository
2. Watch "Deploy to GitHub Pages" workflow
3. Wait for green checkmark ✅
4. Your site is now live!

## Your Site URL

```
https://YOUR-USERNAME.github.io/duterteph/
```

Replace `YOUR-USERNAME` with your GitHub username.

## Verify Deployment

Visit your site and test:
- ✅ Homepage loads
- ✅ Click "Explore Timeline"
- ✅ Press `/` or `Ctrl+K` to search
- ✅ Toggle dark mode (icon in header)
- ✅ Bookmark an item

## Next Steps

### Update Content

Edit files in `public/data/`:

```bash
# Edit the JSON files with real data
code public/data/timeline.json
code public/data/news.json

# Commit and push
git add public/data/
git commit -m "Update timeline with real events"
git push
```

Site rebuilds automatically in 2-3 minutes.

### Customize

**Change repository name?**

Edit `vite.config.ts`:
```typescript
base: '/your-new-name/',
```

Then rebuild and push.

**Add your own data?**

See `CONTRIBUTING.md` for data format guidelines.

**Set up automation?**

See `n8n/README.md` for news monitoring workflow.

## Troubleshooting

### Site shows 404

- Verify GitHub Pages is enabled
- Check Actions tab for deployment errors
- Wait a few minutes (first deployment can take 5 minutes)

### Assets not loading

- Check that `base` in `vite.config.ts` matches your repository name
- Verify all files committed and pushed

### Search not working

- Check browser console for errors
- Verify JSON files are in `public/data/`
- Check data files are valid JSON

## Common Commands

```bash
npm run dev          # Local development
npm run build        # Build for production
npm run preview      # Test production build
git push             # Deploy to GitHub Pages
```

## Support

- 📖 Full docs: `README.md`
- 🚀 Deployment: `DEPLOYMENT.md`
- 🤝 Contributing: `CONTRIBUTING.md`
- 📊 Project info: `PROJECT_SUMMARY.md`

## That's It!

Your interactive documentary-style website is now live and ready for content.

**Total time:** ~10 minutes  
**Total cost:** $0/month  
**Maintenance:** Update JSON files and push to Git

---

Need help? Open an issue on GitHub.
