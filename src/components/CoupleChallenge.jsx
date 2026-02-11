import { useState, useEffect } from 'react'

const challenges = [
  { id: 1, title: 'Say "I love you" 10 times today', days: 1 },
  { id: 2, title: 'Send 5 compliments', days: 1 },
  { id: 3, title: 'Share a memory every day', days: 7 },
  { id: 4, title: 'Write a love note daily', days: 7 },
  { id: 5, title: 'Take a photo together daily', days: 30 },
  { id: 6, title: 'Express gratitude daily', days: 30 }
]

const CoupleChallenge = () => {
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [progress, setProgress] = useState(0)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('coupleChallenge')
    if (saved) {
      const data = JSON.parse(saved)
      setActiveChallenge(data.challenge)
      setProgress(data.progress || 0)
    }
  }, [])

  const startChallenge = (challenge) => {
    setActiveChallenge(challenge)
    setProgress(0)
    localStorage.setItem('coupleChallenge', JSON.stringify({ challenge, progress: 0 }))
  }

  const updateProgress = () => {
    const newProgress = progress + 1
    setProgress(newProgress)
    localStorage.setItem('coupleChallenge', JSON.stringify({ challenge: activeChallenge, progress: newProgress }))
  }

  const completeChallenge = () => {
    setActiveChallenge(null)
    setProgress(0)
    localStorage.removeItem('coupleChallenge')
  }

  return (
    <div className="couple-challenge">
      <button className="challenge-toggle" onClick={() => setShowPanel(!showPanel)}>
        🏅 Challenge
      </button>

      {showPanel && (
        <div className="challenge-panel">
          <h3>Couple Challenge 🏅</h3>
          
          {activeChallenge ? (
            <div className="active-challenge">
              <div className="challenge-title">{activeChallenge.title}</div>
              <div className="challenge-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(progress / activeChallenge.days) * 100}%` }}>
                    {progress}/{activeChallenge.days}
                  </div>
                </div>
              </div>
              <div className="challenge-actions">
                <button onClick={updateProgress} disabled={progress >= activeChallenge.days}>
                  ✓ Mark Day Complete
                </button>
                {progress >= activeChallenge.days && (
                  <button onClick={completeChallenge} className="complete-btn">
                    🎉 Complete Challenge
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="challenge-list">
              {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-item" onClick={() => startChallenge(challenge)}>
                  <div className="challenge-name">{challenge.title}</div>
                  <div className="challenge-duration">{challenge.days} day{challenge.days > 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CoupleChallenge
