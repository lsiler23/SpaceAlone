const Directions = require('./directions.js');

document.addEventListener('DOMContentLoaded', () => {
  const directionScreen = new Directions();
  const clickStart = document.querySelector('.game-start');

  clickStart.addEventListener('click', () => directionScreen.playGame());
});
