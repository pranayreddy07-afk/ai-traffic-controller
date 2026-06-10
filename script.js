const canvas = document.getElementById("trafficCanvas");
const ctx = canvas.getContext("2d");

let animationId;
let vehicles = [];

class Vehicle {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 15);
    }
}

function drawRoad() {
    ctx.fillStyle = "#444";
    ctx.fillRect(400, 0, 200, 800);

    ctx.strokeStyle = "yellow";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 800);
    ctx.stroke();
}

function spawnVehicle() {
    const x = 450;
    const speed = 2 + Math.random() * 3;

    vehicles.push(
        new Vehicle(
            x,
            -20,
            speed,
            `rgb(${Math.random()*255},
                 ${Math.random()*255},
                 ${Math.random()*255})`
        )
    );
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();

    vehicles.forEach(vehicle => {
        vehicle.move();
        vehicle.draw();
    });

    vehicles = vehicles.filter(v => v.y < canvas.height);

    animationId = requestAnimationFrame(update);
}

document.getElementById("startBtn").addEventListener("click", () => {
    clearInterval(window.vehicleSpawner);
    window.vehicleSpawner = setInterval(spawnVehicle, 1000);
    update();
});

document.getElementById("stopBtn").addEventListener("click", () => {
    cancelAnimationFrame(animationId);
    clearInterval(window.vehicleSpawner);
});
