var fields = {};

function addField(size) {
    fields[Object.keys(fields).length] = {
        info: {
            fertilized: false
        },
        field: Array(size).fill([0, 'none', 0])
    };
}

function plant(field_key, seed_name) {
    let plot = fields[field_key].field.findIndex(element => element[0] === 0 && element[1] === 'none' && element[2] === 0);
    if (plot !== -1) {
        let planted_time = new Date().getTime();
        let plot_info = [0, seed_name, planted_time];
        switch(seed_name) {
            case 'wheat':
                if (warehouse_seeds_wheat > 0) {
                    warehouse_seeds_wheat--;
                    document.getElementById('seeds-wheat-count').textContent = warehouse_seeds_wheat;
                    fields[field_key].field[plot] = plot_info;
                }
                break;
            case 'lettuce':
                if (warehouse_seeds_lettuce > 0) {
                    warehouse_seeds_lettuce--;
                    document.getElementById('seeds-lettuce-count').textContent = warehouse_seeds_lettuce;
                    fields[field_key].field[plot] = plot_info;
                }
                break;
            case 'corn':
                if (warehouse_seeds_corn > 0) {
                    warehouse_seeds_corn--;
                    document.getElementById('seeds-corn-count').textContent = warehouse_seeds_corn;
                    fields[field_key].field[plot] = plot_info;
                }
                break;
            case 'tomato':
                if (warehouse_seeds_tomato > 0) {
                    warehouse_seeds_tomato--;
                    document.getElementById('seeds-tomato-count').textContent = warehouse_seeds_tomato;
                    fields[field_key].field[plot] = plot_info;
                }
                break;
            case 'dragon_fruit':
                if (warehouse_seeds_dragon_fruit > 0) {
                    warehouse_seeds_dragon_fruit--;
                    document.getElementById('seeds-dragon-fruit-count').textContent = warehouse_seeds_dragon_fruit;
                    fields[field_key].field[plot] = plot_info;
                }
                break;
            default:
                break;
        }
    }
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
    let fertilized = fields[field_key].info.fertilized;
    fields[field_key].field.forEach((plot, index) => {
        if (plot[0] == 2) {
            switch(plot[1]) {
                case 'wheat':
                    if (fertilized && (Math.random() < 0.4)) warehouse_harvest_wheat += 2;
                    else warehouse_harvest_wheat++;
                    document.getElementById('harvest-wheat-count').textContent = warehouse_harvest_wheat;
                    fields[field_key].field[index] = [0, 'none', 0]
                    break;
                case 'lettuce':
                    if (fertilized && (Math.random() < 0.4)) warehouse_harvest_lettuce += 2;
                    else warehouse_harvest_lettuce++;
                    document.getElementById('harvest-lettuce-count').textContent = warehouse_harvest_lettuce;
                    fields[field_key].field[index] = [0, 'none', 0]
                    break;
                case 'corn':
                    if (fertilized && (Math.random() < 0.4)) warehouse_harvest_corn += 2;
                    else warehouse_harvest_corn++;
                    document.getElementById('harvest-corn-count').textContent = warehouse_harvest_corn;
                    fields[field_key].field[index] = [0, 'none', 0]
                    break;
                case 'tomato':
                    if (fertilized && (Math.random() < 0.4)) warehouse_harvest_tomato += 2;
                    else warehouse_harvest_tomato++;
                    document.getElementById('harvest-tomato-count').textContent = warehouse_harvest_tomato;
                    fields[field_key].field[index] = [0, 'none', 0]
                    break;
                case 'dragon_fruit':
                    if (fertilized && (Math.random() < 0.4)) warehouse_harvest_dragon_fruit += 2;
                    else warehouse_harvest_dragon_fruit++;
                    document.getElementById('harvest-dragon-fruit-count').textContent = warehouse_harvest_dragon_fruit;
                    fields[field_key].field[index] = [0, 'none', 0]
                    break;
                default:
                    break;
            }
        }
    });

    fields[field_key].info.fertilized = false;
    document.getElementById('fertilizing').textContent = 'no';

    //updateFieldView();
}

window.fields = fields;
window.addField = addField;
window.plant = plant;
window.fertilizing = fertilizing
window.harvest = harvest