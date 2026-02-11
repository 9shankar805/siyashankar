import { useState } from 'react'

const questions = [
  "What's your favorite memory of us?",
  "If we could travel anywhere, where would you want to go?",
  "What made you smile today?",
  "What's something new you'd like to try together?",
  "What do you love most about our relationship?",
  "What's your dream date?",
  "What song reminds you of me?",
  "What's something I do that makes you happy?",
  "Where do you see us in 5 years?",
  "What's your favorite thing we do together?"
]

const wouldYouRather = [
  "Beach vacation or mountain adventure?",
  "Movie night at home or dinner out?",
  "Morning person or night owl?",
  "Cook together or order takeout?",
  "Adventure or relaxation?",
  "City life or countryside?",
  "Summer or winter?",
  "Coffee or tea?"
]

const ConversationStarters = () => {
  const [current, setCurrent] = useState(null)

  const getQuestion = () => {
    setCurrent({ type: 'question', text: questions[Math.floor(Math.random() * questions.length)] })
  }

  const getWouldYouRather = () => {
    setCurrent({ type: 'wyr', text: wouldYouRather[Math.floor(Math.random() * wouldYouRather.length)] })
  }

  return (
    <div className="conversation-starters-modern">
      <div className="starters-buttons">
        <button onClick={getQuestion} className="starter-btn question-btn">
          <div className="btn-icon">❓</div>
          <div className="btn-text">Deep Question</div>
        </button>
        <button onClick={getWouldYouRather} className="starter-btn wyr-btn">
          <div className="btn-icon">🤔</div>
          <div className="btn-text">Would You Rather</div>
        </button>
      </div>

      {current && (
        <div className="starter-result-card">
          <div className="result-badge">
            {current.type === 'question' ? '💬 Question' : '🤔 Would You Rather'}
          </div>
          <div className="result-text">{current.text}</div>
        </div>
      )}

      {!current && (
        <div className="starter-placeholder">
          <div className="placeholder-icon">💭</div>
          <p>Tap a button to get a conversation starter!</p>
        </div>
      )}
    </div>
  )
}

export default ConversationStarters
