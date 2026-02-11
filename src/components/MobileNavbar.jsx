import { useState } from 'react'

const MobileNavbar = ({ onNavigate, currentView }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'memories', icon: '📸', label: 'Memories' },
    { id: 'stats', icon: '📊', label: 'Stats' },
    { id: 'more', icon: '⋯', label: 'More' }
  ]

  const handleClick = (id) => {
    if (navigator.vibrate) navigator.vibrate(10)
    onNavigate(id)
  }

  return (
    <nav className="mobile-navbar">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => handleClick(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default MobileNavbar
