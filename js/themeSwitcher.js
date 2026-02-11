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
};

let currentTheme = 'default';

function loadTheme() {
    const saved = localStorage.getItem('selectedTheme');
    if (saved && themes[saved]) {
        currentTheme = saved;
    }
    applyTheme(currentTheme);
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const container = document.querySelector('.container');
    if (container) {
        container.style.backgroundImage = `url(${theme.background})`;
    }
    
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    
    currentTheme = themeName;
    localStorage.setItem('selectedTheme', themeName);
    
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.getElementById('currentThemeName');
    if (btn) {
        btn.textContent = themes[currentTheme].name;
    }
}

function cycleTheme() {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    applyTheme(themeKeys[nextIndex]);
}

function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeSwitcher');
    if (themeBtn) {
        themeBtn.addEventListener('click', cycleTheme);
    }
    loadTheme();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
    initThemeSwitcher();
}
