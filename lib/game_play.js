const GameRender = require('./game_render.js');
const Directions = require('./directions.js');

class Game {
  constructor() {
    const alertViewTextbox = document.getElementById('alert-view-text');
    alertViewTextbox.innerHTML = '';
    this.allButtons = document.querySelectorAll('.on');
    this.allButtons.forEach(button => button.className = 'off');
  }
}

module.exports = Game;
