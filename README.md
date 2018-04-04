# SpaceAlone

## Background

Race against the clock to keep your spaceship from burning in SpaceAlone!
Pick whichever level is most comfortable for you, or not. You'll have 60 seconds to complete the specified number of crucial tasks per level on your control board based on the alerts your ship sends.

[Click here](https://lsiler23.github.io/SpaceAlone/) to play!

## Technologies Used
* JavaScript
* HTML/CSS

## How to Play

* Choose a level on the second opening screen, then click to start
* Check the alert provided by your ship and follow through with the instruction - this may take some practice, since, depending on your level, the commands may move quickly
* Once a task disappears, a follow-through won't be counted towards your points
* If you're able to complete the minimum number of tasks designated by your level, you win.
* Want to try again? Click the 'Play Again?' button that will appear at the end of each game.

## Demo

![demo-gif](assets/demo.gif)

## Implementation

### Difficulty Levels

In order to allow for a customizable level of difficulty, I created a system in which the class of a given level is saved from the second modal screen and shared with the main game render class. Each level corresponds to a time interval dependent on how many minimum tasks are required in 60 seconds. For example, level 1 has a minimum of 10 tasks, so the player will be prompted every 6 seconds with a new alert if they don't solve a task sooner (more on this in the next bullet).

In the class associated with the modal screen, you'll find the following in the constructor and playGame functions, respectively:

```Javascript
  this.levelOptions = {
    'level1': {seconds: 6000, tasks: 10},
    'level2': {seconds: 3000, tasks: 20},
    'level3': {seconds: 2000, tasks: 30},
    'level4': {seconds: 1500, tasks: 40}
  }
```
```Javascript
  const chosenLevel = document.querySelector('.chosen');
  const currentLevel = this.levelOptions[`${chosenLevel.id}`]
  this.currentGame = new GameRender(currentLevel);
```

### Checking for Accuracy

In order to ensure that the player is following through with each task correctly, I opted to turn on event listeners per individual control and shut them off each time the interval updates to a new task, instead of maintaining event listeners on every control. I chose to accomplish the communication between the creation of the alerts and the controls themselves because of the ease of debugging. It's much better to be able to focus on the event cycle of one control at a time, instead of handle any interference with other event listeners.

The cycle is processed as follows:

1. The game chooses an alert based on logical availability. For example, if a button is successfully turned off, the player shouldn't be asked to turn it off again without turning it on. I accomplished this by keeping a small cache of the completed task options and setting up a loop to search potential tasks until an available option is found.

In the constructor of the game's render class:

```Javascript
this.alertHistory = {
  hyperspeed: '',
  percolator: 'off',
  kazoomosphere: '1',
  oven: 'off',
  stress: '1',
  gorgonzola: '',
  letme: 'out',
  cosmicslop: 'asanorganicfacemask',
  zaboomafoominator: '',
  nightmaregauge: '1'
}
```
On an interval, or when a correct response occurs:

```Javascript
while (currentAlert[0].currentOption === this.alertHistory[`${currentAlert[0].name}`]) {
  currentAlert = newAlert.renderDirection();
}
```

2. Once an available option is found, the game will display the alert and an event listener will activate for only that control. There are three methods checking for accuracy on a move involving a dial, button, or slider. Each contains a reference to the following method at the time of a correct move:

```Javascript
reactToCorrect(name, currentOption) {
  this.points += 1;
  this.alertHistory[`${name}`] = currentOption;
  this.correctMove = true;
  this.handleTimeouts();
  this.renderPoints();
}
```

### Responsiveness
As mentioned in the previous section, if the player responds correctly to a task earlier than the level's set time interval, they'll be automatically prompted with an extra task. This was a bit tricky to maneuver because of the time interval. My solution was to clear the interval on a correct move and reset it.

```JavaScript
handleTimeouts() {
  if (this.correctMove || this.timer.timeCount <= 0) {
    clearInterval(this.playGameInterval);
    this.playGameInterval = null;
    this.correctMove = false;
  }

  this.createInterval();
}
```
## Future Features
  * Effects
      - Oozing slime
      - Increasing fire dependent on ratio of missed moves to seconds
  * High scores
