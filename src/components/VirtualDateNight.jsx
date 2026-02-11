import { useState } from 'react'

const VirtualDateNight = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  const dateIdeas = [
    { id: 1, title: '🎬 Movie Night', desc: 'Watch a movie together online', emoji: '🍿' },
    { id: 2, title: '🍕 Dinner Date', desc: 'Order same food and eat together', emoji: '🥂' },
    { id: 3, title: '🎮 Game Night', desc: 'Play online games together', emoji: '🎯' },
    { id: 4, title: '🎵 Music Session', desc: 'Share and listen to playlists', emoji: '🎧' },
    { id: 5, title: '📚 Book Club', desc: 'Read and discuss a book', emoji: '☕' },
    { id: 6, title: '🎨 Art Night', desc: 'Draw or paint together', emoji: '🖌️' },
    { id: 7, title: '🌟 Stargazing', desc: 'Look at stars and talk', emoji: '🔭' },
    { id: 8, title: '💃 Dance Party', desc: 'Dance to your favorite songs', emoji: '🎶' }
  ]

  const activities = {
    1: ['Pick a genre together', 'Prepare snacks', 'Video call during movie', 'Discuss after'],
    2: ['Choose restaurant', 'Order at same time', 'Set the mood with candles', 'Enjoy meal together'],
    3: ['Choose multiplayer game', 'Set up voice chat', 'Play 3 rounds', 'Winner gets a prize'],
    4: ['Create shared playlist', 'Take turns picking songs', 'Share song meanings', 'Dance together'],
    5: ['Pick a short story', 'Read separately', 'Discuss characters', 'Share favorite quotes'],
    6: ['Choose a theme', 'Gather supplies', 'Create art together', 'Show and tell'],
    7: ['Find constellation app', 'Go outside', 'Identify stars together', 'Make wishes'],
    8: ['Create playlist', 'Clear space', 'Video call', 'Dance like nobody\'s watching']
  }

  return (
    <div className="virtual-date-container">
      <h2 className="date-title">💕 Virtual Date Night</h2>
      
      {!selectedDate ? (
        <div className="date-grid">
          {dateIdeas.map(date => (
            <div key={date.id} className="date-card" onClick={() => setSelectedDate(date)}>
              <div className="date-emoji">{date.emoji}</div>
              <h3>{date.title}</h3>
              <p>{date.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="date-details">
          <button className="back-btn" onClick={() => setSelectedDate(null)}>← Back</button>
          <div className="date-header">
            <span className="big-emoji">{selectedDate.emoji}</span>
            <h3>{selectedDate.title}</h3>
            <p>{selectedDate.desc}</p>
          </div>
          <div className="activity-list">
            <h4>📋 Steps:</h4>
            {activities[selectedDate.id].map((step, i) => (
              <div key={i} className="activity-step">
                <span className="step-num">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <button className="start-btn">Start Date Night 💖</button>
        </div>
      )}
    </div>
  )
}

export default VirtualDateNight
