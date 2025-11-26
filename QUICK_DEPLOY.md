# Quick Deploy Commands

## 🚀 Deploy to GitHub Pages in 3 Steps

### Step 1: Create Repository on GitHub
Go to: https://github.com/new
- Name: `portfolio` (or your preferred name)
- Public repository
- Don't initialize with README

### Step 2: Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Done! ✅

---

## 📍 Your Live URL
```
https://YOUR_USERNAME.github.io/portfolio/
```

---

## 🔄 Update After Changes
```bash
git add .
git commit -m "Update portfolio"
git push
```

Auto-deploys in 2-3 minutes! 🎉

---

## ⚠️ Important: Update Base Path

If your repo name is NOT "portfolio", edit `next.config.js`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
```

Then:
```bash
git add next.config.js
git commit -m "Update base path"
git push
```

---

**That's it!** Your portfolio will be live at:
`https://YOUR_USERNAME.github.io/portfolio/`
