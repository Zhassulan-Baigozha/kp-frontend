import { ISetAction } from './actions';
import { IOfficeState } from './types';

const officesReducer = (state: IOfficeState = { data: []  }, action: ISetAction): IOfficeState => {
    switch (action.type) {
    case 'offices/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default officesReducer;