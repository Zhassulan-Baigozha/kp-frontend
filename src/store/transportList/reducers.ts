import { Action } from './actions';
import { ITransportListState } from './types';

const transportListReducer = (state: ITransportListState = { isFetching: false, data: []  }, action: Action): ITransportListState => {
  switch (action.type) {
  case 'transportList/SET':
    return {
      ...state, data: action.data
    };
  case 'transportList/SET_FETCHING':
    return { ...state, isFetching: action.isFetching };
  default: return { ...state };
  }
};

export default transportListReducer;