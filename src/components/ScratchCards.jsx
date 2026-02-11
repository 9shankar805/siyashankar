import { useState, useEffect } from 'react'

const ScratchCards = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [cards, setCards] = useState([])
  const [scratched, setScratched] = useState([])

  const surprises = [
    { emoji: '💋', message: 'You get 10 kisses!' },
    { emoji: '🤗', message: 'Free hug coupon!' },
    { emoji: '🍕', message: 'Pizza date tonight!' },
    { emoji: '💝', message: 'I love you so much!' },
    { emoji: '🎁', message: 'Surprise gift coming!' },
    { emoji: '☕', message: 'Coffee date on me!' },
    { emoji: '🌹', message: 'You deserve flowers!' },
    { emoji: '🎬', message: 'Movie night together!' },
    { emoji: '💕', message: 'You make me happy!' },
    { emoji: '⭐', message: 'You are my star!' }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('scratchCards')
    if (saved) setScratched(JSON.parse(saved))
    generateCards()
  }, [])

  const generateCards = () => {
    const shuffled = [...surprises].sort(() => Math.random() - 0.5)
    setCards(shuffled.slice(0, 6))
  }

  const scratchCard = (index) => {
    if (!scratched.includes(index)) {
      const updated = [...scratched, index]
      setScratched(updated)
      localStorage.setItem('scratchCards', JSON.stringify(updated))
    }
  }

  const resetCards = () => {
    setScratched([])
    localStorage.removeItem('scratchCards')
    generateCards()
  }

  return (
    <div className="scratch-cards">
      <button className="scratch-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎫 Scratch Cards
      </button>

      {showPanel && (
        <div className="scratch-panel">
          <h3>Scratch Card Surprises 🎫</h3>

          <div className="cards-grid">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`scratch-card ${scratched.includes(index) ? 'scratched' : ''}`}
                onClick={() => scratchCard(index)}
              >
                {scratched.includes(index) ? (
                  <div className="card-revealed">
                    <div className="card-emoji">{card.emoji}</div>
                    <div className="card-message">{card.message}</div>
                  </div>
                ) : (
                  <div className="card-cover">
                    <div className="scratch-text">Scratch Me!</div>
                    <div className="scratch-icon">✨</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="scratch-stats">
            <p>Scratched: {scratched.length} / {cards.length}</p>
            {scratched.length === cards.length && (
              <button className="reset-btn" onClick={resetCards}>
                Get New Cards
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ScratchCards
