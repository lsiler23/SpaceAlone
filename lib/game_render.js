const AlertDirections = require('./alert_directions.js');
const Timer = require('./timer.js');

class GameRender {
  constructor() {
    this.timer = new Timer();
    this.currentDirective = {};
    this.interval = 0;
    this.points = 0;
    this.alertHistory = {
      hyperspeed: '',
      percolator: '',
      kazoomosphere: ''
    }
    this.createClickCheck = this.createClickCheck.bind(this);

    this.timer.decrementInterval();
  }

  renderPoints() {
    const renderer = document.getElementById('moves');
    renderer.innerHTML = `points: ${this.points}`;
  }

  createNewAlert() {
    const newAlert = new AlertDirections();
    let currentAlert = newAlert.renderDirection();

    while (currentAlert[0].currentOption === this.alertHistory[`${currentAlert[0].name}`]) {
      currentAlert = newAlert.renderDirection();
    }

    this.currentDirective = currentAlert[0];
    this.interval += 1;
    return currentAlert[1];
  }

  createClickCheck() {
    const currentGoal = document.getElementById(`${this.currentDirective.currentOption}`)
    currentGoal.removeEventListener('click', this.createClickCheck);
    this.points += 1
    this.alertHistory[`${this.currentDirective.name}`] = this.currentDirective.currentOption;
    this.renderPoints();
  }

  handleCheck(prevInterval) {
    const currentGoal = document.getElementById(`${this.currentDirective.currentOption}`);
    if (prevInterval < this.interval + 1) {
      currentGoal.addEventListener('click', this.createClickCheck);
    }
  }

  renderAlertTimeout() {
    const alertView = document.getElementById('alert-view-text');
    alertView.innerHTML = this.createNewAlert();
    this.handleCheck(this.interval);
  }

}

module.exports = GameRender;
