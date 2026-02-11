import { useState, useEffect } from 'react'

const BirthdayMode = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [birthdayDate, setBirthdayDate] = useState('')
  const [partnerBirthday, setPartnerBirthday] = useState('')
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('birthdayDates')
    if (saved) {
      const dates = JSON.parse(saved)
      setBirthdayDate(dates.mine || '')
      setPartnerBirthday(dates.partner || '')
      checkBirthday(dates)
    }
  }, [])

  const checkBirthday = (dates) => {
    const today = new Date()
    const todayStr = `${today.getMonth() + 1}-${today.getDate()}`
    
    if (dates.mine) {
      const myBday = new Date(dates.mine)
      const myBdayStr = `${myBday.getMonth() + 1}-${myBday.getDate()}`
      if (todayStr === myBdayStr) setIsBirthday(true)
    }
    
    if (dates.partner) {
      const partnerBday = new Date(dates.partner)
      const partnerBdayStr = `${partnerBday.getMonth() + 1}-${partnerBday.getDate()}`
      if (todayStr === partnerBdayStr) setIsBirthday(true)
    }
  }

  const saveDates = () => {
    const dates = { mine: birthdayDate, partner: partnerBirthday }
    localStorage.setItem('birthdayDates', JSON.stringify(dates))
    checkBirthday(dates)
  }

  const getDaysUntil = (date) => {
    if (!date) return null
    const today = new Date()
    const bday = new Date(date)
    bday.setFullYear(today.getFullYear())
    if (bday < today) bday.setFullYear(today.getFullYear() + 1)
    const days = Math.ceil((bday - today) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="birthday-mode">
      <button className="birthday-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎂 Birthday
      </button>

      {showPanel && (
        <div className="birthday-panel">
          <h3>Birthday Mode 🎂</h3>

          <div className="birthday-form">
            <label>Your Birthday</label>
            <input
              type="date"
              value={birthdayDate}
              onChange={(e) => setBirthdayDate(e.target.value)}
            />
            
            <label>Partner's Birthday</label>
            <input
              type="date"
              value={partnerBirthday}
              onChange={(e) => setPartnerBirthday(e.target.value)}
            />
            
            <button onClick={saveDates}>Save Dates</button>
          </div>

          {birthdayDate && (
            <div className="countdown-card">
              <div className="countdown-emoji">🎉</div>
              <div className="countdown-text">Your Birthday</div>
              <div className="countdown-days">{getDaysUntil(birthdayDate)} days</div>
            </div>
          )}

          {partnerBirthday && (
            <div className="countdown-card">
              <div className="countdown-emoji">💝</div>
              <div className="countdown-text">Partner's Birthday</div>
              <div className="countdown-days">{getDaysUntil(partnerBirthday)} days</div>
            </div>
          )}
        </div>
      )}

      {isBirthday && (
        <div className="birthday-celebration">
          <div className="celebration-content">
            <h2>🎉 Happy Birthday! 🎂</h2>
            <p>Wishing you the most amazing day!</p>
            <div className="balloons">🎈🎈🎈</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BirthdayMode
