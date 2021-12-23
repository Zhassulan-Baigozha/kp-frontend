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

const userReducer = (state: IUserState = { isFetching: false, data: initialUserFields  }, action: Action): IUserState => {
  switch (action.type) {
  case 'user/SET':
    return {
      ...state, data: action.data
    };
  case 'user/SET_FETCHING':
    return { ...state, isFetching: action.isFetching };
  default: return { ...state };
  }
};

export default userReducer;