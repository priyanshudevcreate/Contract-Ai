# 🚀 Deploy ContractGPT to Vercel - Step by Step Guide

## Your GitHub Repository
✅ **Repository**: https://github.com/SVKarthikeyaKasyap/Contract-GPT.git  
✅ **Status**: Code successfully pushed with Vercel configuration

## Quick Deployment Steps

### 1. 🔗 Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Sign in with your GitHub account (`SVKarthikeyaKasyap`)
3. Click **"New Project"**
4. Find and select **"SVKarthikeyaKasyap/Contract-GPT"** repository
5. Click **"Import"**

### 2. ⚙️ Configure Project Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. 🔐 Set Environment Variables

Click **"Environment Variables"** and add these **REQUIRED** variables:

```bash
# JWT Configuration (CRITICAL!)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long-please-make-it-strong
JWT_EXPIRES_IN=7d

# Server Configuration
NODE_ENV=production

# File Upload
MAX_FILE_SIZE=10485760
```

**⚠️ IMPORTANT**: Generate a strong JWT_SECRET using a password generator (32+ characters)

### 4. 🚀 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at: `https://contract-gpt-[random].vercel.app`

### 5. 📝 Update Frontend URL

After first deployment:
1. Copy your Vercel app URL
2. Go back to Vercel dashboard → Project → Settings → Environment Variables
3. Add: `FRONTEND_URL=https://your-actual-vercel-url.vercel.app`
4. Redeploy if needed

## 🎯 What's Included in Your Deployment

### ✅ Frontend Features
- React + TypeScript + Vite application
- Modern UI with Tailwind CSS
- Responsive design
- User authentication
- File upload interface
- Dashboard with contract management

### ✅ Backend API (Serverless)
- User registration and login
- JWT authentication
- Profile management
- File upload handling
- Mock contract analysis (Python bot functionality will be added later)

### ✅ Security Features
- HTTPS by default
- CORS protection
- Helmet security headers
- Input validation
- Rate limiting ready

## 📋 API Endpoints Available

After deployment, your API will be available at:

```
GET  /api/health              # Health check
POST /api/auth/register       # User registration  
POST /api/auth/login          # User login
GET  /api/auth/profile        # Get user profile
POST /api/analyze             # Document analysis (mock)
```

## 🔧 Troubleshooting

### Build Fails?
- Check if all dependencies are in `package.json`
- Ensure environment variables are set
- View build logs in Vercel dashboard

### API Not Working?
- Verify environment variables are set correctly
- Check function logs in Vercel dashboard
- Ensure JWT_SECRET is set and strong

### CORS Issues?
- Make sure FRONTEND_URL matches your Vercel deployment URL
- Check browser developer tools for specific errors

## 🎨 Customization After Deployment

1. **Update Vite Config**: Change line 23 in `vite.config.ts`:
   ```typescript
   target: 'https://your-actual-vercel-url.vercel.app'
   ```

2. **Custom Domain**: Add your domain in Vercel dashboard → Domains

3. **Analytics**: Add Vercel Analytics in dashboard

## 🚨 Database Note

Currently using SQLite which resets on each deployment. For production:

1. **Recommended**: Set up MongoDB Atlas
2. Add `MONGODB_URI` environment variable
3. Data will persist across deployments

## 🐍 Python Bot Integration

The Python legal analysis bot needs separate deployment:

### Option 1: Deploy Python API separately
- Use Railway, Render, or Google Cloud Run
- Connect via HTTP API calls

### Option 2: Convert to Node.js
- Use OpenAI API directly in Node.js
- Replace mock analysis with real AI processing

## 📞 Support

If you encounter issues:
- Check Vercel documentation: https://vercel.com/docs
- GitHub repository: https://github.com/SVKarthikeyaKasyap/Contract-GPT
- Email: svkkasyap2006@gmail.com

---

## ✨ Next Steps After Deployment

1. **Test all functionality**
2. **Set up persistent database** (MongoDB Atlas recommended)
3. **Deploy Python bot separately** or convert to Node.js
4. **Add real OpenAI integration**
5. **Set up monitoring and error tracking**
6. **Consider custom domain**

**Your ContractGPT is ready to deploy! 🎉**