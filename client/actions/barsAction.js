import * as types from './actionTypes';

export function foundBars(bars) {
  return {type: types.FOUND_BARS, bars: bars};
}
