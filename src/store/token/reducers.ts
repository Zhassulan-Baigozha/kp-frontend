import { Action } from './actions';
import { ITokenState } from './types';

const tokenReducer = (state: ITokenState = { isFetching: false, data: {access: '', refresh: ''}  }, action: Action): ITokenState => {
    switch (action.type) {
    case 'token/SET':
        return {
            ...state, data: action.data
        };
    case 'token/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default tokenReducer;