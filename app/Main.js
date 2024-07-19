import Snake from "./modules/Snake.js";
import Food from "./modules/Food.js";
import Score from "./modules/Score.js";

class Game {
  constructor() {
    this.snake = new Snake(10, 10);
    this.food = new Food();
    this.score = new Score();
    this.rows = 10;
    this.columns = 10;
    this.intervalId = null;
  }
  draw() {
    const board = document.querySelector(".game-board");
    board.innerHTML = "";

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        for (let i = 0; i < this.snake.body.length; i++) {
          if (this.snake.body[i].x === col && this.snake.body[i].y === row) {
            cell.classList.add("snake");
          }
        }

        if (
          this.food.location.x === col &&
          this.food.location.y === row &&
          !this.food.isOnSnake(this.snake)
        ) {
          cell.classList.add("food");
        }

        board.appendChild(cell);
      }
    }
    this.score.updateDisplay();
  }

  reset() {
    this.snake = new Snake(this.rows, this.columns);
    this.food = new Food();
    this.score.reset();
    this.draw();
  }

  hitSelf() {
    const head = this.snake.body[0];

    for (let i = 1; i < this.snake.body.length; i++) {
      if (head.y === this.snake.body[i].y && head.x === this.snake.body[i].x) {
        return true;
      }
    }
    return false;
  }
  update() {
    this.snake.move();
    const popUpEndGame = document.querySelector(".result-popup");
    const btn2 = document.querySelector("#btn2");
    if (this.hitSelf() || this.snake.hitWall(this.rows, this.columns)) {
      popUpEndGame.innerHTML = `<p>ПОТРАЧЕНО ;(</p> <p>СЧЕТ: ${this.score.currentScore}</p>`;
      popUpEndGame.style.display = "flex";
      this.score.save();
      clearInterval(this.intervalId);
      return;
    }
    btn2.addEventListener("click", () => {
      clearInterval(this.intervalId);
      this.reset();
      popUpEndGame.style = "display: none";
      this.intervalId = setInterval(() => {
        this.update();
      }, 300);
    });

    this.draw();

    if (this.snake.eat(this.food)) {
      this.food.replace();
      this.score.currentScore += 1;
      this.score.updateDisplay();
      this.score.save();
    }
  }
}

let game = new Game();
game.draw();

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      game.snake.changeDirection("up");
      break;
    case "ArrowDown":
      game.snake.changeDirection("down");
      break;
    case "ArrowLeft":
      game.snake.changeDirection("left");
      break;
    case "ArrowRight":
      game.snake.changeDirection("right");
      break;
    case "KeyW":
      game.snake.changeDirection("up");
      break;
    case "KeyS":
      game.snake.changeDirection("down");
      break;
    case "KeyA":
      game.snake.changeDirection("left");
      break;
    case "KeyD":
      game.snake.changeDirection("right");
      break;
  }
});

btn.addEventListener("click", () => {
  btn.style = "display: none";
  btn2.style = "display: block";
  game.intervalId = setInterval(() => {
    game.update();
  }, 300);
});
