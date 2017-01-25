import initialState from './initialState';
import * as types from '../actions/actionTypes';

const barsReducer = (state = initialState.bars, action) => {
  switch (action.type) {
    case types.FOUND_BARS:
      return action.bars;
    default:
      return state;
  }
};

export default barsReducer;
