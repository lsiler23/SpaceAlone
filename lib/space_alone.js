const AlertDirections = require('./alert_directions.js');
const ControlGrid = require('./control_grid.js');

class Game {
  constructor() {
    this.controlGrid = new ControlGrid();
  }

  createNewAlert() {
    const newAlert = new AlertDirections();
    return newAlert.renderDirection();
  }

  renderAlertTimeout() {
    const alertView = document.getElementById('alert-view-text');
    alertView.innerHTML = this.createNewAlert();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.renderAlertTimeout();
  // setInterval(() => game.renderAlertTimeout(), 2000);
});
