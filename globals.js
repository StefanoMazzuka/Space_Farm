var image_paths = {
  'wheat': 'resources/wheat.png',
  'lettuce': 'resources/lettuce.png',
  'corn': 'resources/corn.png',
  'tomato': 'resources/tomato.png',
  'dragonfruit': 'resources/dragon-fruit.png',
  'wheat-seed': 'resources/wheat-seed.png',
  'lettuce-seed': 'resources/lettuce-seed.png',
  'corn-seed': 'resources/corn-seed.png',
  'tomato-seed': 'resources/tomato-seed.png',
  'dragonfruit-seed': 'resources/dragonfruit-seed.png',
  'fertilizer': 'resources/fertilizer.png',
  'bed': 'resources/bed.png',
  'none': 'resources/none.png',
  '0': 'resources/grow-0.png',
  '1': 'resources/grow-1.png',
};

var coins      = 0;
var day        = 1;
var time_scale = 500;
var hour       = 0;
var minute     = 0;
var clock;
var current_field = 'field-1';
var current_seed;

var fields = {
  'field-1': { 
      info: {
          fertilized: false
      },
      field: Array(20).fill([0, 0, 'none', 0])
  },
  'field-2': { 
      info: {
          fertilized: false
      },
      field: Array(60).fill([0, 0, 'none', 0])
  },
  'field-3': { 
      info: {
          fertilized: false
      },
      field: Array(40).fill([0, 0, 'none', 0])
  },
  'field-4': { 
      info: {
          fertilized: false
      },
      field: Array(20).fill([0, 0, 'none', 0])
  }
}

var seeds = {
  'wheat': { 
    name: 'wheat',
    buy_price: 100,
    stock: 5,
    time_to_harvest: 3
  },
  'lettuce': {
    name: 'lettuce',
    buy_price: 200,
    stock: 0,
    time_to_harvest: 3
  },
  'corn': {
    name: 'corn',
    buy_price: 400,
    stock: 0,
    time_to_harvest: 6
  },
  'tomato': {
    name: 'tomato',
    buy_price: 800,
    stock: 0,
    time_to_harvest: 6
  },
  'dragonfruit': {
    name: 'dragon fruit',
    buy_price: 1600,
    stock: 0,
    time_to_harvest: 9
  }
}

var harvest = {
  'wheat': { 
    name: 'wheat',
    buy_price: 100,
    sell_price: 12,
    stock: 0
  },
  'lettuce': {
    name: 'lettuce',
    buy_price: 200,
    sell_price: 24,
    stock: 0
  },
  'corn': {
    name: 'corn',
    buy_price: 400,
    sell_price: 48,
    stock: 0
  },
  'tomato': {
    name: 'tomato',
    buy_price: 800,
    sell_price: 96,
    stock: 0
  },
  'dragonfruit': {
    name: 'dragon fruit',
    buy_price: 1600,
    sell_price: 192,
    stock: 0
  }
}

var products = {
  'fertilizer': { 
    name: 'fertilizer',
    buy_price: 50,
    stock: 2
  },
  'bed': { 
    name: 'bed',
    buy_price: 100,
    stock: 2
  }
}