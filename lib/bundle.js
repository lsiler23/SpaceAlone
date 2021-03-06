/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Directions = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
  const directionScreen = new Directions();
  const nextScreenArrow = document.querySelector('.arrow');
  const clickStart = document.querySelector('.game-start');
  const allLevels = document.querySelectorAll('.level');
  const muteButton = document.querySelector('.mute-button');
  const audioTags = document.querySelectorAll('.music')

  nextScreenArrow.addEventListener('click', () => directionScreen.nextScreen());
  allLevels.forEach((level) => level.addEventListener('click', (e) => directionScreen.levelChoice(e)));
  clickStart.addEventListener('click', () => directionScreen.playGame());

  muteButton.addEventListener('click', () => audioTags.forEach((tag) => {
    if (tag.muted) {
      tag.muted = false;
      muteButton.className = 'mute-button';
    } else {
      tag.muted = true;
      muteButton.className = 'mute-button muted';
    }
  }));
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const GameRender = __webpack_require__(2);
const Spaceship = __webpack_require__(9);

class Directions {
  constructor() {
    this.gameContent = document.getElementById('all-content');
    this.firstScreen = document.getElementById('entry-text');
    this.levelsScreen = document.getElementById('level-choice');
    this.allLevels = document.querySelectorAll('.level');
    this.self = document.querySelector('.opener-modal');
    this.levelOptions = {
      'level1': {seconds: 6000, tasks: 10},
      'level2': {seconds: 3000, tasks: 20},
      'level3': {seconds: 2000, tasks: 30},
      'level4': {seconds: 1500, tasks: 40}
    }
    this.playGameInterval = null;
    this.currentGame = null;
  }

  nextScreen() {
    this.firstScreen.className = 'entry-text closed';
    this.levelsScreen.className = 'entry-text';
  }

  levelChoice(e) {
    const chosenLevel = document.getElementById(`${e.target.id}`);
    const gameStart = document.querySelector('.game-start');

    this.allLevels.forEach((level) => level.className = 'level');
    chosenLevel.className = 'level chosen';
    gameStart.className = 'game-start';
  }

  openGame() {
    this.gameContent.className = 'open';
    this.self.className = 'closed';
  }

  playGame() {

    if (this.currentGame) {
      delete this.currentGame
      this.currentGame = null
    }

    this.openGame();
    const chosenLevel = document.querySelector('.chosen');
    const currentLevel = this.levelOptions[`${chosenLevel.id}`]
    new Spaceship();
    this.currentGame = new GameRender(currentLevel);
    this.currentGame.resetPoints();
    this.currentGame.renderPoints();
    this.currentGame.createInterval();
  }
}

