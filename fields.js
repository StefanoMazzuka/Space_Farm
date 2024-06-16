var fields = {};

function addField(size) {
    fields[Object.keys(fields).length] = {
        info: {
            fertilized: false
        },
        field: Array(size).fill([0, 0, 'none', 0]) // growing_state [0-2], time_to_harvest, seed_name, planted_day
    };
}

function plant(field_key, seed_name) {
    const seeds = {
        'wheat': { count: 'warehouse_seeds_wheat', time_to_harvest: 3, element_id: 'seeds-wheat-count' },
        'lettuce': { count: 'warehouse_seeds_lettuce', time_to_harvest: 3, element_id: 'seeds-lettuce-count' },
        'corn': { count: 'warehouse_seeds_corn', time_to_harvest: 6, element_id: 'seeds-corn-count' },
        'tomato': { count: 'warehouse_seeds_tomato', time_to_harvest: 6, element_id: 'seeds-tomato-count' },
        'dragon fruit': { count: 'warehouse_seeds_dragon_fruit', time_to_harvest: 9, element_id: 'seeds-dragon-fruit-count' }
    };

    let plot = fields[field_key].field.findIndex(plot => plot[0] === 0 && plot[1] === 0 && plot[2] === 'none' && plot[3] === 0);
    if (plot !== -1) {
        let planted_day = day;
        let seed = seeds[seed_name];
        if (window[seed.count] > 0) {
            window[seed.count]--;
            document.getElementById(seed.element_id).textContent = window[seed.count];
            fields[field_key].field[plot] = [0, seed.time_to_harvest, seed_name, planted_day];
        }
    }

    updateFieldView(field_key);
}

function fertilizing(field_key) {
    if (warehouse_products_fertilizer > 0 && !fields[field_key].info.fertilized) {
        fields[field_key].info.fertilized = true;
        document.getElementById('fertilizing').textContent = 'yes'; 
        warehouse_products_fertilizer--;
        document.getElementById('products-fertilizer-count').textContent = warehouse_products_fertilizer;
    }
}

function harvest(field_key) {
    const harvests = {
        'wheat': { count: 'warehouse_harvest_wheat', element_id: 'harvest-wheat-count' },
        'lettuce': { count: 'warehouse_harvest_lettuce', element_id: 'harvest-lettuce-count' },
        'corn': { count: 'warehouse_harvest_corn', element_id: 'harvest-corn-count' },
        'tomato': { count: 'warehouse_harvest_tomato', element_id: 'harvest-tomato-count' },
        'dragon fruit': { count: 'warehouse_harvest_dragon_fruit', element_id: 'harvest-dragon-fruit-count' }
    };

    let fertilized = fields[field_key].info.fertilized;
    fields[field_key].field.forEach((plot, index) => {
        if (plot[0] == 2) {
            let crop = plot[2];
            if (crop in harvests) {
                if (fertilized && (Math.random() < 0.4)) {
                    window[harvests[crop].count] += 2;
                } else {
                    window[harvests[crop].count]++;
                }
                document.getElementById(harvests[crop].element_id).textContent = window[harvests[crop].count];
                fields[field_key].field[index] = [0, 0, 'none', 0];
            }
        }
    });

    fields[field_key].info.fertilized = false;
    document.getElementById('fertilizing').textContent = 'no';

    updateFieldView(field_key);
}

function growFields() {
    for (const id in fields) {
        fields[id].field.forEach(plot => {
            if (plot[2] != 'none' && plot[0] < 2) {
                let elapsed_days = day - plot[3];
                let new_growing_state = Math.floor(elapsed_days / (plot[1] / 3));
                plot[0] = new_growing_state;
            }
            console.log(id, plot); // TODO delete
        });
    }
}

const image_paths = {
    'wheat': 'resources/wheat.png',
    'lettuce': 'resources/lettuce.png',
    'corn': 'resources/corn.png',
    'tomato': 'resources/tomato.png',
    'dragon fruit': 'resources/dragon_fruit.png',
    'none': 'resources/none.png',
    '0': 'resources/grow_0.png',
    '1': 'resources/grow_1.png',
};

function updateFieldView(field_key) {
    const grid = document.getElementById('field');
    grid.innerHTML = '';

    fields[field_key].field.forEach(plot => {
        let image;
        if (plot[2] == 'none') {image = 'none'}
        else if (plot[0] < 2) image = plot[0];
        else image = plot[2];

        const img = document.createElement('img');
        img.src = image_paths[image];
        img.alt = `Image ${image}`;
        img.classList.add('grid-image');
        grid.appendChild(img);
    });
}