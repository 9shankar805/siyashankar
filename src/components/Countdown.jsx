import { useState, useEffect } from 'react'

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate)
      const now = Date.now()
      const diff = target - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="countdown">
      <div className="time-unit">
        <span className="count">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="count-txt">Days</span>
      </div>
      <div className="time-unit">
        <span className="count">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="count-txt">Hours</span>
      </div>
      <div className="time-unit">
        <span className="count">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="count-txt">Minutes</span>
      </div>
      <div className="time-unit">
        <span className="count sec">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="count-txt">Seconds</span>
      </div>
    </div>
  )
}

export default Countdown
