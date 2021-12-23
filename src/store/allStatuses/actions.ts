import { IStatusesTable } from './types';

export interface ISetAction {
  type: 'allStatuses/SET'
  data: IStatusesTable[],
}
export interface ISetFetcing {
  type: 'allStatuses/SET_FETCHING'
  isFetching: boolean
}
export type Action = ISetAction | ISetFetcing 

export const setAllStatusesList = (data: IStatusesTable[]): ISetAction => {
  return { type: 'allStatuses/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
  return { type: 'allStatuses/SET_FETCHING', isFetching };
};
