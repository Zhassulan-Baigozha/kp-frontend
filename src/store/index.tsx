import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import data from './data/reducers';
import { IUserState } from './data/types';

import token from './token/reducers';
import { ITokenState } from './token/types';

import sortedWS from './sortedWS/reducers';
import { ISortedWSState } from './sortedWS/types';

import wsList from './wsList/reducers';
import { IWSListState } from './wsList/types';

import selectedWS from './selectedWS/reducers';
import { ISelectedWSState } from './selectedWS/types';

export interface IRootState {
    data: IUserState,
    token: ITokenState,
    sortedWS: ISortedWSState, 
    wsList: IWSListState,
    selectedWS: ISelectedWSState,
}

export default createStore(
    combineReducers<IRootState>({
        data,
        token,
        sortedWS,
        wsList,
        selectedWS,
    }),
    composeWithDevTools(
        applyMiddleware(thunk),
    ));