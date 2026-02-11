import { useState, useEffect } from 'react'

const LoveLanguageTracker = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [activities, setActivities] = useState([])

  const languages = [
    { id: 'words', name: 'Words of Affirmation', emoji: '💬', color: '#FF6B9D' },
    { id: 'quality', name: 'Quality Time', emoji: '⏰', color: '#C44569' },
    { id: 'gifts', name: 'Receiving Gifts', emoji: '🎁', color: '#FFA07A' },
    { id: 'acts', name: 'Acts of Service', emoji: '🤝', color: '#98D8C8' },
    { id: 'touch', name: 'Physical Touch', emoji: '🤗', color: '#F7B731' }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('loveLanguageActivities')
    if (saved) setActivities(JSON.parse(saved))
  }, [])

  const logActivity = (languageId) => {
    const newActivity = { languageId, date: new Date().toISOString() }
    const updated = [...activities, newActivity]
    setActivities(updated)
    localStorage.setItem('loveLanguageActivities', JSON.stringify(updated))
  }

  const getCount = (languageId) => {
    return activities.filter(a => a.languageId === languageId).length
  }

  const getPercentage = (languageId) => {
    if (activities.length === 0) return 0
    return Math.round((getCount(languageId) / activities.length) * 100)
  }

  return (
    <div className="love-language">
      <button className="language-toggle" onClick={() => setShowPanel(!showPanel)}>
        💕 Love Language
      </button>

      {showPanel && (
        <div className="language-panel">
          <h3>Love Language Tracker 💕</h3>

          <div className="languages-list">
            {languages.map(lang => (
              <div key={lang.id} className="language-item">
                <div className="language-header">
                  <span className="language-emoji">{lang.emoji}</span>
                  <span className="language-name">{lang.name}</span>
                  <button 
                    className="log-btn"
                    onClick={() => logActivity(lang.id)}
                  >
                    +
                  </button>
                </div>
                <div className="language-bar">
                  <div 
                    className="language-fill"
                    style={{ 
                      width: `${getPercentage(lang.id)}%`,
                      background: lang.color
                    }}
                  ></div>
                </div>
                <div className="language-stats">
                  <span>{getCount(lang.id)} times</span>
                  <span>{getPercentage(lang.id)}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="language-insights">
            <h4>Insights 💡</h4>
            <p>Your primary love language appears to be: <strong>{languages.find(l => l.id === activities.reduce((acc, a) => {
              const counts = {}
              activities.forEach(act => counts[act.languageId] = (counts[act.languageId] || 0) + 1)
              return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '')
            }, ''))?.name || 'Not enough data'}</strong></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoveLanguageTracker
