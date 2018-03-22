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

const Game = __webpack_require__(5);

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  const timer = document.getElementById('timer')
  game.game.renderPoints();

  setInterval(() => {
    if (game.game.timer.timeCount > 0) {
      return game.game.renderAlertTimeout();
    } else {
      const alertView = document.getElementById('alert-view-text');
      alertView.innerHTML = game.renderResult();
    }
  }, 2000);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const AlertDirections = __webpack_require__(2);
const Timer = __webpack_require__(3);
const Button = __webpack_require__(4);

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

  handleCheck(prevInterval) {
    const { currentOption, name } = this.currentDirective;
    const currentGoal = this.grabCorrectElement(currentOption, name);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const ALL_CONTROLS = {
  0: {
    type: 'button',
    name: 'percolator',
    language: 'Turn the percolator',
    options: ['on', 'off']
  },
  1: {
    type: 'slider',
    name: 'kazoomosphere',
    language: 'Shift the kazoomosphere to level',
    options: ['1', '2', '3']
  },
  2: {
    type: 'toggler',
    name: 'hyperspeed',
    language: 'Shift hyperspeed to',
    options: ['really fast', 'less fast']
  }
};

class AlertDirections {
  constructor() {
    this.controlChoice = (Math.floor(Math.random() * 3));
    this.control = ALL_CONTROLS[this.controlChoice];
  }

  renderDirection() {
    const { type, name, language, options } = this.control;
    const randomIdx = Math.floor(Math.random() * options.length);
    const currentOption = options[randomIdx];

    return [
      { name, currentOption: currentOption.split(' ').join(''), type },
      `${language} ${currentOption}`
    ];
  }
}

module.exports = AlertDirections;


/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const GameRender = __webpack_require__(1);

class Game {
  constructor() {
    this.game = new GameRender();
    this.points = this.game.points;
    this.timer = this.game.timer.timeCount;
  }

  won() {
    (this.points === 30) ? true : false;
  }

  renderResult() {
    if (this.won()) {
      return 'GAME OVER - YOU WIN'
    } else {
      return "GAME OVER - YOU'RE LOST IN SPACE FOREVER"
    }
  }

}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map