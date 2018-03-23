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

const Game = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
  const gamePlay = new Game();
  const game = gamePlay.game;
  game.renderPoints();

  setInterval(() => {
    if (game.timer.timeCount > -1) {
      if (game.timer.timeCount < 10) {
        gamePlay.losing();
      }
      return game.renderAlertTimeout();
    } else {
      const alertView = document.getElementById('alert-view-text');
      alertView.innerHTML = gamePlay.renderResult();
    }
  }, 3000);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const GameRender = __webpack_require__(2);

class Game {
  constructor() {
    this.game = new GameRender();
  }

  won() {
    if (this.game.points >= 25) {
      return true;
    }
    return false;
  }

  renderResult() {
    const winningStatus = this.won();

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const AlertDirections = __webpack_require__(3);
const Timer = __webpack_require__(4);
const Button = __webpack_require__(5);
const Slider = __webpack_require__(6);
const Dial = __webpack_require__(7);

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
      zaboomafoominator: '',
      nightmaregauge: '1'
    }
    this.dialArea = document.querySelector('.nightmaregauge-div');
    this.dialDirect = document.querySelector('.dial');
    this.createClickCheck = this.createClickCheck.bind(this);
    this.createSlideCheck = this.createSlideCheck.bind(this);
    this.createDialCheck = this.createDialCheck.bind(this);
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
    }

    currentGoal.removeEventListener('mouseup', this.createSlideCheck);
    this.renderPoints();
  }

  createDialCheck(e) {
    this.dialArea.removeEventListener('mousedown', this.createDialCheck);
    const { name, currentOption } = this.currentDirective;
    const dial = new Dial(currentOption);
    debugger
    dial.rotateOnInput(e.target.className);
    const moveAccuracy = dial.moveAccuracy(e.x);

    if (moveAccuracy === 'yes') {
      this.points += 1;
      this.alertHistory[`${name}`] = currentOption;
    }

    this.renderPoints();
  }


  handleCheck(prevInterval) {
    const { name, currentOption, type } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name, type);

    if (prevInterval < this.interval + 1) {
      if (type === 'slider') {
        currentGoal.addEventListener('mouseup', this.createSlideCheck);
      } else if (type === 'dial') {
        this.dialArea.addEventListener('mousedown', (e) => this.createDialCheck(e));
        debugger
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

  moveAccuracy(end) {
    if (end > this.options[this.optionBelow].x && end < this.options[this.optionAbove].x) {
      return 'yes';
    }
    return false;
  }

  rotateOnInput(finalInput) {
    this.dialDirect.className = `opt-${finalInput}`;
  }

}

module.exports = Dial;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map