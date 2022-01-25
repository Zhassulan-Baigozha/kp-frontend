import { Action } from './actions';
import { IWarehouseState } from './types';

const warehouseReducer = (state: IWarehouseState = { isFetching: false, data: []  }, action: Action): IWarehouseState => {
    switch (action.type) {
    case 'warehouse/SET':
        return {
            ...state, data: action.data
        };
    case 'warehouse/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default warehouseReducer;