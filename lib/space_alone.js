const Directions = require('./directions.js');

document.addEventListener('DOMContentLoaded', () => {
  const directionScreen = new Directions();
  const nextScreenArrow = document.querySelector('.arrow');
  const clickStart = document.querySelector('.game-start');
  const allLevels = document.querySelectorAll('.level');
  const muteButton = document.querySelector('.mute-button');
  const audioTags = document.querySelectorAll('.music')

  nextScreenArrow.addEventListener('click', () => directionScreen.nextScreen());
  allLevels.forEach((level) => level.addEventListener('click', (e) => directionScreen.levelChoice(e)));
  clickStart.addEventListener('click', () => directionScreen.playGame());

  muteButton.addEventListener('click', () => audioTags.forEach((tag) => {
    if (tag.muted) {
      tag.muted = false;
      muteButton.className = 'mute-button';
    } else {
      tag.muted = true;
      muteButton.className = 'mute-button muted';
    }
  }));
});
