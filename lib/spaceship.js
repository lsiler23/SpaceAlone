class Spaceship {
  constructor() {
    this.fire = document.querySelector('.spaceship-fire');
    setInterval(() => this.toggleVisibility(), 500);
  }

  toggleVisibility() {
    if (this.fire.className === 'spaceship-fire') {
      this.fire.className = 'spaceship-fire closed';
    } else {
      this.fire.className = 'spaceship-fire';
    }
  }
}

module.exports = Spaceship;
