import { useState, useEffect } from 'react'

const MemoryHeatmap = () => {
  const [memories, setMemories] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('memoryHeatmap')
    if (saved) setMemories(JSON.parse(saved))
  }, [])

  const addMemory = (date, memory) => {
    const updated = { ...memories, [date]: [...(memories[date] || []), memory] }
    setMemories(updated)
    localStorage.setItem('memoryHeatmap', JSON.stringify(updated))
  }

  const getIntensity = (count) => {
    if (count === 0) return 'none'
    if (count <= 2) return 'low'
    if (count <= 5) return 'medium'
    return 'high'
  }

  const getLast30Days = () => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  return (
    <div className="memory-heatmap">
      <button className="heatmap-toggle" onClick={() => setShowPanel(!showPanel)}>
        📅 Heatmap
      </button>

      {showPanel && (
        <div className="heatmap-panel">
          <h3>Memory Heatmap 📅</h3>
          
          <div className="heatmap-grid">
            {getLast30Days().map(date => (
              <div
                key={date}
                className={`heatmap-day ${getIntensity((memories[date] || []).length)}`}
                onClick={() => setSelectedDate(date)}
                title={`${date}: ${(memories[date] || []).length} memories`}
              />
            ))}
          </div>

          <div className="heatmap-legend">
            <span>Less</span>
            <div className="legend-item none" />
            <div className="legend-item low" />
            <div className="legend-item medium" />
            <div className="legend-item high" />
            <span>More</span>
          </div>

          {selectedDate && (
            <div className="selected-date">
              <h4>{selectedDate}</h4>
              <div className="date-memories">
                {(memories[selectedDate] || []).map((memory, idx) => (
                  <div key={idx} className="memory-item">{memory}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MemoryHeatmap
