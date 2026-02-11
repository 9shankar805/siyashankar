import { useState, useEffect } from 'react'

const themes = {
  default: {
    name: "Starry Night",
    background: "https://images.pexels.com/photos/2055225/pexels-photo-2055225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    primary: "#ff69b4",
    secondary: "#ff1493"
  },
  sunset: {
    name: "Romantic Sunset",
    background: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    primary: "#ff6b6b",
    secondary: "#ff8c42"
  },
  ocean: {
    name: "Ocean Dreams",
    background: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    primary: "#4ecdc4",
    secondary: "#44a8a0"
  },
  galaxy: {
    name: "Galaxy Love",
    background: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    primary: "#b794f6",
    secondary: "#9f7aea"
  },
  cherry: {
    name: "Cherry Blossom",
    background: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    primary: "#ffb7c5",
    secondary: "#ff69b4"
  }
}

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('default')

  useEffect(() => {
    const saved = localStorage.getItem('selectedTheme')
    if (saved && themes[saved]) {
      setCurrentTheme(saved)
    }
  }, [])

  useEffect(() => {
    const theme = themes[currentTheme]
    document.documentElement.style.setProperty('--theme-primary', theme.primary)
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary)
    localStorage.setItem('selectedTheme', currentTheme)
  }, [currentTheme])

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes)
    const currentIndex = themeKeys.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    setCurrentTheme(themeKeys[nextIndex])
  }

  return { theme: themes[currentTheme], cycleTheme }
}
