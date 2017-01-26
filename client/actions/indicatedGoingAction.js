import * as types from './actionTypes';

export function barGoersUpdated(barIndex, numberOfGoers) {
  return {type: types.BAR_GOERS_UPDATED, numberOfGoers: numberOfGoers, barIndex: barIndex};
}

