import { useState, useEffect } from 'react'

const messages = [
  "Every moment with you is a treasure I hold close to my heart. 💖",
  "You make my world brighter just by being in it. ✨",
  "I fall in love with you more and more each day. 🌹",
  "You're the reason I believe in magic. 🌟",
  "My favorite place is wherever you are. 🏡",
  "You're not just my love, you're my best friend. 👫",
  "Thank you for being the amazing person you are. 🌺",
  "Your smile is my favorite view. 😊",
  "I'm so grateful the universe brought us together. 🌌",
  "You make ordinary days feel extraordinary. 🎨"
]

const DailyMessage = () => {
  const [message, setMessage] = useState('')
  const [opacity, setOpacity] = useState(0)

  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('loveStreak')) || 0)
  const [checkedIn, setCheckedIn] = useState(() => {
    const lastCheck = localStorage.getItem('lastCheckIn')
    return lastCheck === new Date().toDateString()
  })

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
    setMessage(messages[dayOfYear % messages.length])
    
    let op = 0
    const fadeIn = setInterval(() => {
      if (op >= 1) {
        clearInterval(fadeIn)
      } else {
        op += 0.02
        setOpacity(op)
      }
    }, 30)

    return () => clearInterval(fadeIn)
  }, [])

  const handleCheckIn = (type) => {
    if (!checkedIn) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setCheckedIn(true)
      localStorage.setItem('loveStreak', newStreak)
      localStorage.setItem('lastCheckIn', new Date().toDateString())
    }
  }

  return (
    <div className="daily-message-container">
      <div className="daily-message-title">💝 Message of the Day 💝</div>
      <div className="daily-message" style={{ opacity }}>{message}</div>
      
      <div className="check-in-section" style={{ marginTop: '20px' }}>
        <div className="streak-count">🔥 Love Streak: {streak} days</div>
        {!checkedIn ? (
          <div className="check-in-buttons">
            <button onClick={() => handleCheckIn('morning')}>☀️ Good Morning</button>
            <button onClick={() => handleCheckIn('night')}>🌙 Good Night</button>
          </div>
        ) : (
          <div className="checked-in-msg">✅ Checked in for today!</div>
        )}
      </div>

      <style jsx>{`
        .check-in-section {
          text-align: center;
          background: rgba(0,0,0,0.3);
          padding: 15px;
          border-radius: 15px;
          backdrop-filter: blur(5px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .streak-count {
          color: #ff6b6b;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: 'Courier New', monospace;
        }
        .check-in-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .check-in-buttons button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--theme-primary);
          color: white;
          padding: 8px 15px;
          margin: 0 5px;
          border-radius: 20px;
          cursor: pointer;
          transition: 0.3s;
        }
        .check-in-buttons button:hover {
          background: var(--theme-primary);
        }
        .checked-in-msg {
          color: #4CAF50;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default DailyMessage
