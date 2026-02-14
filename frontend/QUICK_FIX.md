# 🚀 QUICK FIX - Railway Deployment

## If You're Getting Build Errors - Try This FIRST

### Option 1: Minimal Test Deploy (Recommended)

1. **Create a new folder** with ONLY these 2 files:

**File 1: `package.json`**
```json
{
  "name": "skycap-loans",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  },
  "engines": {
    "node": "18.x"
  }
}
```

**File 2: `server.js`**
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>✅ SUCCESS! Server is running</h1>');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port', PORT);
});
```

2. **Deploy to Railway:**
   - Push these 2 files to GitHub
   - Deploy from GitHub on Railway
   - If this works → Add the rest of your files one by one

### Option 2: Use Railway Template

Railway has Node.js templates. Try this:

1. Go to Railway.app
2. Click "New Project"
3. Select "Deploy a Template"
4. Choose "Express.js"
5. After it deploys, replace the files with yours

### Option 3: Manual Environment Setup

In Railway Dashboard:

1. Click on your project
2. Go to **Settings** → **Environment**
3. Add these variables:
   - `NODE_VERSION` = `18.20.0`
   - `NPM_VERSION` = `10.2.0`
4. Go to **Settings** → **Deploy**
5. Set **Start Command** to: `node server.js`
6. Redeploy

## Common Error Messages & Fixes

### "Could not determine how to build"
**Fix:** Add only `package.json` and `server.js` first. Railway will auto-detect Node.js.

### "npm ERR! code ENOENT"
**Fix:** Make sure `package.json` is in the ROOT of your repository, not in a subfolder.

### "Error: Cannot find module 'express'"
**Fix:** Delete `node_modules` folder before pushing to GitHub. Railway will install fresh.

### "Application failed to respond"
**Fix:** Change `app.listen(PORT)` to `app.listen(PORT, '0.0.0.0')`

### "EADDRINUSE: address already in use"
**Fix:** You're running it locally. Stop the local server before testing Railway deployment.

## What to Share if Still Broken

Copy the EXACT error from Railway and share:

1. **Build logs** (the first error you see)
2. **Deploy logs** (if build succeeds but deploy fails)
3. **Runtime logs** (if it crashes after starting)

To get logs:
1. Railway Dashboard → Your Project
2. Click "Deployments" tab
3. Click the failed deployment
4. Copy the entire log output

## Alternative: Use a Different Platform

If Railway keeps failing, try these (all have free tiers):

1. **Render.com** - Very similar to Railway, often easier
2. **Fly.io** - Good for Node.js apps
3. **Vercel** - Best for static sites + API routes
4. **Netlify** - Also good for static + serverless

For Render.com:
1. Create account at render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Deploy!

## File Checklist

Make sure your repository has:
- ✅ `package.json` (in root)
- ✅ `server.js` (in root)
- ✅ `.gitignore` (to exclude node_modules)
- ✅ All HTML files (in root)
- ✅ `public/` folder with css, js, images
- ❌ NO `node_modules` folder (Railway installs this)
- ❌ NO `package-lock.json` initially (let Railway create it)

## Quick Test Locally

Before deploying, test locally:

```bash
# In your project folder
npm install
npm start

# Open http://localhost:3000
# If it works locally, it WILL work on Railway
```

---

**Still stuck?** Share the error message and I'll help debug!
