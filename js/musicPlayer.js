let audio;
let isPlaying = true;

function initMusicPlayer() {
    audio = document.querySelector('audio');
    const musicControls = document.getElementById('musicControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (!audio || !musicControls) return;
    
    audio.volume = 0.5;
    volumeSlider.value = 50;
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', changeVolume);
}

function togglePlayPause() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '▶️';
        playPauseBtn.title = 'Play';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '⏸️';
        playPauseBtn.title = 'Pause';
    }
    isPlaying = !isPlaying;
}

function changeVolume(e) {
    audio.volume = e.target.value / 100;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPlayer);
} else {
    initMusicPlayer();
}
