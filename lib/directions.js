const Game = require('./game_play.js');

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
      'level4': {seconds: 1200, tasks: 50}
    }
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

    const gamePlay = new Game();
    const game = gamePlay.game;
    const chosenLevel = document.querySelector('.chosen');
    const currentLevel = this.levelOptions[`${chosenLevel.id}`]
    game.renderPoints();
    game.timer.renderTimer();

    setInterval(() => {
      if (game.timer.timeCount > -1) {
        if (game.timer.timeCount < 10) {
          gamePlay.losing();
        }
        return game.renderAlertTimeout();
      } else {
        const alertView = document.getElementById('alert-view-text');
        alertView.innerHTML = gamePlay.renderResult(currentLevel.tasks);
      }
    }, currentLevel.seconds);
  }
}

module.exports = Directions;
