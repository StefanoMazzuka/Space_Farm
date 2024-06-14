document.addEventListener("DOMContentLoaded", function() {
    const helloButton = document.getElementById("helloButton");
    const helloContainer = document.getElementById("helloContainer");
    const fields = [
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1]
    ];

// Convertir la lista a JSON y guardarla en localStorage
localStorage.setItem('cachedData', JSON.stringify(data));

// Recuperar los datos de localStorage y convertirlos de JSON a una lista de listas
const cachedData = JSON.parse(localStorage.getItem('cachedData'));

// Mostrar los datos en consola
console.log(cachedData);







    // Function to load saved hellos from localStorage
    function loadHellos() {
        const savedHellos = localStorage.getItem("hellos");
        if (savedHellos) {
            for (let i = 0; i < savedHellos; i++) {
                addHello();
            }
        }
    }

    // Function to add a hello to the container
    function addHello() {
        const helloElement = document.createElement("div");
        helloElement.textContent = "Hello";
        helloContainer.appendChild(helloElement);
    }

    // Function to update the localStorage
    function updateLocalStorage() {
        const helloCount = helloContainer.childElementCount;
        localStorage.setItem("hellos", helloCount);
    }

    // Button click event listener
    helloButton.addEventListener("click", function() {
        addHello();
        updateLocalStorage();
    });

    // Load hellos on page load
    loadHellos();
});
