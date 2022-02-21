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
    allOffices: [],
    allUsers: [],
    allStatuses: [],
    allStates: [],
    roles: [],
    transferList: [],
    transportList: [],
    user: initialUserFields, 
    warehouse: [],
}, action: Action): IUserState => {
    switch (action.type) {
    case 'allOffices/SET': return { ...state, allOffices: action.allOffices };
    case 'allUsers/SET': return { ...state, allUsers: action.allUsers };
    case 'allStatuses/SET': return { ...state, allStatuses: action.allStatuses };
    case 'allStates/SET': return { ...state, allStates: action.allStates };
    case 'roles/SET': return { ...state, roles: action.roles };
    case 'transferList/SET': return { ...state, transferList: action.transferList };
    case 'transportList/SET': return { ...state, transportList: action.transportList };
    case 'user/SET': return { ...state, user: action.user };
    case 'warehouse/SET': return { ...state, warehouse: action.warehouse };
    default: return { ...state };
    }
};

export default userReducer;