const fields_divs = document.querySelectorAll('.field');

fields_divs.forEach(field_div => {
    field_div.addEventListener('click', () => {
        if (unloked_fields.includes(field_div.id)) {
            fields_divs.forEach(i => i.classList.remove('red-border'));
            field_div.classList.add('red-border');
            current_field = field_div.id;
        }
    });
});

function updateFieldView(field_key) {
    const grid = document.getElementById(field_key);

    if (unloked_fields.includes(field_key)) {
        grid.innerHTML = '';

        if (fields[field_key].info.fertilized) {
            document.getElementById(field_key).classList.remove('unfetilized');
            document.getElementById(field_key).classList.add('fertilized');
        } else {
            document.getElementById(field_key).classList.remove('fertilized');
            document.getElementById(field_key).classList.add('unfetilized');
        }

        fields[field_key].field.forEach(plot => {
            var image;
            if (plot[2] == 'none') {image = 'none'}
            else if (plot[0] < 2) image = plot[0];
            else image = plot[2];

            const img = document.createElement('img');

            img.src = image_paths[image];
            img.classList.add('grid-image');
            img.classList.add('img-item');

            grid.appendChild(img);
        });
    } else {
        grid.innerHTML = '';
        const lock_pos = (fields[field_key].field.length / 2) - 5;
        var count = 1;

        fields[field_key].field.forEach(plot => {
            const img = document.createElement('img');
            if (count == lock_pos) img.src = image_paths['lock'];
            else img.src = image_paths['blank'];
            count++;
            img.classList.add('grid-image');
            img.classList.add('img-item');

            grid.appendChild(img);
        });
    }
}

function plant(field_key, seed_name) {
    const seed = seeds[seed_name];
    const plot = fields[field_key].field.findIndex(plot => plot[0] === 0 && plot[1] === 0 && plot[2] === 'none' && plot[3] === 0);
    
    if (plot !== -1) {
        const planted_day = day;
        const warehouse_seed = warehouse['seeds'][`${seed_name}s-box`];
        if (warehouse_seed.stock > 0) {
            warehouse_seed.stock--;
            document.getElementById(`${seed_name}-stock`).textContent = warehouse_seed.stock;
            fields[field_key].field[plot] = [0, seed.time_to_harvest, seed_name.replace('-seed', ''), planted_day];
            playSound('plant-sound');
        }
    }

    updateFieldView(field_key);
}

function fertilizing(field_key) {
    const field   = fields[field_key];
    const product = warehouse['products']['fertilizer'];
    
    if (product.stock > 0 && !field.info.fertilized) {
        field.info.fertilized = true;
        product.stock--;
        document.getElementById('fertilizer-stock').textContent = product.stock;
        document.getElementById(field_key).classList.remove('unfetilized');
        document.getElementById(field_key).classList.add('fertilized');
    }
}

function harvesting(field_key) {
    const field = fields[field_key];

    fields[field_key].field.forEach((plot, index) => {
        if (plot[0] == 2) {
            const crop = warehouse['harvest'][plot[2]];

            if (field.info.fertilized && (Math.random() < 0.4)) {
                crop.stock += 2;
                document.getElementById(field_key).classList.remove('fertilized');
                document.getElementById(field_key).classList.add('unfetilized');
            }
            else crop.stock++;

            fields[field_key].field[index] = [0, 0, 'none', 0];
        }
    });

    fields[field_key].info.fertilized = false;

    playSound('harvest-sound');
    updateFieldView(field_key);
}

function growFields() {
    for (var field_key in fields) {
          var field = fields[field_key].field;
          for (var i = 0; i < field.length; i++) {
            var plot = field[i];
            if (plot[2] != 'none' && plot[0] < 2) {
                const elapsed_days = day - plot[3];
                const new_growing_state = Math.floor(elapsed_days / (plot[1] / 3));
                plot[0] = new_growing_state;
            }
        }
    }
}

function loadFields() {
    Object.keys(fields).forEach(field => {
        updateFieldView(field);
    });
}