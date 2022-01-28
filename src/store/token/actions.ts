import { IToken } from './types';

export interface ISetAction {
    type: 'token/SET'
    data: IToken,
}

export const setTokenData = (data: IToken): ISetAction => {
    return { type: 'token/SET', data };
};
