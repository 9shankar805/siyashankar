import { useState, useEffect } from 'react'
import { saveMood, getMoods } from '../firebaseService'

const moods = [
  { emoji: '😊', name: 'Happy', color: '#FFD700' },
  { emoji: '😍', name: 'Loved', color: '#FF69B4' },
  { emoji: '😢', name: 'Sad', color: '#4682B4' },
  { emoji: '😴', name: 'Tired', color: '#9370DB' },
  { emoji: '😤', name: 'Stressed', color: '#FF6347' },
  { emoji: '🥰', name: 'Grateful', color: '#FF1493' }
]

const MoodTracker = () => {
  const [myMood, setMyMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMoods()
  }, [])

  const loadMoods = async () => {
    const moods = await getMoods(30)
    setMoodHistory(moods)
    setLoading(false)
  }

  const logMood = async (mood) => {
    const entry = {
      mood,
      date: new Date().toISOString(),
      timestamp: Date.now()
    }
    
    await saveMood(entry)
    setMyMood(mood)
    loadMoods()
  }

  const getMoodStats = () => {
    const stats = {}
    moodHistory.forEach(entry => {
      stats[entry.mood.name] = (stats[entry.mood.name] || 0) + 1
    })
    return stats
  }

  const stats = getMoodStats()

  return (
    <div className="mood-tracker">
      <button className="mood-toggle" onClick={() => setShowHistory(!showHistory)}>
        {myMood ? myMood.emoji : '😊'} Mood Tracker
      </button>

      {showHistory && (
        <div className="mood-panel">
          <h3>How are you feeling?</h3>
          
          <div className="mood-selector">
            {moods.map(mood => (
              <button
                key={mood.name}
                className="mood-btn"
                style={{ borderColor: mood.color }}
                onClick={() => logMood(mood)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-name">{mood.name}</span>
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading moods...</p>
          ) : moodHistory.length > 0 ? (
            <>
              <div className="mood-stats">
                <h4>Your Mood Stats</h4>
                {Object.entries(stats).map(([name, count]) => (
                  <div key={name} className="stat-item">
                    <span>{moods.find(m => m.name === name)?.emoji} {name}</span>
                    <span className="stat-count">{count}</span>
                  </div>
                ))}
              </div>

              <div className="mood-history">
                <h4>Recent Moods</h4>
                {moodHistory.slice(0, 7).map((entry, idx) => (
                  <div key={idx} className="history-item">
                    <span>{entry.mood.emoji}</span>
                    <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No mood history yet. Log your first mood!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default MoodTracker
