import { useState, useEffect } from 'react'
import { requestNotificationPermission } from '../utils/notifications'

const NotificationPrompt = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if we should show the prompt
    const hasAsked = localStorage.getItem('notificationAsked')
    if (!hasAsked && 'Notification' in window && Notification.permission === 'default') {
      setTimeout(() => setShow(true), 3000) // Show after 3 seconds
    }
  }, [])

  const handleAllow = async () => {
    const granted = await requestNotificationPermission()
    localStorage.setItem('notificationAsked', 'true')
    setShow(false)
    if (granted) {
      const { showInAppNotification } = await import('../utils/notifications')
      showInAppNotification('Notifications Enabled! 🔔', 'You\'ll now receive updates', '✅')
    }
  }

  const handleDeny = () => {
    localStorage.setItem('notificationAsked', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="notification-prompt-overlay">
      <div className="notification-prompt">
        <div className="prompt-icon">🔔</div>
        <h3>Stay Connected</h3>
        <p>Get notified when your partner sends messages, posts, or hugs!</p>
        <div className="prompt-actions">
          <button className="allow-btn" onClick={handleAllow}>Allow Notifications</button>
          <button className="deny-btn" onClick={handleDeny}>Maybe Later</button>
        </div>
      </div>
    </div>
  )
}

export default NotificationPrompt
