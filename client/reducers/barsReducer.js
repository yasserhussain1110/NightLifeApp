import initialState from './initialState';
import * as types from '../actions/actionTypes';

const barsReducer = (state = initialState.bars, action) => {
  switch (action.type) {
    case types.FOUND_BARS:
      return action.bars;
    case types.BAR_GOERS_UPDATED:
      let {numberOfGoers, barIndex} = action;
      return [
        ...state.slice(0, barIndex),
        Object.assign({}, state[barIndex], {numberOfGoers}),
        ...state.slice(barIndex + 1)
      ];
    default:
      return state;
  }
};

export default barsReducer;
