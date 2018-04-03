
class Sounds {
  constructor() {
    this.activateAllSounds();
  }

  dialSound() {
    const dialSound = document.getElementById('dialsound');
    const dialArea = document.querySelector('.nightmaregauge-div');

    dialArea.addEventListener('click', () => {
      dialSound.volume = 1;
      dialSound.play();
    });
  }

  buttonSound() {
    const buttonSound = document.getElementById('buttonsound');
    const allButtons = document.querySelectorAll('button');

    allButtons.forEach((button) => {
      button.addEventListener('click', () => {
        buttonSound.volume = 1;
        buttonSound.play();
      })
    });
  }

  sliderSound() {
    const sliderSound = document.getElementById('slidersound');
    const allSliders = document.querySelectorAll('input');
    allSliders.forEach((slider) => {
      slider.addEventListener('click', () => {
        sliderSound.volume = 0.8;
        sliderSound.play();
      });
    });
  }

  activateAllSounds() {
    this.buttonSound();
    this.dialSound();
    this.sliderSound();
  }
}

module.exports = Sounds;
