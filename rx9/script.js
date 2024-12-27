const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;

let snake = [{ x: 200, y: 200 }];
let snakeDirection = 'right';
let snakeLength = 1;
let food = { x: 100, y: 100 };
let gameSpeed = 100;

document.addEventListener("keydown", changeDirection);
document.addEventListener("touchstart", handleTouchStart);

setInterval(gameLoop, gameSpeed);

function changeDirection(event) {
    if (event.key === "ArrowUp" && snakeDirection !== "down") {
        snakeDirection = "up";
    } else if (event.key === "ArrowDown" && snakeDirection !== "up") {
        snakeDirection = "down";
    } else if (event.key === "ArrowLeft" && snakeDirection !== "right") {
        snakeDirection = "left";
    } else if (event.key === "ArrowRight" && snakeDirection !== "left") {
        snakeDirection = "right";
    }
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = touchX - canvasRect.left;
    const canvasY = touchY - canvasRect.top;

    if (canvasX < canvas.width / 2 && canvasY < canvas.height / 2) {
        snakeDirection = "up";
    } else if (canvasX > canvas.width / 2 && canvasY > canvas.height / 2) {
        snakeDirection = "down";
    } else if (canvasX < canvas.width / 2) {
        snakeDirection = "left";
    } else {
        snakeDirection = "right";
    }
}

function gameLoop() {
    const head = { ...snake[0] };

    if (snakeDirection === "up") head.y -= 10;
    if (snakeDirection === "down") head.y += 10;
    if (snakeDirection === "left") head.x -= 10;
    if (snakeDirection === "right") head.x += 10;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        spawnFood();
    } else {
        snake.pop();
    }

    if (checkGameOver()) {
        alert("Game Over rayhan ! Press OK to restart.");
        resetGame();
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function checkGameOver() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    snakeDirection = 'right';
    snakeLength = 1;
    spawnFood();
}
