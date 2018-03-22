const GameRender = require('./game_render.js');

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
