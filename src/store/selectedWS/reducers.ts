import { Action } from './actions';
import { ISelectedWSState } from './types';

const selectedWSReducer = (state: ISelectedWSState = { isFetching: false, data: null  }, action: Action): ISelectedWSState => {
    switch (action.type) {
    case 'selectedWS/SET':
        return {
            ...state, data: action.data
        };
    case 'selectedWS/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default selectedWSReducer;