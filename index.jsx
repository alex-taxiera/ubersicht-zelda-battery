/* Useful variables */

/**
 * The name of the widget folder.
 * You'll need this set correctly to find images and the battery script.
 * Default: zelda-battery.widget
 */
const DIR_NAME = 'zelda-battery.widget'

/**
 * @const {Number}
 * Width of hearts in pixels.
 * Default: 40
 */
const HEART_WIDTH = 40

/**
 * @const {Number}
 * Height of hearts in pixels.
 * Default: constrained by original aspect ratio.
 */
const HEART_HEIGHT = HEART_WIDTH * (12 / 13) // original pixel dimensions are 13 wide by 12 tall

/**
 * @const {Number}
 * Space between hearts in in percentage of HEART_WIDTH.
 * Default: HEART_WIDTH / 10
 */
const HEART_MARGIN = HEART_WIDTH / 10

/**
 * @const {Number}
 * The number of hearts to display, defaults to the full authentic 20.
 * Default: 20
 */
const MAX_HEARTS = 20

/**
 * @const {Number}
 * Max number of hearts to show in a row, defaults to authentic 10.
 * Default: 10
 */
const MAX_HEARTS_IN_ROW = 10

/**
 * @const {Number}
 * The number of rows the hearts will span.
 */
const NUM_ROWS = Math.ceil(MAX_HEARTS / MAX_HEARTS_IN_ROW)

/**
 * @const {Number}
 * The number of hearts in the last row.
 */
const HEARTS_IN_LAST_ROW = (MAX_HEARTS % MAX_HEARTS_IN_ROW) || MAX_HEARTS_IN_ROW


/** Magic meter to show the processing %
 * Default: 0.5
 * Set to length of max hearts row
 * Optional: 1
 * Hide magic meter
 * Optional: 0
*/
const MAGIC_METER = 0.5
const MAGIC_METER_WIDTH = (((HEART_WIDTH + HEART_MARGIN) * MAX_HEARTS_IN_ROW) * MAGIC_METER)

/**
 * Pulsing heart for the last partial or fully filled heart
 * Default: True
 */
const HEART_PULSE = true

/**
 * Position of bar, defaults to authentic top left.
 * There is 10px of padding to give margin.
 * default: { padding: 10 }
 */
export const className = {
  padding: 10
}

