import { Action } from './actions';
import { IAllUsersState } from './types';

const allUsersReducer = (state: IAllUsersState = { isFetching: false, data: []  }, action: Action): IAllUsersState => {
  switch (action.type) {
  case 'allUsers/SET':
    return {
      ...state, data: action.data
    };
  case 'allUsers/SET_FETCHING':
    return { ...state, isFetching: action.isFetching };
  default: return { ...state };
  }
};

export default allUsersReducer;