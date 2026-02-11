import { useState, useEffect } from 'react'

const defaultNames = ['Sweetheart', 'Love', 'Baby', 'Honey', 'Darling', 'Angel', 'Sunshine', 'Beautiful']

const PetNames = () => {
  const [names, setNames] = useState(defaultNames)
  const [favorites, setFavorites] = useState([])
  const [currentName, setCurrentName] = useState('')
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('petNames')
    if (saved) {
      const data = JSON.parse(saved)
      setNames(data.names || defaultNames)
      setFavorites(data.favorites || [])
    }
  }, [])

  const getRandomName = () => {
    setCurrentName(names[Math.floor(Math.random() * names.length)])
  }

  const toggleFavorite = (name) => {
    const updated = favorites.includes(name) 
      ? favorites.filter(n => n !== name)
      : [...favorites, name]
    setFavorites(updated)
    localStorage.setItem('petNames', JSON.stringify({ names, favorites: updated }))
  }

  return (
    <div className="pet-names">
      <button className="petnames-toggle" onClick={() => setShowPanel(!showPanel)}>
        💖 Nicknames
      </button>

      {showPanel && (
        <div className="petnames-panel">
          <h3>Pet Names 💖</h3>
          
          <button onClick={getRandomName} className="random-name-btn">
            🎲 Random Nickname
          </button>

          {currentName && (
            <div className="name-display">
              <div className="current-name">{currentName}</div>
              <button onClick={() => toggleFavorite(currentName)} className="fav-btn">
                {favorites.includes(currentName) ? '❤️' : '🤍'}
              </button>
            </div>
          )}

          <div className="favorites-section">
            <h4>Favorites</h4>
            <div className="favorites-list">
              {favorites.map((name, idx) => (
                <span key={idx} className="fav-name">{name}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PetNames
