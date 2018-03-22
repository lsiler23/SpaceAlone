const Game = require('./game_play.js');

document.addEventListener('DOMContentLoaded', () => {
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
  }, 2000);
});
