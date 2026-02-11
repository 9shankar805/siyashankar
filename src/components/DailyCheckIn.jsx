import { useState, useEffect } from 'react'

const DailyCheckIn = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [checkIns, setCheckIns] = useState({ morning: null, evening: null })
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('dailyCheckIns')
    const savedStreak = localStorage.getItem('checkInStreak')
    if (saved) setCheckIns(JSON.parse(saved))
    if (savedStreak) setStreak(parseInt(savedStreak))
  }, [])

  const checkIn = (type) => {
    const today = new Date().toDateString()
    const updated = { ...checkIns, [type]: today }
    setCheckIns(updated)
    localStorage.setItem('dailyCheckIns', JSON.stringify(updated))
    
    if (updated.morning === today && updated.evening === today) {
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('checkInStreak', newStreak.toString())
    }
  }

  const today = new Date().toDateString()
  const morningDone = checkIns.morning === today
  const eveningDone = checkIns.evening === today

  return (
    <div className="daily-checkin">
      <button className="checkin-toggle" onClick={() => setShowPanel(!showPanel)}>
        ☀️ Check-In
      </button>

      {showPanel && (
        <div className="checkin-panel">
          <h3>Daily Check-In ☀️🌙</h3>
          
          <div className="streak-display">
            <span className="streak-icon">🔥</span>
            <div>
              <div className="streak-number">{streak}</div>
              <div className="streak-label">Day Streak</div>
            </div>
          </div>

          <div className="checkin-buttons">
            <button 
              className={`checkin-btn morning ${morningDone ? 'done' : ''}`}
              onClick={() => !morningDone && checkIn('morning')}
              disabled={morningDone}
            >
              <span className="btn-icon">☀️</span>
              <span className="btn-text">Good Morning</span>
              {morningDone && <span className="check-mark">✓</span>}
            </button>

            <button 
              className={`checkin-btn evening ${eveningDone ? 'done' : ''}`}
              onClick={() => !eveningDone && checkIn('evening')}
              disabled={eveningDone}
            >
              <span className="btn-icon">🌙</span>
              <span className="btn-text">Good Night</span>
              {eveningDone && <span className="check-mark">✓</span>}
            </button>
          </div>

          <div className="checkin-status">
            {morningDone && eveningDone ? (
              <p className="status-complete">✨ Both check-ins complete today!</p>
            ) : (
              <p className="status-pending">Complete both check-ins to maintain your streak</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyCheckIn
