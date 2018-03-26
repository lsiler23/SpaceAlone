class Spaceship {
  constructor() {
    this.canvas = document.getElementById('spaceship-canvas');
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      setInterval(this.drawShip(), 1000);
    }
  }

  drawShip() {
    let x = this.canvas.width / 2;
    let y = this.canvas.height - 30;
    let dx = 2;
    let dy = -2;
    this.ctx.clearRect(0, 0, 690, 100);

    this.ctx.fillStyle = '#6793db';
    this.ctx.beginPath();
    this.ctx.moveTo(300, 50);
    this.ctx.lineTo(275, 75);
    this.ctx.lineTo(275, 25);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.fillStyle = '#f4428f';
    this.ctx.beginPath();
    this.ctx.ellipse(325, 50, 10, 50, 90 * Math.PI/180, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  // createBounce() {
  //   this.drawShip();
  // }
}

module.exports = Spaceship;
