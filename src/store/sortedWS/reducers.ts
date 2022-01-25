import { Action } from './actions';
import { ISortedWSState } from './types';

const sortedWSReducer = (state: ISortedWSState = { isFetching: false, data: []  }, action: Action): ISortedWSState => {
    switch (action.type) {
    case 'sortedWS/SET':
        return {
            ...state, data: action.data
        };
    case 'sortedWS/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default sortedWSReducer;