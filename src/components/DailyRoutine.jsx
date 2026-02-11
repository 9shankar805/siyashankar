import { useState, useEffect } from 'react'

const DailyRoutine = () => {
  const [routineType, setRoutineType] = useState('morning')
  const [completedTasks, setCompletedTasks] = useState([])

  const routines = {
    morning: [
      { id: 1, task: '☀️ Good morning message', emoji: '💌' },
      { id: 2, task: '🥰 Send a compliment', emoji: '✨' },
      { id: 3, task: '☕ Share breakfast plans', emoji: '🍳' },
      { id: 4, task: '💭 Share today\'s goal', emoji: '🎯' }
    ],
    evening: [
      { id: 5, task: '🌙 Good night message', emoji: '💕' },
      { id: 6, task: '📝 Share day highlights', emoji: '⭐' },
      { id: 7, task: '🙏 Express gratitude', emoji: '💖' },
      { id: 8, task: '😴 Sweet dreams wish', emoji: '🌟' }
    ]
  }

  useEffect(() => {
    const hour = new Date().getHours()
    setRoutineType(hour < 18 ? 'morning' : 'evening')
    const saved = localStorage.getItem('dailyRoutine')
    if (saved) {
      const data = JSON.parse(saved)
      const today = new Date().toDateString()
      if (data.date === today) setCompletedTasks(data.tasks)
      else localStorage.removeItem('dailyRoutine')
    }
  }, [])

  const toggleTask = (id) => {
    const updated = completedTasks.includes(id)
      ? completedTasks.filter(t => t !== id)
      : [...completedTasks, id]
    setCompletedTasks(updated)
    localStorage.setItem('dailyRoutine', JSON.stringify({
      date: new Date().toDateString(),
      tasks: updated
    }))
  }

  const currentRoutine = routines[routineType]
  const progress = (completedTasks.filter(id => 
    currentRoutine.some(r => r.id === id)
  ).length / currentRoutine.length) * 100

  return (
    <div className="daily-routine-container">
      <div className="routine-header">
        <h2>{routineType === 'morning' ? '☀️ Morning' : '🌙 Evening'} Routine</h2>
        <div className="routine-tabs">
          <button 
            className={routineType === 'morning' ? 'active' : ''} 
            onClick={() => setRoutineType('morning')}>
            ☀️ Morning
          </button>
          <button 
            className={routineType === 'evening' ? 'active' : ''} 
            onClick={() => setRoutineType('evening')}>
            🌙 Evening
          </button>
        </div>
      </div>

      <div className="routine-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{Math.round(progress)}% Complete</span>
      </div>

      <div className="routine-tasks">
        {currentRoutine.map(item => (
          <div 
            key={item.id} 
            className={`routine-task ${completedTasks.includes(item.id) ? 'completed' : ''}`}
            onClick={() => toggleTask(item.id)}>
            <span className="task-emoji">{item.emoji}</span>
            <span className="task-text">{item.task}</span>
            <span className="task-check">{completedTasks.includes(item.id) ? '✓' : '○'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyRoutine
