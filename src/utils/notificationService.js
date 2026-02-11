export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }
}

export const checkAnniversaryReminder = () => {
  const anniversaryDate = localStorage.getItem('anniversaryDate') || '2018-01-27'
  const start = new Date(anniversaryDate)
  const now = new Date()
  const next = new Date(now.getFullYear(), start.getMonth(), start.getDate())
  if (next < now) next.setFullYear(now.getFullYear() + 1)
  const days = Math.ceil((next - now) / (1000 * 60 * 60 * 24))

  if (days <= 7 && days > 0) {
    const lastNotified = localStorage.getItem('lastAnniversaryNotification')
    const today = new Date().toDateString()
    
    if (lastNotified !== today) {
      sendNotification('Anniversary Reminder 💕', {
        body: `Only ${days} day${days !== 1 ? 's' : ''} until your anniversary!`,
        tag: 'anniversary-reminder'
      })
      localStorage.setItem('lastAnniversaryNotification', today)
    }
  }
}

export const checkSpecialDates = () => {
  const specialDates = JSON.parse(localStorage.getItem('specialDates') || '[]')
  const today = new Date()
  
  specialDates.forEach(date => {
    const eventDate = new Date(date.date)
    const days = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
    
    if (days === 1 || days === 3 || days === 7) {
      const notifKey = `notif-${date.name}-${days}`
      if (!sessionStorage.getItem(notifKey)) {
        sendNotification(`Upcoming: ${date.name}`, {
          body: `${days} day${days !== 1 ? 's' : ''} until ${date.name}!`,
          tag: `special-date-${date.name}`
        })
        sessionStorage.setItem(notifKey, 'true')
      }
    }
  })
}

export const startNotificationService = () => {
  requestNotificationPermission().then(granted => {
    if (granted) {
      checkAnniversaryReminder()
      checkSpecialDates()
      
      setInterval(() => {
        checkAnniversaryReminder()
        checkSpecialDates()
      }, 3600000)
    }
  })
}
