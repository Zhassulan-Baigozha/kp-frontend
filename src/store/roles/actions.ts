import { IRoles } from './types';

export interface ISetAction {
  type: 'roles/SET'
  data: IRoles[],
}
export interface ISetFetcing {
  type: 'roles/SET_FETCHING'
  isFetching: boolean
}

export type Action = ISetAction | ISetFetcing

export const setRolesList = (data: IRoles[]): ISetAction => {
  return { type: 'roles/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
  return { type: 'roles/SET_FETCHING', isFetching };
};
