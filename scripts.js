document.addEventListener('DOMContentLoaded', () => {

    // play zone
    const prev_field_btn  = document.getElementById('prev-field-btn');
    const next_field_btn  = document.getElementById('next-field-btn');
    const prev_seed_btn   = document.getElementById('prev-seed-btn');
    const next_seed_btn   = document.getElementById('next-seed-btn');
    const sleep_btn       = document.getElementById('sleep-btn');
    const plant_btn       = document.getElementById('plant-btn');
    const harvesting_btn  = document.getElementById('harvesting-btn');
    const fertilizing_btn = document.getElementById('fertilizing-btn');
    const reset_btn       = document.getElementById('reset-btn');

    // warehouse
    const sell_wheat_btn        = document.getElementById('sell-wheat-btn');
    const sell_lettuce_btn      = document.getElementById('sell-lettuce-btn');
    const sell_corn_btn         = document.getElementById('sell-corn-btn');
    const sell_tomato_btn       = document.getElementById('sell-tomato-btn');
    const sell_dragon_fruit_btn = document.getElementById('sell-dragon-fruit-btn');

    // store
    const buy_wheat_btn        = document.getElementById('buy-wheat-btn');
    const buy_lettuce_btn      = document.getElementById('buy-lettuce-btn');
    const buy_corn_btn         = document.getElementById('buy-corn-btn');
    const buy_tomato_btn       = document.getElementById('buy-tomato-btn');
    const buy_dragon_fruit_btn = document.getElementById('buy-dragon-fruit-btn');

    const buy_fertilizer_btn = document.getElementById('buy-fertilizer-btn');

    const buy_small_field_btn  = document.getElementById('buy-small-field-btn');
    const buy_medium_field_btn = document.getElementById('buy-medium-field-btn');
    const buy_large_field_btn  = document.getElementById('buy-large-field-btn');

    // play zone
    prev_field_btn.addEventListener('click', () => {
        if (current_field == 0) current_field = Object.keys(fields).length - 1;
        else current_field--;
        document.getElementById('current-field-index').textContent = current_field + 1;
        document.getElementById('field-id').textContent = current_field + 1;
        updateFieldView(current_field);
    });

    next_field_btn.addEventListener('click', () => {
        if (current_field == Object.keys(fields).length - 1) current_field = 0;
        else current_field++;
        document.getElementById('current-field-index').textContent = current_field + 1;
        document.getElementById('field-id').textContent = current_field + 1;
        updateFieldView(current_field);
    });

    prev_seed_btn.addEventListener('click', () => {
        if (current_seed == 0) current_seed = seeds_list.length - 1;
        else current_seed--;
        document.getElementById('current-seed-index').textContent = seeds_list[current_seed];
    });

    next_seed_btn.addEventListener('click', () => {
        if (current_seed == seeds_list.length - 1) current_seed = 0;
        else current_seed++;
        document.getElementById('current-seed-index').textContent = seeds_list[current_seed];
    });

    sleep_btn.addEventListener('click', () => {
        playSound('sleep');
        nextDay();
    });

    plant_btn.addEventListener('click', () => {
        plant(current_field, seeds_list[current_seed]);
    });

    harvesting_btn.addEventListener('click', () => {
        harvest(current_field);
    });

    fertilizing_btn.addEventListener('click', () => {
        fertilizing(current_field);
    });

    reset_btn.addEventListener('click', () => {
        localStorage.clear();

        coins = 0;
        day   = 1;

        // seeds
        warehouse_seeds_wheat        = 10;
        warehouse_seeds_lettuce      = 0;
        warehouse_seeds_corn         = 0;
        warehouse_seeds_tomato       = 0;
        warehouse_seeds_dragon_fruit = 0;

        // products
        warehouse_products_fertilizer = 0;

        // harvest
        warehouse_harvest_wheat        = 0;
        warehouse_harvest_lettuce      = 0;
        warehouse_harvest_corn         = 0;
        warehouse_harvest_tomato       = 0;
        warehouse_harvest_dragon_fruit = 0;

        // fields
        fields = {}

        saveToLocalStorage();
        loadFromLocalStorage();
    });

    // warehouse
    sell_wheat_btn.addEventListener('click', () => sellProduct('wheat', 'warehouse_harvest_wheat', 'harvest-wheat-count'));
    sell_lettuce_btn.addEventListener('click', () => sellProduct('lettuce', 'warehouse_harvest_lettuce', 'harvest-lettuce-count'));
    sell_corn_btn.addEventListener('click', () => sellProduct('corn', 'warehouse_harvest_corn', 'harvest-corn-count'));
    sell_tomato_btn.addEventListener('click', () => sellProduct('tomato', 'warehouse_harvest_tomato', 'harvest-tomato-count'));
    sell_dragon_fruit_btn.addEventListener('click', () => sellProduct('dragon fruit', 'warehouse_harvest_dragon_fruit', 'harvest-dragon-fruit-count'));

    // store
    buy_wheat_btn.addEventListener('click', () => buyProduct(1, 'warehouse_seeds_wheat', 'seeds-wheat-count'));
    buy_lettuce_btn.addEventListener('click', () => buyProduct(5, 'warehouse_seeds_lettuce', 'seeds-lettuce-count'));
    buy_corn_btn.addEventListener('click', () => buyProduct(10, 'warehouse_seeds_corn', 'seeds-corn-count'));
    buy_tomato_btn.addEventListener('click', () => buyProduct(20, 'warehouse_seeds_tomato', 'seeds-tomato-count'));
    buy_dragon_fruit_btn.addEventListener('click', () => buyProduct(50, 'warehouse_seeds_dragon_fruit', 'seeds-dragon-fruit-count'));

    buy_fertilizer_btn.addEventListener('click', () => buyProduct(50, 'warehouse_products_fertilizer', 'products-fertilizer-count'));

    buy_small_field_btn.addEventListener('click', () => buyField(100, 'small'));
    buy_medium_field_btn.addEventListener('click', () => buyField(30, 'small'));
    buy_large_field_btn.addEventListener('click', () => buyField(50, 'small'));

    // LocalStorage
    function saveToLocalStorage() {
        // play zone
        localStorage.setItem('coins', coins.toString());
        localStorage.setItem('day', day.toString());

        // seeds
        localStorage.setItem('warehouse_seeds_wheat', warehouse_seeds_wheat.toString());
        localStorage.setItem('warehouse_seeds_lettuce', warehouse_seeds_lettuce.toString());
        localStorage.setItem('warehouse_seeds_corn', warehouse_seeds_corn.toString());
        localStorage.setItem('warehouse_seeds_tomato', warehouse_seeds_tomato.toString());
        localStorage.setItem('warehouse_seeds_dragon_fruit', warehouse_seeds_dragon_fruit.toString());

        // products
        localStorage.setItem('warehouse_products_fertilizer', warehouse_products_fertilizer.toString());

        // harvest
        localStorage.setItem('warehouse_harvest_wheat', warehouse_harvest_wheat.toString());
        localStorage.setItem('warehouse_harvest_lettuce', warehouse_harvest_lettuce.toString());
        localStorage.setItem('warehouse_harvest_corn', warehouse_harvest_corn.toString());
        localStorage.setItem('warehouse_harvest_tomato', warehouse_harvest_tomato.toString());
        localStorage.setItem('warehouse_harvest_dragon_fruit', warehouse_harvest_dragon_fruit.toString());

        // fields
        localStorage.setItem('fields', JSON.stringify(fields));
    }

    function loadFromLocalStorage() {
        // play zone
        coins = parseInt(localStorage.getItem('coins'));
        day   = parseInt(localStorage.getItem('day'));

        if (isNaN(coins)) coins = 0;
        if (isNaN(day)) day = 1;

        document.getElementById('total-coins').textContent = coins;
        document.getElementById('day').textContent         = day;
        
        // seeds
        warehouse_seeds_wheat        = parseInt(localStorage.getItem('warehouse_seeds_wheat'));
        warehouse_seeds_lettuce      = parseInt(localStorage.getItem('warehouse_seeds_lettuce'));
        warehouse_seeds_corn         = parseInt(localStorage.getItem('warehouse_seeds_corn'));
        warehouse_seeds_tomato       = parseInt(localStorage.getItem('warehouse_seeds_tomato'));
        warehouse_seeds_dragon_fruit = parseInt(localStorage.getItem('warehouse_seeds_dragon_fruit'));

        if (isNaN(warehouse_seeds_wheat)) warehouse_seeds_wheat = 10;
        if (isNaN(warehouse_seeds_lettuce)) warehouse_seeds_lettuce = 0;
        if (isNaN(warehouse_seeds_corn)) warehouse_seeds_corn = 0;
        if (isNaN(warehouse_seeds_tomato)) warehouse_seeds_tomato = 0;
        if (isNaN(warehouse_seeds_dragon_fruit)) warehouse_seeds_dragon_fruit = 0;

        document.getElementById('seeds-wheat-count').textContent        = warehouse_seeds_wheat;
        document.getElementById('seeds-lettuce-count').textContent      = warehouse_seeds_lettuce;
        document.getElementById('seeds-corn-count').textContent         = warehouse_seeds_corn;
        document.getElementById('seeds-tomato-count').textContent       = warehouse_seeds_tomato;
        document.getElementById('seeds-dragon-fruit-count').textContent = warehouse_seeds_dragon_fruit;

        // products
        warehouse_products_fertilizer = parseInt(localStorage.getItem('warehouse_products_fertilizer'));

        if (isNaN(warehouse_products_fertilizer)) warehouse_products_fertilizer = 0;

        document.getElementById('products-fertilizer-count').textContent = warehouse_products_fertilizer;
        
        // harvest
        warehouse_harvest_wheat        = parseInt(localStorage.getItem('warehouse_harvest_wheat'));
        warehouse_harvest_lettuce      = parseInt(localStorage.getItem('warehouse_harvest_lettuce'));
        warehouse_harvest_corn         = parseInt(localStorage.getItem('warehouse_harvest_corn'));
        warehouse_harvest_tomato       = parseInt(localStorage.getItem('warehouse_harvest_tomato'));
        warehouse_harvest_dragon_fruit = parseInt(localStorage.getItem('warehouse_harvest_dragon_fruit'));

        if (isNaN(warehouse_harvest_wheat)) warehouse_harvest_wheat = 0;
        if (isNaN(warehouse_harvest_lettuce)) warehouse_harvest_lettuce = 0;
        if (isNaN(warehouse_harvest_corn)) warehouse_harvest_corn = 0;
        if (isNaN(warehouse_harvest_tomato)) warehouse_harvest_tomato = 0;
        if (isNaN(warehouse_harvest_dragon_fruit)) warehouse_harvest_dragon_fruit = 0;

        document.getElementById('harvest-wheat-count').textContent        = warehouse_harvest_wheat;
        document.getElementById('harvest-lettuce-count').textContent      = warehouse_harvest_lettuce;
        document.getElementById('harvest-corn-count').textContent         = warehouse_harvest_corn;
        document.getElementById('harvest-tomato-count').textContent       = warehouse_harvest_tomato;
        document.getElementById('harvest-dragon-fruit-count').textContent = warehouse_harvest_dragon_fruit;

        // fields
        fields = JSON.parse(localStorage.getItem('fields'));

        if (Object.keys(fields).length === 0) addField(20);

        clearInterval(clock);
        hour = 0;
        minute = 0;
        startClock();
        updateMarketView();
        updateFieldView(0);
        saveToLocalStorage();
    }

    window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
    window.addEventListener('beforeunload', saveToLocalStorage);
});