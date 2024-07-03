loadFromLocalStorage();

const reset_btn = document.getElementById('reset-btn');

loadFields();
loadControlPanel();

reset_btn.addEventListener('click', () => {
    localStorage.clear();

    coins  = 0;
    day    = 1;
    hour   = 0;
    minute = 0;
    clock;
    current_field = 'field-1';
    current_seed;
    unloked_fields = ['field-1'];

    fields = {
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

    seeds = {
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

    store = {
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
                buy_price: 30
            }
        }
    }

    warehouse = {
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
                sell_price: 13
            },
            'lettuce': {
              name: 'lettuce',
              stock: 0,
              sell_price: 26
            },
            'corn': {
              name: 'corn',
              stock: 0,
              sell_price: 52
            },
            'tomato': {
              name: 'tomato',
              stock: 0,
              sell_price: 104
            },
            'dragonfruit': {
              name: 'dragon fruit',
              stock: 0,
              sell_price: 208
            }
        }
    }

    loadFields();
    loadControlPanel();
    clearInterval(clock);
    
    saveToLocalStorage();
    loadFromLocalStorage();
});

window.addEventListener('beforeunload', saveToLocalStorage);