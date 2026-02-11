const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="theme-switcher" onClick={onThemeChange}>
      <span className="theme-icon">🎨</span>
      <span className="theme-name">{currentTheme.name}</span>
    </div>
  )
}

export default ThemeSwitcher
