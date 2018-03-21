const ALL_CONTROLS = {
  0: {
    class: 'button',
    name: 'percolator',
    language: 'Turn the percolator',
    options: ['on', 'off']
  },
  1: {
    class: 'slider',
    name: 'kazoomosphere',
    language: 'Shift the kazoomosphere to level',
    options: ['1', '2', '3']
  },
  2: {
    class: 'toggler',
    name: 'hyperspeed',
    language: 'Shift hyperspeed to',
    options: ['really fast', 'less fast']
  }
};

class AlertDirections {
  constructor() {
    this.controlChoice = (Math.floor(Math.random() * 3));
    this.control = ALL_CONTROLS[this.controlChoice];
  }

  renderDirection() {
    const { name, language, options } = this.control;
    const randomIdx = Math.floor(Math.random() * options.length);
    const currentOption = options[randomIdx];

    return [
      { name,
      currentOption: currentOption.split(' ').join('')}, `${language} ${currentOption}`];
  }
}

module.exports = AlertDirections;
