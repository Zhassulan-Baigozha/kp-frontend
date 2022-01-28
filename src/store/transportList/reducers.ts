import { ISetAction } from './actions';
import { ITransportListState } from './types';

const transportListReducer = (state: ITransportListState = { data: [] }, action: ISetAction): ITransportListState => {
    switch (action.type) {
    case 'transportList/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default transportListReducer;