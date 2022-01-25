import { Action } from './actions';
import { IWSListState } from './types';

const wsListReducer = (state: IWSListState = { isFetching: false, data: []  }, action: Action): IWSListState => {
    switch (action.type) {
    case 'wsList/SET':
        return {
            ...state, data: action.data
        };
    case 'wsList/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default wsListReducer;