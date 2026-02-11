import { useState, useEffect } from 'react'

const VirtualGiftBox = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [gifts, setGifts] = useState([])
  const [selectedGift, setSelectedGift] = useState(null)

  const availableGifts = [
    { id: 1, emoji: '🌹', name: 'Rose', message: 'A beautiful rose for you' },
    { id: 2, emoji: '💐', name: 'Bouquet', message: 'A lovely bouquet' },
    { id: 3, emoji: '🍫', name: 'Chocolate', message: 'Sweet chocolate for my sweet' },
    { id: 4, emoji: '🧸', name: 'Teddy Bear', message: 'A cuddly teddy bear' },
    { id: 5, emoji: '💝', name: 'Gift Box', message: 'A special gift for you' },
    { id: 6, emoji: '💍', name: 'Ring', message: 'A precious ring' },
    { id: 7, emoji: '🎁', name: 'Present', message: 'A surprise present' },
    { id: 8, emoji: '🌺', name: 'Flower', message: 'A beautiful flower' },
    { id: 9, emoji: '☕', name: 'Coffee', message: 'Your favorite coffee' },
    { id: 10, emoji: '🍰', name: 'Cake', message: 'A delicious cake' },
    { id: 11, emoji: '🎈', name: 'Balloon', message: 'A festive balloon' },
    { id: 12, emoji: '⭐', name: 'Star', message: 'You are my star' }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('virtualGifts')
    if (saved) setGifts(JSON.parse(saved))
  }, [])

  const sendGift = (gift) => {
    const newGift = { ...gift, date: new Date().toISOString(), opened: false }
    const updated = [...gifts, newGift]
    setGifts(updated)
    localStorage.setItem('virtualGifts', JSON.stringify(updated))
    setSelectedGift(gift)
    setTimeout(() => setSelectedGift(null), 3000)
  }

  const openGift = (index) => {
    const updated = [...gifts]
    updated[index].opened = true
    setGifts(updated)
    localStorage.setItem('virtualGifts', JSON.stringify(updated))
  }

  return (
    <div className="virtual-giftbox">
      <button className="giftbox-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎁 Gift Box
      </button>

      {showPanel && (
        <div className="giftbox-panel">
          <h3>Virtual Gift Box 🎁</h3>

          <div className="gift-stats">
            <div className="stat">
              <span className="stat-number">{gifts.length}</span>
              <span className="stat-label">Total Gifts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{gifts.filter(g => g.opened).length}</span>
              <span className="stat-label">Opened</span>
            </div>
          </div>

          <h4>Send a Gift 💝</h4>
          <div className="gifts-grid">
            {availableGifts.map(gift => (
              <button
                key={gift.id}
                className="gift-item"
                onClick={() => sendGift(gift)}
              >
                <span className="gift-emoji">{gift.emoji}</span>
                <span className="gift-name">{gift.name}</span>
              </button>
            ))}
          </div>

          <h4>Received Gifts 🎉</h4>
          <div className="received-gifts">
            {gifts.length === 0 ? (
              <p className="no-gifts">No gifts yet. Send one!</p>
            ) : (
              gifts.slice().reverse().map((gift, index) => (
                <div key={index} className={`received-gift ${gift.opened ? 'opened' : ''}`}>
                  <span className="gift-emoji">{gift.emoji}</span>
                  <div className="gift-info">
                    <div className="gift-name">{gift.name}</div>
                    <div className="gift-date">{new Date(gift.date).toLocaleDateString()}</div>
                  </div>
                  {!gift.opened && (
                    <button className="open-btn" onClick={() => openGift(gifts.length - 1 - index)}>
                      Open
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {selectedGift && (
        <div className="gift-animation">
          <div className="gift-popup">
            <div className="gift-emoji-large">{selectedGift.emoji}</div>
            <div className="gift-message">{selectedGift.message}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VirtualGiftBox
