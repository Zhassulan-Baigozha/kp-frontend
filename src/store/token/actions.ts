import { IToken } from './types';

export interface ISetAction {
    type: 'token/SET'
    data: IToken,
}
export interface ISetFetcing {
    type: 'token/SET_FETCHING'
    isFetching: boolean
}


export type Action = ISetAction | ISetFetcing

export const setTokenData = (data: IToken): ISetAction => {
    return { type: 'token/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'token/SET_FETCHING', isFetching };
};
