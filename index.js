//Define Html element

const board = document.getElementById("game-board");
const instruction = document.getElementById("insrtuction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
//Define game variables

const gridSize = 20;
let snake = [{ x: 10, y: 10 }]; //setting/initiliazing  the snake to the center
let food = generateFood();
let highScore = 0;
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//draw game map, snake, food

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

//Draw Snake
function drawSnake() {
  //segment is { x: 10, y: 10 }
  snake.forEach((segment) => {
    //createGameElement()is responsible to create snakeElement and giving it snake class
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

//Creating a Snake or food cube/div

function createGameElement(tag, className) {
  //it creates a div with a className of snake
  const element = document.createElement(tag); //it creates div
  element.className = className;

  return element;
}
//set the position of snake or food
function setPosition(element, position) {
  //horizontal axis
  element.style.gridColumn = position.x; //element parameter with the css property with the position of x from the snake var
  //vertical axix
  element.style.gridRow = position.y; //element parameter with the css property with the position of y from the snake var
}

//Testing draw func
//draw();

function drawFood() {
  //if there's no food on the board, then we generate one
  if (gameStarted) {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    //appending the acutal food to the board
    board.appendChild(foodElement);
  }
}
function generateFood() {
  //generates random number from 0-1 eg:0.321,0.4,0.99999
  //.floor to generate an whole number
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

//Moving the snake
function move() {
  // creates a new object (head) by using the spread syntax ({...}) to copy the properties of the first element of the snake array into the new object.
  const head = { ...snake[0] }; //copy of original array
  switch (direction) {
    case "up":
      head.y--; //it starts from 10 wo we need to go down in numbers to go up
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }
  snake.unshift(head); //add head object at the start of snake array

  //if not then the snake just grows only
  //snake.pop(); //to move the snake
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); //clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop(); //remove tail
  }
}

//Test moving
// setInterval(() => {
//   move(); //Move first
//   draw(); //Then draw again new positin
// }, 200);

//Start Game Function

function startGame() {
  gameStarted = true; //keep track of a running game
  instruction.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

//Key press Event listiner
function handelKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}
document.addEventListener("keydown", handelKeyPress);

function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  //
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
}
function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instruction.style.display = "block";
  logo.style.display = "block";
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    (highScoreText.textContent = highScore.toString()).padStart(3, "0");
  }
  highScoreText.style.display = "block";
}
