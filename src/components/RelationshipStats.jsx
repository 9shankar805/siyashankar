import { useState, useEffect } from 'react'

const RelationshipStats = ({ startDate }) => {
  const [stats, setStats] = useState({})
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const calculateStats = () => {
      const start = new Date(startDate)
      const now = new Date()
      const diff = now - start

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const months = Math.floor(days / 30)
      const years = Math.floor(days / 365)

      const hugCount = parseInt(localStorage.getItem('hugCount') || '0')
      const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]')
      const goals = JSON.parse(localStorage.getItem('coupleGoals') || '[]')
      const completedGoals = goals.filter(g => g.completed).length

      setStats({
        days,
        weeks,
        months,
        years,
        hugs: hugCount,
        moods: moodHistory.length,
        goals: goals.length,
        completedGoals,
        happyMoods: moodHistory.filter(m => m.mood.name === 'Happy' || m.mood.name === 'Loved').length
      })
    }

    calculateStats()
    const interval = setInterval(calculateStats, 60000)
    return () => clearInterval(interval)
  }, [startDate])

  return (
    <div className="relationship-stats">
      <button className="stats-toggle" onClick={() => setShowPanel(!showPanel)}>
        📊 Our Stats
      </button>

      {showPanel && (
        <div className="stats-panel">
          <h3>Relationship Dashboard 💕</h3>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">{stats.days}</div>
              <div className="stat-label">Days Together</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🗓️</div>
              <div className="stat-value">{stats.weeks}</div>
              <div className="stat-label">Weeks</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📆</div>
              <div className="stat-value">{stats.months}</div>
              <div className="stat-label">Months</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎂</div>
              <div className="stat-value">{stats.years}</div>
              <div className="stat-label">Years</div>
            </div>

            <div className="stat-card highlight">
              <div className="stat-icon">🤗</div>
              <div className="stat-value">{stats.hugs}</div>
              <div className="stat-label">Virtual Hugs</div>
            </div>

            <div className="stat-card highlight">
              <div className="stat-icon">😊</div>
              <div className="stat-value">{stats.happyMoods}</div>
              <div className="stat-label">Happy Days</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">{stats.completedGoals}/{stats.goals}</div>
              <div className="stat-label">Goals Achieved</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💭</div>
              <div className="stat-value">{stats.moods}</div>
              <div className="stat-label">Mood Logs</div>
            </div>
          </div>

          <div className="fun-facts">
            <h4>Fun Facts 🎉</h4>
            <p>🌟 That's {Math.floor(stats.days * 24)} hours together!</p>
            <p>💕 You've sent {stats.hugs} virtual hugs!</p>
            <p>🎯 {Math.round((stats.completedGoals / stats.goals) * 100) || 0}% of goals completed!</p>
            <p>😊 {Math.round((stats.happyMoods / stats.moods) * 100) || 0}% happy days!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RelationshipStats
