import { ISetAction } from './actions';
import { IAllUsersState } from './types';

const allUsersReducer = (state: IAllUsersState = { data: [] }, action: ISetAction): IAllUsersState => {
    switch (action.type) {
    case 'allUsers/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default allUsersReducer;