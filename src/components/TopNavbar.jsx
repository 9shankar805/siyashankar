import { useState, useEffect } from 'react'

const TopNavbar = ({ currentTheme, onThemeChange, onLogout }) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWeatherPanel, setShowWeatherPanel] = useState(false)
  const [showBgChanger, setShowBgChanger] = useState(false)
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('Kathmandu')
  const [loading, setLoading] = useState(false)
  const [customBg, setCustomBg] = useState(() => localStorage.getItem('customBackground') || '')
  const [audio] = useState(() => {
    const a = new Audio('/music/song.mp3')
    a.loop = true
    return a
  })

  const WEATHER_API_KEY = '208a6c7b75b59f956cdc4516cee3d2d4'

  const weatherThemes = {
    Clear: { name: 'Sunny Day', background: 'linear-gradient(135deg, #FFD700, #FFA500)', emoji: '☀️' },
    Clouds: { name: 'Cloudy Sky', background: 'linear-gradient(135deg, #B0C4DE, #778899)', emoji: '☁️' },
    Rain: { name: 'Rainy Day', background: 'linear-gradient(135deg, #4682B4, #1E3A5F)', emoji: '🌧️' },
    Snow: { name: 'Snowy Day', background: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)', emoji: '❄️' },
    Thunderstorm: { name: 'Stormy', background: 'linear-gradient(135deg, #2C3E50, #34495E)', emoji: '⛈️' },
    Drizzle: { name: 'Light Rain', background: 'linear-gradient(135deg, #87CEEB, #4682B4)', emoji: '🌦️' },
    Mist: { name: 'Misty', background: 'linear-gradient(135deg, #D3D3D3, #A9A9A9)', emoji: '🌫️' }
  }

  const themes = [
    { id: 'starry', icon: '🌌', name: 'Starry Night' },
    { id: 'sunset', icon: '🌅', name: 'Sunset' },
    { id: 'ocean', icon: '🌊', name: 'Ocean' },
    { id: 'galaxy', icon: '🌠', name: 'Galaxy' },
    { id: 'blossom', icon: '🌸', name: 'Blossom' }
  ]

  const fetchWeather = async (cityName) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      
      if (data.weather && data.weather[0]) {
        const weatherType = data.weather[0].main
        const theme = weatherThemes[weatherType] || weatherThemes.Clear
        setWeather({ ...data, theme })
      }
    } catch (error) {
      console.error('Weather fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCityChange = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  const applyWeatherTheme = () => {
    if (weather && weather.theme) {
      document.querySelector('.app').style.background = weather.theme.background
    }
  }

  const backgroundImages = [
    { id: 1, name: 'Starry Night', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920' },
    { id: 2, name: 'Sunset Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920' },
    { id: 3, name: 'Mountain', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' },
    { id: 4, name: 'Aurora', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920' },
    { id: 5, name: 'Galaxy', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920' },
    { id: 6, name: 'Cherry Blossom', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920' },
    { id: 7, name: 'Ocean Waves', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920' },
    { id: 8, name: 'Forest', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920' }
  ]

  const [customUrl, setCustomUrl] = useState('')

  const applyBackground = (url) => {
    document.querySelector('.app').style.backgroundImage = `url(${url})`
    document.querySelector('.app').style.backgroundSize = 'cover'
    document.querySelector('.app').style.backgroundPosition = 'center'
    document.querySelector('.app').style.backgroundAttachment = 'fixed'
    localStorage.setItem('customBackground', url)
    setCustomBg(url)
    setShowBgChanger(false)
  }

  const uploadCustomBackground = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        applyBackground(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const applyCustomUrl = () => {
    if (customUrl.trim()) {
      applyBackground(customUrl)
      setCustomUrl('')
    }
  }

  useEffect(() => {
    if (customBg) {
      applyBackground(customBg)
    }
  }, [])

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(err => console.log('Audio play failed:', err))
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    fetchWeather('Kathmandu')
    return () => {
      audio.pause()
    }
  }, [])

  return (
    <nav className="top-navbar">
      <div className="top-nav-content">
        <div className="nav-brand">
          <span className="brand-icon">💕</span>
          <span className="brand-text">SikhaShankar</span>
        </div>

        <div className="nav-actions">
          <button 
            className="nav-action-btn music-btn"
            onClick={toggleMusic}
          >
            <span className="btn-icon">{isPlaying ? '🔊' : '🔇'}</span>
          </button>

          <button 
            className="nav-action-btn weather-btn"
            onClick={() => setShowWeatherPanel(!showWeatherPanel)}
          >
            <span className="btn-icon">{weather ? weather.theme.emoji : '🌤️'}</span>
          </button>

          <button 
            className="nav-action-btn theme-btn"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {onLogout && (
            <button 
              className="nav-action-btn logout-btn"
              onClick={onLogout}
              title="Logout"
            >
              <span className="btn-icon">🚪</span>
            </button>
          )}

          {showWeatherPanel && (
            <div className="weather-menu">
              <h4>Weather Theme 🌤️</h4>
              <form onSubmit={handleCityChange} className="city-form">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city..."
                />
                <button type="submit" disabled={loading}>
                  {loading ? '...' : '🔍'}
                </button>
              </form>

              {weather && (
                <>
                  <div className="weather-current">
                    <div className="weather-icon">{weather.theme.emoji}</div>
                    <div className="weather-details">
                      <div className="weather-city">{weather.name}</div>
                      <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
                      <div className="weather-desc">{weather.weather[0].description}</div>
                    </div>
                  </div>
                  
                  <button 
                    className="apply-weather-btn"
                    onClick={applyWeatherTheme}
                  >
                    Apply Weather Theme
                  </button>

                  <div className="weather-stats">
                    <div className="stat">💨 {weather.wind.speed} m/s</div>
                    <div className="stat">💧 {weather.main.humidity}%</div>
                  </div>
                </>
              )}
            </div>
          )}

          {showThemeMenu && (
            <div className="theme-menu">
              <div className="menu-section">
                <h4>🎨 Themes</h4>
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    className="theme-option"
                    onClick={() => {
                      onThemeChange()
                      setShowThemeMenu(false)
                    }}
                  >
                    <span className="theme-icon">{theme.icon}</span>
                    <span className="theme-name">{theme.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="menu-divider"></div>
              
              <div className="menu-section">
                <button
                  className="theme-option"
                  onClick={() => {
                    setShowBgChanger(!showBgChanger)
                  }}
                >
                  <span className="theme-icon">🖼️</span>
                  <span className="theme-name">Change Background</span>
                </button>
              </div>
            </div>
          )}

          {showBgChanger && (
            <div className="bg-changer-modal" onClick={() => setShowBgChanger(false)}>
              <div className="bg-changer-content" onClick={(e) => e.stopPropagation()}>
                <div className="bg-changer-header">
                  <h3>🖼️ Change Background</h3>
                  <button onClick={() => setShowBgChanger(false)}>×</button>
                </div>
                
                <div className="bg-upload-section">
                  <label className="upload-btn">
                    📷 Upload Custom Image
                    <input type="file" accept="image/*" onChange={uploadCustomBackground} style={{ display: 'none' }} />
                  </label>
                  <div className="custom-url-section">
                    <input
                      type="text"
                      placeholder="Or paste image URL..."
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="custom-url-input"
                    />
                    <button onClick={applyCustomUrl} className="apply-url-btn">🔗 Apply</button>
                  </div>
                </div>

                <div className="bg-grid">
                  {backgroundImages.map(bg => (
                    <div key={bg.id} className="bg-item" onClick={() => applyBackground(bg.url)}>
                      <img src={bg.url} alt={bg.name} />
                      <div className="bg-name">{bg.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar
