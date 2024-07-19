import Food from "./Food.js";

class Snake {
  constructor(rows, cols) {
    this.food = new Food();
    this.rows = rows;
    this.cols = cols;
    this.initialize();
  }

  initialize() {
    this.body = [
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    this.direction = "left";
  }

  move() {
    const head = { ...this.body[0] };

    switch (this.direction) {
      case "up":
        head.y -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
    }

    this.body.splice(0, 0, head);

    head.x === this.food.location.x && head.y === this.food.location.y
      ? this.food.replace()
      : this.body.pop();
  }

  hitWall(rows, columns) {
    const head = this.body[0];

    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows)
      return true;
  }

  eat(food) {
    const head = this.body[0];
    if (head.x === food.location.x && head.y === food.location.y) {
      this.body.push({ ...this.body[this.body.length - 1] });
      return true;
    }
    return false;
  }

  changeDirection(newDirection) {
    const oppositeDirections = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };
    if (newDirection !== oppositeDirections[this.direction]) {
      this.direction = newDirection;
    }
  }
}

export default Snake;