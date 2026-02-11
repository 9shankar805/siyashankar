# 💕 SikhaShankar - Advanced React Love Website

> A modern, feature-rich React application with Firebase backend for couples to stay connected

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features

### 🔐 Authentication
- Two-step login (Name + Password)
- Separate accounts for Shankar & Sikha
- Persistent sessions

### 💬 Real-time Messaging
- Firebase-powered chat
- Message history (last 50)
- Read receipts
- Emoji support
- Push notifications

### 📸 Memories & Posts
- Facebook-style feed
- Cloudinary image storage
- Photo albums (3 categories)
- Like, comment, share
- Edit & delete posts

### 📊 Stats & Tracking
- Mood tracker with history
- Couple goals with progress
- Relationship statistics
- Virtual hug counter

### 🔔 Notifications
- Browser push notifications (FCM)
- Background notifications
- In-app toast notifications
- Auto-triggers on activities

### ✨ More Features
- 💌 Love letter archive
- ⏰ Time capsule
- 😂 Inside jokes
- 🗓️ Future plans
- 🙏 Gratitude journal
- 🎁 Shared wishlist
- 🎵 Music player
- 🎨 5 romantic themes

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 14+
npm or yarn
Firebase account
Cloudinary account (optional)
```

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/siyashankar.git
cd siyashankar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

### Login Credentials
- **Shankar**: Name: `shankar`, Password: `sikhashankar`
- **Sikha**: Name: `sikha`, Password: `sikhashankar`

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: `siyashankar`
3. Enable Firestore Database
4. Enable Authentication (Anonymous)
5. Enable Cloud Messaging

### 2. Get Firebase Config
1. Project Settings > General
2. Copy your Firebase config
3. Replace in `src/firebase.js`

### 3. Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. Enable FCM
1. Project Settings > Cloud Messaging
2. Generate VAPID key
3. Add to `src/firebase.js`:
```javascript
vapidKey: 'YOUR_VAPID_KEY_HERE'
```

### 5. Deploy Cloud Functions
```bash
cd functions
npm install
firebase login
firebase deploy --only functions
```

---

## ☁️ Cloudinary Setup

### 1. Create Account
- Sign up at [Cloudinary](https://cloudinary.com)

### 2. Get Credentials
- Dashboard > Settings
- Copy Cloud Name, API Key, API Secret

### 3. Create Upload Preset
- Settings > Upload > Add upload preset
- Name: `mylife`
- Signing Mode: Unsigned

### 4. Update Code
Already configured in:
- `src/components/FacebookFeed.jsx`
- `src/components/Albums.jsx`

---

## 📁 Project Structure

```
siyashankar/
├── public/
│   ├── music/              # Audio files
│   ├── pic/                # Static images
│   └── firebase-messaging-sw.js
├── src/
│   ├── components/         # React components (40+)
│   ├── hooks/             # Custom hooks
│   ├── styles/            # CSS files
│   ├── utils/             # Utilities
│   ├── firebase.js        # Firebase config
│   ├── firebaseService.js # Firebase functions
│   ├── App.jsx            # Main app
│   └── main.jsx           # Entry point
├── functions/             # Cloud Functions
│   ├── index.js
│   └── package.json
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Firebase (Firestore, FCM, Functions)
- **Storage**: Cloudinary
- **Styling**: CSS3, Animations
- **State**: React Hooks, Context API

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to Firebase Hosting
```bash
firebase init hosting
firebase deploy --only hosting
```

---

## 🔔 Notifications Setup

### Browser Notifications
1. Allow notifications when prompted
2. Notifications work on Chrome, Firefox, Edge
3. iOS Safari requires PWA installation

### FCM Background Notifications
1. Service worker registered automatically
2. Works when app is closed
3. Cloud Functions trigger on activities

See [FCM_SETUP.md](FCM_SETUP.md) for details.

---

## 🎨 Customization

### Change Passwords
Edit `src/components/AuthPage.jsx`:
```javascript
const users = {
  shankar: 'YOUR_PASSWORD',
  sikha: 'YOUR_PASSWORD'
}
```

### Add Photos
Place in `public/pic/` and reference in components

### Change Themes
Edit `src/hooks/useTheme.js`

### Modify Messages
Edit `src/components/DailyMessage.jsx`

---

## 📊 Firebase Collections

```
Firestore Structure:
├── messages/
│   └── couple_sikha_shankar/
│       └── chats/
├── posts/
│   └── couple_sikha_shankar/
│       └── feed/
├── moods/
│   └── couple_sikha_shankar/
│       └── entries/
├── goals/
├── photos/
├── loveLetters/
├── gratitude/
├── wishlist/
├── timeCapsule/
├── insideJokes/
├── futurePlans/
└── fcmTokens/
```

---

## 🐛 Troubleshooting

### Port in use
Vite auto-selects another port

### Firebase errors
- Check Firebase config
- Verify Firestore rules
- Check API keys

### Images not uploading
- Verify Cloudinary credentials
- Check upload preset name
- Check CORS settings

### Notifications not working
- Allow browser permissions
- Check FCM VAPID key
- Deploy Cloud Functions

---

## 📝 Environment Variables

Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=mylife
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- React Team
- Firebase Team
- Cloudinary
- Vite Team

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@example.com

---

## 🎯 Roadmap

- [ ] Video messages
- [ ] Voice notes
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] AI-powered suggestions
- [ ] Multi-language support

---

**Made with ❤️ for Sikha & Shankar**

**Star ⭐ this repo if you like it!**
