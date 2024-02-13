import {
  getAsset
} from '../utils'

import {
  Rupees,
  Rupee,
  RupeeCount
} from '../styles'

/**
 * @param {Rupees} rupees 
 */
export const renderRupees = (rupees) => (
  <Rupees>
    <Rupee
      src={getAsset('/rupees/green.png')}
    />
    <RupeeCount
      current={rupees.current}
      max={rupees.max}
    >
      {
        rupees.current < 10
          ? '0' + rupees.current
          : rupees.current
      }
    </RupeeCount>
  </Rupees>
)
