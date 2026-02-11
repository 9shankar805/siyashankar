import { useNotification } from '../contexts/NotificationContext'

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-icon">
            {notification.type === 'success' && '✓'}
            {notification.type === 'error' && '✕'}
            {notification.type === 'warning' && '⚠'}
            {notification.type === 'info' && 'ℹ'}
          </div>
          <div className="notification-message">{notification.message}</div>
        </div>
      ))}
    </div>
  )
}

export default NotificationContainer
