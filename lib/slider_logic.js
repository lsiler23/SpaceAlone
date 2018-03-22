class Slider {
  constructor(name, currentOption) {
    this.name = name;
    this.currentOption = currentOption;
    this.self = document.getElementById(`${name}`);
    this.optionPoints = {
      "1": [0, 1, 2, 3, 4, 5, 6, 7],
      "2": [48, 49, 50, 51, 52, 53, 54],
      "3": [95, 96, 97, 98, 99, 100]
    }
  }

  checkForAccuracy() {
    const adjustedValue = Number(this.self.value);
    const correctRange = this.optionPoints[this.currentOption];

    if (correctRange.includes(adjustedValue)) {
      return true;
    }
    return false;
  }
}

module.exports = Slider;
