import { useState } from 'react'

const QuickActions = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const actions = [
    { icon: '💕', text: 'Miss You', message: 'Missing you so much right now! 💕', color: '#ff6b9d' },
    { icon: '🥰', text: 'Thinking of You', message: 'You\'re on my mind! 💭', color: '#c44569' },
    { icon: '❤️', text: 'Love You', message: 'I love you more than words can say! ❤️', color: '#eb4d4b' },
    { icon: '😘', text: 'Kiss', message: 'Sending you kisses! 😘💋', color: '#ee5a6f' },
    { icon: '✨', text: 'You\'re Amazing', message: 'You\'re absolutely amazing! ✨', color: '#f8b500' },
    { icon: '☕', text: 'Coffee?', message: 'Want to grab coffee together? ☕', color: '#6c5ce7' }
  ]

  const sendAction = (action) => {
    setMessage(action.message)
    setShowMessage(true)
    
    if ('vibrate' in navigator) {
      navigator.vibrate(200)
    }

    createFloatingHearts()
    setTimeout(() => setShowMessage(false), 3000)
  }

  const createFloatingHearts = () => {
    const hearts = ['💕', '💖', '💗', '💝', '❤️']
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div')
        heart.className = 'quick-action-heart'
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.left = Math.random() * 100 + '%'
        document.body.appendChild(heart)
        setTimeout(() => heart.remove(), 3000)
      }, i * 100)
    }
  }

  return (
    <div className="quick-actions-modern">
      <div className="quick-actions-grid">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="quick-action-card"
            onClick={() => sendAction(action)}
            style={{ '--action-color': action.color }}
          >
            <div className="action-icon-modern">{action.icon}</div>
            <div className="action-label">{action.text}</div>
          </button>
        ))}
      </div>

      {showMessage && (
        <div className="quick-message-toast">
          <div className="toast-content">
            <span className="toast-icon">✔️</span>
            <span className="toast-text">{message}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuickActions
