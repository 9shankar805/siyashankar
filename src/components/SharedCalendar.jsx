import { useState, useEffect } from 'react'

const SharedCalendar = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'date' })
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    const saved = localStorage.getItem('sharedCalendar')
    if (saved) setEvents(JSON.parse(saved))
  }, [])

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents)
    localStorage.setItem('sharedCalendar', JSON.stringify(updatedEvents))
  }

  const addEvent = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.date) {
      const event = { ...newEvent, id: Date.now() }
      saveEvents([...events, event])
      setNewEvent({ title: '', date: '', time: '', type: 'date' })
    }
  }

  const deleteEvent = (id) => {
    saveEvents(events.filter(e => e.id !== id))
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const getEventsForDate = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const eventTypes = [
    { value: 'date', emoji: '💕', label: 'Date' },
    { value: 'anniversary', emoji: '🎉', label: 'Anniversary' },
    { value: 'trip', emoji: '✈️', label: 'Trip' },
    { value: 'reminder', emoji: '⏰', label: 'Reminder' },
    { value: 'other', emoji: '📌', label: 'Other' }
  ]

  return (
    <div className="shared-calendar">
      <button className="calendar-toggle" onClick={() => setShowPanel(!showPanel)}>
        📅 Calendar
      </button>

      {showPanel && (
        <div className="calendar-panel">
          <h3>Our Shared Calendar 📅</h3>

          {/* Add Event Form */}
          <form onSubmit={addEvent} className="event-form">
            <input
              type="text"
              placeholder="Event title..."
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <div className="form-row">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.emoji} {type.label}
                </option>
              ))}
            </select>
            <button type="submit" className="add-event-btn">Add Event</button>
          </form>

          {/* Calendar Navigation */}
          <div className="calendar-nav">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
              ←
            </button>
            <span className="month-name">{monthName}</span>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day empty"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dayEvents = getEventsForDate(day)
              const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()
              return (
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                  <span className="day-number">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="event-dots">
                      {dayEvents.slice(0, 3).map(event => (
                        <span key={event.id} className="event-dot" title={event.title}>
                          {eventTypes.find(t => t.value === event.type)?.emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Upcoming Events */}
          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            {events
              .filter(e => new Date(e.date) >= new Date())
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="event-item">
                  <span className="event-emoji">{eventTypes.find(t => t.value === event.type)?.emoji}</span>
                  <div className="event-details">
                    <div className="event-title">{event.title}</div>
                    <div className="event-datetime">
                      {new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}
                    </div>
                  </div>
                  <button className="delete-event-btn" onClick={() => deleteEvent(event.id)}>×</button>
                </div>
              ))}
            {events.filter(e => new Date(e.date) >= new Date()).length === 0 && (
              <p className="no-events">No upcoming events</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SharedCalendar
