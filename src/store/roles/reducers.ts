import { Action } from './actions';
import { IRolesState } from './types';

const rolesReducer = (state: IRolesState = { isFetching: false, data: []  }, action: Action): IRolesState => {
    switch (action.type) {
    case 'roles/SET':
        return {
            ...state, data: action.data
        };
    case 'roles/SET_FETCHING':
        return { ...state, isFetching: action.isFetching };
    default: return { ...state };
    }
};

export default rolesReducer;