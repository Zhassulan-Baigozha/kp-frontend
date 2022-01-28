import { ISetAction } from './actions';
import { IRolesState } from './types';

const rolesReducer = (state: IRolesState = { data: []  }, action: ISetAction): IRolesState => {
    switch (action.type) {
    case 'roles/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default rolesReducer;