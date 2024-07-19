class Food {
  constructor() {
    this.location = this.generateLocation();
  }
  generateLocation(snake) {
    let newLocation;
    do {
      newLocation = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
    } while (this.isOnSnake(newLocation, snake));
    return newLocation;
  }
  replace() {
    this.location = this.generateLocation();
  }
  isOnSnake(snake) {
    if (snake.body) {
      for (const segment of snake.body) {
        if (segment.x === this.location.x && segment.y === this.location.y) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Food;