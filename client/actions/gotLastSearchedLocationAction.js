import * as types from './actionTypes';

export function gotLastSearchedLocation(location) {
  return {type: types.GOT_LAST_SEARCHED_LOCATION, location: location};
}
