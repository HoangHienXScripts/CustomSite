const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let dx;
let dy;
let score;
let gameOver;

function startGame() {
  snake = [
    { x: 10, y: 10 }
  ];

  dx = 1;
  dy = 0;

  score = 0;
  gameOver = false;

  scoreText.textContent = "Score: 0";

  food = createFood();

  gameLoop();
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;

    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;

    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;

    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;

    case "Enter":
      if (gameOver) {
        startGame();
      }
      break;
  }
}

function gameLoop() {
  if (gameOver) {
    drawGameOver();
    return;
  }

  moveSnake();
  checkCollision();
  draw();

  setTimeout(gameLoop, 100);
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;

    scoreText.textContent = `Score: ${score}`;

    food = createFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];

  // Hit wall
  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount
  ) {
    gameOver = true;
    return;
  }

  // Hit itself
  for (let i = 1; i < snake.length; i++) {
    if (
      head.x === snake[i].x &&
      head.y === snake[i].y
    ) {
      gameOver = true;
      return;
    }
  }
}

function draw() {
  // Clear screen
  ctx.fillStyle = "#222";
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Draw food
  ctx.fillStyle = "red";

  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );

  // Draw snake
  snake.forEach((part, index) => {
    ctx.fillStyle =
      index === 0 ? "#8bc34a" : "#4caf50";

    ctx.fillRect(
      part.x * gridSize,
      part.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  });
}

function createFood() {
  let newFood;

  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (
    snake.some(
      part =>
        part.x === newFood.x &&
        part.y === newFood.y
    )
  );

  return newFood;
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.font = "35px Arial";
  ctx.fillText(
    "Game Over!",
    canvas.width / 2,
    170
  );

  ctx.font = "20px Arial";
  ctx.fillText(
    `Score: ${score}`,
    canvas.width / 2,
    210
  );

  ctx.fillText(
    "Press Enter to restart",
    canvas.width / 2,
    250
  );
}

// Start the game
startGame();
