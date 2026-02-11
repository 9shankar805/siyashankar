import { requestFCMToken, onForegroundMessage } from '../firebase'
import { saveFCMToken, getPartnerFCMToken } from '../firebaseService'

// Initialize FCM
export const initializeFCM = async () => {
  try {
    // Register service worker
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
      console.log('Service Worker registered:', registration)
    }

    // Request notification permission
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      // Get FCM token
      const token = await requestFCMToken()
      if (token) {
        await saveFCMToken(token)
        console.log('FCM Token saved')
      }
    }

    // Listen for foreground messages
    onForegroundMessage((payload) => {
      showInAppNotification(
        payload.notification.title,
        payload.notification.body,
        payload.data?.icon || '💕'
      )
    })
  } catch (error) {
    console.error('FCM initialization error:', error)
  }
}

// Send FCM notification via Cloud Function
export const sendFCMNotification = async (title, body, icon, type) => {
  try {
    const tokens = await getPartnerFCMToken()
    if (tokens.length === 0) return

    // Call your Cloud Function to send notification
    const response = await fetch('https://us-central1-siyashankar-727cf.cloudfunctions.net/sendNotification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokens,
        notification: { title, body },
        data: { icon, type }
      })
    })

    return response.ok
  } catch (error) {
    console.error('Error sending FCM:', error)
    return false
  }
}

// Show in-app notification
export const showInAppNotification = (title, body, icon = '💕') => {
  const notification = document.createElement('div')
  notification.className = 'in-app-notification'
  notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-body">${body}</div>
    </div>
  `
  
  document.body.appendChild(notification)
  setTimeout(() => notification.classList.add('show'), 100)
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => notification.remove(), 300)
  }, 4000)
}

// Notification triggers with FCM
export const notifyNewMessage = async (from, preview) => {
  await sendFCMNotification(
    `💬 New Message from ${from}`,
    preview,
    '💬',
    'message'
  )
}

export const notifyNewPost = async (from, preview) => {
  await sendFCMNotification(
    `📸 ${from} posted something`,
    preview,
    '📸',
    'post'
  )
}

export const notifyHugReceived = async (from) => {
  await sendFCMNotification(
    `🤗 Virtual Hug from ${from}`,
    `${from} sent you a warm hug!`,
    '🤗',
    'hug'
  )
}

export const notifyNewMemory = async (from, title) => {
  await sendFCMNotification(
    `📸 New Memory from ${from}`,
    title,
    '📸',
    'memory'
  )
}
