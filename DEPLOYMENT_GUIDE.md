# GitHub Pages Deployment Guide

## 🚀 Your Portfolio is Ready for Deployment!

I've prepared everything for you to deploy to GitHub Pages. Follow these steps:

---

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository with the name: **portfolio** (or any name you prefer)
3. **IMPORTANT:**
   - Do NOT initialize with README (we already have one)
   - Keep it public for GitHub Pages to work for free
   - Do NOT add .gitignore or license (already configured)

---

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push your code
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/dewanshmishra/portfolio.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
5. That's it! The workflow will automatically deploy

---

## Step 4: Update Base Path (If Needed)

If your repository name is NOT "portfolio", update this file:

**File:** `next.config.js`
```javascript
// Change this line to match your repo name
basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
```

**Example:** If your repo is "dewansh-portfolio":
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/dewansh-portfolio' : '',
```

Then commit and push the change:
```bash
git add next.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

---

## 📍 Your Portfolio URL

After deployment (takes 2-3 minutes), your portfolio will be live at:

```
https://YOUR_USERNAME.github.io/portfolio/
```

**Example:**
```
https://dewanshmishra.github.io/portfolio/
```

---

## 🔄 Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your portfolio
2. Deploy to GitHub Pages
3. Update your live site

You can see the deployment status in the **Actions** tab of your repository.

---

## 🛠️ Manual Build (Testing Locally)

To test the static export locally:

```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# You can serve it locally with:
npx serve out
```

---

## ✅ What's Configured

- ✅ Static export enabled (`output: 'export'`)
- ✅ Image optimization disabled (required for static export)
- ✅ Base path configured for GitHub Pages
- ✅ GitHub Actions workflow for automatic deployment
- ✅ .nojekyll file to prevent Jekyll processing
- ✅ All dependencies installed
- ✅ Production build tested and working

---

## 🎨 Customization

### Update Personal Information

Edit `src/data/index.ts`:
- About section
- Skills
- Projects
- Experience
- Certifications
- Social links

### Update Styles

Edit `src/app/globals.css` for global styles and theme colors.

---

## 🚨 Troubleshooting

### Issue: 404 Error After Deployment
**Solution:** Make sure the base path in `next.config.js` matches your repository name.

### Issue: Images Not Loading
**Solution:** Images are configured with `unoptimized: true` for static export. Make sure image paths are correct.

### Issue: Deployment Failed
**Solution:** Check the Actions tab in GitHub to see the error. Usually it's a dependency or build error.

---

## 📊 Check Deployment Status

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You'll see the deployment workflow running
4. Click on it to see detailed logs
5. Once complete, visit your URL!

---

## 🎉 Next Steps

1. Push your code to GitHub
2. Enable GitHub Pages
3. Wait 2-3 minutes
4. Visit your live portfolio!
5. Share it with the world! 🌍

---

**Need help?** Check the Actions tab for deployment logs or create an issue in your repository.

**Your portfolio features:**
- 🎨 Modern UI with glassmorphism
- 🎭 10+ 3D animations
- 📱 Fully responsive
- ⚡ Optimized performance
- 🔒 Production ready
- 🚀 Auto-deploy on push

Good luck! 🎊
