import { IUser } from './types';

export interface ISetAction {
  type: 'user/SET'
  data: IUser,
}
export interface ISetFetcing {
  type: 'user/SET_FETCHING'
  isFetching: boolean
}

export interface IReset {
  type: 'user/RESET',
}

export interface IToggleVisibility {
  type: 'user/TOGGLE_VISIBILITY'
  show: boolean
}

export type Action = ISetAction | ISetFetcing | IReset | IToggleVisibility

export const setUserData = (data: IUser): ISetAction => {
  return { type: 'user/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
  return { type: 'user/SET_FETCHING', isFetching };
};

export const resetFilter = (): IReset => {
  return { type: 'user/RESET' };
};