const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;
let snake = [];
snake[0] = {
  x: [Math.floor(Math.random() * columns)] * scale,
  y: [Math.floor(Math.random() * rows)] * scale,
};

let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};

let d = "right";

document.onkeydown = direction;

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

let playGame = setInterval(draw, 100);

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#fff";
    context.strokmeStyle = "pink";
    context.fillRect(snake[i].x, snake[i].y, scale, scale);
    context.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  //draw food

  context.fillStyle = "#ff0";
  context.strokmeStyle = "green";
  context.fillRect(food.x, food.y, scale, scale);
  context.strokeRect(food.x, food.y, scale, scale);

  //old head position

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction

  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }

  if (snakeX < 0) {
    snakeX = canvas.width;
  }

  if (snakeY < 0) {
    snakeY = canvas.height;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (eatSelf(newHead, snake)) {
    clearInterval(playGame);
  }

  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

// check if snake is eating itself
function eatSelf(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
