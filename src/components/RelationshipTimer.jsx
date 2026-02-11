import { useState, useEffect } from 'react'

const RelationshipTimer = ({ startDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate)
      const now = new Date()
      const diff = now - start

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    let op = 0
    const fadeIn = setInterval(() => {
      if (op >= 1) {
        clearInterval(fadeIn)
      } else {
        op += 0.025
        setOpacity(op)
      }
    }, 50)

    return () => {
      clearInterval(interval)
      clearInterval(fadeIn)
    }
  }, [startDate])

  return (
    <div className="relationship-timer" style={{ opacity }}>
      <h2>We have been together</h2>
      <div className="timer">
        <b>{time.days}</b> Days{' '}
        <b>{String(time.hours).padStart(2, '0')}</b> Hours{' '}
        <b>{String(time.minutes).padStart(2, '0')}</b> Minutes{' '}
        <b>{String(time.seconds).padStart(2, '0')}</b> Seconds
      </div>
    </div>
  )
}

export default RelationshipTimer
