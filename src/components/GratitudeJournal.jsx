import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const GratitudeJournal = () => {
  const { items: entries, loading, addItem, removeItem } = useFirebaseItems('gratitude')
  const [newEntry, setNewEntry] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const addEntry = async () => {
    if (newEntry.trim()) {
      await addItem({ text: newEntry })
      setNewEntry('')
      setShowAdd(false)
    }
  }

  if (loading) return <div className="gratitude-journal"><p>Loading...</p></div>

  return (
    <div className="gratitude-journal">
      <h2>🙏 Gratitude Journal</h2>
      <button onClick={() => setShowAdd(true)}>+ Add Entry</button>

      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry.id} className="entry-card">
            <p>{entry.text}</p>
            <span className="entry-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
            <button onClick={() => removeItem(entry.id)}>×</button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>What are you grateful for?</h3>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="I'm grateful for..."
              rows="5"
            />
            <div className="modal-actions">
              <button onClick={addEntry}>Save</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GratitudeJournal
