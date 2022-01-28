import { IGetWSResponse } from 'src/api/CustomAPIModel';

export interface ISetAction {
    type: 'wsList/SET'
    data: IGetWSResponse[],
}
export interface ISetFetcing {
    type: 'wsList/SET_FETCHING'
    isFetching: boolean
}
export type Action = ISetAction | ISetFetcing 

export const setWSList = (data: IGetWSResponse[]): ISetAction => {
    return { type: 'wsList/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'wsList/SET_FETCHING', isFetching };
};
