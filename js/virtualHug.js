let hugCount = 0;

function loadHugCount() {
    const saved = localStorage.getItem('hugCount');
    if (saved) {
        hugCount = parseInt(saved);
        updateHugCounter();
    }
}

function sendHug() {
    hugCount++;
    localStorage.setItem('hugCount', hugCount);
    
    createHugAnimation();
    updateHugCounter();
    showHugMessage();
    
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
    }
}

function createHugAnimation() {
    const container = document.body;
    const emojis = ['🤗', '💕', '💖', '💝', '❤️', '💓'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'hug-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 4000);
        }, i * 100);
    }
}

function showHugMessage() {
    const messages = [
        "Sending you a big hug! 🤗",
        "Virtual hug delivered! 💕",
        "Hugs and kisses! 😘",
        "Wrapped in love! 💖",
        "Miss you so much! 🥰",
        "Thinking of you! 💭",
        "You're amazing! ✨",
        "Love you tons! 💝"
    ];
    
    const msgDiv = document.getElementById('hugMessage');
    if (msgDiv) {
        msgDiv.textContent = messages[Math.floor(Math.random() * messages.length)];
        msgDiv.classList.add('show');
        
        setTimeout(() => {
            msgDiv.classList.remove('show');
        }, 3000);
    }
}

function updateHugCounter() {
    const counter = document.getElementById('hugCounter');
    if (counter) {
        counter.textContent = hugCount;
    }
}

function initHugButton() {
    const hugBtn = document.getElementById('hugButton');
    if (hugBtn) {
        hugBtn.addEventListener('click', sendHug);
    }
    loadHugCount();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHugButton);
} else {
    initHugButton();
}
