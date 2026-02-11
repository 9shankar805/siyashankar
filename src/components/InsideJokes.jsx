import { useState } from 'react'
import { useFirebaseItems } from '../hooks/useFirebase'

const InsideJokes = () => {
  const { items: jokes, loading, addItem, removeItem } = useFirebaseItems('insideJokes')
  const [newJoke, setNewJoke] = useState({ title: '', description: '' })
  const [showAdd, setShowAdd] = useState(false)

  const addJoke = async () => {
    if (newJoke.title.trim()) {
      await addItem(newJoke)
      setNewJoke({ title: '', description: '' })
      setShowAdd(false)
    }
  }

  if (loading) return <div className="inside-jokes"><p>Loading...</p></div>

  return (
    <div className="inside-jokes">
      <h2>😂 Inside Jokes</h2>
      <button onClick={() => setShowAdd(true)}>+ Add Joke</button>

      <div className="jokes-list">
        {jokes.map(joke => (
          <div key={joke.id} className="joke-card">
            <h3>{joke.title}</h3>
            <p>{joke.description}</p>
            <button onClick={() => removeItem(joke.id)}>×</button>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Inside Joke</h3>
            <input
              placeholder="Joke title..."
              value={newJoke.title}
              onChange={(e) => setNewJoke({ ...newJoke, title: e.target.value })}
            />
            <textarea
              placeholder="Description..."
              value={newJoke.description}
              onChange={(e) => setNewJoke({ ...newJoke, description: e.target.value })}
              rows="4"
            />
            <div className="modal-actions">
              <button onClick={addJoke}>Add</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InsideJokes
