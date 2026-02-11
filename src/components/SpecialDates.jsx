import { useState, useEffect } from 'react'

const specialDates = [
  { name: "Our Anniversary", date: "2018-01-27", emoji: "💕" },
  { name: "Valentine's Day", date: "2025-02-14", emoji: "💝" },
  { name: "Your Birthday", date: "2025-06-15", emoji: "🎂" },
  { name: "My Birthday", date: "2025-08-20", emoji: "🎉" },
  { name: "Christmas", date: "2025-12-25", emoji: "🎄" }
]

const SpecialDates = () => {
  const [nextDate, setNextDate] = useState(null)

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let closest = null
    let minDiff = Infinity
    
    specialDates.forEach(special => {
      const [year, month, day] = special.date.split('-')
      let eventDate = new Date(today.getFullYear(), month - 1, day)
      
      if (eventDate < today) {
        eventDate = new Date(today.getFullYear() + 1, month - 1, day)
      }
      
      const diff = eventDate - today
      
      if (diff < minDiff) {
        minDiff = diff
        closest = { 
          ...special, 
          daysLeft: Math.ceil(diff / (1000 * 60 * 60 * 24)) 
        }
      }
    })
    
    setNextDate(closest)
  }, [])

  if (!nextDate) return null

  const daysText = nextDate.daysLeft === 0 ? "Today!" : 
                   nextDate.daysLeft === 1 ? "Tomorrow!" : 
                   `in ${nextDate.daysLeft} days`

  return (
    <div className={`special-date-reminder ${nextDate.daysLeft <= 7 ? 'urgent' : ''}`}>
      <span className="reminder-emoji">{nextDate.emoji}</span>
      <span className="reminder-text">{nextDate.name} {daysText}</span>
    </div>
  )
}

export default SpecialDates
