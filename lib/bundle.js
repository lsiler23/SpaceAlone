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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
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

    this.allLevels.forEach((level) => level.className = 'level');
    chosenLevel.className = 'level chosen';
  }

  openGame() {
    this.gameContent.className = 'open';
    this.self.className = 'closed';
  }

  playGame() {
    this.openGame();
    // const spaceship = new Spaceship();

    if (this.playGameInterval) {
      clearInterval(this.playGameInterval);
      this.playGameInterval = null;
      this.currentGame = null;
    }

    const chosenLevel = document.querySelector('.chosen');
    const currentLevel = this.levelOptions[`${chosenLevel.id}`]
    this.currentGame = new Game();

    const game = this.currentGame.game;
    game.renderPoints();

    this.playGameInterval = setInterval(() => {
      if (game.timer.timeCount > -1) {
        if (game.timer.timeCount < 10) {
          this.currentGame.losing();
        }
        if (currentLevel === 'level1') {
          return game.handleTimeouts();
        } else {
          return game.renderAlertTimeout();
        }
      } else {
        const alertView = document.getElementById('alert-view-text');
        alertView.innerHTML = this.currentGame.renderResult(currentLevel.tasks);
      }
    }, currentLevel.seconds);
  }
}

module.exports = Directions;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Directions = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', () => {
  const directionScreen = new Directions();
  const nextScreenArrow = document.querySelector('.arrow');
  const clickStart = document.querySelector('.game-start');
  const allLevels = document.querySelectorAll('.level');

  nextScreenArrow.addEventListener('click', () => directionScreen.nextScreen());
  allLevels.forEach((level) => level.addEventListener('click', (e) => directionScreen.levelChoice(e)));
  clickStart.addEventListener('click', () => directionScreen.playGame());
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const GameRender = __webpack_require__(3);
const Directions = __webpack_require__(0);

class Game {
  constructor() {
    this.game = null;
    this.tryAgainOption = document.getElementById('try-again');
    this.redirectToStart = this.redirectToStart.bind(this);
    this.tryAgainOption.addEventListener('click', this.redirectToStart);

    const alertViewTextbox = document.getElementById('alert-view-text');
    alertViewTextbox.innerHTML = '';
    this.tryAgainOption.className = 'counter closed';

    this.allButtons = document.querySelectorAll('.on');
    this.allButtons.forEach(button => button.className = 'off');

    this.createNewGame();
  }

  createNewGame() {
    this.game = new GameRender();
  }

  redirectToStart() {

    const gameView = document.getElementById('all-content');
    const parentEntryScreenDiv = document.getElementById('entry-screens')
    const firstScreen = document.getElementById('entry-text');
    const levelChoiceScreen = document.getElementById('level-choice');
    const redTimer = document.querySelector('.losing')

    if (redTimer) {
      redTimer.className = 'counter fine';
    }

    parentEntryScreenDiv.className = 'opener-modal';
    firstScreen.className = 'entry-text closed';
    levelChoiceScreen.className = 'entry-text';
    gameView.className = 'closed';

  }

  won(numOfTasks) {
    if (this.game.points >= numOfTasks) {
      return true;
    }
    return false;
  }

  renderResult(numOfTasks) {
    const winningStatus = this.won(numOfTasks);
    this.tryAgainOption.className = 'counter';

    if (winningStatus) {
      return 'GAME OVER - YOU WIN'
    } else {
      return "GAME OVER - YOU'RE LOST IN SPACE FOREVER"
    }
  }

  losing() {
    const timer = document.getElementById('timer');

    if (this.game.points <= 20) {
      if (timer.className === 'counter fine') {
        timer.className = 'counter losing';
      } else {
        timer.className = 'counter fine';
      }
    }
  }

}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const AlertDirections = __webpack_require__(4);
const Timer = __webpack_require__(5);
const Button = __webpack_require__(6);
const Slider = __webpack_require__(7);
const Dial = __webpack_require__(8);

class GameRender {
  constructor() {
    this.timer = null;
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
      zaboomafoominator: '',
      nightmaregauge: '1'
    }
    this.dialArea = document.querySelector('.nightmaregauge-div');
    this.dialDirect = document.getElementById('dial');
    this.createClickCheck = this.createClickCheck.bind(this);
    this.createSlideCheck = this.createSlideCheck.bind(this);
    this.createDialCheck = this.createDialCheck.bind(this);
    this.createNewTimer();
    this.timer.decrementInterval();
    this.moveDialWithoutCheck();
    this.correctMove = false;
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

    this.points += 1
    this.alertHistory[`${name}`] = currentOption;
    this.correctMove = true;
    this.renderAlertTimeout();
    this.renderPoints();
  }

  createSlideCheck() {
    const { name, currentOption, type, optionRanges } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    const currentSlider = new Slider(name, currentOption, optionRanges);
    const dragAccuracy = currentSlider.checkForAccuracy();

    if (dragAccuracy) {
      this.points += 1
      this.alertHistory[`${name}`] = currentOption;
      this.correctMove = true;
      this.renderAlertTimeout();
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

    if (moveAccuracy === 'yes') {
      this.points += 1;
      this.alertHistory[`${name}`] = currentOption;
      this.correctMove = true;
      this.renderPoints();
      this.renderAlertTimeout();
      return
    }

    return
  }

  handleCheck(prevInterval) {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);
    this.correctMove = false;
    
    if (prevInterval < this.interval + 1) {
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

  handleTimeouts() {
    if (!this.correctMove) {
      this.renderAlertTimeout();
    }
  }
}

module.exports = GameRender;


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

class Spaceship {
  constructor() {
    this.canvas = document.getElementById('spaceship-canvas');
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      setInterval(this.drawShip(), 1000);
    }
  }

  drawShip() {
    let x = this.canvas.width / 2;
    let y = this.canvas.height - 30;
    let dx = 2;
    let dy = -2;
    this.ctx.clearRect(0, 0, 690, 100);

    this.ctx.fillStyle = '#6793db';
    this.ctx.beginPath();
    this.ctx.moveTo(300, 50);
    this.ctx.lineTo(275, 75);
    this.ctx.lineTo(275, 25);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.fillStyle = '#f4428f';
    this.ctx.beginPath();
    this.ctx.ellipse(325, 50, 10, 50, 90 * Math.PI/180, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Spaceship;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map