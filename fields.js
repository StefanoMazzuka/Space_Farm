const fields_divs = document.querySelectorAll('.field');

fields_divs.forEach(field_div => {
    field_div.addEventListener('click', () => {
        fields_divs.forEach(i => i.classList.remove('red-border'));
        field_div.classList.add('red-border');
        current_field = field_div.id;
    });
});

function updateFieldView(field_key) {
    const grid = document.getElementById(field_key);
    grid.innerHTML = '';

    fields[field_key].field.forEach(plot => {
        var image;
        if (plot[2] == 'none') {image = 'none'}
        else if (plot[0] < 2) image = plot[0];
        else image = plot[2];

        const img = document.createElement('img');
        console.log("HERE"+plot);
        img.src = image_paths[image];
        img.classList.add('grid-image');
        grid.appendChild(img);
    });
}

function plant(field_key, seed_name) {
    const seed = seeds[seed_name];
    const plot = fields[field_key].field.findIndex(plot => plot[0] === 0 && plot[1] === 0 && plot[2] === 'none' && plot[3] === 0);
    if (plot !== -1) {
        const planted_day = day;

        if (seed.stock > 0) {
            seed.stock--;
            document.getElementById(`${seed_name}-seed-stock`).textContent = seed.stock;
            fields[field_key].field[plot] = [0, seed.time_to_harvest, seed.name, planted_day];
        }
    }

    updateFieldView(field_key);
}

function fertilizing(field_key) {
    const field   = fields[field_key];
    const product = products['fertilizer'];
    
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
    console.log('harvesting')
    fields[field_key].field.forEach((plot, index) => {
        if (plot[0] == 2) {
            const crop_key = plot[2];
            const crop     = harvest[plot[2]];

            if (field.info.fertilized && (Math.random() < 0.4)) {
                crop.stock += 2;
                document.getElementById(field_key).classList.remove('fertilized');
                document.getElementById(field_key).classList.add('unfetilized');
            }
            else crop.stock++;

            console.log(harvest);
            fields[field_key].field[index] = [0, 0, 'none', 0];
        }
    });

    fields[field_key].info.fertilized = false;

    updateFieldView(field_key);
}

function growFields() {
    for (const id in fields) {
        fields[id].field.forEach(plot => {
            if (plot[2] != 'none' && plot[0] < 2) {
                const elapsed_days = day - plot[3];
                const new_growing_state = Math.floor(elapsed_days / (plot[1] / 3));
                plot[0] = new_growing_state;
            }
        });
    }
}

function loadFields() {
    Object.keys(fields).forEach(field => {
        updateFieldView(field);
    });
}