loadFromLocalStorage();

function addClickEventSell(item, product_id, product, tag) {
    item.addEventListener('click', () => {
        console.log(item, product_id, product, tag);
        if (product.stock > 0) {
            coins += product.stock * product.sell_price;
            product.stock = 0;
            playSound('sell');
            loadWarehouse();
        }
    });
}

function loadWarehouseItems() {
    const panel_id = 'warehouse-harvest-panel';
    const tag      = 'harvest';
    const items    = warehouse[tag];
    const grid     = document.getElementById(panel_id);
    grid.innerHTML = '';

    const table = document.createElement('table');
    
    Object.keys(items).forEach(i => {
        const row              = document.createElement('tr');
        const item             = items[i];
        const img_product_cell = document.createElement('td');
        const img_product      = document.createElement('img');

        img_product.src = image_paths[i];
        img_product.className = 'img-item';
        img_product_cell.appendChild(img_product);
        row.appendChild(img_product_cell);
        
        const text_cell = document.createElement('td');

        text_cell.textContent = item.name;
        text_cell.className = 'sell';
        addClickEventSell(text_cell, i, item, tag);
        row.appendChild(text_cell);

        const stock_cell = document.createElement('td');

        stock_cell.textContent = item.stock;
        stock_cell.className = 'info';
        row.appendChild(stock_cell);

        const img_sell_cell = document.createElement('td');
        const img_sell = document.createElement('img');

        img_sell.src = image_paths['sell'];
        img_sell.className = 'img-item';
        img_sell_cell.appendChild(img_sell);
        addClickEventSell(img_sell_cell, i, item, tag);
        row.appendChild(img_sell_cell);

        table.appendChild(row);
    });

    grid.appendChild(table);
}

function loadMarketItems() {
    const panel_id = 'warehouse-market-panel';
    const tag      = 'harvest';
    const items    = warehouse[tag];
    const grid     = document.getElementById(panel_id);
    grid.innerHTML = '';

    const table = document.createElement('table');
    
    Object.keys(items).forEach(i => {
        const row              = document.createElement('tr');
        const item             = items[i];
        const img_product_cell = document.createElement('td');
        const img_product      = document.createElement('img');

        img_product.src = image_paths[i];
        img_product.className = 'img-item';
        img_product_cell.appendChild(img_product);
        row.appendChild(img_product_cell);
        
        const text_cell = document.createElement('td');

        text_cell.textContent = item.name;
        text_cell.className = 'sell';
        addClickEventSell(text_cell, i, item, tag);
        row.appendChild(text_cell);

        const price_cell = document.createElement('td');

        price_cell.textContent = item.sell_price;
        price_cell.className = 'info';
        price_cell.id = `${i}-market-demand`;
        row.appendChild(price_cell);

        const img_coin_cell = document.createElement('td');
        const img_coin = document.createElement('img');

        img_coin.src = image_paths['coin'];
        img_coin.className = 'img-item';
        img_coin_cell.appendChild(img_coin);
        row.appendChild(img_coin_cell);

        const img_fluctation_cell = document.createElement('td');
        const img_fluctation = document.createElement('img');
        const buy_price = store['seeds'][`${i}-seeds-box`].buy_price;

        if (item.sell_price > (buy_price * 0.12)) img_fluctation.src = image_paths['up'];
        else if (item.sell_price < (buy_price * 0.12)) img_fluctation.src = image_paths['down'];
        else img_fluctation.src = image_paths['blank'];
        img_fluctation_cell.appendChild(img_fluctation);
        row.appendChild(img_fluctation_cell);

        table.appendChild(row);
    });

    grid.appendChild(table);
}

function loadWarehouse() {
    document.getElementById('coins').textContent = coins.toString();
    loadMarketItems();
    loadWarehouseItems();
}

loadWarehouse();

window.addEventListener('beforeunload', saveToLocalStorage);