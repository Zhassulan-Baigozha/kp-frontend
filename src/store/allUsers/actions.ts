import { IUser } from '../user/types';

export interface ISetAction {
    type: 'allUsers/SET'
    data: IUser[],
}
export interface ISetFetcing {
    type: 'allUsers/SET_FETCHING'
    isFetching: boolean
}
export type Action = ISetAction | ISetFetcing 

export const setAllUsersList = (data: IUser[]): ISetAction => {
    return { type: 'allUsers/SET', data };
};
export const isFetching = (isFetching: boolean): ISetFetcing => {
    return { type: 'allUsers/SET_FETCHING', isFetching };
};
