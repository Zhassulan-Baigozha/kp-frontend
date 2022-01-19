import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import user from './user/reducers';
import { IUserState } from './user/types';

import roles from './roles/reducers';
import { IRolesState } from './roles/types';

import offices from './offices/reducers';
import { IOfficeState } from './offices/types';

import token from './token/reducers';
import { ITokenState } from './token/types';

import allUsers from './allUsers/reducers';
import { IAllUsersState } from './allUsers/types';

import warehouse from './warehouse/reducers';
import { IWarehouseState } from './warehouse/types';

import allStatuses from './allStatuses/reducers';
import { IAllStatusesState } from './allStatuses/types';

import transportList from './transportList/reducers';
import { ITransportListState } from './transportList/types';

import sortedWS from './sortedWS/reducers';
import { ISortedWSState } from './sortedWS/types';

import wsList from './wsList/reducers';
import { IWSListState } from './wsList/types';

export interface IRootState {
  user: IUserState,
  allUsers: IAllUsersState,
  roles: IRolesState,
  offices: IOfficeState,
  token: ITokenState,
  warehouse: IWarehouseState,
  allStatuses: IAllStatusesState,
  sortedWS: ISortedWSState, 
  transportList: ITransportListState,
  wsList: IWSListState,
}

export default createStore(
  combineReducers<IRootState>({
    user,
    roles,
    offices,
    token,
    allUsers,
    warehouse,
    allStatuses,
    sortedWS,
    transportList,
    wsList,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ));