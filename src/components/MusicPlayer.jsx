import { useState, useRef, useEffect } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(50)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio ref={audioRef} autoPlay loop>
        <source src="/music/music.mp3" type="audio/mpeg" />
      </audio>
      <div className="music-controls">
        <button onClick={togglePlay} className="play-pause-btn" title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-slider"
        />
      </div>
    </>
  )
}

export default MusicPlayer
