/******************************************************************
 * Please don't touch this file unless you know what you're doing *
 ******************************************************************/

import {
  INITIAL_STATE,
  SCRIPT,
  STYLE,
  REFRESH
} from './src/constants'

import {
  render as renderHUD
} from './src/render'

import {
  handleEvent
} from './src/handleEvent'


export const className = STYLE

export const refreshFrequency = REFRESH

export const command = SCRIPT

export const initialState = INITIAL_STATE

export const render = renderHUD

export const updateState = handleEvent
