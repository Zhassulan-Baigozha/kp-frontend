import { Action } from './actions';
import { IOfficeState } from './types';

const officesReducer = (state: IOfficeState = { isFetching: false, data: []  }, action: Action): IOfficeState => {
    switch (action.type) {
    case 'offices/SET':
        return {
            ...state, data: action.data
        };
    case 'offices/RESET':
        return {
            isFetching: false, data: [],
        };
    case 'offices/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default officesReducer;