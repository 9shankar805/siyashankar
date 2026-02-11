import { saveToCollection } from '../firebaseService'

// Show browser notification
export const showNotification = (title, body, icon = '💕') => {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications')
    return
  }

  // Request permission if needed
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'love-notification',
      requireInteraction: false
    })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' })
      }
    })
  }

  // Show in-app notification
  showInAppNotification(title, body, icon)
}

// Show in-app notification toast
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

// Save notification to Firebase
export const saveNotification = async (type, message, from) => {
  await saveToCollection('notifications', {
    type,
    message,
    from,
    read: false
  })
}

// Notification triggers
export const notifyNewMessage = (from, preview) => {
  showNotification(
    `💬 New Message from ${from}`,
    preview,
    '💬'
  )
  saveNotification('message', preview, from)
}

export const notifyNewPost = (from, preview) => {
  showNotification(
    `📸 ${from} posted something`,
    preview,
    '📸'
  )
  saveNotification('post', preview, from)
}

export const notifyHugReceived = (from) => {
  showNotification(
    `🤗 Virtual Hug from ${from}`,
    `${from} sent you a warm hug!`,
    '🤗'
  )
  saveNotification('hug', 'Sent you a hug', from)
  
  // Vibrate if supported
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200])
  }
}

export const notifyNewLoveLetter = (from) => {
  showNotification(
    `💌 Love Letter from ${from}`,
    `${from} wrote you a love letter!`,
    '💌'
  )
  saveNotification('letter', 'Wrote you a love letter', from)
}

export const notifyMoodUpdate = (from, mood) => {
  showNotification(
    `😊 ${from}'s Mood`,
    `${from} is feeling ${mood}`,
    mood
  )
}

export const notifyGoalCompleted = (goal) => {
  showNotification(
    `🎯 Goal Completed!`,
    `"${goal}" has been completed!`,
    '🎉'
  )
}

export const notifyNewMemory = (from, title) => {
  showNotification(
    `📸 New Memory from ${from}`,
    title,
    '📸'
  )
  saveNotification('memory', title, from)
}

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return Notification.permission === 'granted'
}
