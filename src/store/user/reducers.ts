import { Action } from './actions';
import { IUserState } from './types';

const apartmentBlockReducer = (state: IUserState = { isFetching: false, data: {}  }, action: Action): IUserState => {
  switch (action.type) {
  case 'user/SET':
    return {
      ...state, data: action.data
    };
  case 'user/RESET':
    return {
      isFetching: false, data: {},
    };
  case 'user/SET_FETCHING':
    return { ...state, isFetching: action.isFetching };
  default: return { ...state };
  }
};

export default apartmentBlockReducer;