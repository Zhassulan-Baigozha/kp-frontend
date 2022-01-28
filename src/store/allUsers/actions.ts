import { IUser } from '../user/types';

export interface ISetAction {
    type: 'allUsers/SET'
    data: IUser[],
}

export const setAllUsersList = (data: IUser[]): ISetAction => {
    return { type: 'allUsers/SET', data };
};
