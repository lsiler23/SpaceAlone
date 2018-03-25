const GameRender = require('./game_render.js');
const Directions = require('./directions.js');

class Game {
  constructor() {
    this.game = new GameRender();
    this.tryAgainOption = document.getElementById('try-again');
    this.redirectToStart = this.redirectToStart.bind(this);
    this.tryAgainOption.addEventListener('click', this.redirectToStart);
  }

  redirectToStart() {
    const gameView = document.getElementById('all-content');
    const parentEntryScreenDiv = document.getElementById('entry-screens')
    const firstScreen = document.getElementById('entry-text');
    const levelChoiceScreen = document.getElementById('level-choice');
    const alertViewTextbox = document.getElementById('alert-view-text');

    this.tryAgainOption.className = 'counter closed';
    parentEntryScreenDiv.className = 'opener-modal';
    firstScreen.className = 'entry-text closed';
    levelChoiceScreen.className = 'entry-text';
    gameView.className = 'closed';
    alertViewTextbox.innerHTML = '';

    this.game.timer.resetTimer();
    this.game.resetPoints();
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
