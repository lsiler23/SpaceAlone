class Timer {
  constructor() {
    this.timeCount = 60;
  }

  decrement() {
    this.timeCount -= 1;
  }

  renderTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = `time left: ${this.timeCount}`;

    if (this.timeCount >= 0) {
      this.decrement();
    }
  }

  resetTimer() {
    this.timeCount = 60;
  }

  decrementInterval() {
    this.renderTimer();
    setInterval(() => {
      if (this.timeCount >= 0) {
        return this.renderTimer();
      }
    }, 1000);
  }
}

module.exports = Timer;
