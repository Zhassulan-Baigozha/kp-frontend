import { ISetAction } from './actions';
import { ITokenState } from './types';

const tokenReducer = (state: ITokenState = { data: {access: '', refresh: ''}  }, action: ISetAction): ITokenState => {
    switch (action.type) {
    case 'token/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default tokenReducer;