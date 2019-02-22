/* Useful variables */

/**
 * Width of hearts in pixels.
 * Default: 40
 */
const HEART_WIDTH = 40

// Position of bar (default: top 10, left 10)
export const className = {
  top: 10,
  left: 10
}

// The polling rate/time between each update, not sure if changing this has performance effects (default: 30000)
export const refreshFrequency = 30000

// Make sure the string has the correct dir name of the widget (default: zelda-battery.widget)
const heartImg = (fileName) => `./zelda-battery.widget/hearts/${fileName}`



/**
 * Things down here are a bit more advanced.
 * I'll point out spots where customization might make sense.
 */

const percentRegex = /\d+%/gm

export const command = 'pmset -g batt'

export const initialState = {
  output: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}

export const render = ({ output: hearts }) => {
  return (
    <div style={{
      zIndex: 10,
      maxWidth: (HEART_WIDTH * 10),
      display: 'flex',
      flexWrap: 'wrap'
    }}>
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
          <div id={i}>
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
    const battery = event.output.match(percentRegex)[0].replace('%', '')
    let numHearts = (battery / 100) * initialState.output.length
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