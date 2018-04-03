class Slider {
  constructor(name, currentOption, optionRanges) {
    this.name = name;
    this.currentOption = currentOption;
    this.self = document.getElementById(`${name}`);
    this.optionRanges = optionRanges;
  }

  checkForAccuracy() {
    const adjustedValue = Number(this.self.value);
    const correctRange = this.optionRanges[this.currentOption];

    if (correctRange.includes(adjustedValue)) {
      return true;
    }
    
    return false;
  }
}

module.exports = Slider;
