function advanceTime() {
    minute++;
    if (minute >= 60) {
        minute = 0;
        hour++;
        if (hour >= 24) {
            hour = 0;
            nextDay();
            playSound('changing-day-sound');
        }
    }
    document.getElementById('clock').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function startClock() {
    clock = setInterval(advanceTime, time_scale);
}