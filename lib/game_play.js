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

}

module.exports = Game;
