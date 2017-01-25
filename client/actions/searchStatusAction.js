import * as types from './actionTypes';

export function searchStarted() {
  return {type: types.STARTED_SEARCH};
}

export function searchEnded() {
  return {type: types.ENDED_SEARCH};
}
