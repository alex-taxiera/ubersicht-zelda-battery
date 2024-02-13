/*****************************
 *      CRITICAL VALUES      *
 * Make sure these are right *
 *****************************/

/**
 * @const {String}
 * The name of the widget folder.
 * You'll need this set correctly to find images and the battery script.
 * Default: zelda-battery.widget
 */
export const DIR_NAME = 'zelda-battery.widget'

/**
 * @const {String}
 * The name of the assets folder.
 * Default: assets
 */
export const ASSETS_DIR = 'assets'

/**
 * The polling rate/time between each update.
 * Not sure if changing this has performance effects.
 * Default: 30000 (30 seconds)
 */
export const REFRESH = 30000

/****************************************
 *               OPTIONS                *
 * You can adjust these features freely *
 ****************************************/

/** HEARTS **/

/**
 * @const {Number}
 * The number of hearts to display, defaults to the full authentic 20.
 * Default: 20
 */
export const MAX_HEARTS = 20

/**
 * @const {Number}
 * Max number of hearts to show in a row, defaults to authentic 10.
 * Default: 10
 */
export const HEARTS_IN_ROW = 10

/**
 * @const {Boolean}
 * Whether or not Defense is active.
 * Default: false
 */
export const DEFENSE = false

/**
 * @const {Boolean}
 * Pulsing heart for the last partial or fully filled heart
 * Default: true
 */
export const HEART_PULSE = true

/** MAGIC METER **/

/**
 * @const {Number}
 * Width (percentage) of Magic Meter.
 * Put 0 to hide meter.
 * Default: 100
*/
export const MAGIC_METER_WIDTH = 100

/*************************************
 *           SIZE OPTIONS            *
 * These will make things chage size *
 *************************************/

/**
 * @const {Number}
 * Width of hearts in pixels.
 * Default: 40
 */
export const HEART_WIDTH = 40

/**
 * @const {Number}
 * Height of hearts in pixels.
 * Default: constrained by original aspect ratio.
 */
export const HEART_HEIGHT = HEART_WIDTH * (12 / 13) // original pixel dimensions are 13 wide by 12 tall

/**
 * @const {Number}
 * The height of the magic meter.
 */
export const MAGIC_METER_HEIGHT = HEART_HEIGHT * (1 + (1 / 6)) // In game meter is about 14 pixels compared to 12 pixels of heart

/**
 * @const {Number}
 * Space between hearts in percentage of HEART_WIDTH.
 * Default: HEART_WIDTH * (1 / 13) * 2
 */
export const HEART_MARGIN = HEART_WIDTH * (2 / 13)

/**
 * @const {Number}
 * Space between edge of screen and HUD elements.
 * Default HEART_WIDTH * 5
 */
export const HUD_MARGIN = HEART_MARGIN * 5

// other shit

/**
 * @const {Number}
 * The number of rows the hearts will span.
 */
export const NUM_ROWS = Math.ceil(MAX_HEARTS / HEARTS_IN_ROW)

/**
 * @const {Number}
 * The number of hearts in the last row.
 */
export const HEARTS_IN_LAST_ROW = (MAX_HEARTS % HEARTS_IN_ROW) || HEARTS_IN_ROW

export const SCRIPT = `sh ${DIR_NAME}/stats.sh`

export const STYLE = `
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @font-face {
    font-family: 'Chiaro';
    src: url('../assets/fonts/ChiaroStd-B.otf'));
  }
`

/**
 * @const
 * @type {State}
 * Initial state of hearts and magic.
 * Hearts initialized with 1.
 * 0    = Empty
 * 0.25 = Quarter
 * 0.50 = Half
 * 0.75 = Three Quarter
 * 1    = Full
 * --------------------
 * Magic initialized with 100 (percent).
 * --------------------
 * Rupees initialized with a full 500 wallet.
 */
export const INITIAL_STATE = {
  magic: 100,
  hearts: Array(NUM_ROWS)
    .fill(null)
    .map((_, i) => i !== NUM_ROWS - 1
      ? Array(HEARTS_IN_ROW).fill(1)
      : Array(HEARTS_IN_LAST_ROW).fill(1)
    ),
  rupees: {
    max: 500,
    current: 500
  }
}

/**
 * Heart value enum.
 * @enum
 */
export const HEARTS = {
  /** @type {Heart} */
  EMPTY: 0,
  /** @type {Heart} */
  QUARTER: 0.25,
  /** @type {Heart} */
  HALF: 0.5,
  /** @type {Heart} */
  THREE_QUARTER: 0.75,
  /** @type {Heart} */
  FULL: 1
}
