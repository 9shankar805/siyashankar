const specialDates = [
    { name: "Our Anniversary", date: "2018-01-27", emoji: "💕" },
    { name: "Valentine's Day", date: "2025-02-14", emoji: "💝" },
    { name: "Your Birthday", date: "2025-06-15", emoji: "🎂" },
    { name: "My Birthday", date: "2025-08-20", emoji: "🎉" },
    { name: "Christmas", date: "2025-12-25", emoji: "🎄" }
];

function getNextSpecialDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let nextDate = null;
    let minDiff = Infinity;
    
    specialDates.forEach(special => {
        const [year, month, day] = special.date.split('-');
        let eventDate = new Date(today.getFullYear(), month - 1, day);
        
        if (eventDate < today) {
            eventDate = new Date(today.getFullYear() + 1, month - 1, day);
        }
        
        const diff = eventDate - today;
        
        if (diff < minDiff) {
            minDiff = diff;
            nextDate = { ...special, eventDate, daysLeft: Math.ceil(diff / (1000 * 60 * 60 * 24)) };
        }
    });
    
    return nextDate;
}

function displaySpecialDateReminder() {
    const reminderDiv = document.getElementById('specialDateReminder');
    if (!reminderDiv) return;
    
    const nextDate = getNextSpecialDate();
    
    if (nextDate) {
        const daysText = nextDate.daysLeft === 0 ? "Today!" : 
                        nextDate.daysLeft === 1 ? "Tomorrow!" : 
                        `in ${nextDate.daysLeft} days`;
        
        reminderDiv.innerHTML = `
            <span class="reminder-emoji">${nextDate.emoji}</span>
            <span class="reminder-text">${nextDate.name} ${daysText}</span>
        `;
        
        if (nextDate.daysLeft <= 7) {
            reminderDiv.classList.add('urgent');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displaySpecialDateReminder);
} else {
    displaySpecialDateReminder();
}
