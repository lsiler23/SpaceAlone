const GameRender = require('./game_render.js');

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
