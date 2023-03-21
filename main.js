let height = 500;
let width = 800;

let highScore = 0;

function setup() {
  createCanvas(width, height);
  highScore = localStorage.getItem("birdScore");
  alert(highScore);
}

let x = 0;
let y = 100;
let gravity = 0.5;
let yV = 0;

const massHeight = 200;

let array = [randomInteger(30, 500 - 30 - massHeight)];
let arrayX = [0];

let gameInProgress = 1;

const massWidth = 10;

function draw() {
  if (gameInProgress == 1) {
    checkBird();
    checkScreen();
    background(200, 200, 200);
    drawBird();
    if (x % 100 == 0) {
      arrayX.push(x - 100 * arrayX.length);
      array.push(randomInteger(30, 500 - 70 - massHeight));
    }
    for (let i = 0; i < arrayX.length; i += 1) {
      drawRect(arrayX[i], array[i]);
    }
    strokeWeight(1);
    text(`Score: ${score}`, 10, 20);
    if (highScore != null) {
      text(`High Score: ${highScore}`, 10, 490);
    }
  }
  if (gameInProgress == 0) {
    strokeWeight(0);
    fill(255, 0, 14);
    text("Game Over, Press R", width / 2.5, height / 2);
    if (highScore == null) {
      highScore = score;
    }
    if (score > highScore) {
      highScore = score;
    }
    localStorage.setItem("birdScore", highScore);
  }
}

function drawRect(xi, yi) {
  rectMode(CORNERS);
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(0, 0, 0);
  rect(800 - massWidth - xi, 0, 800 - xi, yi);
  rect(800 - massWidth - xi, yi + massHeight, 800 - xi, 500);
}

function drawBird() {
  stroke(0, 0, 0);
  strokeWeight(0);
  fill(50, 168, 155);
  ellipse(400, y, 10 * 2);

  x += 1;
  for (let i = 0; i < arrayX.length; i += 1) {
    arrayX[i] += 1;
  }
  yV += gravity;
  y += yV;
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function checkScreen() {
  if (y >= 500) {
    gameInProgress = 0;
  }
  if (y < 0) {
    gameInProgress = 0;
  }
}

function checkBird() {
  let massNumber = 0;
  for (let i = 0; i < arrayX.length; i += 1) {
    if (arrayX[i] >= 410) {
      massNumber = i + 1;
    }
    if (arrayX[i] <= 410 && arrayX[i] >= 380) {
      if (y + 10 < array[i]) {
        gameInProgress = 0;
      }
      if (y - 10 > array[i] + massHeight) {
        gameInProgress = 0;
      }
    }
  }
  score = massNumber;
}

function keyPressed() {
  if (keyCode == 32) {
    yV = -10;
  }
  if (keyCode == 82) {
    window.location.reload();
  }
}
