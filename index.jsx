/* Useful variables */

/**
 * The name of the widget folder.
 * You'll need this set correctly to find images and the battery script.
 * Default: zelda-battery.widget
 */
const DIR_NAME = 'zelda-battery.widget'

/**
 * Width of hearts in pixels.
 * Default: 40
 */
const HEART_WIDTH = 40

/**
 * Space between hearts in in percentage of HEART_WIDTH.
 * Default: HEART_WIDTH / 10
 */
const HEART_MARGIN = HEART_WIDTH / 10

/**
 * Max number of hearts to show in a row, defaults to authentic 10.
 * Default: 10
 */
const MAX_HEARTS_IN_ROW = 10

/**
 * Position of bar, defaults to authentic top left.
 * default: { top: 10, left: 10 }
 */
export const className = {
  top: 10,
  left: 10
}

/**
 * The polling rate/time between each update.
 * Not sure if changing this has performance effects.
 * Default: 30000 (30 seconds)
 */
export const refreshFrequency = 30000

/**
 * Helper function to generate file paths.
 * Make sure the string has the correct dir name of the images.
 * Default: `./zelda-battery.widget/hearts/${fileName}`
 * @param {String} fileName The file name (eg. image.png).
 */
const heartImg = (fileName) => `${DIR_NAME}/hearts/${fileName}`

/**
 * Things down here are a bit more advanced.
 * I'll point out spots where customization might make sense.
 */

/**
 * Bash command to check battery level.
 */
export const command = `sh ${DIR_NAME}/battery.sh`

/**
 * Initial state of hearts.
 * 0 = Empty
 * 25 = Quarter
 * 50 = Half
 * 75 = Three Quarter
 * 1 = Full
 */
export const initialState = {
  output: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}

/**
 * Render method.
 * @param    {Object}        state  The state passed in
 * @property {Array[Number]} output The array of hearts (renamed hearts in assignment).
 */
export const render = ({ output: hearts }) => {
  return (
    <div
      style={{
        zIndex: 10,
        maxWidth: ((HEART_WIDTH + HEART_MARGIN) * 10),
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {hearts.map((heart, i) => {
        let heartSrc
        /**
         * If you wanna change the icons you can do that here.
         * Just change the strings to the filenames of your icons.
         */
        switch (heart) {
          case 0: heartSrc = heartImg('empty-heart-4x.png'); break
          case 25: heartSrc = heartImg('quarter-heart-4x.png'); break
          case 50: heartSrc = heartImg('half-heart-4x.png'); break
          case 75: heartSrc = heartImg('three-quarter-heart-4x.png'); break
          case 1: heartSrc = heartImg('full-heart-4x.png'); break
          default: heartSrc = heartImg('full-heart-4x.png')
        }
        return (
          <div key={i} style={{ margin: `0 ${HEART_MARGIN / 2}px` }}>
            <img src={heartSrc} width={HEART_WIDTH} />
          </div>
        )
      })}
    </div>
  )
}

/**
 * This could potentially be optimized or slightly tweaked.
 * This favors rounding down, so if we were to have 99% of a heart, it uses the 75% heart.
 * I was too lazy to make it so that it finds the closest one.
 * But also I think it seems pretty swell anyway.
 */
export const updateState = (event, previousState) => {
  if (event.output) {
    let numHearts = (event.output / 100) * initialState.output.length
    const hearts = []
    for (let i = 0; i < initialState.output.length; i++) {
      if (numHearts >= 1) {
        hearts[i] = 1
      } else if (numHearts === 0) {
        hearts[i] = 0
      } else {
        if ((numHearts * 100) >= 75) {
          numHearts = 75
        } else if ((numHearts * 100) >= 50) {
          numHearts = 50
        } else if ((numHearts * 100)>= 25) {
          numHearts = 25
        } else {
          numHearts = 0
        }
        hearts[i] = numHearts
        numHearts = 1
      }
      numHearts = numHearts > 0 ? numHearts - 1 : 0
    }

    return {
      output: hearts
    }
  } else if (previousState.output) {
    return previousState
  }

  return initialState
}