const AlertDirections = require('./alert_directions.js');

class Game {
  constructor() {
    this.createNewAlert = this.createNewAlert.bind(this);
  }

  createNewAlert() {
    const newAlert = new AlertDirections();
    return newAlert.renderDirection();
  }

  renderAlertTimeout() {
    return () => {
      const alertView = document.getElementById('alert-view-text');
      alertView.innerHTML = this.createNewAlert();
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  setInterval(game.renderAlertTimeout(), 2000);
});
