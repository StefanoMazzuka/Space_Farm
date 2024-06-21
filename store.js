function addClickEventBuy(item, product_id, product, tag) {
    item.addEventListener('click', () => {
        if ((coins - product.buy_price) >= 0) {
            coins -= product.buy_price;
            warehouse[tag][product_id].stock += 10;
            document.getElementById('coins').textContent = coins; 
            console.log(warehouse);
            playSound('sell');
        }
    });
}

function loadStoreItems(panel_id, tag) {
    const items = store[tag];
    const grid = document.getElementById(panel_id);
    grid.innerHTML = '';

    const table      = document.createElement('table');
    const first_col  = document.createElement('tr');
    const second_col = document.createElement('tr');
    const third_col  = document.createElement('tr');
    const fourth_col = document.createElement('tr');
    
    Object.keys(items).forEach(i => {
        const item = items[i];
        const img_product_cell = document.createElement('td');
        const img_product = document.createElement('img');

        img_product.src = image_paths[i];
        img_product.className = 'img-item';
        img_product_cell.appendChild(img_product);
        first_col.appendChild(img_product_cell);
        
        const text_cell = document.createElement('td');

        text_cell.textContent = item.name;
        text_cell.className = 'buy';
        addClickEventBuy(text_cell, i, item, tag);
        second_col.appendChild(text_cell);

        const price_cell = document.createElement('td');

        price_cell.textContent = `${item.buy_price}`;
        price_cell.className = 'price';
        third_col.appendChild(price_cell);

        const img_coin_cell = document.createElement('td');
        const img_coin = document.createElement('img');

        img_coin.src = image_paths['coin'];
        img_coin.className = 'img-item';
        img_coin_cell.appendChild(img_coin);
        fourth_col.appendChild(img_coin_cell);
    });

    table.appendChild(first_col);
    table.appendChild(second_col);
    table.appendChild(third_col);
    table.appendChild(fourth_col);
    grid.appendChild(table);
}

function loadStore() {
    document.getElementById('coins').textContent = coins.toString();
    loadStoreItems('store-seeds-panel', 'seeds');
    loadStoreItems('store-products-panel', 'products');
}

loadStore();
console.log(warehouse['seeds']);