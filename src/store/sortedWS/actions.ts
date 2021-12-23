import { IGridData } from "src/api/CustomAPIModel";

export interface ISetAction {
  type: 'sortedWS/SET'
  data: IGridData[],
}
export interface ISetFetcing {
  type: 'sortedWS/SET_FETCHING'
  isFetching: boolean
}
export type Action = ISetAction | ISetFetcing 

export const setSortedWSList = (data: IGridData[]): ISetAction => {
  return { type: 'sortedWS/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
  return { type: 'sortedWS/SET_FETCHING', isFetching };
};
