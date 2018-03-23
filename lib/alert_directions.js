const ALL_CONTROLS = {
  0: {
    type: 'button',
    name: 'percolator',
    language: 'Turn the percolator',
    options: ['on', 'off'],
    optionRanges: null
  },
  1: {
    type: 'slider',
    name: 'kazoomosphere',
    language: 'Shift the kazoomosphere to level',
    options: ['1', '2', '3'],
    optionRanges: {
      "1": [0, 1, 2, 3, 4, 5, 6, 7],
      "2": [47, 48, 49, 50, 51, 52, 53, 54, 55],
      "3": [95, 96, 97, 98, 99, 100]
    }
  },
  2: {
    type: 'toggler',
    name: 'hyperspeed',
    language: 'Shift hyperspeed to',
    options: ['really fast', 'less fast'],
    optionRanges: null
  },
  3: {
    type: 'toggler',
    name: 'find',
    language: 'Find',
    options: ['peace', 'the answer', 'my iphone'],
    optionRanges: null
  },
  4: {
    type: 'button',
    name: 'oven',
    language: 'Turn the oven',
    options: ['on', 'off'],
    optionRanges: null
  },
  5: {
    type: 'slider',
    name: 'stress',
    language: 'Set stress level to',
    options: ['1', '2', '3', '4', '5', '6'],
    optionRanges: {
      '1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      '2': [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
      '3': [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      '4': [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
      '5': [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
      '6': [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    }
  },
  6: {
    type: 'toggler',
    name: 'gorgonzola',
    language: 'Put the gorgonzola in',
    options: ['your mouth', 'that salad', 'the trash', 'the fridge', 'the shopping basket'],
    optionRanges: null
  },
  7: {
    type: 'button',
    name: 'letme',
    language: 'Let me',
    options: ['in', 'out'],
    optionRanges: null
  },
  8: {
    type: 'slider',
    name: 'cosmicslop',
    language: 'Use the cosmic slop',
    options: ['as an organic face mask', 'to wipe the windshield', 'to unfunk the carbotron'],
    optionRanges: {
      'asanorganicfacemask': [0, 1, 2, 3, 4, 5, 6, 7],
      'towipethewindshield': [47, 48, 49, 50, 51, 52, 53, 54, 55],
      'tounfunkthecarbotron': [95, 96, 97, 98, 99, 100]
    }
  },
  9: {
    type: 'toggler',
    name: 'zamboomafoominator',
    language: 'Set zaboomafoominator rate to',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    optionRanges: null
  },
  10: {
    type: 'dial',
    name: 'nightmaregauge',
    language: 'Set level of nightmare to',
    options: ['1', '2', '3', '4', '5'],
    optionRanges: null
  }
};

class AlertDirections {
  constructor() {
    this.controlChoice = (Math.floor(Math.random() * 11));
    this.control = ALL_CONTROLS[this.controlChoice];
  }

  renderDirection() {
    const { type, name, language, options, optionRanges } = this.control;
    const randomIdx = Math.floor(Math.random() * options.length);
    const currentOption = options[randomIdx];

    return [
      { name, currentOption: currentOption.split(' ').join(''), type, optionRanges },
      `${language} ${currentOption}`
    ];
  }
}

module.exports = AlertDirections;
