//Define Html element

const board = document.getElementById("game-board");
//Define game variables
let snake = [{ x: 10, y: 10 }]; //setting/initiliazing  the snake to the center
//draw game map, snake, food

function draw() {
  board.innerHTML = "";
  drawSnake();
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
draw();
