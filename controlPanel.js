function addClickEventPlant(seed) {
    seed.addEventListener('click', () => {
        plant(current_field, seed.id);
    });
}

function addClickEventFertilize(product) {
    product.addEventListener('click', () => {
        fertilizing(current_field);
    });
}

function addClickEventSleep(product) {
    product.addEventListener('click', () => {
        const product = warehouse['products']['bed'];
        if (product.stock > 0) {
            playSound('sleep');
            nextDay();
            product.stock--;
            document.getElementById('bed-stock').textContent = product.stock;
        }
    });
}

function addClickEvent(img, tag) {
    if (tag == 'seeds') addClickEventPlant(img);
    else if (tag == 'products') {
        switch (img.id) {
            case "fertilizer":
                addClickEventFertilize(img);
                break;
            case "bed":
                addClickEventSleep(img);
        default:
            break;
        }
    }
}

function loadControlPanelItems(panel_id, tag, is_seed) {
    const items = warehouse[tag];
    const grid  = document.getElementById(panel_id);
    grid.innerHTML = '';

    const table      = document.createElement('table');
    const first_row  = document.createElement('tr');
    const second_row = document.createElement('tr');

    Object.keys(items).forEach(item => {
        const img_cell = document.createElement('td');
        const img      = document.createElement('img');
        const img_id   = is_seed ? item.replace('s-box', ''): item;
        img.src        = image_paths[img_id];
        img.id         = img_id;
        img.className  = 'img-item';
        img_cell.appendChild(img);
        first_row.appendChild(img_cell);
        addClickEvent(img, tag);

        const stock_cell       = document.createElement('td');
        stock_cell.textContent = items[item].stock;
        stock_cell.id          = `${img_id}-stock`;
        second_row.appendChild(stock_cell);
    });

    table.appendChild(first_row);
    table.appendChild(second_row);
    grid.appendChild(table);
}

function loadInfo() {
    document.getElementById('day').textContent   = day.toString();
    document.getElementById('clock').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    document.getElementById('coins').textContent = coins.toString();
}

function loadControlPanel() {
    loadControlPanelItems('plant-panel', 'seeds', true);
    loadControlPanelItems('products-panel', 'products', false);
    loadInfo();
}

document.getElementById('harvest').addEventListener('click', () => {
    harvesting(current_field);
});