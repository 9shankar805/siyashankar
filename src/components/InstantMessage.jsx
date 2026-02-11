import { useState, useEffect, useRef } from 'react'
import { saveMessage, getMessages } from '../firebaseService'

const InstantMessage = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const currentUser = localStorage.getItem('userName') || 'You'

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    const msgs = await getMessages(50)
    setMessages(msgs)
    setLoading(false)
  }

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: currentUser
      }
      await saveMessage(newMessage)
      setMessage('')
      loadMessages()
      
      // Send notification
      const { notifyNewMessage } = await import('../utils/notifications')
      const partnerName = currentUser === 'Husband Shankar' ? 'Wife Sikha' : 'Husband Shankar'
      notifyNewMessage(currentUser, message.substring(0, 50))
    }
  }

  return (
    <div className="instant-message-modern">
      <div className="chat-header-modern">
        <div className="chat-avatar">💕</div>
        <div className="chat-info-modern">
          <h3>{currentUser === 'Husband Shankar' ? 'Wife Sikha' : 'Husband Shankar'}</h3>
          <span className="status-online">● online</span>
        </div>
      </div>

      <div className="messages-container-modern">
        {loading ? (
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <p>No messages yet</p>
            <span>Send your first message!</span>
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble-wrapper ${msg.sender === currentUser ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  <div className="bubble-sender">{msg.sender}</div>
                  <div className="bubble-text">{msg.text}</div>
                  <div className="bubble-time">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.sender === currentUser && <span className="check-mark">✓✓</span>}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="input-container-modern">
        <button className="input-icon-btn" onClick={() => setMessage(message + '❤️')}>
          😊
        </button>
        <input
          type="text"
          className="message-input-modern"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-btn-modern" onClick={sendMessage} disabled={!message.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default InstantMessage
