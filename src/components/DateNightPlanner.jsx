import { useState, useEffect } from 'react'

const DateNightPlanner = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [dates, setDates] = useState([])
  const [newDate, setNewDate] = useState({ title: '', date: '', time: '', location: '', type: '' })

  const dateIdeas = [
    '🍽️ Dinner Date', '🎬 Movie Night', '🎨 Art Gallery', '🏞️ Picnic',
    '🎮 Game Night', '🍕 Pizza Making', '⭐ Stargazing', '🎭 Theater',
    '🚶 Walk in Park', '☕ Coffee Date', '🎤 Karaoke', '🏖️ Beach Day'
  ]

  useEffect(() => {
    const saved = localStorage.getItem('dateNights')
    if (saved) setDates(JSON.parse(saved))
  }, [])

  const addDate = (e) => {
    e.preventDefault()
    if (newDate.title && newDate.date) {
      const date = { ...newDate, id: Date.now(), completed: false }
      const updated = [...dates, date]
      setDates(updated)
      localStorage.setItem('dateNights', JSON.stringify(updated))
      setNewDate({ title: '', date: '', time: '', location: '', type: '' })
    }
  }

  const toggleComplete = (id) => {
    const updated = dates.map(d => d.id === id ? { ...d, completed: !d.completed } : d)
    setDates(updated)
    localStorage.setItem('dateNights', JSON.stringify(updated))
  }

  const deleteDate = (id) => {
    const updated = dates.filter(d => d.id !== id)
    setDates(updated)
    localStorage.setItem('dateNights', JSON.stringify(updated))
  }

  return (
    <div className="date-night">
      <button className="datenight-toggle" onClick={() => setShowPanel(!showPanel)}>
        💑 Date Night
      </button>

      {showPanel && (
        <div className="datenight-panel">
          <h3>Date Night Planner 💑</h3>

          <div className="date-ideas">
            <h4>Quick Ideas</h4>
            <div className="ideas-grid">
              {dateIdeas.map((idea, i) => (
                <button 
                  key={i}
                  className="idea-btn"
                  onClick={() => setNewDate({ ...newDate, title: idea })}
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={addDate} className="date-form">
            <input
              type="text"
              placeholder="Date title..."
              value={newDate.title}
              onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
              required
            />
            <div className="form-row">
              <input
                type="date"
                value={newDate.date}
                onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                required
              />
              <input
                type="time"
                value={newDate.time}
                onChange={(e) => setNewDate({ ...newDate, time: e.target.value })}
              />
            </div>
            <input
              type="text"
              placeholder="Location..."
              value={newDate.location}
              onChange={(e) => setNewDate({ ...newDate, location: e.target.value })}
            />
            <button type="submit">Plan Date</button>
          </form>

          <div className="dates-list">
            <h4>Planned Dates</h4>
            {dates.filter(d => !d.completed).map(date => (
              <div key={date.id} className="date-item">
                <div className="date-info">
                  <div className="date-title">{date.title}</div>
                  <div className="date-details">
                    📅 {new Date(date.date).toLocaleDateString()}
                    {date.time && ` at ${date.time}`}
                    {date.location && ` • 📍 ${date.location}`}
                  </div>
                </div>
                <div className="date-actions">
                  <button onClick={() => toggleComplete(date.id)}>✓</button>
                  <button onClick={() => deleteDate(date.id)}>×</button>
                </div>
              </div>
            ))}
          </div>

          {dates.filter(d => d.completed).length > 0 && (
            <div className="completed-dates">
              <h4>Completed Dates ✓</h4>
              {dates.filter(d => d.completed).map(date => (
                <div key={date.id} className="date-item completed">
                  <div className="date-info">
                    <div className="date-title">{date.title}</div>
                    <div className="date-details">
                      {new Date(date.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DateNightPlanner
