document.addEventListener("DOMContentLoaded", function() {
    const helloButton = document.getElementById("helloButton");
    const helloContainer = document.getElementById("helloContainer");

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
