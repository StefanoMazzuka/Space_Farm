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
        const product = products['bed'];
        if (product.stock > 0) {
            playSound('sleep');
            nextDay();
            product.stock--;
            document.getElementById('bed-stock').textContent = product.stock;
        }
    });
}

function addClickEvent(img) {
    console.log(img.id)
    if (img.id in seeds) addClickEventPlant(img);
    else if (img.id in products) {
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

function loadControlPanelItems(panel_id, items, image_posfix) {
    const grid = document.getElementById(panel_id);
    grid.innerHTML = '';

    const table      = document.createElement('table');
    const first_row  = document.createElement('tr');
    const second_row = document.createElement('tr');

    Object.keys(items).forEach(item => {
        const img_cell = document.createElement('td');
        const img = document.createElement('img');
        img.src = image_paths[`${item}${image_posfix}`];
        img.id = `${item}`;
        img.className = 'img-item';
        img_cell.appendChild(img);
        first_row.appendChild(img_cell);
        addClickEvent(img);

        const stock_cell = document.createElement('td');
        stock_cell.textContent = items[item].stock;
        stock_cell.id = `${item}${image_posfix}-stock`;
        second_row.appendChild(stock_cell);
    });

    table.appendChild(first_row);
    table.appendChild(second_row);
    grid.appendChild(table);
}

function nextDay() {
    clearInterval(clock);
    day++;
    hour = 6;
    minute = 0;
    document.getElementById('day').textContent = day;
    growFields();
    startClock();
    updateFieldView(current_field);
    //updateMarket();
}

function loadInfo() {
    document.getElementById('day').textContent   = day.toString();
    document.getElementById('clock').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    document.getElementById('coins').textContent = coins.toString();
}

function loadControlPanel() {
    loadControlPanelItems('plant-panel', seeds, '-seed');
    loadControlPanelItems('products-panel', products, '');
    loadInfo();
}

document.getElementById('harvest').addEventListener('click', () => {
    harvesting(current_field);
});