import { useState } from 'react'

const defaultMilestones = [
  { id: 1, date: '2018-01-27', title: 'First Met', description: 'The day we first met 💕', emoji: '💑' },
  { id: 2, date: '2018-02-14', title: 'First Date', description: 'Our magical first date', emoji: '🌹' },
  { id: 3, date: '2018-03-15', title: 'First Trip', description: 'Our first adventure together', emoji: '✈️' },
  { id: 4, date: '2018-06-01', title: 'Special Moment', description: 'A moment we\'ll never forget', emoji: '⭐' }
]

const MemoryTimeline = () => {
  const [milestones, setMilestones] = useState(defaultMilestones)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="memory-timeline">
      <button className="timeline-toggle" onClick={() => setShowPanel(!showPanel)}>
        📍 Timeline
      </button>

      {showPanel && (
        <div className="timeline-panel">
          <h3>Our Journey Together 💕</h3>
          
          <div className="timeline-container">
            {milestones.map((milestone, idx) => (
              <div key={milestone.id} className="timeline-item">
                <div className="timeline-dot">
                  <span className="timeline-emoji">{milestone.emoji}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{milestone.date}</div>
                  <div className="timeline-title">{milestone.title}</div>
                  <div className="timeline-description">{milestone.description}</div>
                </div>
                {idx < milestones.length - 1 && <div className="timeline-line" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryTimeline
