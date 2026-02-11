# 🔔 Firebase Cloud Messaging (FCM) Setup

## ✅ What's Implemented

- Background push notifications
- Foreground notifications
- Service worker for offline support
- Cloud Functions for automatic triggers
- Token management in Firestore

## 🚀 Setup Steps

### 1. Enable Firebase Cloud Messaging

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `siyashankar-727cf`
3. Go to **Project Settings** > **Cloud Messaging**
4. Copy your **Server Key** and **Sender ID**

### 2. Generate VAPID Key

1. In Firebase Console, go to **Cloud Messaging** tab
2. Scroll to **Web Push certificates**
3. Click **Generate key pair**
4. Copy the VAPID key
5. Replace in `src/firebase.js`:
   ```javascript
   vapidKey: 'YOUR_VAPID_KEY_HERE'
   ```

### 3. Deploy Cloud Functions

```bash
cd functions
npm install
npm install firebase-functions firebase-admin
firebase deploy --only functions
```

### 4. Update Cloud Function URL

In `src/utils/fcmNotifications.js`, replace:
```javascript
const response = await fetch('https://YOUR_CLOUD_FUNCTION_URL/sendNotification', {
```

With your actual Cloud Function URL from Firebase Console.

### 5. Test Notifications

```bash
npm run dev
```

1. Login to the app
2. Allow notifications when prompted
3. Open in two different browsers (or devices)
4. Send a message from one - notification appears on the other!

## 📱 How It Works

### Foreground (App Open)
- In-app toast notifications
- Real-time updates

### Background (App Closed)
- Push notifications via FCM
- Service worker handles messages
- Click notification to open app

## 🔥 Automatic Triggers

Cloud Functions automatically send notifications when:
- ✅ New message sent
- ✅ New post created
- ✅ Virtual hug sent
- ✅ New memory added

## 🧪 Testing

### Test FCM Token
```javascript
// In browser console
import { requestFCMToken } from './src/firebase'
const token = await requestFCMToken()
console.log('FCM Token:', token)
```

### Manual Test Notification
Use Firebase Console > Cloud Messaging > Send test message

## 📊 Monitor

- Firebase Console > Cloud Messaging > Reports
- See delivery rates, open rates
- Debug failed notifications

## 🔐 Security

- Tokens stored in Firestore
- Only partner receives notifications
- HTTPS Cloud Functions
- CORS enabled

## 💡 Notes

- Notifications work on Chrome, Firefox, Edge
- iOS Safari requires PWA installation
- Service worker must be HTTPS (or localhost)
- Token refreshes automatically

---

**All set! Background notifications are ready! 🔔💕**
