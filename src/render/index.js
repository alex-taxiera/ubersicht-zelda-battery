import {
  renderStyle,
  FullscreenWrapper,
  MainArea,
  RupeeSpacer
} from '../styles'

import {
  renderHearts
} from './renderHearts'

import {
  renderMagic
} from './renderMagic'

import {
  renderRupees
} from './renderRupees'

/**
 * Render method.
 * @param {State} state The state passed in
 */
export const render = (state) => (
  <FullscreenWrapper>
    {renderStyle()}
    <MainArea>
      {renderHearts(state.hearts)}
      {renderMagic(state.magic)}
      <RupeeSpacer />
      {renderRupees(state.rupees)}
    </MainArea>
  </FullscreenWrapper>
)
