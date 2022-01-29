import { Action } from './actions';
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

const userReducer = (state: IUserState = { 
    user: initialUserFields, 
    allUsers: [],
    allStatuses: [],
    allOffices: [],
    roles: [],
    transportList: [],
    warehouse: [],
}, action: Action): IUserState => {
    switch (action.type) {
    case 'user/SET': return { ...state, user: action.user };
    case 'allUsers/SET': return { ...state, allUsers: action.allUsers };
    case 'allStatuses/SET': return { ...state, allStatuses: action.allStatuses };
    case 'allOffices/SET': return { ...state, allOffices: action.allOffices };
    case 'roles/SET': return { ...state, roles: action.roles };
    case 'transportList/SET': return { ...state, transportList: action.transportList };
    case 'warehouse/SET': return { ...state, warehouse: action.warehouse };
    default: return { ...state };
    }
};

export default userReducer;