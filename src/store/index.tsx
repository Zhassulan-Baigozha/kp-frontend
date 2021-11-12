import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import user from './user/reducers';
import { IUserState } from './user/types';

export interface IRootState {
  user: IUserState
}

export default createStore(
  combineReducers<IRootState>({
    user,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ));