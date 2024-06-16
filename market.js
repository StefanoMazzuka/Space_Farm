// Inicialización de variables
const products = [
    { name: 'wheat', price: 1, demand: 1, last_sale: Date.now() },
    { name: 'lettuce', price: 5, demand: 1, last_sale: Date.now() },
    { name: 'corn', price: 10, demand: 1, last_sale: Date.now() },
    { name: 'tomato', price: 20, demand: 1, last_sale: Date.now() },
    { name: 'dragon fruit', price: 50, demand: 1, last_sale: Date.now() }
];
  
const rise_demand_time = 60000; // 1 minuto

// Función para fluctuar los prices de manera aleatoria
function fluctuatePrices() {
    products.forEach(product => {
        let fluctuation;
        let random = Math.random();
        if (random < 0.5) fluctuation = product.price - 1;
        else fluctuation = product.price + 1;
        product.price = Math.max(1, fluctuation);
    });
}

// Función para actualizar la demanda según las ventas y el tiempo
/*function updateDemand() {
    const time = Date.now();

    products.forEach(product => {
        const time_from_last_sale = time - product.last_sale;

        if (time_from_last_sale > rise_demand_time) {
        product.demand += 0.1; // Incrementar la demanda si hace tiempo que no se vende
        product.last_sale = time; // Resetear el tiempo de última venta
        }
    });
}*/
  
// Función para simular una venta de una product
function sellProduct(product_name, harvest_key, harvest_count_id) {
    if (window[harvest_key] > 0) {
        const product = products.find(p => p.name === product_name);
        coins += window[harvest_key] * product.price;
        window[harvest_key] = 0;
        document.getElementById(harvest_count_id).textContent = window[harvest_key];
        document.getElementById('total-coins').textContent = coins;      
        playSound('sell');

        if (product) {
            product.demand -= 0.2; // Disminuir la demanda al vender
            product.last_sale = Date.now(); // Actualizar el tiempo de última venta
            product.demand = Math.max(0.1, product.demand); // La demanda mínima es 0.1
        }
    }
}

function buyProduct(price, product_key, element_id) {
    if ((coins - price) >= 0) {
        coins -= price;
        window[product_key]++;
        document.getElementById(element_id).textContent = window[product_key];
        document.getElementById('total-coins').textContent = coins; 

        playSound('sell');
    }
}

function buyField(price, field_size) {
    if ((coins - price) >= 0) {
        coins -= price;
        if (field_size == 'small') addField(20);
        else if (field_size == 'mendium') addField(30);
        else addField(50);
        document.getElementById('total-coins').textContent = coins;   

        playSound('sell');
    }
}

// Función para actualizar los prices según la demanda
/*function adjustPricesOnDemand() {
    products.forEach(product => {
        product.price = Math.round(Math.max(1, product.price * product.demand));
        console.log(product.price)
    });
}*/

function updateMarketView() {
    function update(element_id, product_id, base_price, image_id) {
        let price = products[product_id].price;
        document.getElementById(element_id).textContent = price;
        
        let image_div = document.getElementById(image_id);
        image_div.innerHTML = ''
        if (price > base_price)  image_div.innerHTML = '<img src="resources/up.png">';
        else if (price < base_price)  image_div.innerHTML = '<img src="resources/down.png">';
        else image_div.innerHTML = '<img src="resources/blank.png">';
    }
    update('wheat-market-demand', 0, 1, 'market-demand-wheat-img');
    update('lettuce-market-demand', 1, 5, 'market-demand-lettuce-img');
    update('corn-market-demand', 2, 10, 'market-demand-corn-img');
    update('tomato-market-demand', 3, 20, 'market-demand-tomato-img');
    update('dragon-fruit-market-demand', 4, 50, 'market-demand-dragon-fruit-img');
}


// Función principal para actualizar el mercado
function updateMarket() {
    fluctuatePrices();
    //updateDemand();
    //adjustPricesOnDemand();
    updateMarketView();
}