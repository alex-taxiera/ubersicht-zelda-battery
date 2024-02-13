import {
  HEART_PULSE,
  HEARTS_IN_ROW,
  MAX_HEARTS
} from '../constants'

import {
  getHeart
} from "../utils"

import {
  Hearts,
  HeartsRow,
  Heart
} from '../styles'

/**
 * This is a function.
 * @param {Hearts} hearts 
 */
export const renderHearts = (hearts) => (
  <Hearts>
    {
      hearts.map((row, i) => (
        <HeartsRow
          key={i}
          length={row.length}
        >
          {
            row.map((heart, j) => (
              <Heart
                key={j}
                pulse={HEART_PULSE && heart > 0 && (
                      (j < HEARTS_IN_ROW - 1 && row[j + 1] === 0) ||
                      (j === HEARTS_IN_ROW - 1 && (
                        i === MAX_HEARTS / HEARTS_IN_ROW - 1 ||
                        hearts[i + 1][0] === 0
                      ))
                    )}
                src={getHeart(heart)}
              />
            ))
          }
        </HeartsRow>
      ))
    }
  </Hearts>
)
