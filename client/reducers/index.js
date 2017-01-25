import { combineReducers } from 'redux';
import bars from './barsReducer';
import lastSearchedLocation from './lastSearchedLocationReducer';
import searching from './startSearchReducer';

export default combineReducers({
  bars,
  searching,
  lastSearchedLocation
});
