# Deployment Process

## 🎯 Purpose

This document guides you through deploying Habi Mate web app to production, from preparation to release.

## ⏱️ Time Estimate

**3-5 days** (including configuration and testing)

## 📋 Overview

**Deployment Steps**:
1. Choose hosting platform
2. Configure environment variables
3. Set up Firebase for production
4. Build optimization
5. Deploy to production
6. Domain setup (if custom domain)
7. Monitor and maintain

## 🌐 Step 1: Choose Hosting Platform

### 1.1 Platform Options

**Recommended: Vercel** (Next.js creators)
- Optimized for Next.js
- Automatic deployments
- Free tier available
- Easy setup

**Alternatives**:
- Netlify (similar to Vercel)
- AWS Amplify
- Firebase Hosting
- Custom server (not recommended for MVP)

### 1.2 Decision: Vercel (Recommended)

**Why Vercel**:
- Built by Next.js creators
- Automatic optimizations
- Edge functions support
- Easy environment variable management
- Preview deployments for branches

## 🔧 Step 2: Configure Environment Variables

### 2.1 Production Environment Variables

**In hosting platform (Vercel)**:

**Set these variables**:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important**:
- Use production Firebase project values
- Don't commit `.env.local` to git
- Set in hosting platform dashboard

### 2.2 Environment Separation

**Best Practice**:
- Development: `.env.local` (local)
- Staging: Environment variables in hosting platform
- Production: Environment variables in hosting platform

## 🔥 Step 3: Firebase Production Setup

### 3.1 Production Firebase Project

**Decision**: Same project or separate?

**Recommendations**:
- **Same project**: Simpler, good for MVP
- **Separate project**: Better for scaling, more secure

**For MVP**: Same project is fine (use environment variables to point to production)

### 3.2 Security Rules

**Update Firestore Rules**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      // Add rules for subcollections
    }
  }
}
```

**Update Storage Rules**:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3.3 Verify Firebase Services

**Check**:
- [ ] Authentication enabled
- [ ] Firestore enabled
- [ ] Storage enabled
- [ ] Security rules configured
- [ ] Authorized domains added (your production domain)

## 📦 Step 4: Build Optimization

### 4.1 Next.js Build Configuration

**Optimizations**:
- Enable image optimization
- Enable static optimization where possible
- Code splitting (automatic in Next.js)
- Bundle size optimization

**Check `next.config.js`**:
```javascript
module.exports = {
  // Optimize images
  images: {
    domains: ['your-image-domain.com'],
  },
  // Production optimizations
  reactStrictMode: true,
}
```

### 4.2 Build Process

**Steps**:
1. Run: `npm run build`
2. Check for errors
3. Review build output
4. Check bundle sizes
5. Fix any warnings

**Verify**:
- [ ] Build completes successfully
- [ ] No errors
- [ ] Bundle sizes reasonable
- [ ] Static pages generated where possible

## 🚀 Step 5: Deploy to Production

### 5.1 Vercel Deployment

**Steps**:
1. Push code to Git repository (GitHub, GitLab, Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `web-app` (if project in subfolder)
   - Environment Variables: Add all Firebase variables
6. Click "Deploy"
7. Wait for deployment (2-5 minutes)

### 5.2 Initial Deployment

**After first deployment**:
- Vercel provides a URL (e.g., `habimate.vercel.app`)
- Test the deployed app
- Verify all features work
- Check Firebase connections

### 5.3 Verify Deployment

**Check**:
- [ ] App loads correctly
- [ ] Authentication works
- [ ] Firestore reads/writes work
- [ ] Storage uploads work
- [ ] All pages accessible
- [ ] No console errors
- [ ] Performance acceptable

## 🌍 Step 6: Domain Setup (Optional)

### 6.1 Custom Domain

**If using custom domain**:
1. In Vercel dashboard, go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (24-48 hours)

### 6.2 SSL Certificate

**Vercel automatically**:
- Provides SSL certificate
- Enables HTTPS
- Handles certificate renewal

**Verify**:
- [ ] HTTPS enabled
- [ ] Certificate valid
- [ ] No mixed content warnings

## 📊 Step 7: Analytics and Monitoring

### 7.1 Set Up Analytics

**Options**:
- Vercel Analytics (built-in)
- Google Analytics
- Firebase Analytics
- Custom analytics

**For MVP**: Vercel Analytics or Firebase Analytics

### 7.2 Error Tracking

**Set up**:
- Sentry (recommended)
- Or Firebase Crashlytics (web)
- Or custom error logging

**Track**:
- JavaScript errors
- API errors
- User-reported issues

### 7.3 Monitor Post-Deployment

**Week 1**:
- Monitor error logs daily
- Check performance metrics
- Review user feedback
- Check for critical issues

**Ongoing**:
- Weekly review of metrics
- Monthly review of feedback
- Regular updates

## ✅ Step 8: Pre-Deployment Checklist

### 8.1 Technical Checklist

**Verify**:
- [ ] App builds without errors
- [ ] All dependencies included
- [ ] Environment variables configured
- [ ] Firebase project configured
- [ ] Security rules set
- [ ] No debug code
- [ ] Analytics configured (if using)
- [ ] Error tracking configured (if using)

### 8.2 Content Checklist

**Verify**:
- [ ] Privacy policy URL working
- [ ] Terms of service URL working
- [ ] All images/assets loading
- [ ] All links working

### 8.3 Legal/Compliance

**Verify**:
- [ ] Privacy policy complete and accurate
- [ ] Terms of service complete
- [ ] Health disclaimers present
- [ ] Data collection disclosed
- [ ] GDPR compliance (if applicable)

## 🎯 Step 9: Launch Strategy

### 9.1 Soft Launch

**Recommendation**: Soft launch first

**Steps**:
1. Deploy to production
2. Test with small user group
3. Monitor for issues
4. Fix any critical problems
5. Announce broader launch

### 9.2 Marketing Launch

**Coordinate**:
- Press release (if doing)
- Social media announcement
- Email to beta testers
- Website update
- Blog post

## 🐛 Step 10: Post-Deployment Monitoring

### 10.1 Immediate Monitoring

**First 24 hours**:
- Monitor error logs constantly
- Check performance metrics
- Review user feedback
- Fix critical issues immediately

### 10.2 Ongoing Monitoring

**Regular checks**:
- Daily: Error logs, performance
- Weekly: User metrics, feedback
- Monthly: Comprehensive review

### 10.3 Success Metrics

**Technical**:
- No critical crashes
- App stability > 99%
- Fast load times
- Low error rates

**Business**:
- Positive user feedback
- Good user retention
- Active users growing
- Plan accuracy validated

## 📚 Next Steps

After successful deployment:

**Maintenance**:
- Monitor app performance
- Respond to user feedback
- Plan future updates
- Fix bugs promptly

**Future Development**:
- Feature improvements based on feedback
- New features
- Performance optimizations
- Platform updates (Next.js, React)

## 🎉 Congratulations!

If you've reached this point:
- ✅ MVP is complete
- ✅ App is deployed to production
- ✅ Users can access and use Habi Mate
- ✅ Foundation for growth is set

**Next Phase**: Iterate based on user feedback and analytics!

---

**Remember**: Launch is just the beginning - continuous improvement is key! 🚀

