import { useState, useEffect } from 'react'
import { saveGoals, getGoals } from '../firebaseService'

const CoupleGoals = () => {
  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState('')
  const [showPanel, setShowPanel] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    const data = await getGoals()
    if (data && data.length > 0) {
      setGoals(data)
    }
    setLoading(false)
  }

  const saveGoalsData = async (updatedGoals) => {
    setGoals(updatedGoals)
    await saveGoals(updatedGoals)
  }

  const toggleGoal = (id) => {
    const updated = goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    )
    saveGoalsData(updated)
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      const newGoalObj = {
        id: Date.now(),
        text: newGoal,
        completed: false,
        photo: null
      }
      saveGoalsData([...goals, newGoalObj])
      setNewGoal('')
    }
  }

  const deleteGoal = (id) => {
    saveGoalsData(goals.filter(goal => goal.id !== id))
  }

  const completedCount = goals.filter(g => g.completed).length
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0

  return (
    <div className="couple-goals">
      <button className="goals-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎯 Goals ({completedCount}/{goals.length})
      </button>

      {showPanel && (
        <div className="goals-panel">
          <h3>Our Bucket List 💕</h3>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              {Math.round(progress)}%
            </div>
          </div>

          {loading ? (
            <p>Loading goals...</p>
          ) : (
            <>
              <div className="goals-list">
                {goals.length === 0 ? (
                  <p>No goals yet. Add your first goal!</p>
                ) : (
                  goals.map(goal => (
                    <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                      />
                      <span className="goal-text">{goal.text}</span>
                      {goal.completed && <span className="check-mark">✓</span>}
                      <button className="delete-btn" onClick={() => deleteGoal(goal.id)}>×</button>
                    </div>
                  ))
                )}
              </div>

              <div className="add-goal">
                <input
                  type="text"
                  placeholder="Add a new goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                />
                <button onClick={addGoal}>+</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CoupleGoals
