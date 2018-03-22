const AlertDirections = require('./alert_directions.js');
const Timer = require('./timer.js');
const Button = require('./button_logic.js');
const Slider = require('./slider_logic.js');

class GameRender {
  constructor() {
    this.timer = new Timer();
    this.currentDirective = {};
    this.interval = 0;
    this.points = 0;
    this.alertHistory = {
      hyperspeed: '',
      percolator: 'off',
      kazoomosphere: ''
    }
    this.createClickCheck = this.createClickCheck.bind(this);
    this.createSlideCheck = this.createSlideCheck.bind(this);
    this.timer.decrementInterval();
  }

  renderPoints() {
    const renderer = document.getElementById('moves');
    renderer.innerHTML = `points: ${this.points}`;
  }

  grabCorrectElement(option, name) {
    let found = document.getElementById(`${option}`);

    if (!found) {
      found = document.getElementById(`${name}`);
    }

    return found;
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
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name);
    currentGoal.removeEventListener('click', this.createClickCheck);

    if (type === 'button') {
      const currentButton = new Button(name);
      currentButton.handleClassToggle();
    }

    this.points += 1
    this.alertHistory[`${name}`] = currentOption;
    this.renderPoints();
  }

  createSlideCheck() {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name);
    const currentSlider = new Slider(name, currentOption);
    const dragAccuracy = currentSlider.checkForAccuracy();
    if (dragAccuracy) {
      debugger
      this.points += 1
      this.alertHistory[`${name}`] = currentOption;
      currentGoal.removeEventListener('mouseup', this.createSlideCheck);
    }

    this.renderPoints();
  }

  handleCheck(prevInterval) {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name);

    if (prevInterval < this.interval + 1) {
      if (type === 'slider') {
        currentGoal.addEventListener('mouseup', this.createSlideCheck);
      } else {
        currentGoal.addEventListener('click', this.createClickCheck);
      }
    }
  }

  renderAlertTimeout() {
    const alertView = document.getElementById('alert-view-text');
    alertView.innerHTML = this.createNewAlert();
    this.handleCheck(this.interval);
  }

}

module.exports = GameRender;
