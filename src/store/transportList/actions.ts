import { ITransport } from './types';

export interface ISetAction {
  type: 'transportList/SET'
  data: ITransport[],
}
export interface ISetFetcing {
  type: 'transportList/SET_FETCHING'
  isFetching: boolean
}
export type Action = ISetAction | ISetFetcing 

export const setTransportList = (data: ITransport[]): ISetAction => {
    return { type: 'transportList/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'transportList/SET_FETCHING', isFetching };
};
