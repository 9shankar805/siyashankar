import { useState, useEffect } from 'react'
import { saveHugCount, getHugCount } from '../firebaseService'

const messages = [
  "Sending you a big hug! 🤗",
  "Virtual hug delivered! 💕",
  "Hugs and kisses! 😘",
  "Wrapped in love! 💖",
  "Miss you so much! 🥰",
  "Thinking of you! 💭"
]

const VirtualHug = () => {
  const [hugCount, setHugCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    const loadHugs = async () => {
      const count = await getHugCount()
      setHugCount(count)
    }
    loadHugs()
  }, [])

  const sendHug = async () => {
    const newCount = hugCount + 1
    setHugCount(newCount)
    await saveHugCount(newCount)
    localStorage.setItem('hugCount', newCount)
    
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
    
    const newEmojis = []
    const emojiTypes = ['🤗', '💕', '💖', '💝', '❤️', '💓']
    for (let i = 0; i < 15; i++) {
      newEmojis.push({
        id: Date.now() + i,
        emoji: emojiTypes[Math.floor(Math.random() * emojiTypes.length)],
        left: Math.random() * 100
      })
    }
    setEmojis(newEmojis)
    setTimeout(() => setEmojis([]), 4000)
    
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
    
    // Send notification
    const userName = localStorage.getItem('userName') || 'Husband Shankar'
    const { notifyHugReceived } = await import('../utils/notifications')
    notifyHugReceived(userName)
  }

  return (
    <>
      <div className="hug-container">
        <button className="hug-button" onClick={sendHug} title="Send a Virtual Hug">
          🤗
        </button>
        <div className="hug-stats">
          <span className="hug-counter">{hugCount}</span>
          <span className="hug-label">hugs sent</span>
        </div>
      </div>
      
      {showMessage && <div className="hug-message show">{message}</div>}
      
      {emojis.map(({ id, emoji, left }) => (
        <div key={id} className="hug-emoji" style={{ left: `${left}%` }}>
          {emoji}
        </div>
      ))}
    </>
  )
}

export default VirtualHug
