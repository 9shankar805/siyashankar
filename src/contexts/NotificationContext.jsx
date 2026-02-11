import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within NotificationProvider')
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const success = useCallback((message, duration) => addNotification(message, 'success', duration), [addNotification])
  const error = useCallback((message, duration) => addNotification(message, 'error', duration), [addNotification])
  const info = useCallback((message, duration) => addNotification(message, 'info', duration), [addNotification])
  const warning = useCallback((message, duration) => addNotification(message, 'warning', duration), [addNotification])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, success, error, info, warning }}>
      {children}
    </NotificationContext.Provider>
  )
}
