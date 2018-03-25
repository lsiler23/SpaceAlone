const Directions = require('./directions.js');

document.addEventListener('DOMContentLoaded', () => {
  const directionScreen = new Directions();
  const nextScreenArrow = document.querySelector('.arrow');
  const clickStart = document.querySelector('.game-start');
  const allLevels = document.querySelectorAll('.level');

  nextScreenArrow.addEventListener('click', () => directionScreen.nextScreen());
  allLevels.forEach((level) => level.addEventListener('click', (e) => directionScreen.levelChoice(e)));
  clickStart.addEventListener('click', () => directionScreen.playGame());
});
