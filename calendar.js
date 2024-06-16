function nextDay() {
    clearInterval(clock);
    day++;
    hour = 6;
    minute = 0;
    document.getElementById('day').textContent = day;
    growFields();
    startClock();
    updateFieldView(current_field);
    updateMarket();
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
            playSound('changing-day-sound');
            playChangingDaySound();
        }
    }
    document.getElementById('clock').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}H`;
}

function startClock() {
    clock = setInterval(advanceTime, time_scale);
}