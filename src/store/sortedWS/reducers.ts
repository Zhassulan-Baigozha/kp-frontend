import { ISetAction } from './actions';
import { ISortedWSState } from './types';

const sortedWSReducer = (state: ISortedWSState = { data: []  }, action: ISetAction): ISortedWSState => {
    switch (action.type) {
    case 'sortedWS/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default sortedWSReducer;