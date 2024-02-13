import {
  styled
} from 'uebersicht'

import {
  HUD_MARGIN,
  HEART_HEIGHT,
  HEART_MARGIN,
  HEART_WIDTH,
  MAGIC_METER_WIDTH,
  MAGIC_METER_HEIGHT
} from './constants'

import {
  getAsset
} from './utils'

export const FullscreenWrapper = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  padding: ${HUD_MARGIN}px
`

export const MainArea = styled('main')`
  display: flex;
  flex-flow: column;
  height: 100%;
`

export const Hearts = styled('div')`
  display: flex;
  flex-flow: column;
  align-content: space-between;
`

export const HeartsRow = styled('div')`
  display: flex;
  justify-content: space-between;
  width: ${({ length = 0 }) => ((HEART_WIDTH + HEART_MARGIN) * length) - HEART_MARGIN}px;
  height: ${HEART_HEIGHT + HEART_MARGIN}px;
`

export const Heart = styled('img')`
  width: ${HEART_WIDTH}px;
  height: ${HEART_HEIGHT}px;
  -webkit-animation: ${({ pulse = false }) => pulse ? 'pulse 0.9s ease-in-out infinite normal' : ''};
`

export const MagicMeter = styled('div')`
  display: flex;
  width: ${MAGIC_METER_WIDTH}%;
  height: ${MAGIC_METER_HEIGHT}px;
  margin-top: ${HUD_MARGIN / 2}px
`

export const MagicMeterEnd = styled('img')((props) => ({
  height: '100%',
  ...(props.right ? {
    transform: 'scale(-1, 1)'
  } : null)
}))

export const MagicMeterMid = styled('div')`
  flex: 2;
  display: flex;
  align-items: center;
  background-image: url(${getAsset('/magic/bar.png')});
  background-repeat: repeat-x;
  background-size: auto 100%;
`

export const MagicMeterBar = styled('div')`
  width: ${({ magic = 100 }) => magic}%;
  height: ${7 / 11 * 100}%;
  background-image: linear-gradient(
    rgba(0, 200, 20, 0.4),
    rgba(0, 200, 20, 1.0),
    rgba(0, 200, 20, 1.0),
    rgba(0, 200, 20, 0.4)
  )
`

export const RupeeSpacer = styled('div')`
  flex: 2;
`

export const Rupees = styled('div')`
  display: flex;
`

export const Rupee = styled('img')`
  height: ${HEART_HEIGHT * 1.2}px;
  width: auto;
`
export const RupeeCount = styled('div')`
  min-width: 100px;
  margin-left: 12px;
  line-height: 1;
  font-size: ${HEART_HEIGHT + HEART_MARGIN}px;
  font-family: Chiaro;
  font-style: italic;
  color: ${({ current = 500, max = 500 }) => current === 0
          ? 'gray'
          : current === max
            ? 'green'
            : 'white'};
`

const GLOBAL_STYLE = `
  @-webkit-keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.4);
    }

    100% {
      transform: scale(1);
    }
  }

  * {
    box-sizing: border-box;
  }
`

export const renderStyle = () => (<style>{GLOBAL_STYLE}</style>)
