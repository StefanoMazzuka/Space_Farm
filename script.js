let currentNumber = 0;
let generalCounter = 0;
let intervalId;

document.getElementById('start-button').addEventListener('click', startCounting);
document.getElementById('reset-button').addEventListener('click', resetCounter);

function startCounting() {
    document.getElementById('start-button').disabled = true;
    intervalId = setInterval(incrementNumber, 10000);
}

function incrementNumber() {
    if (currentNumber < 5) {
        currentNumber++;
        document.getElementById('number-display').innerText = currentNumber;
    } else {
        clearInterval(intervalId);
        document.getElementById('reset-button').disabled = false;
    }
}

function resetCounter() {
    if (currentNumber === 5) {
        generalCounter++;
        document.getElementById('general-counter').innerText = `Contador General: ${generalCounter}`;
        document.getElementById('reset-button').disabled = true;
        document.getElementById('start-button').disabled = false;
        currentNumber = 0;
        document.getElementById('number-display').innerText = currentNumber;
    }
}
