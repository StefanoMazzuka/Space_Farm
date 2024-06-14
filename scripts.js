document.addEventListener('DOMContentLoaded', () => {

    const prev_field_btn = document.getElementById('prev-field-btn');
    const next_field_btn = document.getElementById('next-field-btn');
    const prev_seed_btn = document.getElementById('prev-seed-btn');
    const next_seed_btn = document.getElementById('next-seed-btn');
    const plant_btn = document.getElementById('plant-btn');
    const harvesting_btn = document.getElementById('harvesting-btn');
    const fertilizing_btn = document.getElementById('fertilizing-btn');

    addField(10);
    addField(10);
    addField(10);

    // play zone
    prev_field_btn.addEventListener('click', () => {
        if (current_field == 1) current_field = Object.keys(fields).length;
        else current_field--;
        document.getElementById('current-field-index').textContent = current_field;
        document.getElementById('field-id').textContent = current_field;
    });

    next_field_btn.addEventListener('click', () => {
        if (current_field == Object.keys(fields).length) current_field = 1;
        else current_field++;
        document.getElementById('current-field-index').textContent = current_field;
        document.getElementById('field-id').textContent = current_field;
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
});