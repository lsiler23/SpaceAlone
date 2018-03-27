const GameRender = require('./game_render.js');
const Spaceship = require('./spaceship.js');

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
    debugger
    if (this.currentGame) {
      delete this.currentGame
      this.currentGame = null
    }
    debugger
    this.openGame();
    const chosenLevel = document.querySelector('.chosen');
    const currentLevel = this.levelOptions[`${chosenLevel.id}`]
    debugger
    this.currentGame = new GameRender(currentLevel);
    this.currentGame.resetPoints();
    this.currentGame.renderPoints();
    this.currentGame.createInterval();
  }
}

module.exports = Directions;
