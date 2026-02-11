import { useState, useEffect } from 'react'

const TypeWriter = () => {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [phase, setPhase] = useState(0)

  const fullText1 = "Hey! Miss SiYa."
  const fullText2 = "Today is ."

  useEffect(() => {
    let i = 0
    
    if (phase === 0) {
      const interval = setInterval(() => {
        if (i < fullText1.length) {
          setText1(fullText1.substring(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setPhase(1)
        }
      }, 100)
      return () => clearInterval(interval)
    } else if (phase === 1) {
      const interval = setInterval(() => {
        if (i < fullText2.length) {
          setText2(fullText2.substring(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setPhase(2)
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [phase])

  return (
    <div className="typewriter">
      <span>{text1}</span>
      <br />
      <span>{text2}</span>
    </div>
  )
}

export default TypeWriter
