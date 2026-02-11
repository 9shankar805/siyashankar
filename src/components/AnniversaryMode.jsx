import { useState, useEffect } from 'react'

const AnniversaryMode = () => {
  const [anniversaryDate, setAnniversaryDate] = useState('2018-01-27')
  const [tempDate, setTempDate] = useState('2018-01-27')

  useEffect(() => {
    const saved = localStorage.getItem('anniversaryDate')
    if (saved) {
      setAnniversaryDate(saved)
      setTempDate(saved)
    }
  }, [])

  const saveDate = () => {
    localStorage.setItem('anniversaryDate', tempDate)
    setAnniversaryDate(tempDate)
  }

  const getYearsSince = () => {
    const start = new Date(anniversaryDate)
    const now = new Date()
    return Math.floor((now - start) / (1000 * 60 * 60 * 24 * 365.25))
  }

  const getNextAnniversary = () => {
    const start = new Date(anniversaryDate)
    const now = new Date()
    const next = new Date(now.getFullYear(), start.getMonth(), start.getDate())
    if (next < now) next.setFullYear(now.getFullYear() + 1)
    const days = Math.ceil((next - now) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="modern-feature-container">
      <div className="feature-header-modern">
        <div className="header-icon">💍</div>
        <h2>Anniversary Tracker</h2>
      </div>

      <div className="stats-grid-modern">
        <div className="stat-card-modern">
          <div className="stat-icon">💕</div>
          <div className="stat-value">{getYearsSince()}</div>
          <div className="stat-label">Years Together</div>
        </div>
        <div className="stat-card-modern">
          <div className="stat-icon">⏰</div>
          <div className="stat-value">{getNextAnniversary()}</div>
          <div className="stat-label">Days Until Next</div>
        </div>
      </div>

      <div className="form-card-modern">
        <label className="form-label-modern">Anniversary Date</label>
        <div className="input-group-modern">
          <input
            type="date"
            className="input-modern"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
          />
          <button className="btn-primary-modern" onClick={saveDate}>Save</button>
        </div>
      </div>

      <div className="milestones-modern">
        <h3 className="section-title-modern">🎉 Milestones</h3>
        <div className="milestone-list-modern">
          {[1, 2, 3, 5, 10].map(year => {
            const milestone = new Date(anniversaryDate)
            milestone.setFullYear(milestone.getFullYear() + year)
            const isPast = milestone < new Date()
            return (
              <div key={year} className={`milestone-card-modern ${isPast ? 'completed' : ''}`}>
                <div className="milestone-info">
                  <div className="milestone-year">{year} Year{year > 1 ? 's' : ''}</div>
                  <div className="milestone-date">{milestone.toLocaleDateString()}</div>
                </div>
                {isPast && <div className="milestone-check">✓</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnniversaryMode
