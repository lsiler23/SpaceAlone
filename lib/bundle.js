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

const AlertDirections = __webpack_require__(1);

class Game {
  constructor() {
    this.controlGrid = new ControlGrid();
    this.currentDirective = {};
    this.interval = 0;
    this.points = 0;
    this.createClickCheck = this.createClickCheck.bind(this);
  }

  renderPoints() {
    const renderer = document.getElementById('moves');
    renderer.innerHTML = `points: ${this.points}`;
  }

  createNewAlert() {
    const newAlert = new AlertDirections();
    const currentAlert = newAlert.renderDirection();
    this.currentDirective = currentAlert[0];
    this.interval += 1;
    return currentAlert[1];
  }

  createClickCheck() {
    const currentGoal = document.getElementById(`${this.currentDirective.currentOption}`)
    currentGoal.removeEventListener('click', this.createClickCheck);
    this.points += 1
    this.renderPoints();
  }


  handleCheck(prevInterval) {
    const currentGoal = document.getElementById(`${this.currentDirective.currentOption}`)

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


document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.renderPoints();
  setInterval(() => game.renderAlertTimeout(), 2000);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const ALL_CONTROLS = {
  0: {
    class: 'button',
    name: 'percolator',
    language: 'Turn the percolator',
    options: ['on', 'off']
  },
  1: {
    class: 'slider',
    name: 'kazoomosphere',
    language: 'Shift the kazoomosphere to level',
    options: ['1', '2', '3']
  },
  2: {
    class: 'toggler',
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
    const { name, language, options } = this.control;
    const randomIdx = Math.floor(Math.random() * options.length);
    const currentOption = options[randomIdx];

    return [
      { name,
      currentOption: currentOption.split(' ').join('')}, `${language} ${currentOption}`];
  }
}

module.exports = AlertDirections;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map