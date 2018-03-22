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
    this.decrement();
  }

  decrementInterval() {
    setInterval(() => this.renderTimer(), 1000);
  }
}

module.exports = Timer;