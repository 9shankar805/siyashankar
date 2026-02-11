import { useState, useEffect } from 'react'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwaPromptDismissed', 'true')
  }

  if (!showPrompt || localStorage.getItem('pwaPromptDismissed')) return null

  return (
    <div className="pwa-install-prompt">
      <div className="pwa-prompt-content">
        <div className="pwa-icon">📱</div>
        <div className="pwa-text">
          <h3>Install App</h3>
          <p>Add to home screen for quick access!</p>
        </div>
        <div className="pwa-actions">
          <button className="pwa-install-btn" onClick={handleInstall}>Install</button>
          <button className="pwa-dismiss-btn" onClick={handleDismiss}>×</button>
        </div>
      </div>
    </div>
  )
}

export default PWAInstallPrompt
