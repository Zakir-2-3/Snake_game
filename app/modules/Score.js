class Score {
  constructor() {
    this.currentScore = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
  }

  save() {
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      localStorage.setItem("highScore", this.highScore);
    }
  }

  updateDisplay() {
    const currentScoreElement = document.getElementById("current-score");
    const highScoreElement = document.getElementById("high-score");

    currentScoreElement.innerText = `Текущий счет: ${this.currentScore}`;
    highScoreElement.innerText = `Лучший счет: ${this.highScore}`;
  }
  reset() {
    this.currentScore = 0;
  }
}

export default Score;