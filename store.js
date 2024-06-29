document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();

    function addClickEventBuy(item, product_id, product, tag) {
        item.addEventListener('click', () => {
            if ((coins - product.buy_price) >= 0) {
                if (tag == 'fields' && !unloked_fields.includes(product_id)) {
                    coins -= product.buy_price;
                    document.getElementById('coins').textContent = coins;
                    playSound('sell');
                    unloked_fields.push(product_id);
                } else if (tag != 'fields') {
                    coins -= product.buy_price;
                    warehouse[tag][product_id].stock += 10;
                    document.getElementById('coins').textContent = coins;
                    playSound('sell');
                }
            }
        });
    }

    function loadStoreItems(panel_id, tag) {
        const items    = store[tag];
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
            text_cell.className = 'buy';
            addClickEventBuy(text_cell, i, item, tag);
            row.appendChild(text_cell);

            const price_cell = document.createElement('td');

            price_cell.textContent = `${item.buy_price}`;
            price_cell.className = 'info';
            row.appendChild(price_cell);

            const img_coin_cell = document.createElement('td');
            const img_coin = document.createElement('img');

            img_coin.src = image_paths['coin'];
            img_coin.className = 'img-item';
            img_coin_cell.appendChild(img_coin);
            row.appendChild(img_coin_cell);
    
            table.appendChild(row);
        });

        grid.appendChild(table);
    }

    function loadStore() {
        document.getElementById('coins').textContent = coins.toString();
        loadStoreItems('store-seeds-panel', 'seeds');
        loadStoreItems('store-products-panel', 'products');
        loadStoreItems('store-fields-panel', 'fields');
    }

    loadStore();

    window.addEventListener('beforeunload', saveToLocalStorage);
});