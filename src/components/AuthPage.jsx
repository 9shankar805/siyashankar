import { useState } from 'react'
import '../styles/auth.css'

const AuthPage = ({ onAuth }) => {
  const [step, setStep] = useState('name')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const users = {
    shankar: 'sikhashankar',
    sikha: 'sikhashankar'
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    const lowerName = name.toLowerCase()
    if (lowerName === 'shankar' || lowerName === 'sikha') {
      setStep('password')
      setError('')
    } else {
      setError('Only Shankar or Sikha allowed! 💔')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setName('')
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    const lowerName = name.toLowerCase()
    if (password === users[lowerName]) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userName', lowerName === 'shankar' ? 'Husband Shankar' : 'Wife Sikha')
      onAuth(true)
    } else {
      setError('Wrong password! Try again 💔')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPassword('')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-stars"></div>
      <div className={`auth-card ${shake ? 'shake' : ''}`}>
        <div className="auth-heart">💕</div>
        <h1 className="auth-title">{step === 'name' ? 'Who are you?' : `Welcome ${name}!`}</h1>
        <p className="auth-subtitle">{step === 'name' ? 'Enter your name' : 'Enter your password'}</p>
        
        {step === 'name' ? (
          <form onSubmit={handleNameSubmit} className="auth-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Shankar or Sikha"
              className="auth-input"
              autoFocus
            />
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-button">
              Next →
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="auth-form">
            <button 
              type="button" 
              onClick={() => { setStep('name'); setPassword(''); setError(''); }}
              className="auth-back"
            >
              ← Back
            </button>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="auth-input"
              autoFocus
            />
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-button">
              Unlock 🔓
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthPage
