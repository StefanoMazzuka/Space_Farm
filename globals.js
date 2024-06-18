var coins = 0;

// play zone
var clock;
var time_scale    = 500;
var hour          = 0;
var minute        = 0;
var day;
var current_field = 0;
var current_seed  = 0;
var seeds_list    = ['wheat', 'lettuce', 'corn', 'tomato', 'dragon fruit']

var seeds = {
    wheat:        { name: 'wheat',        buy_price: 100,  sell_price: 12,  seed_stock_count: 7,   harvest_stock_count: 17 },
    lettuce:      { name: 'lettuce',      buy_price: 200,  sell_price: 24,  seed_stock_count: 19,  harvest_stock_count: 29 },
    corn:         { name: 'corn',         buy_price: 400,  sell_price: 48,  seed_stock_count: 43,  harvest_stock_count: 53 },
    tomato:       { name: 'tomato',       buy_price: 800,  sell_price: 96,  seed_stock_count: 91,  harvest_stock_count: 101 },
    dragon_fruit: { name: 'dragon fruit', buy_price: 1600, sell_price: 192, seed_stock_count: 187, harvest_stock_count: 197 }
  }
// market demand
var market_demand_wheat;
var market_demand_lettuce;
var market_demand_corn;
var market_demand_tomato;
var market_demand_dragon_fruit;

// warehouse

// seeds
var warehouse_seeds_wheat;
var warehouse_seeds_lettuce;
var warehouse_seeds_corn;
var warehouse_seeds_tomato;
var warehouse_seeds_dragon_fruit;

// products
var warehouse_products_fertilizer;

// harvest
var warehouse_harvest_wheat;
var warehouse_harvest_lettuce;
var warehouse_harvest_corn;
var warehouse_harvest_tomato;
var warehouse_harvest_dragon_fruit;