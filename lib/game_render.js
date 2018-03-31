const AlertDirections = require('./alert_directions.js');
const Timer = require('./timer.js');
const Button = require('./button_logic.js');
const Slider = require('./slider_logic.js');
const Dial = require('./dial_logic.js');

class GameRender {
  constructor(currentLevel) {

    if (this.playGameInterval) {
      this.playGameInterval = null;
      clearInterval(this.playGameInterval);
    }

    this.currentLevel = currentLevel;
    this.timer = null;
    this.currentDirective = {};
    this.interval = 0;
    this.points = 0;
    this.correctMove = false;
    this.playGameInterval = null;
    const alertViewTextbox = document.getElementById('alert-view-text');
    alertViewTextbox.innerHTML = '';
    this.allButtons = document.querySelectorAll('.on');
    this.allButtons.forEach(button => button.className = 'off');

    this.alertHistory = {
      hyperspeed: '',
      percolator: 'off',
      kazoomosphere: '1',
      oven: 'off',
      stress: '1',
      gorgonzola: '',
      letme: 'out',
      cosmicslop: 'asanorganicfacemask',
      zaboomafoominator: '',
      nightmaregauge: '1'
    }

    this.dialArea = document.querySelector('.nightmaregauge-div');
    this.dialDirect = document.getElementById('dial');
    this.redirectToStart = this.redirectToStart.bind(this);
    this.tryAgainOption = document.getElementById('try-again');
    this.tryAgainOption.addEventListener('click', this.redirectToStart);
    this.tryAgainOption.className = 'counter closed';

    const muteButton = document.querySelector('.main-mute-button');
    const audioTags = document.querySelectorAll('.music');

    muteButton.addEventListener('click', () => audioTags.forEach((tag) => {
      if (tag.muted) {
        tag.muted = false;
        muteButton.className = 'mute-button';
      } else {
        tag.muted = true;
        muteButton.className = 'mute-button muted';
      }
    }));

    this.createClickCheck = this.createClickCheck.bind(this);
    this.createSlideCheck = this.createSlideCheck.bind(this);
    this.createDialCheck = this.createDialCheck.bind(this);
    this.createNewTimer = this.createNewTimer.bind(this);

    this.createNewTimer();
    this.timer.decrementInterval();
    this.moveDialWithoutCheck();
    this.soundEffectOnClick();
  }

  createNewTimer() {
    this.timer = new Timer();
  }

  resetPoints() {
    this.points = 0;
  }

  renderPoints() {
    const points = document.getElementById('moves');
    points.innerHTML = `points: ${this.points}`;
  }

  grabCorrectElement(option, name, type) {
    let found = document.getElementById(`${option}`);

    if (type === 'slider' || !found) {
      found = document.getElementById(`${name}`);
    }
    return found;
  }

  moveDialWithoutCheck() {
    const dial = new Dial('1');
    if (this.currentDirective.type !== 'dial') {
      this.dialArea.addEventListener('mousedown', (e) => dial.rotateOnInput(e.target.className));
    }
  }

  soundEffectOnClick() {
    const buttonSound = document.getElementById('buttonsound');
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach((button) => {
      button.addEventListener('click', () => {
        buttonSound.volume = 1;
        buttonSound.play();
      })
    });
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
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    currentGoal.removeEventListener('click', this.createClickCheck)

    if (type === 'button') {
      const currentButton = new Button(name);
      currentButton.handleClassToggle();
    }

    if (this.timer.timeCount > 0) {
      this.correctMove = true;
      this.handleTimeouts();

      this.points += 1
      this.alertHistory[`${name}`] = currentOption;
      this.renderPoints();
    }
  }

  createSlideCheck() {
    const { name, currentOption, type, optionRanges } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    const currentSlider = new Slider(name, currentOption, optionRanges);
    const dragAccuracy = currentSlider.checkForAccuracy();

    if (dragAccuracy && this.timer.timeCount > 0) {
      this.points += 1
      this.alertHistory[`${name}`] = currentOption;
      this.correctMove = true;
      this.handleTimeouts();
    }

    currentGoal.removeEventListener('mouseup', this.createSlideCheck);
    this.renderPoints();
  }

  createDialCheck(e) {
    this.dialArea.removeEventListener('mousedown', this.createDialCheck);
    const { name, currentOption } = this.currentDirective;
    const dial = new Dial(currentOption);
    const className = e.target.className;
    const moveAccuracy = dial.moveAccuracy(className);

    if (moveAccuracy === 'yes' && this.timer.timeCount > 0) {
      this.points += 1;
      this.alertHistory[`${name}`] = currentOption;
      this.correctMove = true;
      this.handleTimeouts();
      this.renderPoints();
      return
    }
    return
  }

  handleCheck(prevInterval) {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    this.correctMove = false;

    if (prevInterval < this.interval + 1 && this.timer.timeCount > 0) {
      if (type === 'slider') {
        currentGoal.addEventListener('mouseup', this.createSlideCheck);
      } else if (type === 'dial') {
        this.dialArea.addEventListener('mousedown', (e) => this.createDialCheck(e), { once: true });
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

  timeFlash() {
    const timer = document.getElementById('timer');

    if (this.points <= 20) {
      if (timer.className === 'counter fine') {
        timer.className = 'counter losing';
      } else {
        timer.className = 'counter fine';
      }
    }
  }

  won(numOfTasks) {
    if (this.points >= numOfTasks) {
      return true;
    }
    return false;
  }

  renderResult(numOfTasks) {
    const winningStatus = this.won(numOfTasks);
    this.tryAgainOption.className = 'counter';
    this.playGameInterval = null;

    if (winningStatus) {
      return 'GAME OVER - YOU WIN'
    } else {
      return "GAME OVER - YOU'RE LOST IN SPACE FOREVER"
    }
  }

  createInterval() {
    this.renderAlertTimeout();
    this.playGameInterval = setInterval(() => {
      if (this.timer.timeCount > -1) {
        if (this.timer.timeCount < 10) {
          this.timeFlash();
        }
        return this.renderAlertTimeout();
      } else {
        const alertView = document.getElementById('alert-view-text');
        alertView.innerHTML = this.renderResult(this.currentLevel.tasks);
      }
    }, this.currentLevel.seconds);
  }

  handleTimeouts() {
    if (this.correctMove || this.timer.timeCount <= 0) {
      clearInterval(this.playGameInterval);
      this.playGameInterval = null;
      this.correctMove = false;
    }

    this.createInterval();
  }

  redirectToStart() {
    this.points = 0;
    this.timer = null;
    clearInterval(this.playGameInterval);
    this.playGameInterval = null;
    const gameView = document.getElementById('all-content');
    const parentEntryScreenDiv = document.getElementById('entry-screens')
    const firstScreen = document.getElementById('entry-text');
    const levelChoiceScreen = document.getElementById('level-choice');
    const redTimer = document.querySelector('.losing')
    this.alertHistory = {
      hyperspeed: '',
      percolator: 'off',
      kazoomosphere: '1',
      oven: 'off',
      stress: '1',
      gorgonzola: '',
      letme: 'out',
      cosmicslop: 'asanorganicfacemask',
      zaboomafoominator: '',
      nightmaregauge: '1'
    }

    if (redTimer) {
      redTimer.className = 'counter fine';
    }

    parentEntryScreenDiv.className = 'opener-modal';
    firstScreen.className = 'entry-text closed';
    levelChoiceScreen.className = 'entry-text';
    gameView.className = 'closed';
  }
}

module.exports = GameRender;
