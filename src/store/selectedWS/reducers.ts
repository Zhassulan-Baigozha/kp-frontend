import { ISetAction } from './actions';
import { ISelectedWSState } from './types';

const selectedWSReducer = (state: ISelectedWSState = { data: null  }, action: ISetAction): ISelectedWSState => {
    switch (action.type) {
    case 'selectedWS/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default selectedWSReducer;