// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqwLqHY19lixSJA_dWozQji7WycN06BWQ",
  authDomain: "siyashankar-727cf.firebaseapp.com",
  databaseURL: "https://siyashankar-727cf-default-rtdb.firebaseio.com",
  projectId: "siyashankar-727cf",
  storageBucket: "siyashankar-727cf.firebasestorage.app",
  messagingSenderId: "1089647811906",
  appId: "1:1089647811906:web:83f4e7955c0578555a7cdb",
  measurementId: "G-LJ89DR9FKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Messaging
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

// Request FCM token
export const requestFCMToken = async () => {
  try {
    if (!messaging) return null;
    const token = await getToken(messaging, {
      vapidKey: 'BDDJ9Xfn3lVuwAVh3Yp8kxI7CQNh7nAXzycnkIiHJKASkhpzvJoZ3MfkxBh4MKcAQQmm4PugQUl048_ZAUGH1m0' // Replace with your VAPID key from Firebase Console
    });
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Listen for foreground messages
export const onForegroundMessage = (callback) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log('Foreground message:', payload);
    callback(payload);
  });
};

export default app;
