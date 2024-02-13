/// <reference path="../index.d.ts" />

import {
  DIR_NAME,
  ASSETS_DIR,
  DEFENSE,
  NUM_ROWS,
  HEARTS_IN_ROW,
  HEARTS,
  MAX_HEARTS
} from './constants'

/**
 * Calculate the point value for a percentage.
 * @param   {Number} percentage 0-100
 * @returns {Number}            Heart points.
 */
const calculateHeartPoints = (percentage) =>
  Math.round(percentage / 1.25) * 1.25 / 100 * MAX_HEARTS

/**
 * Generate some Hearts.
 * @returns {Hearts} The generated hearts (filled).
 */
export const generateHearts = () => {
  const arr = new Array(NUM_ROWS)

  let i = arr.length
  while (i > 0) {
    arr[--i] = new Array(HEARTS_IN_ROW)
    let j = arr[i].length
    while (j > 0) {
      arr[i][--j] = HEARTS.FULL
    }
  }

  return arr
}

/**
 * Calculate how many hearts you have from battery percentage.
 * I dare you to optimize this.
 * @param   {Number} batteryLevel The level of your battery (0-100).
 * @returns {Hearts}              The state of hearts.
 */
export const calculateHearts = (batteryLevel) => {
  const flatHearts = new Array(MAX_HEARTS)
  const numHearts = calculateHeartPoints(batteryLevel)
  const fullHearts = Math.floor(numHearts)
  const lastHeart = numHearts - fullHearts
  let i

  i = 0
  while (i < fullHearts) {
    flatHearts[i++] = HEARTS.FULL
  }

  if (lastHeart > 0) {
    flatHearts[i++] = lastHeart
  }

  while (i < flatHearts.length) {
    flatHearts[i++] = HEARTS.EMPTY
  }

  const hearts = generateHearts()

  while (i > 0) {
    hearts[Math.floor(--i / HEARTS_IN_ROW)][i % HEARTS_IN_ROW] = flatHearts[i]
  }

  return hearts
}

/**
 * Shortcut for accessing assets.
 * @param   {String} path The path to your asset, relative to the assets folder.
 * @returns {String}      The file path to the asset.
 */
export const getAsset = (path) => `${DIR_NAME}/${ASSETS_DIR}/${path}`

/**
 * Helper function to generate file paths to hearts.
 * @param   {String} heartFile The heart filename.
 * @returns {String}           The full file path.
 */
const getHeartAsset = (fileName) =>
  getAsset(`hearts/${DEFENSE ? 'defense' : 'normal'}/${fileName}`)

/**
 * Helper function to get heart images.
 * If you wanna change the icons you can do that here.
 * Just change the strings to the filenames of your icons.
 * @param   {Heart}  heart The value of the heart.
 * @returns {String}       The file path of the heart image.
 */
export const getHeart = (heart) => {
  switch (heart) {
    case HEARTS.EMPTY:
      return getHeartAsset('empty.png')
    case HEARTS.QUARTER:
      return getHeartAsset('quarter.png')
    case HEARTS.HALF:
      return getHeartAsset('half.png')
    case HEARTS.THREE_QUARTER:
      return getHeartAsset('three-quarter.png')
    default:
      return getHeartAsset('full.png')
  }
}
