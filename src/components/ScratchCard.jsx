import { useState, useRef, useEffect } from 'react'

const ScratchCard = () => {
  const [isScratching, setIsScratching] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [currentSurprise, setCurrentSurprise] = useState(null)
  const canvasRef = useRef(null)

  const surprises = [
    '💋 You get 10 kisses!',
    '🎁 Surprise gift coming!',
    '🍕 Pizza date tonight!',
    '💕 I love you so much!',
    '🎬 Movie night together!',
    '🌹 You deserve flowers!',
    '☕ Coffee date soon!',
    '🎵 Dedicated song for you!',
    '🤗 Unlimited hugs today!',
    '⭐ You\'re my star!'
  ]

  useEffect(() => {
    if (!revealed) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ff69b4'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Scratch Here! 👆', canvas.width / 2, canvas.height / 2)
    }
  }, [revealed])

  const scratch = (e) => {
    if (revealed) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()
  }

  const handleStart = (e) => {
    setIsScratching(true)
    scratch(e)
  }

  const handleMove = (e) => {
    if (isScratching) scratch(e)
  }

  const handleEnd = () => {
    setIsScratching(false)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    if (transparent / (pixels.length / 4) > 0.5) setRevealed(true)
  }

  const newCard = () => {
    setRevealed(false)
    setCurrentSurprise(surprises[Math.floor(Math.random() * surprises.length)])
  }

  useEffect(() => {
    newCard()
  }, [])

  return (
    <div className="scratch-card-container">
      <h2 className="scratch-title">🎫 Scratch Card Surprise</h2>
      
      <div className="scratch-wrapper">
        <div className="surprise-text">{currentSurprise}</div>
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="scratch-canvas"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {revealed && (
        <button className="new-card-btn" onClick={newCard}>
          Get New Card 🎉
        </button>
      )}
    </div>
  )
}

export default ScratchCard
