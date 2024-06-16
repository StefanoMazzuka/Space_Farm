function playSound(sound_id) {
    const audio = document.getElementById(sound_id);

    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }

    audio.play();
}