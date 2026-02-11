const loveMessages = [
    "Every moment with you is a treasure I hold close to my heart. 💖",
    "You make my world brighter just by being in it. ✨",
    "I fall in love with you more and more each day. 🌹",
    "You're the reason I believe in magic. 🌟",
    "My favorite place is wherever you are. 🏡",
    "You're not just my love, you're my best friend. 👫",
    "Thank you for being the amazing person you are. 🌺",
    "Your smile is my favorite view. 😊",
    "I'm so grateful the universe brought us together. 🌌",
    "You make ordinary days feel extraordinary. 🎨",
    "Loving you is the easiest thing I've ever done. 💕",
    "You're the best part of my every day. ☀️",
    "I love how you make me laugh even on tough days. 😄",
    "You're my favorite notification. 📱",
    "Distance means nothing when you mean everything. 🌍",
    "I choose you, today and every day. 💑",
    "You're the dream I never want to wake up from. 💭",
    "My heart is and always will be yours. ❤️",
    "You're my favorite hello and hardest goodbye. 👋",
    "I love you more than words can express. 📝",
    "You make my heart skip a beat. 💓",
    "Every love song reminds me of you. 🎵",
    "You're my happy place. 🌈",
    "I'm so lucky to call you mine. 🍀",
    "You're the missing piece I didn't know I needed. 🧩",
    "Your happiness is my happiness. 😊",
    "I love the way you love me. 💝",
    "You're my favorite adventure. 🗺️",
    "Thank you for being you. 🌸",
    "You make life beautiful. 🦋",
    "I love your laugh, your smile, everything about you. 😍",
    "You're my forever and always. ♾️",
    "I can't imagine my life without you. 🌟",
    "You're the reason I wake up smiling. 🌅",
    "My love for you grows stronger every day. 🌱",
    "You're my favorite person in the whole world. 🌎",
    "I love how we can be silly together. 🤪",
    "You make my heart feel at home. 🏠",
    "I'm so proud to be with you. 🏆",
    "You're my sunshine on cloudy days. ☁️☀️",
    "I love making memories with you. 📸",
    "You're the best thing that ever happened to me. 🎁",
    "I love you to the moon and back. 🌙",
    "You complete me. 💫",
    "I'm addicted to your smile. 😊",
    "You're my favorite distraction. 💭",
    "I love how you understand me. 🤝",
    "You're my safe place. 🛡️",
    "I love growing with you. 🌳",
    "You're my greatest blessing. 🙏",
    "I love the little things about you. 💕",
    "You're my favorite thought. 💭",
    "I love how you make me feel special. ⭐",
    "You're my heart's desire. 💖",
    "I love our inside jokes. 😂",
    "You're my favorite memory maker. 📷",
    "I love how we fit together perfectly. 🧩",
    "You're my inspiration. 🎨",
    "I love your kindness and warmth. 🔥",
    "You're my favorite reason to smile. 😄",
    "I love planning our future together. 🔮",
    "You're my everything. 💯",
    "I love how you support my dreams. 🌠",
    "You're my favorite cuddle buddy. 🤗",
    "I love your beautiful soul. ✨",
    "You're my partner in crime. 🕵️",
    "I love how you make me better. 📈",
    "You're my favorite feeling. 💓",
    "I love your hugs. 🤗",
    "You're my comfort zone. 🛋️",
    "I love how we can talk for hours. 💬",
    "You're my favorite surprise. 🎉",
    "I love your eyes. 👀",
    "You're my greatest adventure. 🏔️",
    "I love how you care for me. 💝",
    "You're my favorite song. 🎶",
    "I love your voice. 🗣️",
    "You're my sweetest dream. 💤",
    "I love how you make me feel loved. 💕",
    "You're my favorite chapter. 📖",
    "I love your gentle touch. 🤲",
    "You're my peace. ☮️",
    "I love how you believe in me. 💪",
    "You're my favorite view. 🌄",
    "I love your positive energy. ⚡",
    "You're my happy ending. 📚",
    "I love how you make time for me. ⏰",
    "You're my favorite person to talk to. 💬",
    "I love your creativity. 🎨",
    "You're my rock. 🪨",
    "I love how you make me laugh. 😆",
    "You're my favorite part of every day. 🌞",
    "I love your passion. 🔥",
    "You're my greatest joy. 😊",
    "I love how we understand each other. 🧠",
    "You're my favorite memory. 💭",
    "I love your strength. 💪",
    "You're my light in the darkness. 🕯️",
    "I love how you accept me. 🤗",
    "You're my favorite miracle. ✨",
    "I love your beautiful heart. 💖"
];

function getDailyMessage() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const messageIndex = dayOfYear % loveMessages.length;
    return loveMessages[messageIndex];
}

function displayDailyMessage() {
    const messageDiv = document.getElementById('dailyMessage');
    if (messageDiv) {
        messageDiv.innerHTML = getDailyMessage();
        messageDiv.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(fadeIn);
            } else {
                opacity += 0.02;
                messageDiv.style.opacity = opacity;
            }
        }, 30);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayDailyMessage);
} else {
    displayDailyMessage();
}
