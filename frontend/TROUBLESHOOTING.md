# Railway Deployment Troubleshooting

## Common Build Errors and Solutions

### Error: "Could not determine how to build the app"

**Solution 1:** Make sure these files are in your ROOT directory (not in a subfolder):
- `package.json` ✅
- `server.js` ✅
- All `.html` files ✅

**Solution 2:** Delete `railway.json` and let Railway auto-detect:
```bash
# Remove railway.json if causing issues
rm railway.json
git add .
git commit -m "Remove railway.json"
git push
```

### Error: "nixpacks build failed" or "npm install failed"

**Solution:** Try using `package-lock.json`:
```bash
# In your project folder, run:
npm install
# This creates package-lock.json
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Error: "Script start.sh not found"

This means Railway can't find the start command.

**Solution:** Make sure `package.json` has the start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Error: "Module not found" or "Cannot find module 'express'"

**Solution:** Your dependencies aren't installing properly.

1. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

2. Make sure `package.json` is correct (already provided)

3. Try deploying again

### Error: "EADDRINUSE" or "Port already in use"

**Solution:** Make sure your `server.js` uses Railway's PORT:
```javascript
const PORT = process.env.PORT || 3000;
```
(This is already in the server.js I provided)

### Error: "Application failed to respond"

**Solution:** Your app might be crashing. Check Railway logs:

1. Go to Railway dashboard
2. Click on your deployment
3. Click "View Logs"
4. Look for error messages

Common fixes:
- Make sure all file paths are correct
- Check that `public` folder exists with css, js, images subfolders

## Step-by-Step: Clean Deployment

If nothing works, try this fresh start:

### 1. Verify Your File Structure

Your root directory should look like this:
```
your-project/
├── server.js
├── package.json
├── Procfile
├── .gitignore
├── index.html
├── contacts.html
├── requirements.html
├── loan-application.html
├── staff-login.html
├── staff-dashboard.html
├── staff-loans.html
├── staff-repayments.html
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── staff.css
│   │   └── loan-form.css
│   ├── js/
│   │   ├── contact.js
│   │   ├── loan-form.js
│   │   ├── staff-common.js
│   │   ├── staff-login.js
│   │   ├── staff-dashboard.js
│   │   ├── staff-loans.js
│   │   └── staff-repayments.js
│   └── images/
│       ├── LogoKumbi.png
│       └── 1771088539663_image.png
└── uploads/
    └── .gitkeep
```

### 2. Test Locally First

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open browser to http://localhost:3000
```

If it works locally, it should work on Railway.

### 3. Deploy Using Railway CLI (Recommended)

This often works better than GitHub deployment:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to new project
railway init

# Deploy
railway up

# Get the URL
railway domain
```

### 4. Alternative: Deploy as Static Site + Separate API

If the Node.js deployment keeps failing, you can:

**Option A: Use Vercel for frontend, Railway for backend**
- Deploy HTML/CSS/JS to Vercel (free, easy)
- Deploy just server.js to Railway
- Update API_URL in JS files to point to Railway

**Option B: Use Railway's static site feature**
- Simpler, but requires separating frontend/backend

## Still Having Issues?

### Share These Details:

1. **Exact error message from Railway logs**
2. **Screenshot of the error**
3. **Your file structure** (run `ls -la` in project root)
4. **Railway build logs** (copy the full output)

### Quick Fixes to Try:

**Fix 1: Simplify to minimal setup**
```bash
# Keep only these files:
- server.js
- package.json
- index.html
- public/ folder

# Remove:
- railway.json
- nixpacks.toml
- Procfile

# Let Railway auto-detect everything
```

**Fix 2: Use environment variable for start command**

In Railway dashboard:
1. Go to Settings
2. Add Start Command: `node server.js`
3. Redeploy

**Fix 3: Change Node version**

In `package.json`, try different Node versions:
```json
"engines": {
  "node": "20.x"
}
```

## Railway-Specific Tips

1. **Don't use localhost** - Railway needs `0.0.0.0`:
   ```javascript
   app.listen(PORT, '0.0.0.0', () => {
       console.log(`Server running on port ${PORT}`);
   });
   ```
   (Already fixed in provided server.js)

2. **Use environment variables** - Railway sets PORT automatically

3. **Check build vs deploy** - If build succeeds but deploy fails, it's a runtime error

4. **Watch the logs** - Railway shows real-time logs during deployment

## Contact Support

If all else fails:
- Railway Discord: https://discord.gg/railway
- Railway Twitter: @Railway
- Railway Docs: https://docs.railway.app

---

**Most Common Solution:** Delete all config files except `package.json` and `server.js`, then let Railway auto-detect everything.
