import { useState, useEffect } from 'react'

const ValentineReminder = () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const valentineDate = new Date(new Date().getFullYear(), 1, 14) // Feb 14
    const today = new Date()
    const daysUntil = Math.ceil((valentineDate - today) / (1000 * 60 * 60 * 24))
    
    const dismissed = localStorage.getItem('valentineReminderDismissed')
    
    if (daysUntil > 0 && daysUntil <= 7 && !dismissed) {
      setShowPopup(true)
    }
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    localStorage.setItem('valentineReminderDismissed', 'true')
  }

  if (!showPopup) return null

  const valentineDate = new Date(new Date().getFullYear(), 1, 14)
  const today = new Date()
  const daysUntil = Math.ceil((valentineDate - today) / (1000 * 60 * 60 * 24))

  return (
    <div className="valentine-popup-overlay">
      <div className="valentine-popup">
        <button className="close-btn" onClick={handleClose}>✕</button>
        <div className="popup-icon">💝</div>
        <h2 className="popup-title">Valentine's Day Reminder</h2>
        <p className="popup-message">
          Only <strong>{daysUntil} day{daysUntil !== 1 ? 's' : ''}</strong> until Valentine's Day!
        </p>
        <p className="popup-subtitle">Make it special! 💕</p>
      </div>
    </div>
  )
}

export default ValentineReminder
