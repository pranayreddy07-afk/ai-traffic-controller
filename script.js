let vehicle = document.getElementById("vehicle");
let statusText = document.getElementById("status");
let countText = document.getElementById("count");

let position = 0;
let vehicleCount = 0;
let interval;
let signalIndex = 0;

const signals = [
    { color: "red", text: "STOP" },
    { color: "green", text: "GO" },
    { color: "yellow", text: "WAIT" }
];

function updateSignal() {

    document.getElementById("red").classList.remove("active");
    document.getElementById("yellow").classList.remove("active");
    document.getElementById("green").classList.remove("active");

    document
        .getElementById(signals[signalIndex].color)
        .classList.add("active");

    statusText.innerText = signals[signalIndex].text;

    signalIndex = (signalIndex + 1) % signals.length;
}

function moveVehicle() {

    const currentSignal =
        signals[(signalIndex + 2) % signals.length].color;

    if (currentSignal === "green") {
        position += 5;
        vehicle.style.left = position + "px";
    }

    if (position > 1000) {
        position = -50;
        vehicleCount++;
        countText.innerText = vehicleCount;
    }
}

function startSimulation() {

    interval = setInterval(() => {
        updateSignal();
    }, 3000);

    setInterval(() => {
        moveVehicle();
    }, 50);
}

function stopSimulation() {
    clearInterval(interval);
}
