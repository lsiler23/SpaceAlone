# SpaceAlone

## Background

Race against the clock to keep your spaceship from burning in SpaceAlone!
You'll have 60 seconds to complete 60 crucial tasks based on your control board and the alerts your ship sends.

## MVPs
* Counters
  - Timer
  - Correct moves
* Alerts
* Controls
  - 4 classes broken into two functionality-based modules:
      - Togglers: (a) buttons (on/off), (b) togglers (more than 2 options)
      - Sliders: (a) dials (circular), (b) sliders (horizontal drag)
* Spaceship view
* Special events
  - Wormhole!
    - At a random timeout (1-30 seconds into gameplay), the screen will be overtaken by a modal for 5 seconds only escapable by hitting up and down arrows. If the player doesn't hit the keys 30 times each, the game is automatically over.
* Production README

### Bonus
  * Effects
      - Oozing slime
      - Increasing fire dependent on ratio of missed moves to seconds
  * High scores

## Technologies
  * JavaScript
  * HTML/CSS
  * Canvas

## Implementation Timeline

### Phase I
#### Wednesday, March 21 EOD
  * Build main frame
    - Body:
      - Spaceship display area
      - Alert area
      - Controls
        - Grid/board
  * Build alert logic
    - Initialize with object containing the following control information:
    ```javascript
    {
      1: {
        class: 'button',
        name: 'percolator',
        language: 'Turn the percolator ',
        options: ['on', 'off']
      },
      2: {
        class: 'slider',
        name: 'kazoomosphere',
        language: 'Shift the kazoomosphere to level ',
        options: ['1', '2', '3']
      }
    }
    ```
    - Build setTimeout for choosing a random alert every second
    - Display random alerts in view
  * Build a button control
    - Initialize with name, language, and options
    - Create functionality module for a simple on/off toggle

#### Thursday, March 22 EOD
  * Build game entry point
    - Render button and toggle
  * Build game class
   - Connect the directional to the result of the event listener on the button
   - Create correct moves counter
 * Update main frame
   - Header:
     - Render correct moves counter
     - Render timer
     - Ensure a correct move results in a count up

### Phase II
#### Friday, March 23 EOD
  * Update game class
    - Winning logic
    - Create time checks
      - At 10 seconds, should be 10 points on the moves counter, etc.
      - Red flash display if behind
  * Build a slider control
   - Initialize with name, language, and options
   - Create functionality module for a drag event listener that updates class

#### Saturday, March 24 EOD
  * Populate board with one button and one slide
    - Ensure correct functionality
  * Build a toggler
    - Follow pattern of previous button
  * Add togglers to the board
  * Style the board pieces
  * Style the spaceship
  * Create background

### Phase III
#### Sunday, March 25 EOD
  * Build wormhole class
    - Create counter on hits per up and down keys, respectively
    - Create passing logic
  * Update game class
    - Add randomized timeout for wormhole launch, populates a modal
    - Update losing logic to include the result of the wormhole
  * Style wormhole modal
  * Attempt the dial
