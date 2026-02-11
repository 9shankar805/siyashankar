import { useState, useEffect } from 'react'

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

const WeatherThemes = ({ onThemeChange }) => {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('London')
  const [loading, setLoading] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

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
        
        // Apply theme
        if (onThemeChange) {
          onThemeChange(theme)
        }
      }
    } catch (error) {
      console.error('Weather fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleCityChange = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  return (
    <div className="weather-themes">
      <button className="weather-toggle" onClick={() => setShowPanel(!showPanel)}>
        {weather ? weather.theme.emoji : '🌤️'} Weather
      </button>

      {showPanel && (
        <div className="weather-panel">
          <h3>Weather-Based Theme 🌤️</h3>
          
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
            <div className="weather-info">
              <div className="weather-current">
                <div className="weather-icon">{weather.theme.emoji}</div>
                <div className="weather-details">
                  <div className="weather-city">{weather.name}</div>
                  <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather-desc">{weather.weather[0].description}</div>
                </div>
              </div>
              
              <div className="theme-preview" style={{ background: weather.theme.background }}>
                <span>{weather.theme.name}</span>
              </div>

              <div className="weather-stats">
                <div className="stat">💨 {weather.wind.speed} m/s</div>
                <div className="stat">💧 {weather.main.humidity}%</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WeatherThemes
