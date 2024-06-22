function fluctuatePrices() {
    const products = warehouse['harvest'];
    Object.keys(products).forEach(p => {
        const product = products[p];
        let fluctuation;
        let random = Math.random();
        if (random < 0.5) fluctuation = Math.max((product.sell_price - 5), (product.sell_price - 1));
        else fluctuation = Math.min((product.sell_price + 5), (product.sell_price + 1));
        product.sell_price = Math.max(1, fluctuation);
    });

    const url = window.location.pathname;
    if (url.includes('/warehouse.html')) loadWarehouse();
}

function nextDay() {
    clearInterval(clock);
    day++;
    hour = 6;
    minute = 0;
    document.getElementById('day').textContent = day;
    growFields();
    startClock();
    loadFields();
}

function advanceTime() {
    minute++;
    if (minute >= 60) {
        minute = 0;
        hour++;
        fluctuatePrices();
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