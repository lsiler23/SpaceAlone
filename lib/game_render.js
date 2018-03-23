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
      kazoomosphere: '1',
      oven: 'off',
      stress: '1',
      gorgonzola: '',
      letme: 'out',
      cosmicslop: 'asanorganicfacemask',
      zaboomafoominator: ''
    }
    this.createClickCheck = this.createClickCheck.bind(this);
    this.createSlideCheck = this.createSlideCheck.bind(this);
    this.timer.decrementInterval();
  }

  renderPoints() {
    const renderer = document.getElementById('moves');
    renderer.innerHTML = `points: ${this.points}`;
  }

  grabCorrectElement(option, name, type) {
    let found = document.getElementById(`${option}`);

    if (type === 'slider' || !found) {
      found = document.getElementById(`${name}`);
    }

    return found;
  }

  createNewAlert() {
    const newAlert = new AlertDirections();
    let currentAlert = newAlert.renderDirection();
    debugger
    while (currentAlert[0].currentOption === this.alertHistory[`${currentAlert[0].name}`]) {
      currentAlert = newAlert.renderDirection();
    }

    this.currentDirective = currentAlert[0];
    this.interval += 1;
    return currentAlert[1];
  }

  createClickCheck() {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    currentGoal.removeEventListener('click', this.createClickCheck);
    debugger
    if (type === 'button') {
      const currentButton = new Button(name);
      currentButton.handleClassToggle();
    }

    this.points += 1
    this.alertHistory[`${name}`] = currentOption;
    this.renderPoints();
  }

  createSlideCheck() {
    const { name, currentOption, type, optionRanges } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    const currentSlider = new Slider(name, currentOption, optionRanges);
    const dragAccuracy = currentSlider.checkForAccuracy();
    debugger
    if (dragAccuracy) {
      this.points += 1
      this.alertHistory[`${name}`] = currentOption;
    }

    currentGoal.removeEventListener('mouseup', this.createSlideCheck);
    this.renderPoints();
  }

  handleCheck(prevInterval) {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    debugger
    if (prevInterval < this.interval + 1) {
      if (type === 'slider') {
        debugger
        currentGoal.addEventListener('mouseup', this.createSlideCheck);
      } else {
        debugger
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
