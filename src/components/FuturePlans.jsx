import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const FuturePlans = () => {
  const { items: plans, loading, addItem, removeItem } = useFirebaseItems('futurePlans')
  const [newPlan, setNewPlan] = useState({ title: '', date: '', description: '' })
  const [showAdd, setShowAdd] = useState(false)

  const addPlan = async () => {
    if (newPlan.title.trim()) {
      await addItem(newPlan)
      setNewPlan({ title: '', date: '', description: '' })
      setShowAdd(false)
    }
  }

  if (loading) return <div className="future-plans"><p>Loading...</p></div>

  return (
    <div className="future-plans">
      <h2>🗓️ Future Plans</h2>
      <button onClick={() => setShowAdd(true)}>+ Add Plan</button>

      <div className="plans-timeline">
        {plans.map(plan => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.title}</h3>
            {plan.date && <p className="plan-date">📅 {plan.date}</p>}
            <p>{plan.description}</p>
            <button onClick={() => removeItem(plan.id)}>×</button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Future Plan</h3>
            <input
              placeholder="Plan title..."
              value={newPlan.title}
              onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
            />
            <input
              type="date"
              value={newPlan.date}
              onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
            />
            <textarea
              placeholder="Description..."
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              rows="4"
            />
            <div className="modal-actions">
              <button onClick={addPlan}>Add</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FuturePlans
