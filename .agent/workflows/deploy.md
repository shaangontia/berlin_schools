---
description: How to deploy the Berlin Schools app to Vercel
---

To deploy this application to Vercel, follow these steps:

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   // turbo
   ```bash
   vercel --prod
   ```
   Follow the interactive prompts to link your project.

### Option 2: Connect to GitHub (Recommended for CI/CD)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: initial commit of Berlin Schools app"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Link your GitHub account and select this repository.
   - Vercel will automatically detect the **Vite** framework and set the build command (`npm run build`) and output directory (`dist`).
   - Click **Deploy**.

### Manual Build Check
Before deploying, it's good to ensure the production build works locally:
```bash
npm run build
npm run preview
```
