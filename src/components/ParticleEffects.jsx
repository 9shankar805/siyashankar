import { useEffect, useState } from 'react'

const ParticleEffects = ({ active = false }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          emoji: ['💕', '💖', '💗', '💝', '❤️', '💓', '🌟', '✨'][Math.floor(Math.random() * 8)],
          left: Math.random() * 100,
          delay: Math.random() * 2
        }
        setParticles(prev => [...prev, newParticle])
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 5000)
      }, 500)

      return () => clearInterval(interval)
    }
  }, [active])

  return (
    <div className="particle-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  )
}

export default ParticleEffects
