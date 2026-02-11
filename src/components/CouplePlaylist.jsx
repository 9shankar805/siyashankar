import { useState, useEffect } from 'react'

const CouplePlaylist = () => {
  const [songs, setSongs] = useState([])
  const [newSong, setNewSong] = useState({ title: '', artist: '', addedBy: 'You' })

  useEffect(() => {
    const saved = localStorage.getItem('couplePlaylist')
    if (saved) setSongs(JSON.parse(saved))
    else setSongs([
      { id: 1, title: 'Perfect', artist: 'Ed Sheeran', addedBy: 'You', emoji: '💕' },
      { id: 2, title: 'All of Me', artist: 'John Legend', addedBy: 'Partner', emoji: '❤️' }
    ])
  }, [])

  const addSong = () => {
    if (!newSong.title || !newSong.artist) return
    const song = {
      id: Date.now(),
      ...newSong,
      emoji: ['💕', '❤️', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]
    }
    const updated = [...songs, song]
    setSongs(updated)
    localStorage.setItem('couplePlaylist', JSON.stringify(updated))
    setNewSong({ title: '', artist: '', addedBy: 'You' })
  }

  const removeSong = (id) => {
    const updated = songs.filter(s => s.id !== id)
    setSongs(updated)
    localStorage.setItem('couplePlaylist', JSON.stringify(updated))
  }

  return (
    <div className="playlist-container">
      <h2 className="playlist-title">🎵 Our Couple Playlist</h2>
      
      <div className="add-song-form">
        <input
          type="text"
          placeholder="Song Title"
          value={newSong.title}
          onChange={(e) => setNewSong({...newSong, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
        />
        <select value={newSong.addedBy} onChange={(e) => setNewSong({...newSong, addedBy: e.target.value})}>
          <option>You</option>
          <option>Partner</option>
        </select>
        <button onClick={addSong}>Add Song ➕</button>
      </div>

      <div className="playlist-stats">
        <div className="stat">
          <span className="stat-num">{songs.length}</span>
          <span className="stat-label">Total Songs</span>
        </div>
        <div className="stat">
          <span className="stat-num">{songs.filter(s => s.addedBy === 'You').length}</span>
          <span className="stat-label">Your Picks</span>
        </div>
        <div className="stat">
          <span className="stat-num">{songs.filter(s => s.addedBy === 'Partner').length}</span>
          <span className="stat-label">Partner's Picks</span>
        </div>
      </div>

      <div className="songs-list">
        {songs.map(song => (
          <div key={song.id} className="song-item">
            <span className="song-emoji">{song.emoji}</span>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
            <div className="song-meta">
              <span className="added-by">{song.addedBy}</span>
              <button className="remove-btn" onClick={() => removeSong(song.id)}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CouplePlaylist
