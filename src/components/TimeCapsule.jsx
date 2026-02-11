import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const TimeCapsule = () => {
  const { items: capsules, loading, addItem } = useFirebaseItems('timeCapsule')
  const [newCapsule, setNewCapsule] = useState({ message: '', openDate: '' })
  const [showAdd, setShowAdd] = useState(false)

  const userName = localStorage.getItem('userName') || 'Husband Shankar'

  const addCapsule = async () => {
    if (newCapsule.message.trim() && newCapsule.openDate) {
      await addItem({ ...newCapsule, from: userName, locked: true })
      setNewCapsule({ message: '', openDate: '' })
      setShowAdd(false)
    }
  }

  const canOpen = (openDate) => {
    return new Date() >= new Date(openDate)
  }

  if (loading) return <div className="time-capsule"><p>Loading...</p></div>

  return (
    <div className="time-capsule">
      <h2>⏰ Time Capsule</h2>
      <button onClick={() => setShowAdd(true)}>+ Create Capsule</button>

      <div className="capsules-grid">
        {capsules.map(capsule => (
          <div key={capsule.id} className={`capsule-card ${canOpen(capsule.openDate) ? 'unlocked' : 'locked'}`}>
            <div className="capsule-icon">{canOpen(capsule.openDate) ? '🔓' : '🔒'}</div>
            <p className="open-date">Open: {new Date(capsule.openDate).toLocaleDateString()}</p>
            {canOpen(capsule.openDate) ? (
              <>
                <p className="capsule-message">{capsule.message}</p>
                <p className="capsule-from">From: {capsule.from}</p>
              </>
            ) : (
              <p className="locked-message">Locked until {new Date(capsule.openDate).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create Time Capsule</h3>
            <textarea
              placeholder="Your message to the future..."
              value={newCapsule.message}
              onChange={(e) => setNewCapsule({ ...newCapsule, message: e.target.value })}
              rows="6"
            />
            <label>Open Date:</label>
            <input
              type="date"
              value={newCapsule.openDate}
              onChange={(e) => setNewCapsule({ ...newCapsule, openDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
            <div className="modal-actions">
              <button onClick={addCapsule}>Lock Capsule 🔒</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeCapsule
