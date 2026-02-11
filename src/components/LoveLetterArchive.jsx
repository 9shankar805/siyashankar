import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const LoveLetterArchive = () => {
  const { items: letters, loading, addItem, removeItem } = useFirebaseItems('loveLetters')
  const [showWrite, setShowWrite] = useState(false)
  const [newLetter, setNewLetter] = useState({ title: '', content: '', to: '' })
  const [selectedLetter, setSelectedLetter] = useState(null)

  const userName = localStorage.getItem('userName') || 'Husband Shankar'

  const saveLetter = async () => {
    if (newLetter.title && newLetter.content) {
      await addItem({ ...newLetter, from: userName })
      setNewLetter({ title: '', content: '', to: '' })
      setShowWrite(false)
    }
  }

  if (loading) return <div className="love-letters"><p>Loading letters...</p></div>

  return (
    <div className="love-letters">
      <div className="letters-header">
        <h2>💌 Love Letters</h2>
        <button onClick={() => setShowWrite(true)}>✍️ Write Letter</button>
      </div>

      <div className="letters-grid">
        {letters.map(letter => (
          <div key={letter.id} className="letter-card" onClick={() => setSelectedLetter(letter)}>
            <div className="letter-icon">💌</div>
            <h3>{letter.title}</h3>
            <p className="letter-meta">From: {letter.from}</p>
            <p className="letter-date">{new Date(letter.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {showWrite && (
        <div className="modal-overlay" onClick={() => setShowWrite(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Write a Love Letter</h3>
            <input
              placeholder="Title..."
              value={newLetter.title}
              onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
            />
            <textarea
              placeholder="Your message..."
              value={newLetter.content}
              onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
              rows="10"
            />
            <div className="modal-actions">
              <button onClick={saveLetter}>Send 💕</button>
              <button onClick={() => setShowWrite(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedLetter && (
        <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content letter-view" onClick={(e) => e.stopPropagation()}>
            <button className="delete-btn" onClick={() => { removeItem(selectedLetter.id); setSelectedLetter(null); }}>🗑️</button>
            <h2>{selectedLetter.title}</h2>
            <p className="letter-meta">From: {selectedLetter.from}</p>
            <p className="letter-content">{selectedLetter.content}</p>
            <p className="letter-date">{new Date(selectedLetter.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoveLetterArchive
