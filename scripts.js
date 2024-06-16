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

    addField(20);
    addField(10);
    startClock();
    updateFieldView(0);

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
        document.getElementById('sleep').play();
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

    // Mostrar el objeto fields en la consola
    console.log(JSON.stringify(fields, null, 2));

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

        console.log(warehouse_harvest_wheat)
    }

    function loadFromLocalStorage() {
        // play zone
        coins = parseInt(localStorage.getItem('coins'));
        day   = parseInt(localStorage.getItem('day'));
        document.getElementById('total-coins').textContent = coins;
        document.getElementById('day').textContent         = day;
        
        // seeds
        warehouse_seeds_wheat        = parseInt(localStorage.getItem('warehouse_seeds_wheat'));
        warehouse_seeds_lettuce      = parseInt(localStorage.getItem('warehouse_seeds_lettuce'));
        warehouse_seeds_corn         = parseInt(localStorage.getItem('warehouse_seeds_corn'));
        warehouse_seeds_tomato       = parseInt(localStorage.getItem('warehouse_seeds_tomato'));
        warehouse_seeds_dragon_fruit = parseInt(localStorage.getItem('warehouse_seeds_dragon_fruit'));

        document.getElementById('seeds-wheat-count').textContent        = warehouse_seeds_wheat;
        document.getElementById('seeds-lettuce-count').textContent      = warehouse_seeds_lettuce;
        document.getElementById('seeds-corn-count').textContent         = warehouse_seeds_corn;
        document.getElementById('seeds-tomato-count').textContent       = warehouse_seeds_tomato;
        document.getElementById('seeds-dragon-fruit-count').textContent = warehouse_seeds_dragon_fruit;

        // products
        warehouse_products_fertilizer = parseInt(localStorage.getItem('warehouse_products_fertilizer'));

        document.getElementById('products-fertilizer-count').textContent = warehouse_products_fertilizer;
        
        // harvest
        warehouse_harvest_wheat        = parseInt(localStorage.getItem('warehouse_harvest_wheat'));
        warehouse_harvest_lettuce      = parseInt(localStorage.getItem('warehouse_harvest_lettuce'));
        warehouse_harvest_corn         = parseInt(localStorage.getItem('warehouse_harvest_corn'));
        warehouse_harvest_tomato       = parseInt(localStorage.getItem('warehouse_harvest_tomato'));
        warehouse_harvest_dragon_fruit = parseInt(localStorage.getItem('warehouse_harvest_dragon_fruit'));

        document.getElementById('harvest-wheat-count').textContent        = warehouse_harvest_wheat;
        document.getElementById('harvest-lettuce-count').textContent      = warehouse_harvest_lettuce;
        document.getElementById('harvest-corn-count').textContent         = warehouse_harvest_corn;
        document.getElementById('harvest-tomato-count').textContent       = warehouse_harvest_tomato;
        document.getElementById('harvest-dragon-fruit-count').textContent = warehouse_harvest_dragon_fruit;

        // fields
        fields = JSON.parse(localStorage.getItem('fields'));
    }

    window.addEventListener('beforeunload', saveToLocalStorage);
    window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
});