const GameRender = require('./game_render.js');

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameRender();
  game.renderPoints();
  setInterval(() => game.renderAlertTimeout(), 2000);
});
