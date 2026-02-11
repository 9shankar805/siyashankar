# 🚀 Deployment Guide

## Prerequisites
- GitHub account
- Firebase account
- Cloudinary account (optional)

---

## 📤 Push to GitHub

### 1. Initialize Git
```bash
cd siyashankar-main
git init
git add .
git commit -m "Initial commit: Complete love website with Firebase"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `siyashankar`
3. Description: "Advanced React love website with Firebase"
4. Public or Private
5. Don't initialize with README (we have one)
6. Create repository

### 3. Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/siyashankar.git
git branch -M main
git push -u origin main
```

---

## 🔥 Deploy Firebase

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login
```bash
firebase login
```

### 3. Initialize Project
```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Functions
- ✅ Hosting

### 4. Deploy
```bash
# Deploy everything
firebase deploy

# Or deploy individually
firebase deploy --only firestore
firebase deploy --only functions
firebase deploy --only hosting
```

---

## 🌐 Deploy to Netlify

### Option 1: Netlify CLI
```bash
# Install
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 2: GitHub Integration
1. Go to https://app.netlify.com
2. New site from Git
3. Connect GitHub
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy site

### Environment Variables (Netlify)
Add in Site settings > Environment variables:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

---

## ▲ Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: GitHub Integration
1. Go to https://vercel.com
2. Import Git Repository
3. Select repository
4. Framework: Vite
5. Deploy

---

## 📱 PWA Setup

### 1. Generate Icons
Use https://realfavicongenerator.net/
- Upload logo
- Generate all sizes
- Download and place in `public/`

### 2. Update manifest.json
```json
{
  "name": "SikhaShankar Love",
  "short_name": "SikhaShankar",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff"
}
```

---

## 🔔 FCM Setup

### 1. Get VAPID Key
```bash
firebase login
firebase projects:list
firebase apps:sdkconfig web
```

### 2. Update Code
Replace in `src/firebase.js`:
```javascript
vapidKey: 'YOUR_VAPID_KEY'
```

### 3. Deploy Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### 4. Update Function URL
Get URL from Firebase Console > Functions
Update in `src/utils/fcmNotifications.js`

---

## 🎨 Custom Domain

### Netlify
1. Domain settings
2. Add custom domain
3. Configure DNS

### Vercel
1. Project settings > Domains
2. Add domain
3. Configure DNS

### Firebase Hosting
```bash
firebase hosting:channel:deploy production
```

---

## 📊 Analytics

### Google Analytics
1. Create GA4 property
2. Get Measurement ID
3. Add to `src/firebase.js`

### Firebase Analytics
Already enabled in Firebase config

---

## 🔒 Security

### Firestore Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{userId}/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /posts/{userId}/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /fcmTokens/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Environment Variables
Never commit:
- Firebase API keys
- Cloudinary credentials
- Function URLs

Use `.env` files and add to `.gitignore`

---

## ✅ Pre-Deployment Checklist

- [ ] Update Firebase config
- [ ] Add Cloudinary credentials
- [ ] Set up FCM VAPID key
- [ ] Deploy Cloud Functions
- [ ] Test all features
- [ ] Update passwords
- [ ] Add custom photos
- [ ] Configure Firestore rules
- [ ] Set up custom domain
- [ ] Enable analytics
- [ ] Test on mobile
- [ ] Test notifications
- [ ] Backup database

---

## 🐛 Common Issues

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Deploy Fails
```bash
firebase logout
firebase login
firebase use --add
```

### Notifications Not Working
- Check VAPID key
- Verify service worker
- Check browser permissions
- Deploy Cloud Functions

---

## 📈 Monitoring

### Firebase Console
- Firestore usage
- Function logs
- Analytics
- Performance

### Netlify/Vercel
- Build logs
- Deploy history
- Analytics
- Error tracking

---

## 🔄 Updates

### Update Dependencies
```bash
npm update
npm audit fix
```

### Redeploy
```bash
git add .
git commit -m "Update: description"
git push origin main
```

Auto-deploys on Netlify/Vercel if connected to GitHub

---

**Deployment complete! Your love website is live! 💕🚀**
