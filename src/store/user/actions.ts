import { IUser } from './types';

export interface ISetAction {
    type: 'user/SET'
    data: IUser,
}

export const setUserData = (data: IUser): ISetAction => {
    return { type: 'user/SET', data };
};