const injectStyle = (style) => {
  const styleElement = document.createElement('style');
  let styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;

  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const keyframesStyle = `
@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}`;

injectStyle(keyframesStyle);

/**
 * The polling rate/time between each update.
 * Not sure if changing this has performance effects.
 * Default: 30000 (30 seconds)
 */
export const refreshFrequency = 30000

/**
 * Helper function to generate file paths.
 * Make sure the string has the correct dir name of the images.
 * Default: `${DIR_NAME}/hearts/${fileName}`
 * @param   {String} fileName The file name (eg. image.png).
 * @returns {String} filePath
 */
const heartImg = (fileName) => `${DIR_NAME}/hearts/${fileName}`

/**************************************************************
 * Things down here are a bit more advanced.                  *
 * I'll point out spots where customization might make sense. *
 **************************************************************/

/**
 * @typedef  {Object}        State
 * @property {Array[Number]} State.hearts The current state of all hearts.
 */

/**
 * @typedef  {Object} Event
 * @property {String} [Event.type="UB/COMMAND_RAN"] Type of event.
 * @property {String} [Event.output]                The output of the bash command.
 * @property {Error}  [Event.error]                 Error thrown by command.
 */

/**
 * Bash command to check battery level.
 */
export const command = `sh ${DIR_NAME}/battery.sh`

/**
 * @const {State}
 * Initial state of hearts.
 * Initialized with 1.
 * 0    = Empty
 * 0.25 = Quarter
 * 0.50 = Half
 * 0.75 = Three Quarter
 * 1    = Full
 */
export const initialState = {
  hearts: Array(NUM_ROWS)
    .fill(null)
    .map((row, i) => i !== NUM_ROWS - 1
      ? Array(MAX_HEARTS_IN_ROW).fill(1)
      : Array(HEARTS_IN_LAST_ROW).fill(1)
    ),
    css:{
      container: {
        WebkitAnimation: 'pulse 2s ease-in-out infinite normal'
      },
    }
}

/**
 * Render method.
 * @param {State} state The state passed in
 */
export const render = (state) => {
  const {
    hearts,
    magic
  } = state

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignContent: 'space-between'
      }}
    >
      {
        hearts.map((row, i) => (
          <div
            key={i}
            style={{
              width: ((HEART_WIDTH + HEART_MARGIN) * row.length) - HEART_MARGIN,
              height: HEART_HEIGHT + HEART_MARGIN,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {
              row.map((heart, j) => {
                let heartSrc
                /**
                 * If you wanna change the icons you can do that here.
                 * Just change the strings to the filenames of your icons.
                 */
                switch (heart) {
                  case 0.00: heartSrc = heartImg('empty-heart-4x.png'); break
                  case 0.25: heartSrc = heartImg('quarter-heart-4x.png'); break
                  case 0.50: heartSrc = heartImg('half-heart-4x.png'); break
                  case 0.75: heartSrc = heartImg('three-quarter-heart-4x.png'); break
                  case 1.00: heartSrc = heartImg('full-heart-4x.png'); break
                  default  : heartSrc = heartImg('full-heart-4x.png')
                }

                /**
                * Find last heart filled
                * last heart in last row is > 0
                * last heart in row and next == 0
                * next heart == 0
                */
                const isLastHeart = (heart>0 &&
                  (
                    ((i+1)==NUM_ROWS && j+1==HEARTS_IN_LAST_ROW) ||
                    ((i+1)<NUM_ROWS && j+1==MAX_HEARTS_IN_ROW && hearts[i+1][0]==0) ||
                    row[j+1]==0
                  )
                ) ? true : false

                return (
                  <img
                    key={j}
                    style={isLastHeart && HEART_PULSE ? initialState.css.container : {}}
                    src={heartSrc}
                    width={HEART_WIDTH}
                    height={HEART_HEIGHT}
                  />
                )
              })
            }
          </div>
        ))
      }
      <div
        style={ MAGIC_METER > 0 ? {
          backgroundColor: 'black',
          border: '5px solid white',
          borderRadius: '15px',
          width: MAGIC_METER_WIDTH,
          height: '40px',
          marginTop: '10px' }
          : { display:'none' }
        }
      >
        <div
          style={{
            backgroundColor: 'green',
            width: MAGIC_METER_WIDTH * magic,
            height: '32px',
            margin: '4px',
          }}
        >
        </div>
      </div>
    </div>
  )
}

/**
 * This could potentially be optimized or slightly tweaked.
 * @param {Event} event         The event causing the state update.
 * @param {State} previousState The previous/current state rendered.
 */
export const updateState = (event, previousState) => {
  if (event.error) {
    console.error('ERROR: ', event.error)
    return previousState
  }

  const flatHearts = initialState.hearts.flat()
  const percentage = parseInt(event.output)
  const numHearts = (percentage / 100) * MAX_HEARTS
  const fullHearts = Math.floor(numHearts)
  const remainder = numHearts - fullHearts
  const magic = event.output.match(/\d+\.\d+%\sidle/)[0].replace('%', '').replace('idle', '')/100

  if (remainder > 0) {
    let lastHeart = { index: -1, diff: 99 }
    const possibleVals = [1, 0.75, 0.50, 0.25, 0]

    for (let index = 0; index < possibleVals.length; index++) {
      const diff = Math.abs(possibleVals[index] - remainder)
      if (index === 0 || diff < lastHeart.diff) {
        lastHeart = { index, diff }
      }
    }
    flatHearts[fullHearts] = possibleVals[lastHeart.index]
  }

  if (fullHearts < (MAX_HEARTS - Math.ceil(remainder))) {
    flatHearts.fill(0, (fullHearts - MAX_HEARTS + Math.ceil(remainder)))
  }

  const hearts = []
  for (let i = 0; i < initialState.hearts.length; i++) {
    for (let j = 0; j < initialState.hearts[i].length; j++) {
      if (!hearts[i]) {
        hearts[i] = []
      }
      hearts[i][j] = flatHearts[(i * MAX_HEARTS_IN_ROW) + j]
    }
  }

  return {
    hearts, magic
  }
}
