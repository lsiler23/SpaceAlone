const Game = require('./game_play.js');

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  const timer = document.getElementById('timer')
  game.game.renderPoints();

  setInterval(() => {
    if (game.game.timer.timeCount > 0) {
      return game.game.renderAlertTimeout();
    } else {
      const alertView = document.getElementById('alert-view-text');
      alertView.innerHTML = 'GAME OVER';
    }
  }, 2000);
});
