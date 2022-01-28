import { ISetAction } from './actions';
import { IUserState } from './types';

const initialUserFields = {
    email: '',
    name: '',
    office: 0,
    position: '',
    roles: '',
    status: true,
    surname: '',
    uuid: '',
};

const userReducer = (state: IUserState = { data: initialUserFields  }, action: ISetAction): IUserState => {
    switch (action.type) {
    case 'user/SET':
        return {
            ...state, data: action.data
        };
    default: return { ...state };
    }
};

export default userReducer;