module.exports = Directions;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const AlertDirections = __webpack_require__(3);
const Timer = __webpack_require__(4);
const Button = __webpack_require__(5);
const Slider = __webpack_require__(6);
const Dial = __webpack_require__(7);
const Sounds = __webpack_require__(8);

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
    const audioTags = document.querySelectorAll('audio');
    const mainDrone = document.getElementById('maindrone');
    mainDrone.volume = 0.5;

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
    new Sounds();
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

  reactToCorrect(name, currentOption) {
    this.points += 1;
    this.alertHistory[`${name}`] = currentOption;
    this.correctMove = true;
    this.handleTimeouts();
    this.renderPoints();
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
      this.reactToCorrect(name, currentOption);
    }
  }

  createSlideCheck() {
    const { name, currentOption, type, optionRanges } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    const currentSlider = new Slider(name, currentOption, optionRanges);
    const dragAccuracy = currentSlider.checkForAccuracy();

    if (dragAccuracy && this.timer.timeCount > 0) {
      this.reactToCorrect(name, currentOption);
    }

    currentGoal.removeEventListener('mouseup', this.createSlideCheck);
  }

  createDialCheck(e) {
    this.dialArea.removeEventListener('mousedown', this.createDialCheck);
    const { name, currentOption } = this.currentDirective;
    const dial = new Dial(currentOption);
    const className = e.target.className;
    const moveAccuracy = dial.moveAccuracy(className);

    if (moveAccuracy === 'yes' && this.timer.timeCount > 0) {
      this.reactToCorrect(name, currentOption);
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
        currentGoal.addEventListener('mouseup', this.createSlideCheck, { once: true });
      } else if (type === 'dial') {
        this.dialArea.addEventListener('mousedown', (e) => this.createDialCheck(e), { once: true });
      } else {
        currentGoal.addEventListener('click', this.createClickCheck, { once: true });
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
    if (timer.className === 'counter fine') {
      timer.className = 'counter losing';
    } else {
      timer.className = 'counter fine';
    }
  }

  won(numOfTasks) {
   return (this.points >= numOfTasks);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const ALL_CONTROLS = {
  0: {
    type: 'button',
    name: 'percolator',
    language: 'Turn the percolator',
    options: ['on', 'off'],
    optionRanges: null
  },
  1: {
    type: 'slider',
    name: 'kazoomosphere',
    language: 'Shift the kazoomosphere to level',
    options: ['1', '2', '3'],
    optionRanges: {
      "1": [0, 1, 2, 3, 4, 5, 6, 7],
      "2": [47, 48, 49, 50, 51, 52, 53, 54, 55],
      "3": [95, 96, 97, 98, 99, 100]
    }
  },
  2: {
    type: 'toggler',
    name: 'hyperspeed',
    language: 'Shift hyperspeed to',
    options: ['really fast', 'less fast'],
    optionRanges: null
  },
  3: {
    type: 'toggler',
    name: 'find',
    language: 'Find',
    options: ['peace', 'the answer', 'my iphone'],
    optionRanges: null
  },
  4: {
    type: 'button',
    name: 'oven',
    language: 'Turn the oven',
    options: ['on', 'off'],
    optionRanges: null
  },
  5: {
    type: 'slider',
    name: 'stress',
    language: 'Set stress level to',
    options: ['1', '2', '3', '4', '5', '6'],
    optionRanges: {
      '1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      '2': [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
      '3': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      '4': [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
      '5': [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
      '6': [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    }
  },
  6: {
    type: 'toggler',
    name: 'gorgonzola',
    language: 'Put the gorgonzola in',
    options: ['your mouth', 'that salad', 'the trash', 'the fridge', 'the shopping basket'],
    optionRanges: null
  },
  7: {
    type: 'button',
    name: 'letme',
    language: 'Let me',
    options: ['in', 'out'],
    optionRanges: null
  },
  8: {
    type: 'slider',
    name: 'cosmicslop',
    language: 'Use the cosmic slop',
    options: ['as an organic face mask', 'to wipe the windshield', 'to unfunk the carbotron'],
    optionRanges: {
      'asanorganicfacemask': [0, 1, 2, 3, 4, 5, 6, 7],
      'towipethewindshield': [47, 48, 49, 50, 51, 52, 53, 54, 55],
      'tounfunkthecarbotron': [95, 96, 97, 98, 99, 100]
    }
  },
  9: {
    type: 'toggler',
    name: 'zamboomafoominator',
    language: 'Set zaboomafoominator rate to',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    optionRanges: null
  },
  10: {
    type: 'dial',
    name: 'nightmaregauge',
    language: 'Set level of nightmare to',
    options: ['1', '2', '3', '4', '5'],
    optionRanges: null
  }
};

class AlertDirections {
  constructor() {
    this.controlChoice = (Math.floor(Math.random() * 11));
    this.control = ALL_CONTROLS[this.controlChoice];
  }

  renderDirection() {
    const { type, name, language, options, optionRanges } = this.control;
    const randomIdx = Math.floor(Math.random() * options.length);
    const currentOption = options[randomIdx];

    return [
      { name, currentOption: currentOption.split(' ').join(''), type, optionRanges },
      `${language} ${currentOption}`
    ];
  }
}

module.exports = AlertDirections;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Button {
  constructor(name) {
    this.name = name;
    this.self = document.getElementById(`${name}`);
  }


  handleClassToggle() {
    if (this.self.className === 'off'){
      this.self.className = 'on';
    } else {
      this.self.className = 'off';
    }
  }
}

module.exports = Button;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Slider {
  constructor(name, currentOption, optionRanges) {
    this.name = name;
    this.currentOption = currentOption;
    this.self = document.getElementById(`${name}`);
    this.optionRanges = optionRanges;
  }

  checkForAccuracy() {
    const adjustedValue = Number(this.self.value);
    const correctRange = this.optionRanges[this.currentOption];

    if (correctRange.includes(adjustedValue)) {
      return true;
    }
    
    return false;
  }
}

module.exports = Slider;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Dial {
  constructor(currentOption) {
    this.currentOption = currentOption;
    this.optionBelow = String(Number(currentOption) - 1);
    this.optionAbove = String(Number(currentOption) + 1);
    this.options = {
      '0': {x: 0, y: 0},
      '1': {x: 425.1875, y: 462.5, class: 'one'},
      '2': {x: 441.578125, y: 404.5, class: 'two'},
      '3': {x: 502.96875, y: 385.5, class: 'three'},
      '4': {x: 561.359375, y: 403.5, class: 'four'},
      '5': {x: 575.75, y: 458.5, class: 'five'},
      '6': {x: 617, y: 520}
    };
    this.dialDirect = document.getElementById('dial');
  }

  moveAccuracy(className) {
    if (this.options[this.currentOption].class === className) {
      return 'yes';
    }

    return false;
  }

  rotateOnInput(finalInput) {
    this.dialDirect.className = `opt-${finalInput}`;
    return
  }
}

module.exports = Dial;


/***/ }),
/* 8 */
/***/ (function(module, exports) {


class Sounds {
  constructor() {
    this.activateAllSounds();
  }

  dialSound() {
    const dialSound = document.getElementById('dialsound');
    const dialArea = document.querySelector('.nightmaregauge-div');

    dialArea.addEventListener('click', () => {
      dialSound.volume = 1;
      dialSound.play();
    });
  }

  buttonSound() {
    const buttonSound = document.getElementById('buttonsound');
    const allButtons = document.querySelectorAll('button');

    allButtons.forEach((button) => {
      button.addEventListener('click', () => {
        buttonSound.volume = 1;
        buttonSound.play();
      })
    });
  }

  sliderSound() {
    const sliderSound = document.getElementById('slidersound');
    const allSliders = document.querySelectorAll('input');
    allSliders.forEach((slider) => {
      slider.addEventListener('click', () => {
        sliderSound.volume = 0.8;
        sliderSound.play();
      });
    });
  }

  activateAllSounds() {
    this.buttonSound();
    this.dialSound();
    this.sliderSound();
  }
}

module.exports = Sounds;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Spaceship {
  constructor() {
    this.fire = document.querySelector('.spaceship-fire');
    setInterval(() => this.toggleVisibility(), 500);
  }

  toggleVisibility() {
    if (this.fire.className === 'spaceship-fire') {
      this.fire.className = 'spaceship-fire closed';
    } else {
      this.fire.className = 'spaceship-fire';
    }
  }
}

module.exports = Spaceship;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map