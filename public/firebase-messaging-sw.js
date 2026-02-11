importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBqwLqHY19lixSJA_dWozQji7WycN06BWQ",
  authDomain: "siyashankar-727cf.firebaseapp.com",
  databaseURL: "https://siyashankar-727cf-default-rtdb.firebaseio.com",
  projectId: "siyashankar-727cf",
  storageBucket: "siyashankar-727cf.firebasestorage.app",
  messagingSenderId: "1089647811906",
  appId: "1:1089647811906:web:83f4e7955c0578555a7cdb",
  measurementId: "G-LJ89DR9FKR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'love-notification',
    requireInteraction: false,
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
