import { ISetAction } from './actions';
import { IWarehouseState } from './types';

const warehouseReducer = (state: IWarehouseState = { data: [] }, action: ISetAction): IWarehouseState => {
    switch (action.type) {
    case 'warehouse/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default warehouseReducer;