import {
  MAGIC_METER_WIDTH
} from "../constants"

import {
  getAsset
} from '../utils'

import {
  MagicMeter,
  MagicMeterEnd,
  MagicMeterMid,
  MagicMeterBar
} from '../styles'

/**
 * @param {Magic} magic 
 */
export const renderMagic = (magic) => MAGIC_METER_WIDTH > 0 ? (
  <MagicMeter>
    <MagicMeterEnd
      src={getAsset('/magic/bar-end.png')}
    />
    <MagicMeterMid
      className="mid"
    >
      <MagicMeterBar
        magic={magic}
      />
    </MagicMeterMid>
    <MagicMeterEnd
      right
      src={getAsset('/magic/bar-end.png')}
    />
  </MagicMeter>
) : null
