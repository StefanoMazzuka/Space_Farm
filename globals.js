var image_paths = {
  'coin': 'resources/coin.png',
  'sell': 'resources/sell.png',

  'blank': 'resources/blank.png',
  'up': 'resources/up.png',
  'down': 'resources/down.png',

  'wheat': 'resources/wheat.png',
  'lettuce': 'resources/lettuce.png',
  'corn': 'resources/corn.png',
  'tomato': 'resources/tomato.png',
  'dragonfruit': 'resources/dragonfruit.png',

  'wheat-seed': 'resources/wheat-seed.png',
  'lettuce-seed': 'resources/lettuce-seed.png',
  'corn-seed': 'resources/corn-seed.png',
  'tomato-seed': 'resources/tomato-seed.png',
  'dragonfruit-seed': 'resources/dragonfruit-seed.png',

  'wheat-seeds-box': 'resources/wheat-seeds-box.png',
  'lettuce-seeds-box': 'resources/lettuce-seeds-box.png',
  'corn-seeds-box': 'resources/corn-seeds-box.png',
  'tomato-seeds-box': 'resources/tomato-seeds-box.png',
  'dragonfruit-seeds-box': 'resources/dragonfruit-seeds-box.png',

  'fertilizer': 'resources/fertilizer.png',
  'bed': 'resources/bed.png',

  'small-field': 'resources/small-field.png',
  'medium-field': 'resources/medium-field.png',
  'large-field': 'resources/large-field.png',

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
var unloked_fields = [];

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
  'wheat-seed': { 
    name: 'wheat seed',
    time_to_harvest: 3
  },
  'lettuce-seed': {
    name: 'lettuce seed',
    time_to_harvest: 3
  },
  'corn-seed': {
    name: 'corn seed',
    time_to_harvest: 6
  },
  'tomato-seed': {
    name: 'tomato seed',
    time_to_harvest: 6
  },
  'dragonfruit-seed': {
    name: 'dragon fruit seed',
    time_to_harvest: 9
  }
}

var store = {
  seeds: {
    'wheat-seeds-box': { 
      name: '10 Wheat seeds',
      buy_price: 100
    },
    'lettuce-seeds-box': {
      name: '10 lettuce seeds',
      buy_price: 200
    },
    'corn-seeds-box': {
      name: '10 corn seeds',
      buy_price: 400
    },
    'tomato-seeds-box': {
      name: '10 tomato seeds',
      buy_price: 800
    },
    'dragonfruit-seeds-box': {
      name: '10 dragon fruit seeds',
      buy_price: 1600,
    }
  },
  products: {
    'fertilizer': { 
      name: '1 Fertilizer',
      buy_price: 50
    },
    'bed': { 
      name: '1 Bed',
      buy_price: 100
    }
  },
  fields: {
    'small-field': { 
      name: 'Small field',
      buy_price: 2500
    },
    'medium-field': { 
      name: 'Medium field',
      buy_price: 5000
    },
    'large-field': { 
      name: 'Large field',
      buy_price: 10000
    }
  }
}

var warehouse = {
  seeds: {
    'wheat-seeds-box': { 
      name: '10 Wheat seeds',
      stock: 10
    },
    'lettuce-seeds-box': {
      name: '10 lettuce seeds',
      stock: 0
    },
    'corn-seeds-box': {
      name: '10 corn seeds',
      stock: 0
    },
    'tomato-seeds-box': {
      name: '10 tomato seeds',
      stock: 0
    },
    'dragonfruit-seeds-box': {
      name: '10 dragon fruit seeds',
      stock: 0
    }
  },
  products: {
    'fertilizer': { 
      name: '1 Fertilizer',
      stock: 1
    },
    'bed': { 
      name: '1 Bed',
      stock: 2
    }
  },
  harvest: {
    'wheat': { 
      name: 'wheat',
      stock: 0,
      sell_price: 12
    },
    'lettuce': {
      name: 'lettuce',
      stock: 0,
      sell_price: 24
    },
    'corn': {
      name: 'corn',
      stock: 0,
      sell_price: 48
    },
    'tomato': {
      name: 'tomato',
      stock: 0,
      sell_price: 96
    },
    'dragonfruit': {
      name: 'dragon fruit',
      stock: 0,
      sell_price: 192
    }
  }
}