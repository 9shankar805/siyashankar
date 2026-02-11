# 📝 Changelog

## [2.0.0] - 2024-01-27

### 🎉 Major Features Added

#### 🔐 Authentication System
- Two-step login (Name → Password)
- Separate accounts for Shankar & Sikha
- Persistent sessions with localStorage
- Logout functionality

#### 💬 Real-time Messaging
- Firebase Firestore integration
- Message history (last 50 messages)
- Read receipts
- Sender names (Husband Shankar / Wife Sikha)
- Auto-scroll to latest message

#### 📸 Memories & Posts
- Facebook-style feed with Firebase sync
- Cloudinary image storage
- Photo albums (3 categories: Sikha's, Shankar's, Shared)
- Like, comment, share functionality
- Edit & delete posts
- Image upload with cloud storage
- Auto-delete from Cloudinary on post deletion

#### 📊 Stats & Tracking
- Mood tracker with Firebase sync
- Couple goals with progress tracking
- Virtual hug counter with Firebase
- All data synced to cloud

#### 🔔 Push Notifications
- Firebase Cloud Messaging (FCM) integration
- Background push notifications
- In-app toast notifications
- Auto-triggers on:
  - New messages
  - New posts
  - Virtual hugs
  - New memories
- Service worker for offline support
- Cloud Functions for automatic notifications

#### ✨ More Features with Firebase
- 💌 Love letter archive
- ⏰ Time capsule with unlock dates
- 😂 Inside jokes
- 🗓️ Future plans
- 🙏 Gratitude journal
- 🎁 Shared wishlist with priority
- All synced to Firebase

#### 🎨 UI Enhancements
- 🖼️ Background changer with:
  - 8 beautiful preset backgrounds
  - Upload custom images
  - Paste custom URLs
  - Persistent background selection
- Improved hamburger menu
- Better mobile responsiveness

### 🔥 Firebase Integration
- Complete Firestore database setup
- Cloud Functions deployed
- FCM for push notifications
- Real-time data sync
- Shared couple ID: `couple_sikha_shankar`

### ☁️ Cloud Storage
- Cloudinary integration for images
- Automatic upload on post/album creation
- Auto-delete on removal
- Upload preset: `mylife`

### 🛠️ Technical Improvements
- Custom React hooks for Firebase
- Generic Firebase collection handlers
- Token management for FCM
- Service worker for background notifications
- Better error handling
- Code optimization

### 📦 Dependencies Updated
- Firebase SDK 10.7.1
- React 18.2.0
- Vite 5.0.8
- Firebase Functions 4.9.0
- Firebase Admin 11.8.0

### 🐛 Bug Fixes
- Fixed message sender display
- Fixed background persistence
- Fixed Cloudinary upload errors
- Fixed notification permissions
- Fixed PowerShell deployment commands

### 📚 Documentation
- Complete README.md
- DEPLOYMENT.md guide
- FCM_SETUP.md for notifications
- GET_VAPID_KEY.md for FCM setup
- DEPLOY_POWERSHELL.md for Windows
- CREDENTIALS.md for login info
- CHANGELOG.md (this file)

### 🔒 Security
- Firestore security rules
- Environment variables support
- Token-based authentication
- Secure Cloud Functions

---

## [1.0.0] - Initial Release

### Features
- Basic countdown timer
- Daily messages
- Photo gallery
- Music player
- Theme switcher
- Virtual hug button
- Special dates tracker

---

**Full Changelog**: https://github.com/yourusername/siyashankar/compare/v1.0.0...v2.0.0
