document.addEventListener('DOMContentLoaded', () => {  
    function loadItems(panel_id, items, image_posfix) {
        const grid = document.getElementById(panel_id);
        grid.innerHTML = '';
    
        const table = document.createElement('table');
        const first_row = document.createElement('tr');
        const second_row = document.createElement('tr');
    
        Object.keys(items).forEach(item => {
            const img_cell = document.createElement('td');
            const img = document.createElement('img');
            img.src = image_paths[`${item}${image_posfix}`];
            img.id = `${item}`;
            if (image_posfix == '-seed') img.className = 'img-item plant';
            else img.className = 'img-item';
            img_cell.appendChild(img);
            first_row.appendChild(img_cell);
    
            const stock_cell = document.createElement('td');
            stock_cell.textContent = items[item].stock;
            stock_cell.id = `${item}${image_posfix}-stock`;
            second_row.appendChild(stock_cell);
        });
    
        table.appendChild(first_row);
        table.appendChild(second_row);
        grid.appendChild(table);
    }
    
    function loadControlPanel() {
        loadItems('plant-panel', seeds, '-seed');
        loadItems('products-panel', products, '');
    }

    initializeFields();
    loadControlPanel();

    const seeds_to_plant = document.querySelectorAll('.plant');

    seeds_to_plant.forEach(seed => {
        seed.addEventListener('click', () => {
            console.log(fields, current_field, seed.id)
            plant(current_field, seed.id);
        });
    });
});