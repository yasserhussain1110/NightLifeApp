import initialState from './initialState';
import * as types from '../actions/actionTypes';

const lastSearchedLocationReducer = (state = initialState.lastSearchedLocation, action) => {
  switch (action.type) {
    case types.GOT_LAST_SEARCHED_LOCATION:
      return action.location;
    default:
      return state;
  }
};

export default lastSearchedLocationReducer;
