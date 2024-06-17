// Inicialización de variables
const products = [
    { name: 'wheat',        buy_price: 100,  price: 12,  min_price: 7,   max_price: 17},
    { name: 'lettuce',      buy_price: 200,  price: 24,  min_price: 19,  max_price: 29},
    { name: 'corn',         buy_price: 400,  price: 48,  min_price: 43,  max_price: 53},
    { name: 'tomato',       buy_price: 800,  price: 96,  min_price: 91,  max_price: 101},
    { name: 'dragon fruit', buy_price: 1600, price: 192, min_price: 187, max_price: 197}
];

function fluctuatePrices() {
    products.forEach(product => {
        let fluctuation;
        let random = Math.random();
        if (random < 0.5) fluctuation = Math.max(product.min_price, (product.price - 1));
        else fluctuation = Math.min(product.max_price, (product.price + 1));
        product.price = Math.max(1, fluctuation);
    });
}

function sellProduct(product_name, harvest_key, harvest_count_id) {
    if (window[harvest_key] > 0) {
        const product = products.find(p => p.name === product_name);
        coins += window[harvest_key] * product.price;
        window[harvest_key] = 0;
        document.getElementById(harvest_count_id).textContent = window[harvest_key];
        document.getElementById('total-coins').textContent = coins;      
        playSound('sell');
    }
}

function buyProduct(product_name, product_count_key, element_id) {
    const product = products.find(p => p.name === product_name);
    if ((coins - product.buy_price) >= 0) {
        coins -= product.buy_price;
        window[product_count_key] += 10;
        document.getElementById(element_id).textContent = window[product_count_key];
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

function updateMarketView() {
    function update(element_id, product_name, image_id) {
        const product = products.find(p => p.name === product_name);
        document.getElementById(element_id).textContent = product.price;
        
        let image_div = document.getElementById(image_id);
        image_div.innerHTML = ''
        if (product.price > (product.buy_price * 0.12))  image_div.innerHTML = '<img src="resources/up.png">';
        else if (product.price < (product.buy_price * 0.12))  image_div.innerHTML = '<img src="resources/down.png">';
        else image_div.innerHTML = '<img src="resources/blank.png">';
    }
    update('wheat-market-demand', 'wheat', 'market-demand-wheat-img');
    update('lettuce-market-demand', 'lettuce', 'market-demand-lettuce-img');
    update('corn-market-demand', 'corn', 'market-demand-corn-img');
    update('tomato-market-demand', 'tomato', 'market-demand-tomato-img');
    update('dragon-fruit-market-demand', 'dragon fruit', 'market-demand-dragon-fruit-img');
}

function updateMarket() {
    fluctuatePrices();
    updateMarketView();
}