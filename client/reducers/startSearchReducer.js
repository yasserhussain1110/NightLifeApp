import initialState from './initialState';
import * as types from '../actions/actionTypes';

const startSearchReducer = (state = initialState.searching, action) => {
  switch (action.type) {
    case types.STARTED_SEARCH:
      return true;
    case types.ENDED_SEARCH:
      return false;
    default:
      return state;
  }
};

export default startSearchReducer;
