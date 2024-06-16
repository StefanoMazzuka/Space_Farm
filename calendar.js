function nextDay() {
    clearInterval(clock);
    day++;
    hour = 6;
    minute = 0;
    document.getElementById('day').textContent = day;
    growFields();
    startClock();
    updateFieldView(current_field);
}

function advanceTime() {
    minute++;
    if (minute >= 60) {
        minute = 0;
        hour++;
        if (hour >= 24) {
            hour = 0;
            let count = 0;
            nextDay();
            function playChangingDaySound() {
                if (count < 3) {
                    document.getElementById('changing-day-sound').play();
                    count++;
                    document.getElementById('changing-day-sound').addEventListener('ended', playChangingDaySound, { once: true });
                }
            }
            playChangingDaySound();
        }
    }
    document.getElementById('clock').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}H`;
}

function startClock() {
    clock = setInterval(advanceTime, time_scale);
}