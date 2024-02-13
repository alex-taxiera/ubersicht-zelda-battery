/// <reference path="../index.d.ts" />

import {
  calculateHearts
} from './utils'

/**
 * State update function.
 * Reads the value from the event and parses the data for state representation.
 * @param   {UEvent} event         The event causing the state update.
 * @param   {State} previousState The previous/current state rendered.
 * @returns {State}               The next state.
 */
export const handleEvent = (event, previousState) => {
  if (event.error) {
    console.error('ERROR: ', event.error)
    return previousState
  }

  const { battery, cpu, disk } = JSON.parse(event.output)

  return {
    hearts: calculateHearts(battery.level),
    magic: cpu.idle,
    rupees: {
      max: disk.total,
      current: disk.available
    }
  }
}
