import { useState, useEffect } from 'react'
import { requestNotificationPermission, startNotificationService } from '../utils/notificationService'

const NotificationSettings = () => {
  const [permission, setPermission] = useState('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      setEnabled(localStorage.getItem('notificationsEnabled') === 'true')
    }
  }, [])

  const handleEnable = async () => {
    const granted = await requestNotificationPermission()
    if (granted) {
      setPermission('granted')
      setEnabled(true)
      localStorage.setItem('notificationsEnabled', 'true')
      startNotificationService()
    }
  }

  const handleDisable = () => {
    setEnabled(false)
    localStorage.setItem('notificationsEnabled', 'false')
  }

  return (
    <div className="modern-feature-container">
      <div className="feature-header-modern">
        <div className="header-icon">🔔</div>
        <h2>Notifications</h2>
      </div>

      <div className="form-card-modern">
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#2d3748' }}>
            Background Notifications
          </h3>
          <p style={{ fontSize: '14px', color: '#718096', marginBottom: '16px' }}>
            Get reminders for anniversaries and special dates even when the app is closed
          </p>
        </div>

        {permission === 'denied' && (
          <div style={{ padding: '12px', background: '#fed7d7', borderRadius: '12px', marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', color: '#e53e3e', margin: 0 }}>
              ⚠️ Notifications are blocked. Please enable them in your browser settings.
            </p>
          </div>
        )}

        {permission === 'granted' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '15px', fontWeight: '500' }}>Enable Notifications</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => e.target.checked ? handleEnable() : handleDisable()}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            {enabled && (
              <div style={{ padding: '12px', background: '#c6f6d5', borderRadius: '12px' }}>
                <p style={{ fontSize: '14px', color: '#2f855a', margin: 0 }}>
                  ✓ Notifications are active! You'll receive reminders for important dates.
                </p>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-primary-modern" onClick={handleEnable} style={{ width: '100%' }}>
            Enable Notifications
          </button>
        )}
      </div>

      <div className="form-card-modern">
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#2d3748' }}>
          What you'll be notified about:
        </h3>
        <ul style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Anniversary reminders (7 days before)</li>
          <li>Special dates (1, 3, and 7 days before)</li>
          <li>Important milestones</li>
        </ul>
      </div>
    </div>
  )
}

export default NotificationSettings
