import { Action } from './actions';
import { IAllStatusesState } from './types';

const allStatusReducer = (state: IAllStatusesState = { isFetching: false, data: []  }, action: Action): IAllStatusesState => {
  switch (action.type) {
  case 'allStatuses/SET':
    return {
      ...state, data: action.data
    };
  case 'allStatuses/SET_FETCHING':
    return { ...state, isFetching: action.isFetching };
  default: return { ...state };
  }
};

export default allStatusReducer;