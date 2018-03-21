const Game = require('./game_play.js');

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.renderPoints();
  setInterval(() => game.renderAlertTimeout(), 1000);
});
