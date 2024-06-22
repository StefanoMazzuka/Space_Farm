function saveToLocalStorage() {
    localStorage.setItem('coins', JSON.stringify(coins));
    localStorage.setItem('day', JSON.stringify(day));
    localStorage.setItem('hour', JSON.stringify(hour));
    localStorage.setItem('minute', JSON.stringify(minute));
    localStorage.setItem('fields', JSON.stringify(fields));
    localStorage.setItem('seeds', JSON.stringify(seeds));
    localStorage.setItem('warehouse', JSON.stringify(warehouse));
}

function loadFromLocalStorage() {
    coins_loaded  = parseInt(localStorage.getItem('coins'));
    day_loaded    = parseInt(localStorage.getItem('day'));
    hour_loaded   = parseInt(localStorage.getItem('hour'));
    minute_loaded = parseInt(localStorage.getItem('minute'));
    
    coins  = !isNaN(coins_loaded) ? coins_loaded: coins;
    day    = !isNaN(day_loaded) ? day_loaded: day;
    hour   = !isNaN(hour_loaded) ? hour_loaded: hour;
    minute = !isNaN(minute_loaded) ? minute_loaded: minute;

    fields_loaded = localStorage.getItem('fields');
    fields = fields_loaded ? JSON.parse(fields_loaded): fields;

    seeds_loaded = localStorage.getItem('seeds');
    seeds = seeds_loaded ? JSON.parse(seeds_loaded): seeds;

    warehouse_loaded = localStorage.getItem('warehouse');
    warehouse = warehouse_loaded ? JSON.parse(warehouse_loaded): warehouse;
    
    startClock();
}