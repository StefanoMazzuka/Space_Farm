function saveToLocalStorage() {
    localStorage.setItem('coins', coins.toString());
    localStorage.setItem('day', day.toString());
    localStorage.setItem('hour', hour.toString());
    localStorage.setItem('minute', minute.toString());

    localStorage.setItem('unloked_fields', JSON.stringify(unloked_fields));
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

    unloked_fields_loaded = localStorage.getItem('unloked_fields');
    unloked_fields = unloked_fields_loaded ? JSON.parse(unloked_fields_loaded): unloked_fields;
    
    fields_loaded = localStorage.getItem('fields');
    fields = fields_loaded ? JSON.parse(fields_loaded): fields;

    seeds_loaded = localStorage.getItem('seeds');
    seeds = seeds_loaded ? JSON.parse(seeds_loaded): seeds;

    warehouse_loaded = localStorage.getItem('warehouse');
    warehouse = warehouse_loaded ? JSON.parse(warehouse_loaded): warehouse;
    
    startClock();
}