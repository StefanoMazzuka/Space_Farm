document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('fields', JSON.stringify(fields));
        localStorage.setItem('seeds', JSON.stringify(seeds));
        localStorage.setItem('harvest', JSON.stringify(harvest));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('hour', JSON.stringify(hour));
        localStorage.setItem('minute', JSON.stringify(minute));
        localStorage.setItem('coins', JSON.stringify(coins));
        localStorage.setItem('day', JSON.stringify(day));
    }

    function loadFromLocalStorage() {
        fields_loaded = localStorage.getItem('fields');
        fields = fields_loaded ? JSON.parse(fields_loaded): fields;

        seeds_loaded = localStorage.getItem('seeds');
        seeds = seeds_loaded ? JSON.parse(seeds_loaded): seeds;

        harvest_loaded = localStorage.getItem('harvest');
        harvest = harvest_loaded ? JSON.parse(harvest_loaded): harvest;

        products_loaded = localStorage.getItem('products');
        products = products_loaded ? JSON.parse(products_loaded): products;

        hour_loaded   = parseInt(localStorage.getItem('hour'));
        minute_loaded = parseInt(localStorage.getItem('minute'));
        coins_loaded  = parseInt(localStorage.getItem('coins'));
        day_loaded    = parseInt(localStorage.getItem('day'));

        hour   = !isNaN(hour_loaded) ? hour_loaded: hour;
        minute = !isNaN(minute_loaded) ? minute_loaded: minute;
        coins  = !isNaN(coins_loaded) ? coins_loaded: coins;
        day    = !isNaN(day_loaded) ? day_loaded: day;;

        startClock();
    }

    window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
    //window.addEventListener('beforeunload', saveToLocalStorage);
});