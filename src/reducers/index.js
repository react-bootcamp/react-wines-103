import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { loading } from './http';
import { regions } from './regions';
import { wines, currentWine } from './wines';

export const reducer = combineReducers({
  regions,
  wines,
  currentWine,
  loading,
  routing: routerReducer,
});
