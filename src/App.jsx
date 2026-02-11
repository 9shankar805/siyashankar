import { useState, useEffect } from 'react'
import AuthPage from './components/AuthPage'
import Countdown from './components/Countdown'
import DailyMessage from './components/DailyMessage'
import MusicPlayer from './components/MusicPlayer'
import SpecialDates from './components/SpecialDates'
import ThemeSwitcher from './components/ThemeSwitcher'
import VirtualHug from './components/VirtualHug'
import StarryBackground from './components/StarryBackground'
import PhotoGallery from './components/PhotoGallery'
import RelationshipTimer from './components/RelationshipTimer'
import TypeWriter from './components/TypeWriter'
import PhotoGalleryUpgrade from './components/PhotoGalleryUpgrade'
import MoodTracker from './components/MoodTracker'
import CoupleGoals from './components/CoupleGoals'
import RelationshipStats from './components/RelationshipStats'
import MessagesView from './components/MessagesView'
import MemoryTimeline from './components/MemoryTimeline'
import ParticleEffects from './components/ParticleEffects'
import SurpriseGenerator from './components/SurpriseGenerator'
import LoveLetterArchive from './components/LoveLetterArchive'
import GratitudeJournal from './components/GratitudeJournal'
import ConversationStarters from './components/ConversationStarters'
import TimeCapsule from './components/TimeCapsule'
import SharedWishlist from './components/SharedWishlist'
import InsideJokes from './components/InsideJokes'
import FuturePlans from './components/FuturePlans'
import PetNames from './components/PetNames'
import CoupleChallenge from './components/CoupleChallenge'
import Albums from './components/Albums'
import ParentsMemories from './components/ParentsMemories'
import FacebookFeed from './components/FacebookFeed'
import MemoryHeatmap from './components/MemoryHeatmap'
import WeatherThemes from './components/WeatherThemes'
import MobileNavbar from './components/MobileNavbar'
import SharedCalendar from './components/SharedCalendar'
import TopNavbar from './components/TopNavbar'
import ValentineReminder from './components/ValentineReminder'
import VoiceMessages from './components/VoiceMessages'
import DailyRoutine from './components/DailyRoutine'
import VirtualDateNight from './components/VirtualDateNight'
import ScratchCard from './components/ScratchCard'
import CouplePlaylist from './components/CouplePlaylist'
import LoveMap from './components/LoveMap'
import NotificationSettings from './components/NotificationSettings'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import NotificationPrompt from './components/NotificationPrompt'
import { useTheme } from './hooks/useTheme'
import { startNotificationService } from './utils/notificationService'
import { loadAllDataFromFirebase, syncAllDataToFirebase } from './firebaseService'
import './styles/App.css'
import './styles/phase2.css'
import './styles/phase3.css'
import './styles/phase4.css'
import './styles/phase5.css'
import './styles/mobile.css'
import './styles/homescreen.css'
import './styles/topnav.css'
import './styles/memories.css'
import './styles/calendar.css'
import './styles/messages.css'
import './styles/notifications.css'
import './styles/pwa.css'
import './styles/auth.css'
import './styles/notifications-new.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const { theme, cycleTheme } = useTheme()
  const [currentView, setCurrentView] = useState('home')
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [showGallery, setShowGallery] = useState(false)
  const [showUpgradedGallery, setShowUpgradedGallery] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true'
    if (notificationsEnabled) {
      startNotificationService()
    }
    
    // Initialize FCM
    if (isAuthenticated) {
      loadAllDataFromFirebase()
      initializeFCM()
    }
  }, [isAuthenticated])

  const initializeFCM = async () => {
    const { initializeFCM } = await import('./utils/fcmNotifications')
    await initializeFCM()
  }

  const handleAuth = async (authenticated) => {
    setIsAuthenticated(authenticated)
    if (authenticated) {
      await loadAllDataFromFirebase()
    }
  }

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return (
          <div className="home-screen">
            <ValentineReminder />
            <StarryBackground />
            
            {/* Hero Section */}
            <div className="hero-section">
              <TypeWriter />
              <div className="main-countdown-card">
                <h1 className="countdown-title">We Have Been in Contact</h1>
                <Countdown targetDate="2023-10-20T22:59:00" />
              </div>
            </div>

            {/* Daily Message Section */}
            <div className="daily-section">
              <DailyMessage />
            </div>

            {/* Relationship Timer Section */}
            <div className="timer-section">
              <RelationshipTimer startDate="2018-01-27T20:53:00" />
            </div>

            {/* Quick Actions Grid */}
            <div className="home-quick-actions">
              <button className="quick-action-card" onClick={() => setCurrentView('messages')}>
                <span className="action-icon">💬</span>
                <span className="action-label">Messages</span>
              </button>
              <button className="quick-action-card" onClick={() => setCurrentView('memories')}>
                <span className="action-icon">📸</span>
                <span className="action-label">Memories</span>
              </button>
              <button className="quick-action-card" onClick={() => setCurrentView('stats')}>
                <span className="action-icon">📊</span>
                <span className="action-label">Stats</span>
              </button>
              <button className="quick-action-card" onClick={() => setCurrentView('more')}>
                <span className="action-icon">✨</span>
                <span className="action-label">More</span>
              </button>
            </div>
          </div>
        )
      case 'messages':
        return <MessagesView onClose={() => setCurrentView('home')} />
      case 'memories':
        return (
          <div className="view-container memories-view">
            <div className="memories-content">
              <div className="memory-nav">
                <button 
                  className={`memory-nav-btn ${!selectedFeature || selectedFeature.title === 'Feed' ? 'active' : ''}`}
                  onClick={() => setSelectedFeature({ title: 'Feed', component: <FacebookFeed /> })}
                >
                  <span className="nav-icon">📱</span>
                  <span className="nav-label">Feed</span>
                </button>
                <button 
                  className={`memory-nav-btn ${selectedFeature?.title === 'Albums' ? 'active' : ''}`}
                  onClick={() => setSelectedFeature({ title: 'Albums', component: <Albums /> })}
                >
                  <span className="nav-icon">📁</span>
                  <span className="nav-label">Albums</span>
                </button>
                <button 
                  className={`memory-nav-btn ${selectedFeature?.title === 'Parents' ? 'active' : ''}`}
                  onClick={() => setSelectedFeature({ title: 'Parents', component: <ParentsMemories /> })}
                >
                  <span className="nav-icon">👨👩👧👦</span>
                  <span className="nav-label">Parents</span>
                </button>
              </div>

              {selectedFeature ? selectedFeature.component : <FacebookFeed />}
              
              {/* Legacy Components - Collapsible */}
              <details className="legacy-features-toggle">
                <summary className="legacy-toggle-header">
                  <span>� Legacy Memory Features</span>
                </summary>
                <div className="legacy-features">
                  <PhotoGalleryUpgrade />
                  <MemoryTimeline />
                  <MemoryHeatmap />
                </div>
              </details>
            </div>
          </div>
        )
      case 'stats':
        return (
          <div className="view-container stats-view">
            <div className="view-header">
              <h2 className="view-title">📊 Stats & Tracking</h2>
            </div>
            <div className="features-grid">
              <RelationshipStats startDate="2018-01-27T20:53:00" />
              <MoodTracker />
              <CoupleGoals />
            </div>
          </div>
        )
      case 'more':
        if (selectedFeature) {
          return (
            <div className="view-container feature-detail-view">
              <div className="view-header">
                <button className="back-button" onClick={() => setSelectedFeature(null)}>
                  ← Back
                </button>
                <h2 className="view-title">{selectedFeature.title}</h2>
              </div>
              <div className="feature-content">
                {selectedFeature.component}
              </div>
            </div>
          )
        }
        return (
          <div className="view-container more-view">
            <div className="view-header">
              <h2 className="view-title">⋯ More Features</h2>
            </div>
            <div className="more-grid">
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '📅 Shared Calendar', component: <SharedCalendar /> })}>
                <div className="card-icon">📅</div>
                <div className="card-title">Shared Calendar</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎯 Couple Goals', component: <CoupleGoals /> })}>
                <div className="card-icon">🎯</div>
                <div className="card-title">Couple Goals</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '⏰ Time Capsule', component: <TimeCapsule /> })}>
                <div className="card-icon">⏰</div>
                <div className="card-title">Time Capsule</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '💌 Love Letters', component: <LoveLetterArchive /> })}>
                <div className="card-icon">💌</div>
                <div className="card-title">Love Letters</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🙏 Gratitude Journal', component: <GratitudeJournal /> })}>
                <div className="card-icon">🙏</div>
                <div className="card-title">Gratitude</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎁 Wishlist', component: <SharedWishlist /> })}>
                <div className="card-icon">🎁</div>
                <div className="card-title">Wishlist</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎙️ Voice Notes', component: <VoiceMessages /> })}>
                <div className="card-icon">🎙️</div>
                <div className="card-title">Voice Notes</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🗺️ Love Map', component: <LoveMap /> })}>
                <div className="card-icon">🗺️</div>
                <div className="card-title">Love Map</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🌅 Daily Routine', component: <DailyRoutine /> })}>
                <div className="card-icon">🌅</div>
                <div className="card-title">Daily Routine</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎬 Virtual Date', component: <VirtualDateNight /> })}>
                <div className="card-icon">🎬</div>
                <div className="card-title">Virtual Date</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎫 Scratch Card', component: <ScratchCard /> })}>
                <div className="card-icon">🎫</div>
                <div className="card-title">Scratch Card</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎵 Our Playlist', component: <CouplePlaylist /> })}>
                <div className="card-icon">🎵</div>
                <div className="card-title">Our Playlist</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '😂 Inside Jokes', component: <InsideJokes /> })}>
                <div className="card-icon">😂</div>
                <div className="card-title">Inside Jokes</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🗓️ Future Plans', component: <FuturePlans /> })}>
                <div className="card-icon">🗓️</div>
                <div className="card-title">Future Plans</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '💕 Pet Names', component: <PetNames /> })}>
                <div className="card-icon">💕</div>
                <div className="card-title">Pet Names</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🏆 Challenges', component: <CoupleChallenge /> })}>
                <div className="card-icon">🏆</div>
                <div className="card-title">Challenges</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🎉 Surprises', component: <SurpriseGenerator /> })}>
                <div className="card-icon">🎉</div>
                <div className="card-title">Surprises</div>
              </div>
              <div className="feature-card" onClick={() => setSelectedFeature({ title: '🔔 Notifications', component: <NotificationSettings /> })}>
                <div className="card-icon">🔔</div>
                <div className="card-title">Notifications</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return <AuthPage onAuth={handleAuth} />
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${theme.background})` }}>
      <TopNavbar currentTheme={theme} onThemeChange={cycleTheme} onLogout={handleLogout} />
      <ParticleEffects active={showParticles} />
      <PWAInstallPrompt />
      <NotificationPrompt />
      
      <div className="app-content">
        {renderView()}
      </div>

      {currentView === 'home' && (
        <>
          <VirtualHug />
        </>
      )}
      <MobileNavbar currentView={currentView} onNavigate={setCurrentView} />
    </div>
  )
}

export default App
