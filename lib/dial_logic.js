class Dial {
  constructor(currentOption) {
    this.currentOption = currentOption;
    this.optionBelow = String(Number(currentOption) - 1);
    this.optionAbove = String(Number(currentOption) + 1);
    this.options = {
      '0': {x: 0, y: 0},
      '1': {x: 425.1875, y: 462.5, class: 'one'},
      '2': {x: 441.578125, y: 404.5, class: 'two'},
      '3': {x: 502.96875, y: 385.5, class: 'three'},
      '4': {x: 561.359375, y: 403.5, class: 'four'},
      '5': {x: 575.75, y: 458.5, class: 'five'},
      '6': {x: 617, y: 520}
    };
    this.dialDirect = document.getElementById('dial');
  }

  moveAccuracy(end) {
    if (end > this.options[this.optionBelow].x && end < this.options[this.optionAbove].x) {
      return 'yes';
    }
    return false;
  }

  rotateOnInput(finalInput) {
    this.dialDirect.className = `opt-${finalInput}`;
  }

}

module.exports = Dial;
