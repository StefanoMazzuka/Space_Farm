document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('fields', JSON.stringify(fields));
        localStorage.setItem('seeds', JSON.stringify(seeds));
        localStorage.setItem('harvest', JSON.stringify(harvest));
        localStorage.setItem('products', JSON.stringify(products));
    }

    function loadFromLocalStorage() {
        fields_loaded = localStorage.getItem('fields');
        fields = fields_loaded ? JSON.parse(fields_loaded): fields;

        seeds_loaded = localStorage.getItem('seeds');
        seeds = seeds_loaded ? JSON.parse(seeds_loaded): seeds;

        harvest_loaded = localStorage.getItem('harvest');
        harvest = harvest_loaded ? JSON.parse(harvest_loaded): harvest;

        products_loaded = localStorage.getItem('products');
        products = products_loaded ? JSON.parse(products_loaded): products;

        loadFields();
        loadControlPanel();
    }

    window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
    //window.addEventListener('beforeunload', saveToLocalStorage);
});