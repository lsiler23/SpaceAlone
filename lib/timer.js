class Timer {
  constructor() {
    this.timeCount = 20;
  }

  decrement() {
    this.timeCount -= 1;
  }

  renderTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = `time left: ${this.timeCount}`;
    if (this.timeCount >= 0) {
      this.decrement();
    } else {
      timerElement.innerHTML = 'GAME OVER';
    }
  }

  decrementInterval() {
    setInterval(() => {
      if (this.timeCount >= 0) {
        return this.renderTimer();
      }
    }, 1000);
  }
}

module.exports = Timer;
