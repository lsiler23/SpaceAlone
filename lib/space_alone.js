const GameRender = require('./game_render.js');

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameRender();
  const timer = document.getElementById('timer')
  game.renderPoints();

  setInterval(() => {
    if (game.timer.timeCount > 0) {
      return game.renderAlertTimeout();
    } else {
      const alertView = document.getElementById('alert-view-text');
      alertView.innerHTML = 'GAME OVER';
    }
  }, 2000);
});
