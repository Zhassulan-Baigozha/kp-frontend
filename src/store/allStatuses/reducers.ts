import { ISetAction } from './actions';
import { IAllStatusesState } from './types';

const allStatusReducer = (state: IAllStatusesState = { data: [] }, action: ISetAction): IAllStatusesState => {
    switch (action.type) {
    case 'allStatuses/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default allStatusReducer;