import { IWarehouse } from './types';

export interface ISetAction {
  type: 'warehouse/SET'
  data: IWarehouse[],
}
export interface ISetFetcing {
  type: 'warehouse/SET_FETCHING'
  isFetching: boolean
}

export type Action = ISetAction | ISetFetcing

export const setWarehouseList = (data: IWarehouse[]): ISetAction => {
  return { type: 'warehouse/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
  return { type: 'warehouse/SET_FETCHING', isFetching };
};
