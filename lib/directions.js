const Game = require('./game_play.js');

class Directions {
  constructor() {
    this.gameContent = document.getElementById('all-content');
    this.self = document.querySelector('.opener-modal');
  }

  openGame() {
    debugger
    this.gameContent.className = 'open';
    this.self.className = 'closed';
  }

  playGame() {
    this.openGame();

    const gamePlay = new Game();
    const game = gamePlay.game;
    game.renderPoints();

    setInterval(() => {
      if (game.timer.timeCount > -1) {
        if (game.timer.timeCount < 10) {
          gamePlay.losing();
        }
        return game.renderAlertTimeout();
      } else {
        const alertView = document.getElementById('alert-view-text');
        alertView.innerHTML = gamePlay.renderResult();
      }
    }, 3000);
  }
}

module.exports = Directions;
