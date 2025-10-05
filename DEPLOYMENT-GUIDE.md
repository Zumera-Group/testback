# Zumera Website - Production Deployment Guide

## 📋 Current Status
- ✅ Local development working perfectly
- ✅ Production build successful (308 static pages generated)
- ✅ CircleCI configuration updated for `main` branch
- ✅ Sanity CMS connection verified

## 🚀 Deployment Requirements

### Environment Variables Needed for Heroku

You need to set these environment variables on **BOTH** Heroku apps:
- `zumera-frontend-staging`
- `zumera-frontend-prod`

#### Critical Variables (Required)
```bash
# Sanity CMS (CONFIRMED WORKING)
NEXT_PUBLIC_SANITY_PROJECT_ID=8r7hp46l
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2021-10-21
SANITY_API_VERSION=2021-10-21

# Salesforce Integration
NEXT_PUBLIC_SALESFORCE_API_BASE_URL=https://zumera-api.herokuapp.com/

# Application Base URL (different for each environment)
NEXT_PUBLIC_BASE_URL=https://staging.zumera.tech  # For staging
NEXT_PUBLIC_BASE_URL=https://www.zumera.com       # For production
```

#### Variables to Get from 1Password
```bash
# Sanity API Tokens
SANITY_API_TOKEN=<get-from-1password>
NEXT_PUBLIC_SANITY_API_TOKEN_PREVIEW=<get-from-1password>
SANITY_PREVIEW_SECRET=<get-from-1password>

# Salesforce
NEXT_PUBLIC_SALESFORCE_API_BEARER_TOKEN=<get-from-1password>

# Optional but Recommended
NEXT_PUBLIC_TAG_MANAGER_ID=<get-from-1password>
NEXT_PUBLIC_COOKIE_FIRST_KEY=<get-from-1password>
NEXT_PUBLIC_CALENDLY_LINK=<get-from-1password>
NEXT_PUBLIC_DOWNLOAD_REPORT_URL=<get-from-1password>
NEXT_PUBLIC_SAVE_FOR_LATER_API_URL=<get-from-1password>
```

## 📦 Deployment Steps

### Option A: Via CircleCI (Recommended)

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Update Sanity configuration and fix CircleCI for main branch"
   git push origin main
   ```

2. **Monitor CircleCI**
   - Go to CircleCI dashboard
   - Watch the build process
   - If successful, staging will be automatically deployed

3. **Approve Production Deployment**
   - After staging is verified working
   - Click "Approve" in CircleCI for production deployment

### Option B: Direct Heroku Deployment (If CircleCI Fails)

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku  # On macOS
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Add Heroku Remotes**
   ```bash
   git remote add staging https://git.heroku.com/zumera-frontend-staging.git
   git remote add production https://git.heroku.com/zumera-frontend-prod.git
   ```

4. **Set Environment Variables on Heroku**
   ```bash
   # For Staging
   heroku config:set NEXT_PUBLIC_SANITY_PROJECT_ID=8r7hp46l --app zumera-frontend-staging
   heroku config:set NEXT_PUBLIC_SANITY_DATASET=production --app zumera-frontend-staging
   heroku config:set NEXT_PUBLIC_BASE_URL=https://staging.zumera.tech --app zumera-frontend-staging
   # ... set all other variables

   # For Production
   heroku config:set NEXT_PUBLIC_SANITY_PROJECT_ID=8r7hp46l --app zumera-frontend-prod
   heroku config:set NEXT_PUBLIC_SANITY_DATASET=production --app zumera-frontend-prod
   heroku config:set NEXT_PUBLIC_BASE_URL=https://www.zumera.com --app zumera-frontend-prod
   # ... set all other variables
   ```

5. **Deploy to Staging**
   ```bash
   git push staging main:master
   ```

6. **Test Staging**
   - Visit https://staging.zumera.tech
   - Verify all features work

7. **Deploy to Production**
   ```bash
   git push production main:master
   ```

## ⚠️ Important Considerations

### Node Version
The project uses Node.js v21+. Heroku needs to be configured:

**Add to package.json if not already present:**
```json
"engines": {
  "node": "21.x"
}
```

### Build Configuration
The project already has a custom `server.js` for Heroku, which handles:
- SSL redirects
- Domain redirects
- Port configuration

### Memory Requirements
- The build process generates 308 static pages
- Ensure Heroku dynos have sufficient memory
- Consider using Performance-M dynos if build fails

## 🔍 Troubleshooting

### If Deployment Fails

1. **Check Heroku Logs**
   ```bash
   heroku logs --tail --app zumera-frontend-staging
   ```

2. **Common Issues & Solutions**

   **Issue:** Build fails with memory error
   **Solution:** Upgrade dyno size or add:
   ```json
   "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
   ```

   **Issue:** Sanity content not loading
   **Solution:** Verify environment variables are set correctly

   **Issue:** 500 errors on production
   **Solution:** Check that all required env vars are set

3. **Rollback if Needed**
   ```bash
   heroku rollback --app zumera-frontend-prod
   ```

## 📱 What You Need to Provide

To complete the deployment, please provide:

1. **Heroku Access** or **Heroku API Key**
2. **CircleCI Access** to monitor deployments
3. **Environment Variables from 1Password**:
   - Sanity API tokens
   - Salesforce bearer token
   - Analytics/tracking IDs
4. **Confirmation** of which dataset to use (currently using "production")

## ✅ Pre-Deployment Checklist

- [x] Local development working
- [x] Production build successful
- [x] CircleCI config updated for `main` branch
- [x] Sanity project ID configured (8r7hp46l)
- [x] Dataset confirmed (production)
- [ ] Heroku environment variables set
- [ ] API tokens from 1Password added
- [ ] Staging deployment tested
- [ ] Production deployment approved

## 🎯 Next Steps

1. **Set environment variables** on both Heroku apps
2. **Commit and push** to trigger deployment
3. **Monitor CircleCI** for build status
4. **Test staging** thoroughly
5. **Approve production** deployment

## 📞 Support

If you encounter issues:
1. Check the Heroku logs
2. Verify environment variables
3. Ensure CORS origins are configured in Sanity
4. Check CircleCI build logs

---

Last Updated: October 5, 2025
Status: Ready for deployment pending environment variables