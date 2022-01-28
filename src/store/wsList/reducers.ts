import { ISetAction } from './actions';
import { IWSListState } from './types';

const wsListReducer = (state: IWSListState = { data: [] }, action: ISetAction): IWSListState => {
    switch (action.type) {
    case 'wsList/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default wsListReducer;