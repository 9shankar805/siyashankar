import { useState, useEffect } from 'react'

const MilestoneTracker = ({ startDate }) => {
  const [milestones, setMilestones] = useState([])
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const start = new Date(startDate)
    const now = new Date()
    const daysTogether = Math.floor((now - start) / (1000 * 60 * 60 * 24))
    
    const detected = []
    
    // Check milestones
    if (daysTogether >= 100 && daysTogether < 200) detected.push({ days: 100, emoji: '💯', achieved: true })
    if (daysTogether >= 200 && daysTogether < 365) detected.push({ days: 200, emoji: '🎉', achieved: true })
    if (daysTogether >= 365) detected.push({ days: 365, emoji: '🎂', name: '1 Year', achieved: true })
    if (daysTogether >= 500) detected.push({ days: 500, emoji: '⭐', achieved: true })
    if (daysTogether >= 730) detected.push({ days: 730, emoji: '💕', name: '2 Years', achieved: true })
    if (daysTogether >= 1000) detected.push({ days: 1000, emoji: '🏆', achieved: true })
    
    // Next milestone
    const nextMilestones = [100, 200, 365, 500, 730, 1000, 1095, 1500, 1825, 2000]
    const next = nextMilestones.find(m => m > daysTogether)
    if (next) {
      detected.push({ 
        days: next, 
        emoji: '🎯', 
        achieved: false, 
        daysLeft: next - daysTogether,
        name: next === 365 ? '1 Year' : next === 730 ? '2 Years' : next === 1095 ? '3 Years' : null
      })
    }
    
    setMilestones(detected)
  }, [startDate])

  return (
    <div className="milestone-tracker">
      <button className="milestone-toggle" onClick={() => setShowPanel(!showPanel)}>
        🏆 Milestones
      </button>

      {showPanel && (
        <div className="milestone-panel">
          <h3>Our Milestones 🏆</h3>
          
          <div className="milestones-list">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`milestone-item ${milestone.achieved ? 'achieved' : 'upcoming'}`}>
                <div className="milestone-emoji">{milestone.emoji}</div>
                <div className="milestone-info">
                  <div className="milestone-title">
                    {milestone.name || `${milestone.days} Days`}
                  </div>
                  {milestone.achieved ? (
                    <div className="milestone-status">✓ Achieved!</div>
                  ) : (
                    <div className="milestone-status">In {milestone.daysLeft} days</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MilestoneTracker
