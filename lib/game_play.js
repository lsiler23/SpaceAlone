const GameRender = require('./game_render.js');

class Game {
  constructor() {
    this.game = new GameRender();
    this.points = this.game.points;
    this.timer = this.game.timer.timeCount;
  }

  won() {
    if (this.points >= 25) {
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
