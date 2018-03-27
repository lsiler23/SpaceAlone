const Game = require('./game_play.js');
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
