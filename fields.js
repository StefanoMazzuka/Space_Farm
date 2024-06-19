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
        let image;
        if (plot[2] == 'none') {image = 'none'}
        else if (plot[0] < 2) image = plot[0];
        else image = plot[2];

        const img = document.createElement('img');
        img.src = image_paths[image];
        img.classList.add('grid-image');
        grid.appendChild(img);
    });
}

function plant(field_key, seed_name) {
    let seed = seeds[seed_name];
    console.log(seed)
    let plot = fields[field_key].field.findIndex(plot => plot[0] === 0 && plot[1] === 0 && plot[2] === 'none' && plot[3] === 0);
    if (plot !== -1) {
        let planted_day = day;

        if (seed.stock > 0) {
            seed.stock--;
            document.getElementById(`${seed_name}-seed-stock`).textContent = seed.stock;
            fields[field_key].field[plot] = [0, seed.time_to_harvest, seed, planted_day];
        }
    }

    updateFieldView(field_key);
}

function fertilizing(field_key) {
    let field   = fields[field_key];
    let product = products['fertilizer'];
    
    if (product.stock > 0 && !field.info.fertilized) {
        field.info.fertilized = true;
        product.stock--;
        document.getElementById('fertilizer-stock').textContent = product.stock;
        document.getElementById(field_key).classList.remove('unfetilized');
        document.getElementById(field_key).classList.add('fertilized');
    }
}

function harvesting(field_key) {
    let field = fields[field_key];
    console.log('harvesting')
    fields[field_key].field.forEach((plot, index) => {
        if (plot[0] == 2) {
            let crop_key = plot[2];
            let crop     = harvest[plot[2]];

            if (field.info.fertilized && (Math.random() < 0.4)) {
                crop.stock += 2;
                document.getElementById(field_key).classList.remove('fertilized');
                document.getElementById(field_key).classList.add('unfetilized');
            }
            else crop.stock++;

            document.getElementById(`harvest-${crop_key}-count`).textContent = crop.stock;
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
                let elapsed_days = day - plot[3];
                let new_growing_state = Math.floor(elapsed_days / (plot[1] / 3));
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