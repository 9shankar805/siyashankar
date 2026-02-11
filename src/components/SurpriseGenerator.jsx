import { useState } from 'react'

const dateIdeas = [
  "🍕 Cook dinner together",
  "🎬 Movie night with popcorn",
  "🌅 Watch the sunrise",
  "🎨 Paint together",
  "🚶 Take a long walk",
  "☕ Coffee shop date",
  "🎮 Play games together",
  "📚 Read to each other",
  "🎵 Make a playlist",
  "🌃 Stargazing night"
]

const compliments = [
  "You light up my world! ✨",
  "Your smile is contagious! 😊",
  "You're incredibly thoughtful! 💭",
  "You make everything better! 🌟",
  "You're my favorite person! 💕",
  "You're absolutely amazing! 🎉",
  "You inspire me daily! 🌈",
  "You're one of a kind! 💎"
]

const memories = [
  "Remember our first date? 💑",
  "That time we laughed so hard! 😂",
  "Our first adventure together! 🗺️",
  "When we stayed up all night talking! 🌙",
  "That perfect moment we shared! ⭐"
]

const SurpriseGenerator = () => {
  const [surprise, setSurprise] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

  const generateSurprise = (type) => {
    let result
    switch(type) {
      case 'date':
        result = { type: 'Date Idea', text: dateIdeas[Math.floor(Math.random() * dateIdeas.length)] }
        break
      case 'compliment':
        result = { type: 'Compliment', text: compliments[Math.floor(Math.random() * compliments.length)] }
        break
      case 'memory':
        result = { type: 'Memory', text: memories[Math.floor(Math.random() * memories.length)] }
        break
    }
    setSurprise(result)
  }

  return (
    <div className="surprise-generator">
      <button className="surprise-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎁 Surprise Me!
      </button>

      {showPanel && (
        <div className="surprise-panel">
          <h3>Surprise Generator 🎉</h3>
          
          <div className="surprise-buttons">
            <button onClick={() => generateSurprise('date')} className="surprise-btn">
              🗓️ Date Idea
            </button>
            <button onClick={() => generateSurprise('compliment')} className="surprise-btn">
              💝 Compliment
            </button>
            <button onClick={() => generateSurprise('memory')} className="surprise-btn">
              💭 Memory
            </button>
          </div>

          {surprise && (
            <div className="surprise-result">
              <div className="surprise-type">{surprise.type}</div>
              <div className="surprise-text">{surprise.text}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SurpriseGenerator
